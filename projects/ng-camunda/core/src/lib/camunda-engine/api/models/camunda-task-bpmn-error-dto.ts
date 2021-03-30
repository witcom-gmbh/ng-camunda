/* tslint:disable */
/* eslint-disable */
import { CamundaVariableValueDto } from './camunda-variable-value-dto';
export interface CamundaTaskBpmnErrorDto {

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
  variables?: { [key: string]: CamundaVariableValueDto };
}
