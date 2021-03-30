/* tslint:disable */
/* eslint-disable */
import { CamundaHistoricProcessInstanceQueryDto } from './camunda-historic-process-instance-query-dto';
import { CamundaProcessInstanceQueryDto } from './camunda-process-instance-query-dto';
export interface CamundaDeleteProcessInstancesDto {

  /**
   * A string with delete reason.
   */
  deleteReason?: string;
  historicProcessInstanceQuery?: CamundaHistoricProcessInstanceQueryDto;

  /**
   * A list process instance ids to delete.
   */
  processInstanceIds?: Array<string>;
  processInstanceQuery?: CamundaProcessInstanceQueryDto;

  /**
   * Skip execution listener invocation for activities that are started or ended as part of this request.
   */
  skipCustomListeners?: null | boolean;

  /**
   * Skip deletion of the subprocesses related to deleted processes as part of this request.
   */
  skipSubprocesses?: null | boolean;
}
