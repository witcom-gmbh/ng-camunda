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

import { CountResultDto } from '../models/count-result-dto';
import { EventSubscriptionDto } from '../models/event-subscription-dto';

@Injectable({
  providedIn: 'root',
})
export class EventSubscriptionService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEventSubscriptions
   */
  static readonly GetEventSubscriptionsPath = '/event-subscription';

  /**
   * Queries for event subscriptions that fulfill given parameters.
   * The size of the result set can be retrieved by using the
   * [Get Event Subscriptions count](https://docs.camunda.org/manual/7.14/reference/rest/event-subscription/get-query-count/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEventSubscriptions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventSubscriptions$Response(params?: {

    /**
     * Only select subscription with the given id.
     */
    eventSubscriptionId?: string;

    /**
     * Only select subscriptions for events with the given name.
     */
    eventName?: string;

    /**
     * Only select subscriptions for events with the given type.
     * Valid values: &#x60;message&#x60;, &#x60;signal&#x60;, &#x60;compensate&#x60; and &#x60;conditional&#x60;.
     */
    eventType?: 'message' | 'signal' | 'compensate' | 'conditional';

    /**
     * Only select subscriptions that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Only select subscriptions that belong to a process instance with the given id.
     */
    processInstanceId?: string;

    /**
     * Only select subscriptions that belong to an activity with the given id.
     */
    activityId?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * Only select subscriptions that belong to one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only select subscriptions which have no tenant id.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Select event subscriptions which have no tenant id.
     * Can be used in combination with tenantIdIn parameter.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeEventSubscriptionsWithoutTenantId?: boolean;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'created' | 'tenantId';

    /**
     * Sort the results in a given order. Values may be asc for ascending order or desc for descending order.
     * Must be used in conjunction with the sortBy parameter.
     */
    sortOrder?: 'asc' | 'desc';

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
  }): Observable<StrictHttpResponse<Array<EventSubscriptionDto>>> {

    const rb = new RequestBuilder(this.rootUrl, EventSubscriptionService.GetEventSubscriptionsPath, 'get');
    if (params) {
      rb.query('eventSubscriptionId', params.eventSubscriptionId, {});
      rb.query('eventName', params.eventName, {});
      rb.query('eventType', params.eventType, {});
      rb.query('executionId', params.executionId, {});
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('activityId', params.activityId, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('includeEventSubscriptionsWithoutTenantId', params.includeEventSubscriptionsWithoutTenantId, {});
      rb.query('sortBy', params.sortBy, {});
      rb.query('sortOrder', params.sortOrder, {});
      rb.query('firstResult', params.firstResult, {});
      rb.query('maxResults', params.maxResults, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<EventSubscriptionDto>>;
      })
    );
  }

  /**
   * Queries for event subscriptions that fulfill given parameters.
   * The size of the result set can be retrieved by using the
   * [Get Event Subscriptions count](https://docs.camunda.org/manual/7.14/reference/rest/event-subscription/get-query-count/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEventSubscriptions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventSubscriptions(params?: {

    /**
     * Only select subscription with the given id.
     */
    eventSubscriptionId?: string;

    /**
     * Only select subscriptions for events with the given name.
     */
    eventName?: string;

    /**
     * Only select subscriptions for events with the given type.
     * Valid values: &#x60;message&#x60;, &#x60;signal&#x60;, &#x60;compensate&#x60; and &#x60;conditional&#x60;.
     */
    eventType?: 'message' | 'signal' | 'compensate' | 'conditional';

    /**
     * Only select subscriptions that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Only select subscriptions that belong to a process instance with the given id.
     */
    processInstanceId?: string;

    /**
     * Only select subscriptions that belong to an activity with the given id.
     */
    activityId?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * Only select subscriptions that belong to one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only select subscriptions which have no tenant id.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Select event subscriptions which have no tenant id.
     * Can be used in combination with tenantIdIn parameter.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeEventSubscriptionsWithoutTenantId?: boolean;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'created' | 'tenantId';

    /**
     * Sort the results in a given order. Values may be asc for ascending order or desc for descending order.
     * Must be used in conjunction with the sortBy parameter.
     */
    sortOrder?: 'asc' | 'desc';

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
  }): Observable<Array<EventSubscriptionDto>> {

    return this.getEventSubscriptions$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EventSubscriptionDto>>) => r.body as Array<EventSubscriptionDto>)
    );
  }

  /**
   * Path part for operation getEventSubscriptionsCount
   */
  static readonly GetEventSubscriptionsCountPath = '/event-subscription/count';

  /**
   * Queries for the number of event subscriptions that fulfill given parameters.
   * Takes the same parameters as the
   * [Get Event Subscriptions](https://docs.camunda.org/manual/7.14/reference/rest/event-subscription/get-query/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEventSubscriptionsCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventSubscriptionsCount$Response(params?: {

    /**
     * Only select subscription with the given id.
     */
    eventSubscriptionId?: string;

    /**
     * Only select subscriptions for events with the given name.
     */
    eventName?: string;

    /**
     * Only select subscriptions for events with the given type.
     * Valid values: &#x60;message&#x60;, &#x60;signal&#x60;, &#x60;compensate&#x60; and &#x60;conditional&#x60;.
     */
    eventType?: 'message' | 'signal' | 'compensate' | 'conditional';

    /**
     * Only select subscriptions that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Only select subscriptions that belong to a process instance with the given id.
     */
    processInstanceId?: string;

    /**
     * Only select subscriptions that belong to an activity with the given id.
     */
    activityId?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * Only select subscriptions that belong to one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only select subscriptions which have no tenant id.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Select event subscriptions which have no tenant id.
     * Can be used in combination with tenantIdIn parameter.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeEventSubscriptionsWithoutTenantId?: boolean;
  }): Observable<StrictHttpResponse<CountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, EventSubscriptionService.GetEventSubscriptionsCountPath, 'get');
    if (params) {
      rb.query('eventSubscriptionId', params.eventSubscriptionId, {});
      rb.query('eventName', params.eventName, {});
      rb.query('eventType', params.eventType, {});
      rb.query('executionId', params.executionId, {});
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('activityId', params.activityId, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('includeEventSubscriptionsWithoutTenantId', params.includeEventSubscriptionsWithoutTenantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CountResultDto>;
      })
    );
  }

  /**
   * Queries for the number of event subscriptions that fulfill given parameters.
   * Takes the same parameters as the
   * [Get Event Subscriptions](https://docs.camunda.org/manual/7.14/reference/rest/event-subscription/get-query/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEventSubscriptionsCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventSubscriptionsCount(params?: {

    /**
     * Only select subscription with the given id.
     */
    eventSubscriptionId?: string;

    /**
     * Only select subscriptions for events with the given name.
     */
    eventName?: string;

    /**
     * Only select subscriptions for events with the given type.
     * Valid values: &#x60;message&#x60;, &#x60;signal&#x60;, &#x60;compensate&#x60; and &#x60;conditional&#x60;.
     */
    eventType?: 'message' | 'signal' | 'compensate' | 'conditional';

    /**
     * Only select subscriptions that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Only select subscriptions that belong to a process instance with the given id.
     */
    processInstanceId?: string;

    /**
     * Only select subscriptions that belong to an activity with the given id.
     */
    activityId?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * Only select subscriptions that belong to one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only select subscriptions which have no tenant id.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Select event subscriptions which have no tenant id.
     * Can be used in combination with tenantIdIn parameter.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeEventSubscriptionsWithoutTenantId?: boolean;
  }): Observable<CountResultDto> {

    return this.getEventSubscriptionsCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountResultDto>) => r.body as CountResultDto)
    );
  }

}
