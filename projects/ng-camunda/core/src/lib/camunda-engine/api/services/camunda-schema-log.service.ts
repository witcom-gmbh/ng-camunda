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

import { CamundaSchemaLogEntryDto } from '../models/camunda-schema-log-entry-dto';
import { CamundaSchemaLogQueryDto } from '../models/camunda-schema-log-query-dto';

@Injectable({
  providedIn: 'root',
})
export class CamundaSchemaLogService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSchemaLog
   */
  static readonly GetSchemaLogPath = '/schema/log';

  /**
   * Queries for schema log entries that fulfill given parameters.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSchemaLog()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSchemaLog$Response(params?: {

    /**
     * Only return schema log entries with a specific version.
     */
    version?: string;

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
  }): Observable<StrictHttpResponse<Array<CamundaSchemaLogEntryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaSchemaLogService.GetSchemaLogPath, 'get');
    if (params) {
      rb.query('version', params.version, {});
      rb.query('firstResult', params.firstResult, {});
      rb.query('maxResults', params.maxResults, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CamundaSchemaLogEntryDto>>;
      })
    );
  }

  /**
   * Queries for schema log entries that fulfill given parameters.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSchemaLog$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSchemaLog(params?: {

    /**
     * Only return schema log entries with a specific version.
     */
    version?: string;

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
  }): Observable<Array<CamundaSchemaLogEntryDto>> {

    return this.getSchemaLog$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CamundaSchemaLogEntryDto>>) => r.body as Array<CamundaSchemaLogEntryDto>)
    );
  }

  /**
   * Path part for operation querySchemaLog
   */
  static readonly QuerySchemaLogPath = '/schema/log';

  /**
   * Queries for schema log entries that fulfill given parameters.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `querySchemaLog()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  querySchemaLog$Response(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: CamundaSchemaLogQueryDto
  }): Observable<StrictHttpResponse<Array<CamundaSchemaLogEntryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaSchemaLogService.QuerySchemaLogPath, 'post');
    if (params) {
      rb.query('firstResult', params.firstResult, {});
      rb.query('maxResults', params.maxResults, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CamundaSchemaLogEntryDto>>;
      })
    );
  }

  /**
   * Queries for schema log entries that fulfill given parameters.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `querySchemaLog$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  querySchemaLog(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: CamundaSchemaLogQueryDto
  }): Observable<Array<CamundaSchemaLogEntryDto>> {

    return this.querySchemaLog$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CamundaSchemaLogEntryDto>>) => r.body as Array<CamundaSchemaLogEntryDto>)
    );
  }

}
