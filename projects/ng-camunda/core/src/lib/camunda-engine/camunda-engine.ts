/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CamundaEngineConfiguration, CamundaEngineConfigurationParams } from './camunda-engine-configuration';

import { CamundaConditionService } from './services/camunda-condition.service';
import { CamundaDeploymentService } from './services/camunda-deployment.service';
import { CamundaEngineService } from './services/camunda-engine.service';
import { CamundaEventSubscriptionService } from './services/camunda-event-subscription.service';
import { CamundaExternalTaskService } from './services/camunda-external-task.service';
import { CamundaHistoricActivityInstanceService } from './services/camunda-historic-activity-instance.service';
import { CamundaHistoricProcessInstanceService } from './services/camunda-historic-process-instance.service';
import { CamundaIncidentService } from './services/camunda-incident.service';
import { CamundaMessageService } from './services/camunda-message.service';
import { CamundaMetricsService } from './services/camunda-metrics.service';
import { CamundaProcessDefinitionService } from './services/camunda-process-definition.service';
import { CamundaProcessInstanceService } from './services/camunda-process-instance.service';
import { CamundaSchemaLogService } from './services/camunda-schema-log.service';
import { CamundaSignalService } from './services/camunda-signal.service';
import { CamundaTaskService } from './services/camunda-task.service';
import { CamundaTaskAttachmentService } from './services/camunda-task-attachment.service';
import { CamundaTaskCommentService } from './services/camunda-task-comment.service';
import { CamundaTaskIdentityLinkService } from './services/camunda-task-identity-link.service';
import { CamundaTaskLocalVariableService } from './services/camunda-task-local-variable.service';
import { CamundaTaskVariableService } from './services/camunda-task-variable.service';
import { CamundaTelemetryService } from './services/camunda-telemetry.service';
import { CamundaUserService } from './services/camunda-user.service';
import { CamundaVersionService } from './services/camunda-version.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    CamundaConditionService,
    CamundaDeploymentService,
    CamundaEngineService,
    CamundaEventSubscriptionService,
    CamundaExternalTaskService,
    CamundaHistoricActivityInstanceService,
    CamundaHistoricProcessInstanceService,
    CamundaIncidentService,
    CamundaMessageService,
    CamundaMetricsService,
    CamundaProcessDefinitionService,
    CamundaProcessInstanceService,
    CamundaSchemaLogService,
    CamundaSignalService,
    CamundaTaskService,
    CamundaTaskAttachmentService,
    CamundaTaskCommentService,
    CamundaTaskIdentityLinkService,
    CamundaTaskLocalVariableService,
    CamundaTaskVariableService,
    CamundaTelemetryService,
    CamundaUserService,
    CamundaVersionService,
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
