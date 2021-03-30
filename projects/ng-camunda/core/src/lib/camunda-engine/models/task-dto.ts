/* tslint:disable */
/* eslint-disable */
export interface TaskDto {

  /**
   * The assignee's id.
   */
  assignee?: string;

  /**
   * The id of the case definition the task belongs to.
   */
  caseDefinitionId?: string;

  /**
   * The id of the case execution the task belongs to.
   */
  caseExecutionId?: string;

  /**
   * The id of the case instance the task belongs to.
   */
  caseInstanceId?: string;

  /**
   * The date the task was created on.
   * [Default format](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/)
   * `yyyy-MM-dd'T'HH:mm:ss.SSSZ`.
   */
  created?: string;

  /**
   * The task's delegation state. Possible values are `PENDING` and `RESOLVED`.
   */
  delegationState?: 'PENDING' | 'RESOLVED';

  /**
   * The task's description.
   */
  description?: string;

  /**
   * The task's due date.
   * [Default format](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/)
   * `yyyy-MM-dd'T'HH:mm:ss.SSSZ`.
   */
  due?: null | string;

  /**
   * The id of the execution the task belongs to.
   */
  executionId?: string;

  /**
   * The follow-up date for the task.
   * [Default format](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/)
   * `yyyy-MM-dd'T'HH:mm:ss.SSSZ`.
   */
  followUp?: null | string;

  /**
   * If not `null`, the form key for the task.
   */
  formKey?: string;

  /**
   * The task id.
   */
  id?: string;

  /**
   * The task name.
   */
  name?: string;

  /**
   * The owner's id.
   */
  owner?: string;

  /**
   * The id the parent task, if this task is a subtask.
   */
  parentTaskId?: string;

  /**
   * The task's priority.
   */
  priority?: null | number;

  /**
   * The id of the process definition the task belongs to.
   */
  processDefinitionId?: string;

  /**
   * The id of the process instance the task belongs to.
   */
  processInstanceId?: string;

  /**
   * Whether the task belongs to a process instance that is suspended.
   */
  suspended?: null | boolean;

  /**
   * The task's key.
   */
  taskDefinitionKey?: string;

  /**
   * If not `null`, the tenant id of the task.
   */
  tenantId?: string;
}
