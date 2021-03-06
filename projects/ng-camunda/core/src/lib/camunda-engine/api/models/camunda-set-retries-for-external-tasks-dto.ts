/* tslint:disable */
/* eslint-disable */
import { CamundaExternalTaskQueryDto } from './camunda-external-task-query-dto';
import { CamundaHistoricProcessInstanceQueryDto } from './camunda-historic-process-instance-query-dto';
import { CamundaProcessInstanceQueryDto } from './camunda-process-instance-query-dto';
export interface CamundaSetRetriesForExternalTasksDto {

  /**
   * The ids of the external tasks to set the number of retries for.
   */
  externalTaskIds?: Array<string>;
  externalTaskQuery?: CamundaExternalTaskQueryDto;
  historicProcessInstanceQuery?: CamundaHistoricProcessInstanceQueryDto;

  /**
   * The ids of process instances containing the tasks to set the number of retries for.
   */
  processInstanceIds?: Array<string>;
  processInstanceQuery?: CamundaProcessInstanceQueryDto;

  /**
   * The number of retries to set for the external task.  Must be >= 0. If this is 0, an incident is created
   * and the task cannot be fetched anymore unless the retries are increased again. Can not be null.
   */
  retries?: null | number;
}
