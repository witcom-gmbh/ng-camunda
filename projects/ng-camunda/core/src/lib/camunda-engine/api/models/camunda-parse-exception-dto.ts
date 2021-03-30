/* tslint:disable */
/* eslint-disable */
import { CamundaExceptionDto } from './camunda-exception-dto';
import { CamundaResourceReportDto } from './camunda-resource-report-dto';
export interface CamundaParseExceptionDto extends CamundaExceptionDto {

  /**
   * A JSON Object containing list of errors and warnings occurred during deployment.
   */
  details?: { [key: string]: CamundaResourceReportDto };
}
