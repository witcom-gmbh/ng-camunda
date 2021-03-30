import { Component, OnInit } from '@angular/core';
import { TaskListService, CamundaTaskDto } from '@ng-camunda-tasks/core';
import { Observable } from 'rxjs';
import t from 'typy';
import { AlertService } from '@full-fledged/alerts';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-simple-task-list',
  templateUrl: './simple-task-list.component.html',
  styleUrls: ['./simple-task-list.component.css']
})
export class SimpleTaskListComponent implements OnInit {

  private currentUser=null;

  allTasks:CamundaTaskDto[];
  assignedTasks:CamundaTaskDto[];
  selectedTask:CamundaTaskDto=null;
  showTaskView:boolean=false;
  showAssignedTaskView:boolean=false;

  //saveSuccess: EventEmitter<void>;

  constructor(
    private taskListService:TaskListService,
    private alertService: AlertService,
    private readonly keycloak: KeycloakService
  ) { }

  ngOnInit(): void {


    this.keycloak.isLoggedIn().then(res => {
      if (res){
        this.keycloak.loadUserProfile().then(profile => {
          this.currentUser=profile.username;
          console.log("i am",this.currentUser);
          this.taskListService.startPoller(this.currentUser);
          const allTasksSubscriber = this.taskListService.getAllTasks().subscribe(tasks=>{
            //console.log(tasks);
            if (this.selectedTask){
              let selectedTaskPresent=tasks.filter(t => t.id===this.selectedTask.id);
              //console.log(selectedTaskPresent);
              if (selectedTaskPresent.length==0){
                this.selectedTask=null;
              }
            }

            this.allTasks=tasks;

          },error=>{
            console.log('Error Getting tasks: ', error);

          });
        })
      }
    });

    //this.allTasks=this.taskListService.getAllTasks();






  }

  trackTask(index: number, task: CamundaTaskDto) {
    return task.id;
  }

  isMyTask():boolean{
    if(!this.selectedTask)return false;
    if(this.selectedTask.assignee==this.currentUser){
      return true;
    }

    return false;

  }

  claimTask(taskId:string){

    this.taskListService.claimTask(taskId,this.currentUser).subscribe(task=>{
      this.selectedTask=task;
      this.viewTask(task);
    })
  }

  onTaskClaim(task:CamundaTaskDto){
    console.log(task);
    this.selectedTask=task;
    this.viewTask(task);

  }

  taskStateSaved(event:any){
    this.alertService.success("Aufgabe wurde gespeichert");
    //console.log(event);

  }

  completeSuccess(event:any){
    //console.log(event);
    this.selectedTask=null;
    this.alertService.success("Aufgabe wurde abgeschlossen");
  }

  escalateSuccess(event:any){

    this.alertService.success("Vorgang wurde gestartet");
  }

  viewTask(task:CamundaTaskDto){
    //console.log(taskId);
    //this.showAssignedTaskView=false;
    this.selectedTask=task;
    this.showTaskView=true;

  }

}
