/* tslint:disable */
/* eslint-disable */
import { CamundaProcessInstanceDto } from './camunda-process-instance-dto';
import { CamundaVariableValueDto } from './camunda-variable-value-dto';
export interface CamundaProcessInstanceWithVariablesDto extends CamundaProcessInstanceDto {

  /**
   * The id of the process instance.
   */
  variables?: { [key: string]: CamundaVariableValueDto };
}
