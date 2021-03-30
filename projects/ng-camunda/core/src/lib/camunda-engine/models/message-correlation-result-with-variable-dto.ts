/* tslint:disable */
/* eslint-disable */
import { ExecutionDto } from './execution-dto';
import { ProcessInstanceDto } from './process-instance-dto';
import { VariableValueDto } from './variable-value-dto';

/**
 * The `processInstance` property only has a value if the resultType is set to `ProcessDefinition`.
 * The processInstance with the properties as described in the
 * [get single instance](https://docs.camunda.org/manual/7.14/reference/rest/process-instance/get/) method.
 *
 * The `execution` property only has a value if the resultType is set to `Execution`.
 * The execution with the properties as described in the
 * [get single execution](https://docs.camunda.org/manual/7.14/reference/rest/execution/get/) method.
 */
export interface MessageCorrelationResultWithVariableDto {
  execution?: ExecutionDto;
  processInstance?: ProcessInstanceDto;

  /**
   * Indicates if the message was correlated to a message start event or an 
   * intermediate message catching event. In the first case, the resultType is 
   * `ProcessDefinition` and otherwise `Execution`.
   */
  resultType?: 'Execution' | 'ProcessDefinition';

  /**
   * This property is returned if the `variablesInResultEnabled` is set to `true`.
   * Contains a list of the process variables.
   */
  variables?: { [key: string]: VariableValueDto };
}
