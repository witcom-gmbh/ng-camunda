/* tslint:disable */
/* eslint-disable */
import { CamundaVariableValueDto } from './camunda-variable-value-dto';
export interface CamundaCompleteExternalTaskDto {

  /**
   * A JSON object containing local variable key-value pairs. Local variables are set only in the scope of external task. Each key is a variable name and each value a JSON variable value object with the following properties:
   */
  localVariables?: { [key: string]: CamundaVariableValueDto };

  /**
   * A JSON object containing variable key-value pairs. Each key is a variable name and each value a JSON variable value object with the following properties:
   */
  variables?: { [key: string]: CamundaVariableValueDto };

  /**
   * The id of the worker that completes the task. Must match the id of the worker who has most recently locked the task.
   */
  workerId?: string;
}
