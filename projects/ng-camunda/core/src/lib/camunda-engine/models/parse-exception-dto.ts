/* tslint:disable */
/* eslint-disable */
import { ExceptionDto } from './exception-dto';
import { ResourceReportDto } from './resource-report-dto';
export interface ParseExceptionDto extends ExceptionDto {

  /**
   * A JSON Object containing list of errors and warnings occurred during deployment.
   */
  details?: { [key: string]: ResourceReportDto };
}
