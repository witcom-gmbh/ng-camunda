/* tslint:disable */
/* eslint-disable */
export interface MultiFormDeploymentDto {

  /**
   * The binary data to create the deployment resource.
   * It is possible to have more than one form part with different form part names for the binary data to create a deployment.
   */
  data?: null | Blob;

  /**
   * A flag indicating whether the process engine should perform duplicate checking on a per-resource basis.
   * If set to true, only those resources that have actually changed are deployed.
   * Checks are made against resources included previous deployments of the same name and only against the latest versions of those resources.
   * If set to true, the option enable-duplicate-filtering is overridden and set to true.
   */
  'deploy-changed-only'?: null | boolean;

  /**
   * The name for the deployment to be created.
   */
  'deployment-name'?: string;

  /**
   * The source for the deployment to be created.
   */
  'deployment-source'?: string;

  /**
   * A flag indicating whether the process engine should perform duplicate checking for the deployment or not.
   * This allows you to check if a deployment with the same name and the same resouces already exists and
   * if true, not create a new deployment but instead return the existing deployment. The default value is false.
   */
  'enable-duplicate-filtering'?: null | boolean;

  /**
   * The tenant id for the deployment to be created.
   */
  'tenant-id'?: string;
}
