/* tslint:disable */
/* eslint-disable */
import { CamundaTaskBpmnErrorDto } from './camunda-task-bpmn-error-dto';
export interface CamundaExternalTaskBpmnError extends CamundaTaskBpmnErrorDto {

  /**
   * The id of the worker that reports the failure. Must match the id of the worker who has most recently
   * locked the task.
   */
  workerId?: string;
}
