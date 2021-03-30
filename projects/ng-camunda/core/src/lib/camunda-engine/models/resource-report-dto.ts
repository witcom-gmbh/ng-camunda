/* tslint:disable */
/* eslint-disable */
import { ProblemDto } from './problem-dto';
export interface ResourceReportDto {

  /**
   * A list of errors occurred during parsing.
   */
  errors?: Array<ProblemDto>;

  /**
   * A list of warnings occurred during parsing.
   */
  warnings?: Array<ProblemDto>;
}
