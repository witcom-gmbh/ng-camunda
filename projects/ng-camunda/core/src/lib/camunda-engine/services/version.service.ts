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

import { VersionDto } from '../models/version-dto';

@Injectable({
  providedIn: 'root',
})
export class VersionService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getRestApiVersion
   */
  static readonly GetRestApiVersionPath = '/version';

  /**
   * Retrieves the version of the Rest API.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRestApiVersion()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestApiVersion$Response(params?: {
  }): Observable<StrictHttpResponse<VersionDto>> {

    const rb = new RequestBuilder(this.rootUrl, VersionService.GetRestApiVersionPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VersionDto>;
      })
    );
  }

  /**
   * Retrieves the version of the Rest API.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRestApiVersion$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestApiVersion(params?: {
  }): Observable<VersionDto> {

    return this.getRestApiVersion$Response(params).pipe(
      map((r: StrictHttpResponse<VersionDto>) => r.body as VersionDto)
    );
  }

}
