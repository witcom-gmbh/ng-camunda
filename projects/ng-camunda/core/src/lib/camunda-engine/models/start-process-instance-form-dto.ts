/* tslint:disable */
/* eslint-disable */
import { VariableValueDto } from './variable-value-dto';
export interface StartProcessInstanceFormDto {

  /**
   * The business key the process instance is to be initialized with.
   * The business key uniquely identifies the process instance in the context of the given process definition.
   */
  businessKey?: string;
  variables?: { [key: string]: VariableValueDto };
}
