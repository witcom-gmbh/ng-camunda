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

import { EvaluationConditionDto } from '../models/evaluation-condition-dto';
import { ProcessInstanceDto } from '../models/process-instance-dto';

@Injectable({
  providedIn: 'root',
})
export class ConditionService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation evaluateCondition
   */
  static readonly EvaluateConditionPath = '/condition';

  /**
   * Triggers evaluation of conditions for conditional start event(s). 
   * Internally this maps to the engines condition evaluation builder method ConditionEvaluationBuilder#evaluateStartConditions(). 
   * For more information see the [Conditional Start Events](https://docs.camunda.org/manual/7.14/reference/bpmn20/events/conditional-events/#conditional-start-event)
   * section of the [BPMN 2.0 Implementation Reference](https://docs.camunda.org/manual/7.14/reference/bpmn20/).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `evaluateCondition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  evaluateCondition$Response(params?: {
    body?: EvaluationConditionDto
  }): Observable<StrictHttpResponse<Array<ProcessInstanceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ConditionService.EvaluateConditionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProcessInstanceDto>>;
      })
    );
  }

  /**
   * Triggers evaluation of conditions for conditional start event(s). 
   * Internally this maps to the engines condition evaluation builder method ConditionEvaluationBuilder#evaluateStartConditions(). 
   * For more information see the [Conditional Start Events](https://docs.camunda.org/manual/7.14/reference/bpmn20/events/conditional-events/#conditional-start-event)
   * section of the [BPMN 2.0 Implementation Reference](https://docs.camunda.org/manual/7.14/reference/bpmn20/).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `evaluateCondition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  evaluateCondition(params?: {
    body?: EvaluationConditionDto
  }): Observable<Array<ProcessInstanceDto>> {

    return this.evaluateCondition$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProcessInstanceDto>>) => r.body as Array<ProcessInstanceDto>)
    );
  }

}
