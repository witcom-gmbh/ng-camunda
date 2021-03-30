/* tslint:disable */
/* eslint-disable */

/**
 * A historic activity instance query which defines a group of historic activity instances
 */
export interface HistoricActivityInstanceQueryDto {

  /**
   * Filter by the activity id (according to BPMN 2.0 XML).
   */
  activityId?: string;

  /**
   * Filter by activity instance id.
   */
  activityInstanceId?: string;

  /**
   * Filter by the activity name (according to BPMN 2.0 XML).
   */
  activityName?: string;

  /**
   * Filter by activity type.
   */
  activityType?: string;

  /**
   * Only include canceled activity instances.
   * Value may only be `true`, as `false` behaves the same as when the property is not set.
   */
  canceled?: null | boolean;

  /**
   * Only include activity instances which completed a scope.
   * Value may only be `true`, as `false` behaves the same as when the property is not set.
   */
  completeScope?: null | boolean;

  /**
   * Filter by the id of the execution that executed the activity instance.
   */
  executionId?: string;

  /**
   * Only include finished activity instances.
   * Value may only be `true`, as `false` behaves the same as when the property is not set.
   */
  finished?: null | boolean;

  /**
   * Restrict to instances that were finished after the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
   * the date must have the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.000+0200`.
   */
  finishedAfter?: null | string;

  /**
   * Restrict to instances that were finished before the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
   * the date must have the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.000+0200`.
   */
  finishedBefore?: null | string;

  /**
   * Filter by process definition id.
   */
  processDefinitionId?: string;

  /**
   * Filter by process instance id.
   */
  processInstanceId?: string;

  /**
   * Apply sorting of the result
   */
  sorting?: Array<{ 'sortBy'?: 'activityInstanceId' | 'instanceId' | 'executionId' | 'activityId' | 'activityName' | 'activityType' | 'startTime' | 'endTime' | 'duration' | 'definitionId' | 'occurrence' | 'tenantId', 'sortOrder'?: 'asc' | 'desc' }>;

  /**
   * Restrict to instances that were started after the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
   * the date must have the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.000+0200`.
   */
  startedAfter?: null | string;

  /**
   * Restrict to instances that were started before the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
   * the date must have the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.000+0200`.
   */
  startedBefore?: null | string;

  /**
   * Only include activity instances that are user tasks and assigned to a given user.
   */
  taskAssignee?: string;

  /**
   * Must be a JSON array of Strings. An activity instance must have one of the given tenant ids.
   */
  tenantIdIn?: Array<string>;

  /**
   * Only include unfinished activity instances.
   * Value may only be `true`, as `false` behaves the same as when the property is not set.
   */
  unfinished?: null | boolean;

  /**
   * Only include historic activity instances that belong to no tenant. Value may only be `true`, as `false` is the default behavior.
   */
  withoutTenantId?: null | boolean;
}
