/* tslint:disable */
/* eslint-disable */
import { CamundaProblemDto } from './camunda-problem-dto';
export interface CamundaResourceReportDto {

  /**
   * A list of errors occurred during parsing.
   */
  errors?: Array<CamundaProblemDto>;

  /**
   * A list of warnings occurred during parsing.
   */
  warnings?: Array<CamundaProblemDto>;
}
