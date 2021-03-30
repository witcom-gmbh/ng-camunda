/* tslint:disable */
/* eslint-disable */
import { HistoricProcessInstanceQueryDto } from './historic-process-instance-query-dto';
import { ProcessInstanceQueryDto } from './process-instance-query-dto';
export interface DeleteProcessInstancesDto {

  /**
   * A string with delete reason.
   */
  deleteReason?: string;
  historicProcessInstanceQuery?: HistoricProcessInstanceQueryDto;

  /**
   * A list process instance ids to delete.
   */
  processInstanceIds?: Array<string>;
  processInstanceQuery?: ProcessInstanceQueryDto;

  /**
   * Skip execution listener invocation for activities that are started or ended as part of this request.
   */
  skipCustomListeners?: null | boolean;

  /**
   * Skip deletion of the subprocesses related to deleted processes as part of this request.
   */
  skipSubprocesses?: null | boolean;
}
