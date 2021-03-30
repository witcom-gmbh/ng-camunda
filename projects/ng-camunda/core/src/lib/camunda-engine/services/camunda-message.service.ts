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

import { CamundaCorrelationMessageDto } from '../models/camunda-correlation-message-dto';
import { CamundaMessageCorrelationResultWithVariableDto } from '../models/camunda-message-correlation-result-with-variable-dto';

@Injectable({
  providedIn: 'root',
})
export class CamundaMessageService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deliverMessage
   */
  static readonly DeliverMessagePath = '/message';

  /**
   * Correlates a message to the process engine to either trigger a message start event or an intermediate message 
   * catching event. Internally this maps to the engine's message correlation builder methods
   * `MessageCorrelationBuilder#correlateWithResult()` and `MessageCorrelationBuilder#correlateAllWithResult()`.
   * For more information about the correlation behavior, see the [Message Events](https://docs.camunda.org/manual/7.14/bpmn20/events/message-events/)
   * section of the [BPMN 2.0 Implementation Reference](https://docs.camunda.org/manual/7.14/reference/bpmn20/).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deliverMessage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deliverMessage$Response(params?: {
    body?: CamundaCorrelationMessageDto
  }): Observable<StrictHttpResponse<Array<CamundaMessageCorrelationResultWithVariableDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaMessageService.DeliverMessagePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CamundaMessageCorrelationResultWithVariableDto>>;
      })
    );
  }

  /**
   * Correlates a message to the process engine to either trigger a message start event or an intermediate message 
   * catching event. Internally this maps to the engine's message correlation builder methods
   * `MessageCorrelationBuilder#correlateWithResult()` and `MessageCorrelationBuilder#correlateAllWithResult()`.
   * For more information about the correlation behavior, see the [Message Events](https://docs.camunda.org/manual/7.14/bpmn20/events/message-events/)
   * section of the [BPMN 2.0 Implementation Reference](https://docs.camunda.org/manual/7.14/reference/bpmn20/).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deliverMessage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deliverMessage(params?: {
    body?: CamundaCorrelationMessageDto
  }): Observable<Array<CamundaMessageCorrelationResultWithVariableDto>> {

    return this.deliverMessage$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CamundaMessageCorrelationResultWithVariableDto>>) => r.body as Array<CamundaMessageCorrelationResultWithVariableDto>)
    );
  }

}
