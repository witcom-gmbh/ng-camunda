/* tslint:disable */
/* eslint-disable */
export interface ExternalTaskFailureDto {

  /**
   * A detailed error description.
   */
  errorDetails?: string;

  /**
   * An message indicating the reason of the failure.
   */
  errorMessage?: string;

  /**
   * A number of how often the task should be retried. Must be >= 0. If this is 0, an incident is created and
   * the task cannot be fetched anymore unless the retries are increased again. The incident's message is set
   * to the `errorMessage` parameter.
   */
  retries?: number;

  /**
   * A timeout in milliseconds before the external task becomes available again for fetching. Must be >= 0.
   */
  retryTimeout?: number;

  /**
   * The id of the worker that reports the failure. Must match the id of the worker who has most recently
   * locked the task.
   */
  workerId?: string;
}
