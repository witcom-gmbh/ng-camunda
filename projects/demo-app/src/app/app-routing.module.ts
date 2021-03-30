import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ProcessCatalogComponent}from'@demo-app/features/process-mgmt/process-mgmt.module';
import { ProcessStartComponent } from './features/process-mgmt/components/process-start.component';
import { SimpleTaskListComponent } from './features/process-mgmt/components/simple-task-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/prozesse', pathMatch: 'full' },
    { path: 'prozesse', component: ProcessCatalogComponent },
    { path: 'prozesse/start/:id', component: ProcessStartComponent},
    { path: 'tasks', component: SimpleTaskListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
