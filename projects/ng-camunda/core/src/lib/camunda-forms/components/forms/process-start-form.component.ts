import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ProcessStartFormDefinition } from '../../models/process-start-form-definition';
import { UserFormService } from '../../services/user-form.service';
import { FormioApiService } from '../../services/formio-api.service';

import {FormioUtils} from '@formio/angular';
import { CamundaProcessInstanceWithVariablesDto } from '@ng-camunda/core/src/lib/camunda-engine';

@Component({
  selector: 'process-start-form',
  templateUrl: './process-start-form.component.html',
  styleUrls: ['./process-start-form.component.css']
})
export class ProcessStartFormComponent implements OnInit {

  formOptions:any={submitMessage: "",  disableAlerts: true,  noAlerts: true};
  currentForm:any;
  refreshForm:any;
  isLoading:boolean=true;
  submission:any;
  processStartFormDef:ProcessStartFormDefinition;
  formDefinition:any=null;
  @Input() processDefId:string;
  @Output() startSuccess: EventEmitter<CamundaProcessInstanceWithVariablesDto> = new EventEmitter();

  constructor(
    private userTaskFormService:UserFormService,
    private formioService:FormioApiService

  ) { }

  ngOnInit(): void {
    if (this.processDefId){
      this.userTaskFormService.getStartFormDefinition(this.processDefId).subscribe(form => {
        //console.log(form.formioDefinition);
        this.processStartFormDef=form;
        this.formDefinition=form.formioDefinition;
        console.log("here");
        this.isLoading=false;
      });
      this.refreshForm = new EventEmitter();
    }
  }

  // ready function
  ready(event){
    this.currentForm = event.formio;

  }

  onSubmit(submission: any) {
    console.log(submission); // This will print out the full submission from Form.io API.
    //console.log(this.formDefinition.components);
    this.userTaskFormService.startProcessInstance(this.processStartFormDef,submission).subscribe(res => {
      this.currentForm.emit('submitDone');
      this.startSuccess.emit(res);

    },error=>{
      console.log(error);
      this.currentForm.emit('submitError');

    });



  }

  onEvent(event):void{
    console.log(event);
    /*
    let action = FormioUtils.getComponent(this.formDefinition.components,"submit",true);
    console.log(action);
    action.disabled=true;
    */

    if(event.component.event=="submit-form"){
      this.onSubmitProcess(event);

    }


  }

  onSubmitProcess(event):void{
        //let action = this.formioService.findComponentByKey(this.formDefinition.components,event.component.key);
        let action = FormioUtils.getComponent(this.formDefinition.components,event.component.key,true);
        action.disabled="true";

        console.log(this.formDefinition.components);
        this.refreshForm.emit({
          form: this.formDefinition
        });



        console.log(this.submission);


  }


}
