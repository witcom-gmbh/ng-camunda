import { Injectable } from '@angular/core';
import { CamundaProcessDefinitionService, CamundaTaskService, CamundaTaskVariableService, CamundaProcessInstanceService } from '@ng-camunda/core/src/lib/camunda-engine';
import {throwError, Observable, of, forkJoin, zip, merge, concat} from 'rxjs';
import {
  map, catchError, switchMap, mergeMap, flatMap, tap
} from 'rxjs/operators';

import t from 'typy';
import { CamundaProcessDefinitionDto, CamundaStartProcessInstanceDto, CamundaVariableValueDto, CamundaProcessInstanceWithVariablesDto,
   CamundaTaskDto, CamundaUserIdDto, CamundaTaskEscalationDto, CamundaPatchVariablesDto } from '@ng-camunda/core/src/lib/camunda-engine';
import { ProcessStartFormDefinition } from '../models/process-start-form-definition';
import { CamundaFormsConfiguration } from '../camunda-forms-configuration';
import { HttpClient } from '@angular/common/http';
import { FormioApiService } from './formio-api.service';
import {FormioUtils} from '@formio/angular';
import { ProcessTaskFormDefinition } from '../models/process-task-form-definition';


@Injectable({
  providedIn: 'root'
})
export class UserFormService {


  constructor(
    protected config: CamundaFormsConfiguration,
    protected http: HttpClient,
    private processDefinitionService:CamundaProcessDefinitionService,
    private formioService:FormioApiService,
    private camundaTaskService:CamundaTaskService,
    private camundaTaskVariableService:CamundaTaskVariableService,
    private camundaProcessInstanceService:CamundaProcessInstanceService

  ) { }

  claimTask(taskId:string,claimUser:string):Observable<CamundaTaskDto>{

    let user:CamundaUserIdDto={} as CamundaUserIdDto;
    user.userId=claimUser;
    let params={id:taskId,body:user};

    return this.camundaTaskService.claim(params).pipe(
      switchMap(res=>this.camundaTaskService.getTask({id:taskId}))
    )

  }

  getTaskFormDefinition(taskId:string):Observable<ProcessTaskFormDefinition>{

    let task = this.camundaTaskService.getTask({id:taskId})
    .pipe(
      map(result=>{
        if (this.isTaskValid(result)){
          return result;
        } else{
          throw new Error('Process-Definition invalid');
        }
      })
    );

    let formDefinition = task.pipe(
      catchError(err => {
              //console.log(err);
              throw new Error('Form-Definition konnte nicht vom Form-Server geladen werden');
            }
      ),
      switchMap(task => this.formioService.getFormDefinition(task.formKey.substr(this.config.formPrefix.length)))
    )

    let variables=this.camundaTaskVariableService.getTaskVariables({id:taskId,deserializeValues:false});
    return forkJoin(task,formDefinition,variables)
    .pipe(
        map(results => {
          let formDef:ProcessTaskFormDefinition={} as ProcessTaskFormDefinition;
          formDef.task=results[0];
          formDef.processVariables=results[2]
          formDef.formioDefinition=results[1];
          formDef.formKey=results[0].formKey;

          return formDef;
        })
    );

  }

  getStartFormDefinition(processDefId:string):Observable<ProcessStartFormDefinition>{


    let processDefinition=this.processDefinitionService.getProcessDefinition({id:processDefId})
    .pipe(
      map(result=>{
        if (this.isProcessDefinitionValid(result)){
          return result;
        } else{
          throw new Error('Process-Definition invalid');
        }
      })
    );
    let processDefinitionFormKey  = this.processDefinitionService.getStartForm({id:processDefId})
        .pipe(
          catchError(err => {
            //console.log(err);
            throw new Error('Process-Definition enthält keine Form-Referenz');
            }
          ),
          map(formKeyResult=>{
            if (formKeyResult.key.startsWith(this.config.formPrefix)){
              return formKeyResult.key.substr(this.config.formPrefix.length);
            }
            throw new Error('Process-Definition enthält keine gültige Form-Referenz');
          })
    );

    let formDefinition = processDefinitionFormKey.pipe(
      catchError(err => {
              //console.log(err);
              throw new Error('Form-Definition konnte nicht vom Form-Server geladen werden');
            }
      ),
      switchMap(formKey => this.formioService.getFormDefinition(formKey))
    )

    let startFormVariables=this.processDefinitionService.getStartFormVariables({id:processDefId});

    return forkJoin(processDefinition,processDefinitionFormKey,startFormVariables,formDefinition)
      .pipe(
        map(results => {
          let formDef:ProcessStartFormDefinition={} as ProcessStartFormDefinition;
          formDef.processDefinition=results[0];
          formDef.processVariables=results[2]
          formDef.formKey=results[1];
          formDef.formioDefinition=results[3];
          return formDef;
        })
    );

  }

  startProcessInstance(startFormDefinition:ProcessStartFormDefinition,formSubmission:any,businessKey?:string):Observable<CamundaProcessInstanceWithVariablesDto>{

    let dto:CamundaStartProcessInstanceDto={} as CamundaStartProcessInstanceDto;
    //get businesskey
    if(businessKey){
      dto.businessKey=businessKey
    } else{
      //look forbusinesskey in variables
      if(t(formSubmission,'businesskey').isString){
        dto.businessKey=formSubmission.businesskey;
      }
    }
    dto.variables=this.parseFormSubmission(startFormDefinition.formioDefinition,formSubmission);

    let param={id:startFormDefinition.processDefinition.id,body:dto};
    return this.processDefinitionService.startProcessInstance(param);
    //console.log(param);

  }

  escalateTask(task:CamundaTaskDto,escalationCode:string,formDefinition:any,formSubmission:any): Observable<void>{

    let body:CamundaTaskEscalationDto={} as CamundaTaskEscalationDto;
    body.escalationCode=escalationCode;
    body.variables=this.parseFormSubmission(formDefinition,formSubmission,"escalate_");
    let params ={id:task.id,body:body};
    return this.camundaTaskService.handleEscalation(params);

  }

  completeTask(task:CamundaTaskDto,formDefinition:any,formSubmission:any){
    let vars = this.parseFormSubmission(formDefinition,formSubmission);


    //the right way - predefine all variables in the process model. then it is possible to update those variables
    let params={id:task.id,body:vars};
    return this.camundaTaskService.complete(params);

    //hacky way - create all vars in process-instance
    //this requires authz for processinstance. too tricky or to insecure ;-)
    /*
    let updates:Array<Observable<void>>=[];
    //we have to set/update process variables first
    for (var procVariableName in vars) {
      let varParam={id:task.processInstanceId,varName:procVariableName,body:vars[procVariableName]};
      updates.push(this.camundaProcessInstanceService.setProcessInstanceVariable(varParam));
      //updates.push(this.camundaTaskVariableService.putTaskVariable(varParam));
    }

    //first update var, then complete task
    return concat(...updates).pipe(
      switchMap(nothing => this.camundaTaskService.complete(params))


    );
    */


  }

  saveTaskState(task:CamundaTaskDto,formDefinition:any,formSubmission:any){


    let vars = this.parseFormSubmission(formDefinition,formSubmission);


    //the right way - predefine all variables in the process model. then it is possible to set variables
    let body:CamundaPatchVariablesDto ={} as CamundaPatchVariablesDto;
    body.modifications=vars;

    let params ={id:task.id,body:body};
    return this.camundaTaskVariableService.modifyTaskVariables(params);


    //hacky way - this requires authz for processinstance. too tricky or to insecure ;-)
    //we have to update every var separately, camunda does not create new variables with "modify"

    /*
    let updates:Array<Observable<void>>=[];
    for (var procVariableName in vars) {
      let varParam={id:task.processInstanceId,varName:procVariableName,body:vars[procVariableName]};
      updates.push(this.camundaProcessInstanceService.setProcessInstanceVariable(varParam));
      //updates.push(this.camundaTaskVariableService.putTaskVariable(varParam));
    }

    return merge(...updates);
    */
  }

  //populate form-submission from process-variables
  //loop through proc-variables and find matching component
  parseProcessVariables(formDefinition:any,procVariables: CamundaVariableValueDto):any{

    let submission={  "data": { }};


    for (var procVariableName in procVariables) {
      //console.log(procVariableName);

      let component = FormioUtils.getComponent(formDefinition.components,procVariableName,true);
      if (component){
        //check type ?
        //console.log(component);
        let procVar=procVariables[procVariableName];
        if (t(procVar,'type').isString){

          switch(procVar.type){
            case "Json":
              submission.data[procVariableName]=JSON.parse(procVar.value);
            break;
            case "String":
            case "Date":
              submission.data[procVariableName]=procVar.value;
            break;
            case "Boolean":
              if (t(procVar.value).isTruthy){
                submission.data[procVariableName]=true;
              } else{
                submission.data[procVariableName]=false;
              }
            break;
            default:
              submission.data[procVariableName]=procVar.value;
          }
        }



      }


    }
    //console.log(submission);

    return submission;

  }

  private parseFormSubmission(formDefinition:any,formSubmission:any,varPrefix?:string):{ [key: string]: CamundaVariableValueDto }{

    //get variables
    let camundaVariables: { [key: string]: CamundaVariableValueDto }={};
    for (let submissionProp in formSubmission) {
      let camundaVarName=submissionProp;
      if (varPrefix){
        camundaVarName=varPrefix+submissionProp;
      }


      let component = FormioUtils.getComponent(formDefinition.components,submissionProp,true);
      if (component){

        if(component.type==="button"){
          continue;
        }
        if(!t(component,'persistent').isTruthy){
          continue;
        }
        if(t(component,'disabled').isTruthy){
          continue;
        }
        let variable:CamundaVariableValueDto={} as CamundaVariableValueDto;
        //type mapping
        if (t(formSubmission[submissionProp]).isString){
          variable.type="String";
          variable.value=formSubmission[submissionProp];

        } else if (t(formSubmission[submissionProp]).isDate){
          variable.type="Date";
          variable.value=formSubmission[submissionProp];
        } else if (t(formSubmission[submissionProp]).isBoolean){
          variable.type="Boolean";
          variable.value=formSubmission[submissionProp];
        } else if (t(formSubmission[submissionProp]).isNull){
          variable.type="Null";
          variable.value=null;
        } else if (t(formSubmission[submissionProp]).isObject){
          variable.type="Json";
          variable.value=JSON.stringify(formSubmission[submissionProp]);
        } else if (t(formSubmission[submissionProp]).isArray){
          variable.type="Json";
          variable.value=JSON.stringify(formSubmission[submissionProp]);
        } else if (t(formSubmission[submissionProp]).isNumber){
          variable.type="Integer";
          variable.value=formSubmission[submissionProp];
        } else{
          //this should not happen
          continue;
        }
        camundaVariables[camundaVarName]=variable;

      } else{
        //this should not happen

      }

    }
    return camundaVariables


  }


  private isProcessDefinitionValid(definition:CamundaProcessDefinitionDto):boolean{
    if (definition.suspended){
      return false;
    }
    if (!definition.startableInTasklist){
      return false;
    }
    return true;
  }

  private isTaskValid(task:CamundaTaskDto):boolean{
    if (task.suspended){
      return false;
    }
    if (!task.formKey.startsWith(this.config.formPrefix)){
      return false;
    }
    return true;

  }



/*
Was brauchen wir


Start-Form
- Processdefinition vorhanden?Startbar?
- Start-Formkey muss mit formio:beginnen
- Form-Variablen abfragen
- ggf spezial-konfiguration aus extension abfragen

Task allgemein
- Task vorhanden
- Formkey muss mit formio:beginnen
- variablen abfragen
- form readonly when nicht geclaimed

Form rendering
- Prozessvariablen auf formio-felder mappen (namen)
- ggf spezial mapping
- hidden fields z.. für JWT vordefinieren
- "laden" anzeige & fehler

*/
}
