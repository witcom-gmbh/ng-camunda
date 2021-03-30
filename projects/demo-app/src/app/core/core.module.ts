import { NgModule,forwardRef,Provider, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { ApiInterceptor } from './interceptors/api.interceptor';

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

@NgModule({
  declarations: [],
  providers: [
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
