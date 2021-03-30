import { Injectable, OnDestroy } from '@angular/core';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, share, retry, takeUntil,filter, map } from 'rxjs/operators';
import { CamundaTaskService } from '@ng-camunda/core/src/lib/camunda-engine';
import { CamundaTaskDto, CamundaUserIdDto } from '@ng-camunda/core/src/lib/camunda-engine';
//import { CamundaEngineConfiguration } from '@ng-camunda/core/src/lib/camunda-engine';
import { CamundaFormsConfiguration } from '@ng-camunda/core/src/lib/camunda-forms';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  private stopPolling = new Subject();
  private assignedTasks$ =new Observable<CamundaTaskDto[]>();
  private allTasks$ =new Observable<CamundaTaskDto[]>();

  constructor(
    protected config: CamundaFormsConfiguration,
    private camundaTaskService:CamundaTaskService
  ) {
    //this.allTasksPoller();
    //this.assignedTasksPoller();

   }

  claimTask(taskId:string,claimUser:string):Observable<CamundaTaskDto>{

    let user:CamundaUserIdDto={} as CamundaUserIdDto;
    user.userId=claimUser;
    let params={id:taskId,body:user};

    return this.camundaTaskService.claim(params).pipe(
      switchMap(res=>this.camundaTaskService.getTask({id:taskId}))
    )

  }

  startPoller(me:string){
    //this.stopPolling.next();
    this.startAllTasksPoller();
    this.startAssignedTasksPoller(me);
  }


  private startAllTasksPoller(){

    let params={};

    this.allTasks$ = timer(1, 3000).pipe(
       switchMap(() => this.camundaTaskService.getTasks(params)),
       map(tasks => tasks.filter(item=>item.formKey.startsWith(this.config.formPrefix))),
       retry(),
       share(),
       takeUntil(this.stopPolling)
    );


  }

  private startAssignedTasksPoller(me:string){

    let params={assignee:me};

    this.assignedTasks$ = timer(1, 3000).pipe(
       switchMap(() => this.camundaTaskService.getTasks(params)),
       map(tasks => tasks.filter(item=>item.formKey.startsWith(this.config.formPrefix))),
       retry(),
       share(),
       takeUntil(this.stopPolling)
    );

  }

  getAssignedTasks():Observable<CamundaTaskDto[]>{
    return this.assignedTasks$;
  }

  getAllTasks():Observable<CamundaTaskDto[]>{
    return this.allTasks$;
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }

}
