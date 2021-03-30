/* tslint:disable */
/* eslint-disable */

/**
 * A JSON object with the following properties:
 */
export interface RedeploymentDto {

  /**
   * A list of deployment resource ids to re-deploy.
   */
  resourceIds?: Array<string>;

  /**
   * A list of deployment resource names to re-deploy.
   */
  resourceNames?: Array<string>;

  /**
   * Sets the source of the deployment.
   */
  source?: string;
}
