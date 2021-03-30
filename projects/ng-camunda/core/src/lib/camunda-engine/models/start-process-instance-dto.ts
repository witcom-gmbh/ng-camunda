/* tslint:disable */
/* eslint-disable */
import { ProcessInstanceModificationInstructionDto } from './process-instance-modification-instruction-dto';
import { VariableValueDto } from './variable-value-dto';
export interface StartProcessInstanceDto {

  /**
   * The business key of the process instance.
   */
  businessKey?: string;

  /**
   * The case instance id the process instance is to be initialized with.
   */
  caseInstanceId?: string;

  /**
   * Skip execution listener invocation for activities that are started or ended as part of this request.
   * **Note**: This option is currently only respected when start instructions are submitted
   * via the `startInstructions` property.
   */
  skipCustomListeners?: null | boolean;

  /**
   * Skip execution of
   * [input/output variable mappings](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/#input-output-variable-mapping)
   * for activities that are started or ended as part of this request.
   * **Note**: This option is currently only respected when start instructions are submitted
   * via the `startInstructions` property.
   */
  skipIoMappings?: null | boolean;

  /**
   * **Optional**. A JSON array of instructions that specify which activities to start the process instance at.
   * If this property is omitted, the process instance starts at its default blank start event.
   */
  startInstructions?: Array<ProcessInstanceModificationInstructionDto>;
  variables?: { [key: string]: VariableValueDto };

  /**
   * Indicates if the variables, which was used by the process instance during execution, should be returned.
   * Default value: `false`
   */
  withVariablesInReturn?: null | boolean;
}
