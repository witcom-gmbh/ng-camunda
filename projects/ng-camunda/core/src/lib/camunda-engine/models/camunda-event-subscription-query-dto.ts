/* tslint:disable */
/* eslint-disable */

/**
 * A event subscription query which retrieves a list of event subscriptions
 */
export interface CamundaEventSubscriptionQueryDto {

  /**
   * The identifier of the activity that this event subscription belongs to.
   * This could for example be the id of a receive task.
   */
  activityId?: string;

  /**
   * The name of the event this subscription belongs to as defined in the process model.
   */
  eventName?: string;

  /**
   * The id of the event subscription.
   */
  eventSubscriptionId?: string;

  /**
   * The type of the event subscription.
   */
  eventType?: 'message' | 'signal' | 'compensate' | 'conditional';

  /**
   * The execution that is subscribed on the referenced event.
   */
  executionId?: string;

  /**
   * Select event subscriptions which have no tenant id.
   * Can be used in combination with tenantIdIn parameter.
   * Value may only be `true`, as `false` is the default behavior.
   */
  includeEventSubscriptionsWithoutTenantId?: null | boolean;

  /**
   * The process instance this subscription belongs to.
   */
  processInstanceId?: string;

  /**
   * Apply sorting of the result
   */
  sorting?: Array<{ 'sortBy'?: 'created' | 'tenantId', 'sortOrder'?: 'asc' | 'desc' }>;

  /**
   * Filter by a comma-separated list of tenant ids.
   * Only select subscriptions that belong to one of the given tenant ids.
   */
  tenantIdIn?: Array<string>;

  /**
   * Only select subscriptions which have no tenant id.
   * Value may only be `true`, as `false` is the default behavior.
   */
  withoutTenantId?: null | boolean;
}
