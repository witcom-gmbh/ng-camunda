/* tslint:disable */
/* eslint-disable */
export interface EventSubscriptionDto {

  /**
   * The identifier of the activity that this event subscription belongs to.
   * This could for example be the id of a receive task.
   */
  activityId?: string;

  /**
   * The time this event subscription was created.
   */
  createdDate?: null | string;

  /**
   * The name of the event this subscription belongs to as defined in the process model.
   */
  eventName?: string;

  /**
   * The type of the event subscription.
   */
  eventType?: string;

  /**
   * The execution that is subscribed on the referenced event.
   */
  executionId?: string;

  /**
   * The id of the event subscription.
   */
  id?: string;

  /**
   * The process instance this subscription belongs to.
   */
  processInstanceId?: string;

  /**
   * The id of the tenant this event subscription belongs to.
   * Can be `null` if the subscription belongs to no single tenant.
   */
  tenantId?: string;
}
