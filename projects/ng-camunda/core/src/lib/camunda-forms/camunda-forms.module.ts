import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CamundaFormsConfiguration, CamundaFormsConfigurationParams } from './camunda-forms-configuration';
import { HttpClient } from '@angular/common/http';
import {FormioApiService} from './services/formio-api.service';


@NgModule({
  declarations: [],
  providers: [
    FormioApiService
  ],
  imports: [
  ],
  exports: []
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

