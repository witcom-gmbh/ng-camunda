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

import { CamundaProcessEngineDto } from '../models/camunda-process-engine-dto';

@Injectable({
  providedIn: 'root',
})
export class CamundaEngineService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getProcessEngineNames
   */
  static readonly GetProcessEngineNamesPath = '/engine';

  /**
   * Retrieves the names of all process engines available on your platform.
   * **Note**: You cannot prepend `/engine/{name}` to this method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessEngineNames()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessEngineNames$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CamundaProcessEngineDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaEngineService.GetProcessEngineNamesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CamundaProcessEngineDto>>;
      })
    );
  }

  /**
   * Retrieves the names of all process engines available on your platform.
   * **Note**: You cannot prepend `/engine/{name}` to this method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessEngineNames$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessEngineNames(params?: {
  }): Observable<Array<CamundaProcessEngineDto>> {

    return this.getProcessEngineNames$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CamundaProcessEngineDto>>) => r.body as Array<CamundaProcessEngineDto>)
    );
  }

}
