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

import { CamundaCountResultDto } from '../models/camunda-count-result-dto';
import { CamundaHistoricActivityInstanceDto } from '../models/camunda-historic-activity-instance-dto';
import { CamundaHistoricActivityInstanceQueryDto } from '../models/camunda-historic-activity-instance-query-dto';

@Injectable({
  providedIn: 'root',
})
export class CamundaHistoricActivityInstanceService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getHistoricActivityInstances
   */
  static readonly GetHistoricActivityInstancesPath = '/history/activity-instance';

  /**
   * Get List.
   *
   * Queries for historic activity instances that fulfill the given parameters.
   * The size of the result set can be retrieved by using the
   * [Get Historic Activity Instance Count](https://docs.camunda.org/manual/7.14/reference/rest/history/activity-instance/get-activity-instance-query-count/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHistoricActivityInstances()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricActivityInstances$Response(params?: {

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'activityInstanceId' | 'instanceId' | 'executionId' | 'activityId' | 'activityName' | 'activityType' | 'startTime' | 'endTime' | 'duration' | 'definitionId' | 'occurrence' | 'tenantId';

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

    /**
     * Filter by activity instance id.
     */
    activityInstanceId?: string;

    /**
     * Filter by process instance id.
     */
    processInstanceId?: string;

    /**
     * Filter by process definition id.
     */
    processDefinitionId?: string;

    /**
     * Filter by the id of the execution that executed the activity instance.
     */
    executionId?: string;

    /**
     * Filter by the activity id (according to BPMN 2.0 XML).
     */
    activityId?: string;

    /**
     * Filter by the activity name (according to BPMN 2.0 XML).
     */
    activityName?: string;

    /**
     * Filter by activity type.
     */
    activityType?: string;

    /**
     * Only include activity instances that are user tasks and assigned to a given user.
     */
    taskAssignee?: string;

    /**
     * Only include finished activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    finished?: boolean;

    /**
     * Only include unfinished activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    unfinished?: boolean;

    /**
     * Only include canceled activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    canceled?: boolean;

    /**
     * Only include activity instances which completed a scope.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    completeScope?: boolean;

    /**
     * Restrict to instances that were started before the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedBefore?: string;

    /**
     * Restrict to instances that were started after the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedAfter?: string;

    /**
     * Restrict to instances that were finished before the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedBefore?: string;

    /**
     * Restrict to instances that were finished after the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedAfter?: string;

    /**
     * Filter by a comma-separated list of ids. An activity instance must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include historic activity instances that belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;
  }): Observable<StrictHttpResponse<Array<CamundaHistoricActivityInstanceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaHistoricActivityInstanceService.GetHistoricActivityInstancesPath, 'get');
    if (params) {
      rb.query('sortBy', params.sortBy, {});
      rb.query('sortOrder', params.sortOrder, {});
      rb.query('firstResult', params.firstResult, {});
      rb.query('maxResults', params.maxResults, {});
      rb.query('activityInstanceId', params.activityInstanceId, {});
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('executionId', params.executionId, {});
      rb.query('activityId', params.activityId, {});
      rb.query('activityName', params.activityName, {});
      rb.query('activityType', params.activityType, {});
      rb.query('taskAssignee', params.taskAssignee, {});
      rb.query('finished', params.finished, {});
      rb.query('unfinished', params.unfinished, {});
      rb.query('canceled', params.canceled, {});
      rb.query('completeScope', params.completeScope, {});
      rb.query('startedBefore', params.startedBefore, {});
      rb.query('startedAfter', params.startedAfter, {});
      rb.query('finishedBefore', params.finishedBefore, {});
      rb.query('finishedAfter', params.finishedAfter, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CamundaHistoricActivityInstanceDto>>;
      })
    );
  }

  /**
   * Get List.
   *
   * Queries for historic activity instances that fulfill the given parameters.
   * The size of the result set can be retrieved by using the
   * [Get Historic Activity Instance Count](https://docs.camunda.org/manual/7.14/reference/rest/history/activity-instance/get-activity-instance-query-count/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHistoricActivityInstances$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricActivityInstances(params?: {

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'activityInstanceId' | 'instanceId' | 'executionId' | 'activityId' | 'activityName' | 'activityType' | 'startTime' | 'endTime' | 'duration' | 'definitionId' | 'occurrence' | 'tenantId';

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

    /**
     * Filter by activity instance id.
     */
    activityInstanceId?: string;

    /**
     * Filter by process instance id.
     */
    processInstanceId?: string;

    /**
     * Filter by process definition id.
     */
    processDefinitionId?: string;

    /**
     * Filter by the id of the execution that executed the activity instance.
     */
    executionId?: string;

    /**
     * Filter by the activity id (according to BPMN 2.0 XML).
     */
    activityId?: string;

    /**
     * Filter by the activity name (according to BPMN 2.0 XML).
     */
    activityName?: string;

    /**
     * Filter by activity type.
     */
    activityType?: string;

    /**
     * Only include activity instances that are user tasks and assigned to a given user.
     */
    taskAssignee?: string;

    /**
     * Only include finished activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    finished?: boolean;

    /**
     * Only include unfinished activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    unfinished?: boolean;

    /**
     * Only include canceled activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    canceled?: boolean;

    /**
     * Only include activity instances which completed a scope.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    completeScope?: boolean;

    /**
     * Restrict to instances that were started before the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedBefore?: string;

    /**
     * Restrict to instances that were started after the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedAfter?: string;

    /**
     * Restrict to instances that were finished before the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedBefore?: string;

    /**
     * Restrict to instances that were finished after the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedAfter?: string;

    /**
     * Filter by a comma-separated list of ids. An activity instance must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include historic activity instances that belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;
  }): Observable<Array<CamundaHistoricActivityInstanceDto>> {

    return this.getHistoricActivityInstances$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CamundaHistoricActivityInstanceDto>>) => r.body as Array<CamundaHistoricActivityInstanceDto>)
    );
  }

  /**
   * Path part for operation queryHistoricActivityInstances
   */
  static readonly QueryHistoricActivityInstancesPath = '/history/activity-instance';

  /**
   * Get List (POST).
   *
   * Queries for historic activity instances that fulfill the given parameters.
   * The size of the result set can be retrieved by using the
   * [Get Historic Activity Instance Count](https://docs.camunda.org/manual/7.14/reference/rest/history/activity-instance/get-activity-instance-query-count/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `queryHistoricActivityInstances()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryHistoricActivityInstances$Response(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: CamundaHistoricActivityInstanceQueryDto
  }): Observable<StrictHttpResponse<Array<CamundaHistoricActivityInstanceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaHistoricActivityInstanceService.QueryHistoricActivityInstancesPath, 'post');
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
        return r as StrictHttpResponse<Array<CamundaHistoricActivityInstanceDto>>;
      })
    );
  }

  /**
   * Get List (POST).
   *
   * Queries for historic activity instances that fulfill the given parameters.
   * The size of the result set can be retrieved by using the
   * [Get Historic Activity Instance Count](https://docs.camunda.org/manual/7.14/reference/rest/history/activity-instance/get-activity-instance-query-count/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `queryHistoricActivityInstances$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryHistoricActivityInstances(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: CamundaHistoricActivityInstanceQueryDto
  }): Observable<Array<CamundaHistoricActivityInstanceDto>> {

    return this.queryHistoricActivityInstances$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CamundaHistoricActivityInstanceDto>>) => r.body as Array<CamundaHistoricActivityInstanceDto>)
    );
  }

  /**
   * Path part for operation getHistoricActivityInstancesCount
   */
  static readonly GetHistoricActivityInstancesCountPath = '/history/activity-instance/count';

  /**
   * Get List Count.
   *
   * Queries for the number of historic activity instances that fulfill the given parameters.
   * Takes the same parameters as the [Get Historic Activity Instance](https://docs.camunda.org/manual/7.14/reference/rest/history/activity-instance/get-activity-instance-query/)  method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHistoricActivityInstancesCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricActivityInstancesCount$Response(params?: {

    /**
     * Filter by activity instance id.
     */
    activityInstanceId?: string;

    /**
     * Filter by process instance id.
     */
    processInstanceId?: string;

    /**
     * Filter by process definition id.
     */
    processDefinitionId?: string;

    /**
     * Filter by the id of the execution that executed the activity instance.
     */
    executionId?: string;

    /**
     * Filter by the activity id (according to BPMN 2.0 XML).
     */
    activityId?: string;

    /**
     * Filter by the activity name (according to BPMN 2.0 XML).
     */
    activityName?: string;

    /**
     * Filter by activity type.
     */
    activityType?: string;

    /**
     * Only include activity instances that are user tasks and assigned to a given user.
     */
    taskAssignee?: string;

    /**
     * Only include finished activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    finished?: boolean;

    /**
     * Only include unfinished activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    unfinished?: boolean;

    /**
     * Only include canceled activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    canceled?: boolean;

    /**
     * Only include activity instances which completed a scope.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    completeScope?: boolean;

    /**
     * Restrict to instances that were started before the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedBefore?: string;

    /**
     * Restrict to instances that were started after the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedAfter?: string;

    /**
     * Restrict to instances that were finished before the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedBefore?: string;

    /**
     * Restrict to instances that were finished after the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedAfter?: string;

    /**
     * Filter by a comma-separated list of ids. An activity instance must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include historic activity instances that belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;
  }): Observable<StrictHttpResponse<CamundaCountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaHistoricActivityInstanceService.GetHistoricActivityInstancesCountPath, 'get');
    if (params) {
      rb.query('activityInstanceId', params.activityInstanceId, {});
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('executionId', params.executionId, {});
      rb.query('activityId', params.activityId, {});
      rb.query('activityName', params.activityName, {});
      rb.query('activityType', params.activityType, {});
      rb.query('taskAssignee', params.taskAssignee, {});
      rb.query('finished', params.finished, {});
      rb.query('unfinished', params.unfinished, {});
      rb.query('canceled', params.canceled, {});
      rb.query('completeScope', params.completeScope, {});
      rb.query('startedBefore', params.startedBefore, {});
      rb.query('startedAfter', params.startedAfter, {});
      rb.query('finishedBefore', params.finishedBefore, {});
      rb.query('finishedAfter', params.finishedAfter, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaCountResultDto>;
      })
    );
  }

  /**
   * Get List Count.
   *
   * Queries for the number of historic activity instances that fulfill the given parameters.
   * Takes the same parameters as the [Get Historic Activity Instance](https://docs.camunda.org/manual/7.14/reference/rest/history/activity-instance/get-activity-instance-query/)  method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHistoricActivityInstancesCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricActivityInstancesCount(params?: {

    /**
     * Filter by activity instance id.
     */
    activityInstanceId?: string;

    /**
     * Filter by process instance id.
     */
    processInstanceId?: string;

    /**
     * Filter by process definition id.
     */
    processDefinitionId?: string;

    /**
     * Filter by the id of the execution that executed the activity instance.
     */
    executionId?: string;

    /**
     * Filter by the activity id (according to BPMN 2.0 XML).
     */
    activityId?: string;

    /**
     * Filter by the activity name (according to BPMN 2.0 XML).
     */
    activityName?: string;

    /**
     * Filter by activity type.
     */
    activityType?: string;

    /**
     * Only include activity instances that are user tasks and assigned to a given user.
     */
    taskAssignee?: string;

    /**
     * Only include finished activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    finished?: boolean;

    /**
     * Only include unfinished activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    unfinished?: boolean;

    /**
     * Only include canceled activity instances.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    canceled?: boolean;

    /**
     * Only include activity instances which completed a scope.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; behaves the same as when the property is not set.
     */
    completeScope?: boolean;

    /**
     * Restrict to instances that were started before the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedBefore?: string;

    /**
     * Restrict to instances that were started after the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedAfter?: string;

    /**
     * Restrict to instances that were finished before the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedBefore?: string;

    /**
     * Restrict to instances that were finished after the given date. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
     * the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedAfter?: string;

    /**
     * Filter by a comma-separated list of ids. An activity instance must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include historic activity instances that belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;
  }): Observable<CamundaCountResultDto> {

    return this.getHistoricActivityInstancesCount$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaCountResultDto>) => r.body as CamundaCountResultDto)
    );
  }

  /**
   * Path part for operation queryHistoricActivityInstancesCount
   */
  static readonly QueryHistoricActivityInstancesCountPath = '/history/activity-instance/count';

  /**
   * Get List Count (POST).
   *
   * Queries for the number of historic activity instances that fulfill the given parameters.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `queryHistoricActivityInstancesCount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryHistoricActivityInstancesCount$Response(params?: {
    body?: CamundaHistoricActivityInstanceQueryDto
  }): Observable<StrictHttpResponse<CamundaCountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaHistoricActivityInstanceService.QueryHistoricActivityInstancesCountPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaCountResultDto>;
      })
    );
  }

  /**
   * Get List Count (POST).
   *
   * Queries for the number of historic activity instances that fulfill the given parameters.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `queryHistoricActivityInstancesCount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryHistoricActivityInstancesCount(params?: {
    body?: CamundaHistoricActivityInstanceQueryDto
  }): Observable<CamundaCountResultDto> {

    return this.queryHistoricActivityInstancesCount$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaCountResultDto>) => r.body as CamundaCountResultDto)
    );
  }

  /**
   * Path part for operation getHistoricActivityInstance
   */
  static readonly GetHistoricActivityInstancePath = '/history/activity-instance/{id}';

  /**
   * Get.
   *
   * Retrieves a historic activity instance by id, according to the `HistoricActivityInstance` interface in the engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHistoricActivityInstance()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricActivityInstance$Response(params: {

    /**
     * The id of the historic activity instance to be retrieved.
     */
    id: string;
  }): Observable<StrictHttpResponse<CamundaHistoricActivityInstanceDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaHistoricActivityInstanceService.GetHistoricActivityInstancePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaHistoricActivityInstanceDto>;
      })
    );
  }

  /**
   * Get.
   *
   * Retrieves a historic activity instance by id, according to the `HistoricActivityInstance` interface in the engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHistoricActivityInstance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricActivityInstance(params: {

    /**
     * The id of the historic activity instance to be retrieved.
     */
    id: string;
  }): Observable<CamundaHistoricActivityInstanceDto> {

    return this.getHistoricActivityInstance$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaHistoricActivityInstanceDto>) => r.body as CamundaHistoricActivityInstanceDto)
    );
  }

}
