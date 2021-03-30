import { Component, OnInit,Input } from '@angular/core';
import t from 'typy';
import { Router } from "@angular/router";
import { NGXLogger } from 'ngx-logger';
import { AlertService } from '@full-fledged/alerts';
import {Subscription} from 'rxjs';
import { Observable,throwError,of  } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CamundaProcessDefinitionService, UserFormService } from '@ng-camunda/core';
import { CamundaProcessDefinitionDto } from '@ng-camunda/core';

@Component({
  selector: 'process-card',
  templateUrl: './process-card.component.html',
  styleUrls: ['./process-card.component.css']
})
export class ProcessCardComponent implements OnInit {

  isLoading:boolean=true;
  @Input() processDefinition:CamundaProcessDefinitionDto;

  constructor(
        private logger: NGXLogger,
        private alertService: AlertService,
        private processDefinitionService:CamundaProcessDefinitionService,
        private userTaskFormService:UserFormService,
        private router: Router

  ) { }

  ngOnInit(): void {

  }

  testForm():void{
    this.userTaskFormService.getStartFormDefinition(this.processDefinition.id).subscribe(res=>{
      this.logger.info(res);
      this.router.navigate(['/prozesse/start', this.processDefinition.id]).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
      });

    },err=>{
      this.alertService.danger(err);
    })


  }

}
