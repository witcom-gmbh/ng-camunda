/* tslint:disable */
/* eslint-disable */
import { ExternalTaskQueryDto } from './external-task-query-dto';
import { HistoricProcessInstanceQueryDto } from './historic-process-instance-query-dto';
import { ProcessInstanceQueryDto } from './process-instance-query-dto';
export interface SetRetriesForExternalTasksDto {

  /**
   * The ids of the external tasks to set the number of retries for.
   */
  externalTaskIds?: Array<string>;
  externalTaskQuery?: ExternalTaskQueryDto;
  historicProcessInstanceQuery?: HistoricProcessInstanceQueryDto;

  /**
   * The ids of process instances containing the tasks to set the number of retries for.
   */
  processInstanceIds?: Array<string>;
  processInstanceQuery?: ProcessInstanceQueryDto;

  /**
   * The number of retries to set for the external task.  Must be >= 0. If this is 0, an incident is created
   * and the task cannot be fetched anymore unless the retries are increased again. Can not be null.
   */
  retries?: null | number;
}
