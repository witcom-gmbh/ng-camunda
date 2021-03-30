/* tslint:disable */
/* eslint-disable */
export interface HistoricActivityInstanceDto {

  /**
   * The id of the activity that this object is an instance of.
   */
  activityId?: string;

  /**
   * The name of the activity that this object is an instance of.
   */
  activityName?: string;

  /**
   * The type of the activity that this object is an instance of.
   */
  activityType?: string;

  /**
   * The assignee of the task that is associated to this activity instance. Is only set if the activity is a user task.
   */
  assignee?: string;

  /**
   * The id of the called case instance. Is only set if the activity is a call activity and the called instance a case instance.
   */
  calledCaseInstanceId?: string;

  /**
   * The id of the called process instance. Is only set if the activity is a call activity and the called instance a process instance.
   */
  calledProcessInstanceId?: string;

  /**
   * If `true`, this activity instance is canceled.
   */
  canceled?: null | boolean;

  /**
   * If `true`, this activity instance did complete a BPMN 2.0 scope.
   */
  completeScope?: null | boolean;

  /**
   * The time the instance took to finish (in milliseconds).
   */
  durationInMillis?: number;

  /**
   * The time the instance ended. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
   * the date must have the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.000+0200`.
   */
  endTime?: null | string;

  /**
   * The id of the execution that executed this activity instance.
   */
  executionId?: string;

  /**
   * The id of the activity instance.
   */
  id?: string;

  /**
   * The id of the parent activity instance, for example a sub process instance.
   */
  parentActivityInstanceId?: string;

  /**
   * The id of the process definition that this activity instance belongs to.
   */
  processDefinitionId?: string;

  /**
   * The key of the process definition that this activity instance belongs to.
   */
  processDefinitionKey?: string;

  /**
   * The id of the process instance that this activity instance belongs to.
   */
  processInstanceId?: string;

  /**
   * The time after which the activity instance should be removed by the History Cleanup job. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
   * the date must have the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.000+0200`.
   */
  removalTime?: null | string;

  /**
   * The process instance id of the root process instance that initiated the process containing this activity instance.
   */
  rootProcessInstanceId?: string;

  /**
   * The time the instance was started. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
   * the date must have the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.000+0200`.
   */
  startTime?: null | string;

  /**
   * The id of the task that is associated to this activity instance. Is only set if the activity is a user task.
   */
  taskId?: string;

  /**
   * The tenant id of the activity instance.
   */
  tenantId?: string;
}
