/* tslint:disable */
/* eslint-disable */
import { CamundaVariableValueDto } from './camunda-variable-value-dto';
export interface CamundaTriggerVariableValueDto extends CamundaVariableValueDto {

  /**
   * Indicates whether the variable should be a local variable or not.
   * If set to true, the variable becomes a local variable of the execution
   * entering the target activity.
   */
  local?: null | boolean;
}
