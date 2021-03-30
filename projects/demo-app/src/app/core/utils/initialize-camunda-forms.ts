import{CamundaFormsConfiguration} from '@ng-camunda/core'
import{ApplicationConfigurationService} from'@demo-app/core/services';

export function initializeCamundaForms(config: CamundaFormsConfiguration,configService:ApplicationConfigurationService): Function {
  return () => {
    config.formioRootUrl = configService.camundaFormsConfig.formioRootUrl;
  };
}
