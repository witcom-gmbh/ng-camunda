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

import { CamundaTelemetryConfigurationDto } from '../models/camunda-telemetry-configuration-dto';

@Injectable({
  providedIn: 'root',
})
export class CamundaTelemetryService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTelemetryConfiguration
   */
  static readonly GetTelemetryConfigurationPath = '/telemetry/configuration';

  /**
   * Fetch Telemetry Configuration.
   *
   * Fetches Telemetry Configuration.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTelemetryConfiguration()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTelemetryConfiguration$Response(params?: {
  }): Observable<StrictHttpResponse<CamundaTelemetryConfigurationDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTelemetryService.GetTelemetryConfigurationPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaTelemetryConfigurationDto>;
      })
    );
  }

  /**
   * Fetch Telemetry Configuration.
   *
   * Fetches Telemetry Configuration.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTelemetryConfiguration$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTelemetryConfiguration(params?: {
  }): Observable<CamundaTelemetryConfigurationDto> {

    return this.getTelemetryConfiguration$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaTelemetryConfigurationDto>) => r.body as CamundaTelemetryConfigurationDto)
    );
  }

  /**
   * Path part for operation configureTelemetry
   */
  static readonly ConfigureTelemetryPath = '/telemetry/configuration';

  /**
   * Configure Telemetry.
   *
   * Configures whether Camunda receives data collection of the process engine setup and usage.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configureTelemetry()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  configureTelemetry$Response(params?: {
    body?: CamundaTelemetryConfigurationDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTelemetryService.ConfigureTelemetryPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Configure Telemetry.
   *
   * Configures whether Camunda receives data collection of the process engine setup and usage.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `configureTelemetry$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  configureTelemetry(params?: {
    body?: CamundaTelemetryConfigurationDto
  }): Observable<void> {

    return this.configureTelemetry$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
