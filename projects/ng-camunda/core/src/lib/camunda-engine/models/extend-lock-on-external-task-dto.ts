/* tslint:disable */
/* eslint-disable */
export interface ExtendLockOnExternalTaskDto {

  /**
   * An amount of time (in milliseconds). This is the new lock duration starting from the current moment.
   */
  newDuration?: number;

  /**
   * The ID of a worker who is locking the external task.
   */
  workerId?: string;
}
