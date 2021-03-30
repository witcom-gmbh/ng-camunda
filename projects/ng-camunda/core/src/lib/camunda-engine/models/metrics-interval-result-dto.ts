/* tslint:disable */
/* eslint-disable */
export interface MetricsIntervalResultDto {

  /**
   * The name of the metric.
   */
  name?: string;

  /**
   * The reporter of the metric. `null` if the metrics are aggregated by reporter.
   */
  reporter?: string;

  /**
   * The interval timestamp.
   */
  timestamp?: string;

  /**
   * The value of the metric aggregated by the interval.
   */
  value?: number;
}
