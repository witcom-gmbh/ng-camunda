/* tslint:disable */
/* eslint-disable */
import { HistoricProcessInstanceQueryDto } from './historic-process-instance-query-dto';
import { ProcessInstanceQueryDto } from './process-instance-query-dto';
export interface SetJobRetriesByProcessDto {
  historicProcessInstanceQuery?: HistoricProcessInstanceQueryDto;
  processInstanceQuery?: ProcessInstanceQueryDto;

  /**
   * A list of process instance ids to fetch jobs, for which retries will be set.
   */
  processInstances?: Array<string>;

  /**
   * An integer representing the number of retries. Please note that the value cannot be negative or null.
   */
  retries?: null | number;
}
