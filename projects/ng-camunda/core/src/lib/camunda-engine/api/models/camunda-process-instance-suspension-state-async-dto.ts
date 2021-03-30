/* tslint:disable */
/* eslint-disable */
import { CamundaHistoricProcessInstanceQueryDto } from './camunda-historic-process-instance-query-dto';
import { CamundaProcessInstanceQueryDto } from './camunda-process-instance-query-dto';
export interface CamundaProcessInstanceSuspensionStateAsyncDto {
  historicProcessInstanceQuery?: CamundaHistoricProcessInstanceQueryDto;

  /**
   * A list of process instance ids which defines a group of process instances
   * which will be activated or suspended by the operation.
   */
  processInstanceIds?: Array<string>;
  processInstanceQuery?: CamundaProcessInstanceQueryDto;

  /**
   * A Boolean value which indicates whether to activate or suspend a given process instance.
   * When the value is set to true, the given process instance will be suspended and when the value is set to false,
   * the given process instance will be activated.
   */
  suspended?: null | boolean;
}
