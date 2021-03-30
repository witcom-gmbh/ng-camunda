/* tslint:disable */
/* eslint-disable */
import { CamundaLinkableDto } from './camunda-linkable-dto';
export interface CamundaDeploymentDto extends CamundaLinkableDto {

  /**
   * The time when the deployment was created.
   */
  deploymentTime?: string;

  /**
   * The id of the deployment.
   */
  id?: string;

  /**
   * The name of the deployment.
   */
  name?: string;

  /**
   * The source of the deployment.
   */
  source?: string;

  /**
   * The tenant id of the deployment.
   */
  tenantId?: string;
}
