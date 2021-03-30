/* tslint:disable */
/* eslint-disable */
export interface RetriesDto {

  /**
   * The number of retries to set for the resource.  Must be >= 0. If this is 0, an incident is created
   * and the task, or job, cannot be fetched, or acquired anymore unless the retries are increased again.
   * Can not be null.
   */
  retries?: null | number;
}
