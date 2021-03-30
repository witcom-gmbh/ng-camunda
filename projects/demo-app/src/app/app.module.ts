import { NgModule, APP_INITIALIZER,Provider,InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {environment} from '@demo-app/env/environment';


import { AlertModule,AlertService } from '@full-fledged/alerts';
import { LoggerModule, LoggerConfig, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {CamundaEngineConfiguration,CamundaFormsConfiguration,CamundaEngine} from '@ng-camunda/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import{ApplicationConfigurationService} from '@demo-app/core/services';

import {ApplicationConfigProvider,initializeCamundaForms,initializeCamundaEngine,initializeKeycloak} from '@demo-app/core/utils';

//core
import {CoreModule} from '@demo-app/core/core.module'

//Shared stuff
import { SharedModule } from '@demo-app/shared/shared.module';

//Features
import {ProcessMgmtModule} from '@demo-app/features/process-mgmt/process-mgmt.module';


//Application config
export const ConfigDeps = new InjectionToken<(() => Function)[]>('configDeps');
export const CONFIG_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: ApplicationConfigProvider,
  multi: true,
  deps: [ApplicationConfigurationService, AlertService, ConfigDeps]
};

export function dependencyFactory(
  kcService: KeycloakService,
  configService: ApplicationConfigurationService,
  engineConfig: CamundaEngineConfiguration,
  formsConfig: CamundaFormsConfiguration): any {
  return [
    initializeKeycloak(kcService, configService),
    initializeCamundaEngine(engineConfig, configService),
    initializeCamundaForms(formsConfig, configService)
  ];
}

export const CONFIG_DEPENDENCIES: Provider = {
  provide: ConfigDeps,
  useFactory: dependencyFactory,
  deps: [KeycloakService,ApplicationConfigurationService, CamundaEngineConfiguration,CamundaFormsConfiguration, AlertService]
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    CamundaEngine,
    CoreModule,
    SharedModule,
    ProcessMgmtModule,
    NgbModule,

    LoggerModule.forRoot(environment.loggerConfig),
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right'})
  ],
  providers: [CONFIG_PROVIDER, CONFIG_DEPENDENCIES],
  bootstrap: [AppComponent]
})
export class AppModule { }
