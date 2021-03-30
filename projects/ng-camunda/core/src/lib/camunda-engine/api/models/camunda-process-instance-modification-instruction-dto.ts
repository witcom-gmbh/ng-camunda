/* tslint:disable */
/* eslint-disable */
import { CamundaTriggerVariableValueDto } from './camunda-trigger-variable-value-dto';
export interface CamundaProcessInstanceModificationInstructionDto {

  /**
   * Can be used with instructions of types `startTransition`. Specifies the sequence flow to start.
   */
  activityId?: string;

  /**
   * Can be used with instructions of type `cancel`. Specifies the activity instance to cancel.
   * Valid values are the activity instance IDs supplied by the [Get Activity Instance request](https://docs.camunda.org/manual/7.14/reference/rest/process-instance/get-activity-instances/).
   */
  activityInstanceId?: string;

  /**
   * Can be used with instructions of type `startBeforeActivity`, `startAfterActivity`, and `startTransition`.
   * Valid values are the activity instance IDs supplied by the Get Activity Instance request.
   * If there are multiple parent activity instances of the targeted activity,
   * this specifies the ancestor scope in which hierarchy the activity/transition is to be instantiated.
   *
   * Example: When there are two instances of a subprocess and an activity contained in the subprocess is to be started,
   * this parameter allows to specifiy under which subprocess instance the activity should be started.
   */
  ancestorActivityInstanceId?: string;

  /**
   * Can be used with instructions of type cancel. Prevents the deletion of new created activity instances.
   */
  cancelCurrentActiveActivityInstances?: null | boolean;

  /**
   * Can be used with instructions of types `startTransition`. Specifies the sequence flow to start.
   */
  transitionId?: string;

  /**
   * Can be used with instructions of type `cancel`. Specifies the transition instance to cancel.
   * Valid values are the transition instance IDs supplied by the [Get Activity Instance request](https://docs.camunda.org/manual/7.14/reference/rest/process-instance/get-activity-instances/).
   */
  transitionInstanceId?: string;

  /**
   * **Mandatory**. One of the following values: `cancel`, `startBeforeActivity`, `startAfterActivity`, `startTransition`.
   *
   * * A cancel instruction requests cancellation of a single activity instance or all instances of one activity.
   * * A startBeforeActivity instruction requests to enter a given activity.
   * * A startAfterActivity instruction requests to execute the single outgoing sequence flow of a given activity.
   * * A startTransition instruction requests to execute a specific sequence flow.
   */
  type: 'cancel' | 'startBeforeActivity' | 'startAfterActivity' | 'startTransition';
  variables?: CamundaTriggerVariableValueDto;
}
