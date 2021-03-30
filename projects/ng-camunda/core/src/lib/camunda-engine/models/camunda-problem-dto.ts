/* tslint:disable */
/* eslint-disable */
export interface CamundaProblemDto {

  /**
   * The column where the problem occurred.
   */
  column?: null | number;

  /**
   * A list of element id affected by the problem.
   */
  elementIds?: Array<string>;

  /**
   * The line where the problem occurred.
   */
  line?: null | number;

  /**
   * The main element id where the problem occurred.
   */
  mainElementId?: string;

  /**
   * The message of the problem.
   */
  message?: string;
}
