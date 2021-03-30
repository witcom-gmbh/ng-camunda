/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CamundaEngineConfiguration, CamundaEngineConfigurationParams } from './camunda-engine-configuration';

import { ConditionService } from './services/condition.service';
import { DeploymentService } from './services/deployment.service';
import { EngineService } from './services/engine.service';
import { EventSubscriptionService } from './services/event-subscription.service';
import { ExternalTaskService } from './services/external-task.service';
import { HistoricActivityInstanceService } from './services/historic-activity-instance.service';
import { HistoricProcessInstanceService } from './services/historic-process-instance.service';
import { IncidentService } from './services/incident.service';
import { MessageService } from './services/message.service';
import { MetricsService } from './services/metrics.service';
import { ProcessDefinitionService } from './services/process-definition.service';
import { ProcessInstanceService } from './services/process-instance.service';
import { SchemaLogService } from './services/schema-log.service';
import { SignalService } from './services/signal.service';
import { TaskService } from './services/task.service';
import { TaskAttachmentService } from './services/task-attachment.service';
import { TaskCommentService } from './services/task-comment.service';
import { TaskIdentityLinkService } from './services/task-identity-link.service';
import { TaskLocalVariableService } from './services/task-local-variable.service';
import { TaskVariableService } from './services/task-variable.service';
import { TelemetryService } from './services/telemetry.service';
import { UserService } from './services/user.service';
import { VersionService } from './services/version.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ConditionService,
    DeploymentService,
    EngineService,
    EventSubscriptionService,
    ExternalTaskService,
    HistoricActivityInstanceService,
    HistoricProcessInstanceService,
    IncidentService,
    MessageService,
    MetricsService,
    ProcessDefinitionService,
    ProcessInstanceService,
    SchemaLogService,
    SignalService,
    TaskService,
    TaskAttachmentService,
    TaskCommentService,
    TaskIdentityLinkService,
    TaskLocalVariableService,
    TaskVariableService,
    TelemetryService,
    UserService,
    VersionService,
    CamundaEngineConfiguration
  ],
})
export class CamundaEngine {
  static forRoot(params: CamundaEngineConfigurationParams): ModuleWithProviders<CamundaEngine> {
    return {
      ngModule: CamundaEngine,
      providers: [
        {
          provide: CamundaEngineConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: CamundaEngine,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('CamundaEngine is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
