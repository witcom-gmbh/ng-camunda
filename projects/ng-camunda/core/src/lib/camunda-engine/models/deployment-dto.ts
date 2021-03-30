/* tslint:disable */
/* eslint-disable */
import { LinkableDto } from './linkable-dto';
export interface DeploymentDto extends LinkableDto {

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
