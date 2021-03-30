import { Component, OnInit } from '@angular/core';
import { CamundaProcessDefinitionService, CamundaProcessInstanceWithVariablesDto } from '@ng-camunda/core';
import { CamundaProcessDefinitionDto } from '@ng-camunda/core';
import { AlertService } from '@full-fledged/alerts';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-process-start',
  templateUrl: './process-start.component.html',
  styleUrls: ['./process-start.component.css']
})
export class ProcessStartComponent implements OnInit {

  processDefId:string;
  showForm:boolean=true;

  constructor(
    private processDefinitionService:CamundaProcessDefinitionService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    //private location: Location
  ) { }

  ngOnInit(): void {
    this.processDefId = this.route.snapshot.paramMap.get('id');
    /*
    this.processDefinitionService.getProcessDefinition({id:this.processDefId}).subscribe(processDef => {

    })
    */
  }
  onStartSuccess(instance:CamundaProcessInstanceWithVariablesDto):void{
    console.log(instance);
  }

}
