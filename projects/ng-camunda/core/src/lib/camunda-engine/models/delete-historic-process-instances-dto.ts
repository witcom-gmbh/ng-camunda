/* tslint:disable */
/* eslint-disable */
import { HistoricProcessInstanceQueryDto } from './historic-process-instance-query-dto';
export interface DeleteHistoricProcessInstancesDto {

  /**
   * A string with delete reason.
   */
  deleteReason?: string;

  /**
   * If set to `false`, the request will still be successful if one ore more of the process ids are not found.
   */
  failIfNotExists?: null | boolean;

  /**
   * A list historic process instance ids to delete.
   */
  historicProcessInstanceIds?: Array<string>;
  historicProcessInstanceQuery?: HistoricProcessInstanceQueryDto;
}
