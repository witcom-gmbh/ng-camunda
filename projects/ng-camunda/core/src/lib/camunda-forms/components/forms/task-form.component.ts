import { Component, OnInit , Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { UserFormService } from '../../services/user-form.service';
import { FormioApiService } from '../../services/formio-api.service';
import {FormioUtils} from '@formio/angular';
import { ProcessTaskFormDefinition } from '../../models/process-task-form-definition';
import t from 'typy';
import { CamundaCompleteTaskDto, CamundaTaskDto } from '@ng-camunda/core/src/lib/camunda-engine';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() taskId:string;
  task:CamundaTaskDto;
  formOptions:any={submitMessage: "",  disableAlerts: true,  noAlerts: true};
  formDefinition:any;
  currentForm:any;
  refreshForm:any;
  submission:any;
  @Input() readOnly:boolean=true;
  @Output() saveSuccess: EventEmitter<void> = new EventEmitter();
  @Output() completeSuccess:EventEmitter<CamundaCompleteTaskDto>= new EventEmitter();
  @Output() escalateSuccess: EventEmitter<void> = new EventEmitter();


  constructor(
    private userFormService:UserFormService,
    private formioService:FormioApiService,

  ) { }

  ngOnInit(): void {

      this.renderForm();
      this.refreshForm = new EventEmitter();

  }
  ngOnChanges(changes: SimpleChanges) {
    if (!t(changes,'taskId').isUndefined){
      this.taskId=changes.taskId.currentValue;
      this.renderForm();
    }
    if (!t(changes,'readOnly').isUndefined){
      this.readOnly=changes.readOnly.currentValue;
      this.renderForm();
    }

  }

  private renderForm(){
    if (this.taskId){
      this.userFormService.getTaskFormDefinition(this.taskId).subscribe(form => {
            //console.log(form);
            this.task=form.task;
            this.submission=this.userFormService.parseProcessVariables(form.formioDefinition,form.processVariables);
            //console.log(this.submission);

            this.formDefinition=form.formioDefinition;
      })
    }

  }

  ready(event){
    this.currentForm = event.formio;
  }

  onSubmit(submission: any) {
    console.log(submission);
    this.userFormService.completeTask(this.task,this.formDefinition,submission).subscribe(res => {
      this.currentForm.emit('submitDone');
      this.completeSuccess.emit(res);

    },error=>{
      console.log(error);
      this.currentForm.emit('submitError');

    });



  }

  onEvent(event):void{
    console.log(event);
    switch (event.type){
      case "save-form":
        this.saveTaskState(event.data);
      break;
      case "escalation-non-interrupting":
        this.escalateTask(event);
      break;
    }


  }

  private escalateTask(event:any){
    if(t(event,'component.properties.escalationCode').isString){
      let code =event.component.properties.escalationCode;
      this.userFormService.escalateTask(this.task,code,this.formDefinition,this.submission.data).subscribe(res=>{
        this.escalateSuccess.emit();
      });

    }else{
      //error handling

    }

  }

private saveTaskState(data:any){
  this.userFormService.saveTaskState(this.task,this.formDefinition,data).subscribe(res=>{
    this.saveSuccess.emit();

  },err =>{
    //some error logic

  });


}


}
