/* tslint:disable */
/* eslint-disable */
export interface CamundaProcessDefinitionDto {

  /**
   * The category of the process definition.
   */
  category?: string;

  /**
   * The deployment id of the process definition.
   */
  deploymentId?: string;

  /**
   * The description of the process definition.
   */
  description?: string;

  /**
   * The file name of the process definition diagram, if it exists.
   */
  diagram?: string;

  /**
   * History time to live value of the process definition.
   * Is used within [History cleanup](https://docs.camunda.org/manual/7.14/user-guide/process-engine/history/#history-cleanup).
   */
  historyTimeToLive?: null | number;

  /**
   * The id of the process definition
   */
  id?: string;

  /**
   * The key of the process definition, i.e., the id of the BPMN 2.0 XML process definition.
   */
  key?: string;

  /**
   * The name of the process definition.
   */
  name?: string;

  /**
   * The file name of the process definition.
   */
  resource?: string;

  /**
   * A flag indicating whether the process definition is startable in Tasklist or not.
   */
  startableInTasklist?: boolean;

  /**
   * A flag indicating whether the definition is suspended or not.
   */
  suspended?: boolean;

  /**
   * The tenant id of the process definition.
   */
  tenantId?: string;

  /**
   * The version of the process definition that the engine assigned to it.
   */
  version?: number;

  /**
   * The version tag of the process definition.
   */
  versionTag?: string;
}
