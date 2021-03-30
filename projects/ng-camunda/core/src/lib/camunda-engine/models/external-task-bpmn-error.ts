/* tslint:disable */
/* eslint-disable */
import { TaskBpmnErrorDto } from './task-bpmn-error-dto';
export interface ExternalTaskBpmnError extends TaskBpmnErrorDto {

  /**
   * The id of the worker that reports the failure. Must match the id of the worker who has most recently
   * locked the task.
   */
  workerId?: string;
}
