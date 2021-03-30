import { Component, OnInit } from '@angular/core';
import { CamundaProcessDefinitionService } from '@ng-camunda/core';
import { CamundaProcessDefinitionDto } from '@ng-camunda/core';

@Component({
  selector: 'process-catalog',
  templateUrl: './process-catalog.component.html',
  styleUrls: ['./process-catalog.component.css']
})
export class ProcessCatalogComponent implements OnInit {

  processDefinitions:CamundaProcessDefinitionDto[];

  constructor(
    private processDefinitionService:CamundaProcessDefinitionService
  ) { }

  ngOnInit(): void {

    let params:any={latestVersion:true,startableInTasklist:true,active:true};

    this.processDefinitionService.getProcessDefinitions(params).subscribe(response => {
      this.processDefinitions=response;
      console.log(response);
    });

  }

}
