/* tslint:disable */
/* eslint-disable */
import { AbstractSetRemovalTimeDto } from './abstract-set-removal-time-dto';
import { HistoricProcessInstanceQueryDto } from './historic-process-instance-query-dto';
export interface SetRemovalTimeToHistoricProcessInstancesDto extends AbstractSetRemovalTimeDto {

  /**
   * Sets the removal time to all historic process instances in the hierarchy.
   * Value may only be `true`, as `false` is the default behavior.
   */
  hierarchical?: null | boolean;

  /**
   * The id of the process instance.
   */
  historicProcessInstanceIds?: Array<string>;
  historicProcessInstanceQuery?: HistoricProcessInstanceQueryDto;
}
