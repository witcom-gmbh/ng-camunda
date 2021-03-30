/* tslint:disable */
/* eslint-disable */
import { CamundaHistoricProcessInstanceQueryDto } from './camunda-historic-process-instance-query-dto';
export interface CamundaDeleteHistoricProcessInstancesDto {

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
  historicProcessInstanceQuery?: CamundaHistoricProcessInstanceQueryDto;
}
