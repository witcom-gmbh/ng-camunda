/* tslint:disable */
/* eslint-disable */
import { CamundaHistoricProcessInstanceQueryDto } from './camunda-historic-process-instance-query-dto';
import { CamundaProcessInstanceQueryDto } from './camunda-process-instance-query-dto';
export interface CamundaSetJobRetriesByProcessDto {
  historicProcessInstanceQuery?: CamundaHistoricProcessInstanceQueryDto;
  processInstanceQuery?: CamundaProcessInstanceQueryDto;

  /**
   * A list of process instance ids to fetch jobs, for which retries will be set.
   */
  processInstances?: Array<string>;

  /**
   * An integer representing the number of retries. Please note that the value cannot be negative or null.
   */
  retries?: null | number;
}
