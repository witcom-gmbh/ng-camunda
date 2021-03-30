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

import { CorrelationMessageDto } from '../models/correlation-message-dto';
import { MessageCorrelationResultWithVariableDto } from '../models/message-correlation-result-with-variable-dto';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends BaseService {
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
    body?: CorrelationMessageDto
  }): Observable<StrictHttpResponse<Array<MessageCorrelationResultWithVariableDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MessageService.DeliverMessagePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MessageCorrelationResultWithVariableDto>>;
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
    body?: CorrelationMessageDto
  }): Observable<Array<MessageCorrelationResultWithVariableDto>> {

    return this.deliverMessage$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MessageCorrelationResultWithVariableDto>>) => r.body as Array<MessageCorrelationResultWithVariableDto>)
    );
  }

}
