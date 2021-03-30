/* tslint:disable */
/* eslint-disable */
export interface DurationReportResultDto {

  /**
   * The average duration in milliseconds of all completed process instances which were started in the given period.
   */
  average?: number;

  /**
   * The greatest duration in milliseconds of all completed process instances which were started in the given period.
   */
  maximum?: number;

  /**
   * The smallest duration in milliseconds of all completed process instances which were started in the given period.
   */
  minimum?: number;

  /**
   * Specifies a timespan within a year.
   * **Note:** The period must be interpreted in conjunction with the returned `periodUnit`.
   */
  period?: number;

  /**
   * The unit of the given period. Possible values are `MONTH` and `QUARTER`.
   */
  periodUnit?: 'MONTH' | 'QUARTER';
}
