import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CamundaFormsConfiguration, CamundaFormsConfigurationParams } from './camunda-forms-configuration';
import { HttpClient } from '@angular/common/http';
import {FormioApiService} from './services/formio-api.service';

import { FormioModule } from '@formio/angular';
import { CommonModule } from '@angular/common';

import { CustomComponentComponent } from './components/forms/custom-component.component';
import { registerCustomComponent } from './components/forms/custom-component.formio';
import { ProcessStartFormComponent } from './components/forms/process-start-form.component';
import { TaskFormComponent } from './components/forms/task-form.component';

@NgModule({
  declarations: [ProcessStartFormComponent,TaskFormComponent, CustomComponentComponent],
  providers: [
    FormioApiService
  ],
  imports: [
    FormioModule,CommonModule
  ],
  exports: [ProcessStartFormComponent,TaskFormComponent, CustomComponentComponent]
})
export class CamundaFormsModule {
  static forRoot(params: CamundaFormsConfigurationParams): ModuleWithProviders<CamundaFormsModule> {
    return {
      ngModule: CamundaFormsModule,
      providers: [
        {
          provide: CamundaFormsConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor(
    @Optional() @SkipSelf() parentModule: CamundaFormsModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('Camunda FormsModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}

