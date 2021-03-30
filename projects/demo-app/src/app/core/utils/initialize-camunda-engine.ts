import{CamundaEngineConfiguration} from '@ng-camunda/core'
import{ApplicationConfigurationService} from'@demo-app/core/services';

export function initializeCamundaEngine(config: CamundaEngineConfiguration,configService:ApplicationConfigurationService): Function {
  return () => {
    config.rootUrl = configService.camundaEngineConfig.rootUrl;
    //config.formioRootUrl = configService.camundaTasksConfig.formioRootUrl;
  };
}
