/* tslint:disable */
/* eslint-disable */
export interface CamundaCaseDefinitionDto {

  /**
   * The category of the case definition.
   */
  category?: string;

  /**
   * The deployment id of the case definition.
   */
  deploymentId?: string;

  /**
   * History time to live value of the case definition.
   * Is used within [History cleanup](https://docs.camunda.org/manual/7.14/user-guide/process-engine/history/#history-cleanup).
   */
  historyTimeToLive?: null | number;

  /**
   * The id of the case definition
   */
  id?: string;

  /**
   * The key of the case definition, i.e., the id of the CMMN 2.0 XML case definition.
   */
  key?: string;

  /**
   * The name of the case definition.
   */
  name?: string;

  /**
   * The file name of the case definition.
   */
  resource?: string;

  /**
   * The tenant id of the case definition.
   */
  tenantId?: string;

  /**
   * The version of the case definition that the engine assigned to it.
   */
  version?: number;
}
