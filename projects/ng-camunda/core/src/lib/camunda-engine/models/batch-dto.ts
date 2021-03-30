/* tslint:disable */
/* eslint-disable */
export interface BatchDto {

  /**
   * The job definition id for the batch execution jobs of this batch.
   */
  batchJobDefinitionId?: string;

  /**
   * The number of batch execution jobs created per seed job invocation.
   * The batch seed job is invoked until it has created all batch execution jobs required by the batch (see totalJobs property).
   */
  batchJobsPerSeed?: number;

  /**
   * The id of the user that created the batch.
   */
  createUserId?: string;

  /**
   * The id of the batch.
   */
  id?: string;

  /**
   * Every batch execution job invokes the command executed by the batch invocationsPerBatchJob times.
   * E.g., for a process instance migration batch this specifies the number of process instances which are migrated per batch execution job.
   */
  invocationsPerBatchJob?: number;

  /**
   * The number of batch execution jobs already created by the seed job.
   */
  jobsCreated?: number;

  /**
   * The job definition id for the monitor jobs of this batch.
   */
  monitorJobDefinitionId?: string;

  /**
   * The job definition id for the seed jobs of this batch.
   */
  seedJobDefinitionId?: string;

  /**
   * Indicates whether this batch is suspended or not.
   */
  suspended?: boolean;

  /**
   * The tenant id of the batch.
   */
  tenantId?: string;

  /**
   * The total jobs of a batch is the number of batch execution jobs required to complete the batch.
   */
  totalJobs?: number;

  /**
   * The type of the batch.
   */
  type?: string;
}
