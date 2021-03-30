/* tslint:disable */
/* eslint-disable */
import { LinkableDto } from './linkable-dto';
export interface CommentDto extends LinkableDto {

  /**
   * The id of the task comment.
   */
  id?: string;

  /**
   * The content of the comment.
   */
  message?: string;

  /**
   * The time after which the comment should be removed by the History Cleanup job.
   * [Default format]($(docsUrl)/reference/rest/overview/date-format/)
   * `yyyy-MM-dd'T'HH:mm:ss.SSSZ`.
   */
  removalTime?: null | string;

  /**
   * The process instance id of the root process instance that initiated the process
   * containing the task.
   */
  rootProcessInstanceId?: string;

  /**
   * The id of the task to which the comment belongs.
   */
  taskId?: string;

  /**
   * The time when the comment was created.
   * [Default format]($(docsUrl)/reference/rest/overview/date-format/)
   * `yyyy-MM-dd'T'HH:mm:ss.SSSZ`.
   */
  time?: string;

  /**
   * The id of the user who created the comment.
   */
  userId?: string;
}
