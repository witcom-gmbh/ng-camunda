/* tslint:disable */
/* eslint-disable */
import { HistoricProcessInstanceQueryDto } from './historic-process-instance-query-dto';
import { ProcessInstanceQueryDto } from './process-instance-query-dto';
export interface ProcessInstanceSuspensionStateDto {
  historicProcessInstanceQuery?: HistoricProcessInstanceQueryDto;

  /**
   * The process definition id of the process instances to activate or suspend.
   *
   * **Note**: This parameter can be used only with combination of `suspended`.
   */
  processDefinitionId?: string;

  /**
   * The process definition key of the process instances to activate or suspend.
   *
   * **Note**: This parameter can be used only with combination of `suspended`, `processDefinitionTenantId`, and `processDefinitionWithoutTenantId`.
   */
  processDefinitionKey?: string;

  /**
   * Only activate or suspend process instances of a process definition which belongs to a tenant with the given id.
   *
   * **Note**: This parameter can be used only with combination of `suspended`, `processDefinitionKey`, and `processDefinitionWithoutTenantId`.
   */
  processDefinitionTenantId?: string;

  /**
   * Only activate or suspend process instances of a process definition which belongs to no tenant.
   * Value may only be true, as false is the default behavior.
   *
   * **Note**: This parameter can be used only with combination of `suspended`, `processDefinitionKey`, and `processDefinitionTenantId`.
   */
  processDefinitionWithoutTenantId?: null | boolean;

  /**
   * A list of process instance ids which defines a group of process instances
   * which will be activated or suspended by the operation.
   *
   * **Note**: This parameter can be used only with combination of `suspended`, `processInstanceQuery`, and `historicProcessInstanceQuery`.
   */
  processInstanceIds?: Array<string>;
  processInstanceQuery?: ProcessInstanceQueryDto;

  /**
   * A `Boolean` value which indicates whether to activate or suspend a given process instance.
   * When the value is set to `true`, the given process instance will be suspended and when the value is set to `false`,
   * the given process instance will be activated.
   */
  suspended?: null | boolean;
}
