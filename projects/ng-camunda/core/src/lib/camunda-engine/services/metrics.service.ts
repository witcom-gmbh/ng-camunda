/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { CamundaEngineConfiguration } from '../camunda-engine-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { MetricsIntervalResultDto } from '../models/metrics-interval-result-dto';
import { MetricsResultDto } from '../models/metrics-result-dto';

@Injectable({
  providedIn: 'root',
})
export class MetricsService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation interval
   */
  static readonly IntervalPath = '/metrics';

  /**
   * Retrieves a list of metrics, aggregated for a given interval.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `interval()` instead.
   *
   * This method doesn't expect any request body.
   */
  interval$Response(params?: {

    /**
     * The name of the metric.
     */
    name?: 'activity-instance-start' | 'activity-instance-end' | 'job-acquisition-attempt' | 'job-acquired-success' | 'job-acquired-failure' | 'job-execution-rejected' | 'job-successful' | 'job-failed' | 'job-locked-exclusive' | 'executed-decision-elements' | 'history-cleanup-removed-process-instances' | 'history-cleanup-removed-case-instances' | 'history-cleanup-removed-decision-instances' | 'history-cleanup-removed-batch-operations';

    /**
     * The name of the reporter (host), on which the metrics was logged. This will have
     * value provided by the [hostname configuration property](https://docs.camunda.org/manual/7.14/reference/deployment-descriptors/tags/process-engine/#hostname).
     */
    reporter?: string;

    /**
     * The start date (inclusive).
     */
    startDate?: string;

    /**
     * The end date (exclusive).
     */
    endDate?: string;

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;

    /**
     * The interval for which the metrics should be aggregated. Time unit is seconds.
     * Default: The interval is set to 15 minutes (900 seconds).
     */
    interval?: string;

    /**
     * Aggregate metrics by reporter.
     */
    aggregateByReporter?: string;
  }): Observable<StrictHttpResponse<Array<MetricsIntervalResultDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MetricsService.IntervalPath, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('reporter', params.reporter, {});
      rb.query('startDate', params.startDate, {});
      rb.query('endDate', params.endDate, {});
      rb.query('firstResult', params.firstResult, {});
      rb.query('maxResults', params.maxResults, {});
      rb.query('interval', params.interval, {});
      rb.query('aggregateByReporter', params.aggregateByReporter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MetricsIntervalResultDto>>;
      })
    );
  }

  /**
   * Retrieves a list of metrics, aggregated for a given interval.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `interval$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  interval(params?: {

    /**
     * The name of the metric.
     */
    name?: 'activity-instance-start' | 'activity-instance-end' | 'job-acquisition-attempt' | 'job-acquired-success' | 'job-acquired-failure' | 'job-execution-rejected' | 'job-successful' | 'job-failed' | 'job-locked-exclusive' | 'executed-decision-elements' | 'history-cleanup-removed-process-instances' | 'history-cleanup-removed-case-instances' | 'history-cleanup-removed-decision-instances' | 'history-cleanup-removed-batch-operations';

    /**
     * The name of the reporter (host), on which the metrics was logged. This will have
     * value provided by the [hostname configuration property](https://docs.camunda.org/manual/7.14/reference/deployment-descriptors/tags/process-engine/#hostname).
     */
    reporter?: string;

    /**
     * The start date (inclusive).
     */
    startDate?: string;

    /**
     * The end date (exclusive).
     */
    endDate?: string;

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;

    /**
     * The interval for which the metrics should be aggregated. Time unit is seconds.
     * Default: The interval is set to 15 minutes (900 seconds).
     */
    interval?: string;

    /**
     * Aggregate metrics by reporter.
     */
    aggregateByReporter?: string;
  }): Observable<Array<MetricsIntervalResultDto>> {

    return this.interval$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MetricsIntervalResultDto>>) => r.body as Array<MetricsIntervalResultDto>)
    );
  }

  /**
   * Path part for operation getMetrics
   */
  static readonly GetMetricsPath = '/metrics/{metrics-name}/sum';

  /**
   * Retrieves the `sum` (count) for a given metric.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMetrics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMetrics$Response(params: {

    /**
     * The name of the metric.
     */
    'metrics-name': 'activity-instance-start' | 'activity-instance-end' | 'job-acquisition-attempt' | 'job-acquired-success' | 'job-acquired-failure' | 'job-execution-rejected' | 'job-successful' | 'job-failed' | 'job-locked-exclusive' | 'executed-decision-elements' | 'history-cleanup-removed-process-instances' | 'history-cleanup-removed-case-instances' | 'history-cleanup-removed-decision-instances' | 'history-cleanup-removed-batch-operations';

    /**
     * The start date (inclusive).
     */
    startDate?: string;

    /**
     * The end date (exclusive).
     */
    endDate?: string;
  }): Observable<StrictHttpResponse<MetricsResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, MetricsService.GetMetricsPath, 'get');
    if (params) {
      rb.path('metrics-name', params['metrics-name'], {});
      rb.query('startDate', params.startDate, {});
      rb.query('endDate', params.endDate, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MetricsResultDto>;
      })
    );
  }

  /**
   * Retrieves the `sum` (count) for a given metric.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMetrics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMetrics(params: {

    /**
     * The name of the metric.
     */
    'metrics-name': 'activity-instance-start' | 'activity-instance-end' | 'job-acquisition-attempt' | 'job-acquired-success' | 'job-acquired-failure' | 'job-execution-rejected' | 'job-successful' | 'job-failed' | 'job-locked-exclusive' | 'executed-decision-elements' | 'history-cleanup-removed-process-instances' | 'history-cleanup-removed-case-instances' | 'history-cleanup-removed-decision-instances' | 'history-cleanup-removed-batch-operations';

    /**
     * The start date (inclusive).
     */
    startDate?: string;

    /**
     * The end date (exclusive).
     */
    endDate?: string;
  }): Observable<MetricsResultDto> {

    return this.getMetrics$Response(params).pipe(
      map((r: StrictHttpResponse<MetricsResultDto>) => r.body as MetricsResultDto)
    );
  }

}
