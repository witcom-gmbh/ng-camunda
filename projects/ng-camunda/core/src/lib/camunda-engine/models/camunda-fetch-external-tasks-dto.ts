/* tslint:disable */
/* eslint-disable */
import { CamundaFetchExternalTaskTopicDto } from './camunda-fetch-external-task-topic-dto';
export interface CamundaFetchExternalTasksDto {

  /**
   * The [Long Polling](https://docs.camunda.org/manual/7.14/user-guide/process-engine/external-tasks/#long-polling-to-fetch-and-lock-external-tasks)
   * timeout in milliseconds.
   *
   * **Note:** The value cannot be set larger than 1.800.000 milliseconds (corresponds to 30 minutes).
   */
  asyncResponseTimeout?: null | number;

  /**
   * **Mandatory.** The maximum number of tasks to return.
   */
  maxTasks: null | number;

  /**
   * A JSON array of topic objects for which external tasks should be fetched. The returned tasks may be
   * arbitrarily distributed among these topics. Each topic object has the following properties:
   */
  topics?: Array<CamundaFetchExternalTaskTopicDto>;

  /**
   * A `boolean` value, which indicates whether the task should be fetched based on its priority
   * or arbitrarily.
   */
  usePriority?: null | boolean;

  /**
   * **Mandatory.** The id of the worker on which behalf tasks are fetched. The returned tasks are locked for
   * that worker and can only be completed when providing the same worker id.
   */
  workerId: string;
}
