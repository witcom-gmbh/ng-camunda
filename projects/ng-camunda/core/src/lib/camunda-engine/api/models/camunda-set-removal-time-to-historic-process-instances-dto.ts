/* tslint:disable */
/* eslint-disable */
import { CamundaAbstractSetRemovalTimeDto } from './camunda-abstract-set-removal-time-dto';
import { CamundaHistoricProcessInstanceQueryDto } from './camunda-historic-process-instance-query-dto';
export interface CamundaSetRemovalTimeToHistoricProcessInstancesDto extends CamundaAbstractSetRemovalTimeDto {

  /**
   * Sets the removal time to all historic process instances in the hierarchy.
   * Value may only be `true`, as `false` is the default behavior.
   */
  hierarchical?: null | boolean;

  /**
   * The id of the process instance.
   */
  historicProcessInstanceIds?: Array<string>;
  historicProcessInstanceQuery?: CamundaHistoricProcessInstanceQueryDto;
}
