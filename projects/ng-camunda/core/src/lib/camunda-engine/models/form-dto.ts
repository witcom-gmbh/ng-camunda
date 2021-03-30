/* tslint:disable */
/* eslint-disable */
export interface FormDto {

  /**
   * The context path of the process application. If the task (or the process definition) does not
   * belong to a process application deployment or a process definition at all, this
   * property is not set.
   */
  contextPath?: string;

  /**
   * The form key.
   */
  key?: string;
}
