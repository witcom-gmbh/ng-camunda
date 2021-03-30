/* tslint:disable */
/* eslint-disable */
import { ProcessInstanceDto } from './process-instance-dto';
import { VariableValueDto } from './variable-value-dto';
export interface ProcessInstanceWithVariablesDto extends ProcessInstanceDto {

  /**
   * The id of the process instance.
   */
  variables?: { [key: string]: VariableValueDto };
}
