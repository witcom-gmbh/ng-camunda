/* tslint:disable */
/* eslint-disable */
import { HistoricProcessInstanceQueryDto } from './historic-process-instance-query-dto';
import { ProcessInstanceQueryDto } from './process-instance-query-dto';
import { VariableValueDto } from './variable-value-dto';
export interface SetVariablesAsyncDto {
  historicProcessInstanceQuery?: HistoricProcessInstanceQueryDto;

  /**
   * A list of process instance ids that define a group of process instances
   * to which the operation will set variables.
   *
   * Please note that if `processInstanceIds`, `processInstanceQuery` and `historicProcessInstanceQuery`
   * are defined, the resulting operation will be performed on the union of these sets.
   */
  processInstanceIds?: Array<string>;
  processInstanceQuery?: ProcessInstanceQueryDto;

  /**
   * A variables the operation will set in the root scope of the process instances.
   */
  variables?: { [key: string]: VariableValueDto };
}
