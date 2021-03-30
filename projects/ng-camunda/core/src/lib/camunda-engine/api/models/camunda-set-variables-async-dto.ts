/* tslint:disable */
/* eslint-disable */
import { CamundaHistoricProcessInstanceQueryDto } from './camunda-historic-process-instance-query-dto';
import { CamundaProcessInstanceQueryDto } from './camunda-process-instance-query-dto';
import { CamundaVariableValueDto } from './camunda-variable-value-dto';
export interface CamundaSetVariablesAsyncDto {
  historicProcessInstanceQuery?: CamundaHistoricProcessInstanceQueryDto;

  /**
   * A list of process instance ids that define a group of process instances
   * to which the operation will set variables.
   *
   * Please note that if `processInstanceIds`, `processInstanceQuery` and `historicProcessInstanceQuery`
   * are defined, the resulting operation will be performed on the union of these sets.
   */
  processInstanceIds?: Array<string>;
  processInstanceQuery?: CamundaProcessInstanceQueryDto;

  /**
   * A variables the operation will set in the root scope of the process instances.
   */
  variables?: { [key: string]: CamundaVariableValueDto };
}
