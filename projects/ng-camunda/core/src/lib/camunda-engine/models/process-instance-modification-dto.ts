/* tslint:disable */
/* eslint-disable */
import { ProcessInstanceModificationInstructionDto } from './process-instance-modification-instruction-dto';
export interface ProcessInstanceModificationDto {

  /**
   * An arbitrary text annotation set by a user for auditing reasons.
   */
  annotation?: string;

  /**
   * JSON array of modification instructions. The instructions are executed in the order they are in.
   */
  instructions?: Array<ProcessInstanceModificationInstructionDto>;

  /**
   * Skip execution listener invocation for activities that are started or ended as part of this request.
   */
  skipCustomListeners?: null | boolean;

  /**
   * Skip execution of [input/output variable mappings](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/#input-output-variable-mapping)
   * for activities that are started or ended as part of this request.
   */
  skipIoMappings?: null | boolean;
}
