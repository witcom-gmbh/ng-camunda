/* tslint:disable */
/* eslint-disable */
import { VariableValueDto } from './variable-value-dto';
export interface TriggerVariableValueDto extends VariableValueDto {

  /**
   * Indicates whether the variable should be a local variable or not.
   * If set to true, the variable becomes a local variable of the execution
   * entering the target activity.
   */
  local?: null | boolean;
}
