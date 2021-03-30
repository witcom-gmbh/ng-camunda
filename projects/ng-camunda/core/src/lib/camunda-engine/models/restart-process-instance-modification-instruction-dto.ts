/* tslint:disable */
/* eslint-disable */
export interface RestartProcessInstanceModificationInstructionDto {

  /**
   * **Can be used with instructions of types** `startBeforeActivity`
   * and `startAfterActivity`. Specifies the sequence flow to start.
   */
  activityId?: string;

  /**
   * **Can be used with instructions of types** `startTransition`.
   * Specifies the sequence flow to start.
   */
  transitionId?: string;

  /**
   * **Mandatory**. One of the following values: `startBeforeActivity`, `startAfterActivity`, `startTransition`.
   *
   * * A `startBeforeActivity` instruction requests to enter a given activity.
   * * A `startAfterActivity` instruction requests to execute the single outgoing sequence flow of a given activity.
   * * A `startTransition` instruction requests to execute a specific sequence flow.
   */
  type: 'startBeforeActivity' | 'startAfterActivity' | 'startTransition';
}
