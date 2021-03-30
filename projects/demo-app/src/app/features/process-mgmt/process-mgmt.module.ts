import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CamundaEngine} from '@ng-camunda/core';
import { ProcessCatalogComponent } from './components/process-catalog.component';
import { ProcessCardComponent } from './components/process-card.component';
import { ProcessStartComponent } from './components/process-start.component';
import { SimpleTaskListComponent } from './components/simple-task-list.component';
export { ProcessCatalogComponent } from './components/process-catalog.component';
//import { AvatarModule } from 'ngx-avatar';
//Shared stuff
import { SharedModule } from '@demo-app/shared/shared.module';


@NgModule({
  declarations: [ProcessCatalogComponent, ProcessCardComponent, ProcessStartComponent, SimpleTaskListComponent],
  imports: [
    CommonModule,
    NgbModule,
    //AvatarModule,
    SharedModule,
    CamundaEngine
  ],
  exports:[ProcessCatalogComponent,ProcessCardComponent, ProcessStartComponent, SimpleTaskListComponent]
})
export class ProcessMgmtModule { }
