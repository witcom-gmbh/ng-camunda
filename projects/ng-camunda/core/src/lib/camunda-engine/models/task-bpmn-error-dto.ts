/* tslint:disable */
/* eslint-disable */
import { VariableValueDto } from './variable-value-dto';
export interface TaskBpmnErrorDto {

  /**
   * An error code that indicates the predefined error. It is used to identify the BPMN
   * error handler.
   */
  errorCode?: string;

  /**
   * An error message that describes the error.
   */
  errorMessage?: string;

  /**
   * A JSON object containing variable key-value pairs.
   */
  variables?: { [key: string]: VariableValueDto };
}
