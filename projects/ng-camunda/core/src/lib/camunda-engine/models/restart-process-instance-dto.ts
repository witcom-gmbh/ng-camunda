/* tslint:disable */
/* eslint-disable */
import { HistoricProcessInstanceQueryDto } from './historic-process-instance-query-dto';
import { RestartProcessInstanceModificationInstructionDto } from './restart-process-instance-modification-instruction-dto';
export interface RestartProcessInstanceDto {
  historicProcessInstanceQuery?: HistoricProcessInstanceQueryDto;

  /**
   * Set the initial set of variables during restart. By default, the last set of variables is used.
   */
  initialVariables?: null | boolean;

  /**
   * **Optional**. A JSON array of instructions that specify which activities to start the process instance at.
   * If this property is omitted, the process instance starts at its default blank start event.
   */
  instructions?: Array<RestartProcessInstanceModificationInstructionDto>;

  /**
   * A list of process instance ids to restart.
   */
  processInstanceIds?: Array<string>;

  /**
   * Skip execution listener invocation for activities that are started as part of this request.
   */
  skipCustomListeners?: null | boolean;

  /**
   * Skip execution of
   * [input/output variable mappings](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/#input-output-variable-mapping)
   * for activities that are started as part of this request.
   */
  skipIoMappings?: null | boolean;

  /**
   * Do not take over the business key of the historic process instance.
   */
  withoutBusinessKey?: null | boolean;
}
