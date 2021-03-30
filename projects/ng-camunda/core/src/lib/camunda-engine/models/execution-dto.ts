/* tslint:disable */
/* eslint-disable */
export interface ExecutionDto {

  /**
   * Indicates if the execution is ended.
   */
  ended?: boolean;

  /**
   * The id of the Execution.
   */
  id?: string;

  /**
   * The id of the root of the execution tree representing the process instance.
   */
  processInstanceId?: string;

  /**
   * The id of the tenant this execution belongs to. Can be `null`
   * if the execution belongs to no single tenant.
   */
  tenantId?: string;
}
