import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CamundaFormsConfiguration, CamundaFormsConfigurationParams } from './camunda-forms-configuration';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class FormsModule {
  static forRoot(params: CamundaFormsConfigurationParams): ModuleWithProviders<FormsModule> {
    return {
      ngModule: FormsModule,
      providers: [
        {
          provide: CamundaFormsConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor(
    @Optional() @SkipSelf() parentModule: FormsModule,
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

