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

import { BatchDto } from '../models/batch-dto';
import { CompleteExternalTaskDto } from '../models/complete-external-task-dto';
import { CountResultDto } from '../models/count-result-dto';
import { ExtendLockOnExternalTaskDto } from '../models/extend-lock-on-external-task-dto';
import { ExternalTaskBpmnError } from '../models/external-task-bpmn-error';
import { ExternalTaskDto } from '../models/external-task-dto';
import { ExternalTaskFailureDto } from '../models/external-task-failure-dto';
import { ExternalTaskQueryDto } from '../models/external-task-query-dto';
import { FetchExternalTasksDto } from '../models/fetch-external-tasks-dto';
import { LockedExternalTaskDto } from '../models/locked-external-task-dto';
import { PriorityDto } from '../models/priority-dto';
import { RetriesDto } from '../models/retries-dto';
import { SetRetriesForExternalTasksDto } from '../models/set-retries-for-external-tasks-dto';

@Injectable({
  providedIn: 'root',
})
export class ExternalTaskService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getExternalTasks
   */
  static readonly GetExternalTasksPath = '/external-task';

  /**
   * Queries for the external tasks that fulfill given parameters. Parameters may be static as well as dynamic
   * runtime properties of executions. The size of the result set can be retrieved by using the
   * [Get External Task Count](https://docs.camunda.org/manual/7.14/reference/rest/external-task/get-query-count/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getExternalTasks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExternalTasks$Response(params?: {

    /**
     * Filter by an external task&#x27;s id.
     */
    externalTaskId?: string;

    /**
     * Filter by the comma-separated list of external task ids.
     */
    externalTaskIdIn?: string;

    /**
     * Filter by an external task topic.
     */
    topicName?: string;

    /**
     * Filter by the id of the worker that the task was most recently locked by.
     */
    workerId?: string;

    /**
     * Only include external tasks that are currently locked (i.e., they have a lock time and it has not expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    locked?: boolean;

    /**
     * Only include external tasks that are currently not locked (i.e., they have no lock or it has expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    notLocked?: boolean;

    /**
     * Only include external tasks that have a positive (&amp;gt; 0) number of retries (or &#x60;null&#x60;). Value may only be
     * &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    withRetriesLeft?: boolean;

    /**
     * Only include external tasks that have 0 retries. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any
     * external task.
     */
    noRetriesLeft?: boolean;

    /**
     * Restrict to external tasks that have a lock that expires after a given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    lockExpirationAfter?: string;

    /**
     * Restrict to external tasks that have a lock that expires before a given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    lockExpirationBefore?: string;

    /**
     * Filter by the id of the activity that an external task is created for.
     */
    activityId?: string;

    /**
     * Filter by the comma-separated list of ids of the activities that an external task is created for.
     */
    activityIdIn?: string;

    /**
     * Filter by the id of the execution that an external task belongs to.
     */
    executionId?: string;

    /**
     * Filter by the id of the process instance that an external task belongs to.
     */
    processInstanceId?: string;

    /**
     * Filter by a comma-separated list of process instance ids that an external task may belong to.
     */
    processInstanceIdIn?: string;

    /**
     * Filter by the id of the process definition that an external task belongs to.
     */
    processDefinitionId?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * An external task must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include active tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    active?: boolean;

    /**
     * Only include suspended tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    suspended?: boolean;

    /**
     * Only include jobs with a priority higher than or equal to the given value.
     * Value must be a valid &#x60;long&#x60; value.
     */
    priorityHigherThanOrEquals?: number;

    /**
     * Only include jobs with a priority lower than or equal to the given value.
     * Value must be a valid &#x60;long&#x60; value.
     */
    priorityLowerThanOrEquals?: number;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'id' | 'lockExpirationTime' | 'processInstanceId' | 'processDefinitionId' | 'processDefinitionKey' | 'taskPriority' | 'tenantId';

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
  }): Observable<StrictHttpResponse<Array<ExternalTaskDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.GetExternalTasksPath, 'get');
    if (params) {
      rb.query('externalTaskId', params.externalTaskId, {});
      rb.query('externalTaskIdIn', params.externalTaskIdIn, {});
      rb.query('topicName', params.topicName, {});
      rb.query('workerId', params.workerId, {});
      rb.query('locked', params.locked, {});
      rb.query('notLocked', params.notLocked, {});
      rb.query('withRetriesLeft', params.withRetriesLeft, {});
      rb.query('noRetriesLeft', params.noRetriesLeft, {});
      rb.query('lockExpirationAfter', params.lockExpirationAfter, {});
      rb.query('lockExpirationBefore', params.lockExpirationBefore, {});
      rb.query('activityId', params.activityId, {});
      rb.query('activityIdIn', params.activityIdIn, {});
      rb.query('executionId', params.executionId, {});
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('processInstanceIdIn', params.processInstanceIdIn, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('active', params.active, {});
      rb.query('suspended', params.suspended, {});
      rb.query('priorityHigherThanOrEquals', params.priorityHigherThanOrEquals, {});
      rb.query('priorityLowerThanOrEquals', params.priorityLowerThanOrEquals, {});
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
        return r as StrictHttpResponse<Array<ExternalTaskDto>>;
      })
    );
  }

  /**
   * Queries for the external tasks that fulfill given parameters. Parameters may be static as well as dynamic
   * runtime properties of executions. The size of the result set can be retrieved by using the
   * [Get External Task Count](https://docs.camunda.org/manual/7.14/reference/rest/external-task/get-query-count/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getExternalTasks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExternalTasks(params?: {

    /**
     * Filter by an external task&#x27;s id.
     */
    externalTaskId?: string;

    /**
     * Filter by the comma-separated list of external task ids.
     */
    externalTaskIdIn?: string;

    /**
     * Filter by an external task topic.
     */
    topicName?: string;

    /**
     * Filter by the id of the worker that the task was most recently locked by.
     */
    workerId?: string;

    /**
     * Only include external tasks that are currently locked (i.e., they have a lock time and it has not expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    locked?: boolean;

    /**
     * Only include external tasks that are currently not locked (i.e., they have no lock or it has expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    notLocked?: boolean;

    /**
     * Only include external tasks that have a positive (&amp;gt; 0) number of retries (or &#x60;null&#x60;). Value may only be
     * &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    withRetriesLeft?: boolean;

    /**
     * Only include external tasks that have 0 retries. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any
     * external task.
     */
    noRetriesLeft?: boolean;

    /**
     * Restrict to external tasks that have a lock that expires after a given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    lockExpirationAfter?: string;

    /**
     * Restrict to external tasks that have a lock that expires before a given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    lockExpirationBefore?: string;

    /**
     * Filter by the id of the activity that an external task is created for.
     */
    activityId?: string;

    /**
     * Filter by the comma-separated list of ids of the activities that an external task is created for.
     */
    activityIdIn?: string;

    /**
     * Filter by the id of the execution that an external task belongs to.
     */
    executionId?: string;

    /**
     * Filter by the id of the process instance that an external task belongs to.
     */
    processInstanceId?: string;

    /**
     * Filter by a comma-separated list of process instance ids that an external task may belong to.
     */
    processInstanceIdIn?: string;

    /**
     * Filter by the id of the process definition that an external task belongs to.
     */
    processDefinitionId?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * An external task must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include active tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    active?: boolean;

    /**
     * Only include suspended tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    suspended?: boolean;

    /**
     * Only include jobs with a priority higher than or equal to the given value.
     * Value must be a valid &#x60;long&#x60; value.
     */
    priorityHigherThanOrEquals?: number;

    /**
     * Only include jobs with a priority lower than or equal to the given value.
     * Value must be a valid &#x60;long&#x60; value.
     */
    priorityLowerThanOrEquals?: number;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'id' | 'lockExpirationTime' | 'processInstanceId' | 'processDefinitionId' | 'processDefinitionKey' | 'taskPriority' | 'tenantId';

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
  }): Observable<Array<ExternalTaskDto>> {

    return this.getExternalTasks$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ExternalTaskDto>>) => r.body as Array<ExternalTaskDto>)
    );
  }

  /**
   * Path part for operation queryExternalTasks
   */
  static readonly QueryExternalTasksPath = '/external-task';

  /**
   * Queries for external tasks that fulfill given parameters in the form of a JSON object.
   *
   * This method is slightly more powerful than the
   * [Get External Tasks](https://docs.camunda.org/manual/7.14/reference/rest/external-task/get-query/) method because it allows to
   * specify a hierarchical result sorting.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `queryExternalTasks()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryExternalTasks$Response(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: ExternalTaskQueryDto
  }): Observable<StrictHttpResponse<Array<ExternalTaskDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.QueryExternalTasksPath, 'post');
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
        return r as StrictHttpResponse<Array<ExternalTaskDto>>;
      })
    );
  }

  /**
   * Queries for external tasks that fulfill given parameters in the form of a JSON object.
   *
   * This method is slightly more powerful than the
   * [Get External Tasks](https://docs.camunda.org/manual/7.14/reference/rest/external-task/get-query/) method because it allows to
   * specify a hierarchical result sorting.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `queryExternalTasks$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryExternalTasks(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: ExternalTaskQueryDto
  }): Observable<Array<ExternalTaskDto>> {

    return this.queryExternalTasks$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ExternalTaskDto>>) => r.body as Array<ExternalTaskDto>)
    );
  }

  /**
   * Path part for operation getExternalTasksCount
   */
  static readonly GetExternalTasksCountPath = '/external-task/count';

  /**
   * Queries for the number of external tasks that fulfill given parameters. Takes the same parameters as the
   * [Get External Tasks](https://docs.camunda.org/manual/7.14/reference/rest/external-task/get-query/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getExternalTasksCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExternalTasksCount$Response(params?: {

    /**
     * Filter by an external task&#x27;s id.
     */
    externalTaskId?: string;

    /**
     * Filter by the comma-separated list of external task ids.
     */
    externalTaskIdIn?: string;

    /**
     * Filter by an external task topic.
     */
    topicName?: string;

    /**
     * Filter by the id of the worker that the task was most recently locked by.
     */
    workerId?: string;

    /**
     * Only include external tasks that are currently locked (i.e., they have a lock time and it has not expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    locked?: boolean;

    /**
     * Only include external tasks that are currently not locked (i.e., they have no lock or it has expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    notLocked?: boolean;

    /**
     * Only include external tasks that have a positive (&amp;gt; 0) number of retries (or &#x60;null&#x60;). Value may only be
     * &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    withRetriesLeft?: boolean;

    /**
     * Only include external tasks that have 0 retries. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any
     * external task.
     */
    noRetriesLeft?: boolean;

    /**
     * Restrict to external tasks that have a lock that expires after a given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    lockExpirationAfter?: string;

    /**
     * Restrict to external tasks that have a lock that expires before a given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    lockExpirationBefore?: string;

    /**
     * Filter by the id of the activity that an external task is created for.
     */
    activityId?: string;

    /**
     * Filter by the comma-separated list of ids of the activities that an external task is created for.
     */
    activityIdIn?: string;

    /**
     * Filter by the id of the execution that an external task belongs to.
     */
    executionId?: string;

    /**
     * Filter by the id of the process instance that an external task belongs to.
     */
    processInstanceId?: string;

    /**
     * Filter by a comma-separated list of process instance ids that an external task may belong to.
     */
    processInstanceIdIn?: string;

    /**
     * Filter by the id of the process definition that an external task belongs to.
     */
    processDefinitionId?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * An external task must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include active tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    active?: boolean;

    /**
     * Only include suspended tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    suspended?: boolean;

    /**
     * Only include jobs with a priority higher than or equal to the given value.
     * Value must be a valid &#x60;long&#x60; value.
     */
    priorityHigherThanOrEquals?: number;

    /**
     * Only include jobs with a priority lower than or equal to the given value.
     * Value must be a valid &#x60;long&#x60; value.
     */
    priorityLowerThanOrEquals?: number;
  }): Observable<StrictHttpResponse<CountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.GetExternalTasksCountPath, 'get');
    if (params) {
      rb.query('externalTaskId', params.externalTaskId, {});
      rb.query('externalTaskIdIn', params.externalTaskIdIn, {});
      rb.query('topicName', params.topicName, {});
      rb.query('workerId', params.workerId, {});
      rb.query('locked', params.locked, {});
      rb.query('notLocked', params.notLocked, {});
      rb.query('withRetriesLeft', params.withRetriesLeft, {});
      rb.query('noRetriesLeft', params.noRetriesLeft, {});
      rb.query('lockExpirationAfter', params.lockExpirationAfter, {});
      rb.query('lockExpirationBefore', params.lockExpirationBefore, {});
      rb.query('activityId', params.activityId, {});
      rb.query('activityIdIn', params.activityIdIn, {});
      rb.query('executionId', params.executionId, {});
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('processInstanceIdIn', params.processInstanceIdIn, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('active', params.active, {});
      rb.query('suspended', params.suspended, {});
      rb.query('priorityHigherThanOrEquals', params.priorityHigherThanOrEquals, {});
      rb.query('priorityLowerThanOrEquals', params.priorityLowerThanOrEquals, {});
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
   * Queries for the number of external tasks that fulfill given parameters. Takes the same parameters as the
   * [Get External Tasks](https://docs.camunda.org/manual/7.14/reference/rest/external-task/get-query/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getExternalTasksCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExternalTasksCount(params?: {

    /**
     * Filter by an external task&#x27;s id.
     */
    externalTaskId?: string;

    /**
     * Filter by the comma-separated list of external task ids.
     */
    externalTaskIdIn?: string;

    /**
     * Filter by an external task topic.
     */
    topicName?: string;

    /**
     * Filter by the id of the worker that the task was most recently locked by.
     */
    workerId?: string;

    /**
     * Only include external tasks that are currently locked (i.e., they have a lock time and it has not expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    locked?: boolean;

    /**
     * Only include external tasks that are currently not locked (i.e., they have no lock or it has expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    notLocked?: boolean;

    /**
     * Only include external tasks that have a positive (&amp;gt; 0) number of retries (or &#x60;null&#x60;). Value may only be
     * &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    withRetriesLeft?: boolean;

    /**
     * Only include external tasks that have 0 retries. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any
     * external task.
     */
    noRetriesLeft?: boolean;

    /**
     * Restrict to external tasks that have a lock that expires after a given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    lockExpirationAfter?: string;

    /**
     * Restrict to external tasks that have a lock that expires before a given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    lockExpirationBefore?: string;

    /**
     * Filter by the id of the activity that an external task is created for.
     */
    activityId?: string;

    /**
     * Filter by the comma-separated list of ids of the activities that an external task is created for.
     */
    activityIdIn?: string;

    /**
     * Filter by the id of the execution that an external task belongs to.
     */
    executionId?: string;

    /**
     * Filter by the id of the process instance that an external task belongs to.
     */
    processInstanceId?: string;

    /**
     * Filter by a comma-separated list of process instance ids that an external task may belong to.
     */
    processInstanceIdIn?: string;

    /**
     * Filter by the id of the process definition that an external task belongs to.
     */
    processDefinitionId?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * An external task must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include active tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    active?: boolean;

    /**
     * Only include suspended tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    suspended?: boolean;

    /**
     * Only include jobs with a priority higher than or equal to the given value.
     * Value must be a valid &#x60;long&#x60; value.
     */
    priorityHigherThanOrEquals?: number;

    /**
     * Only include jobs with a priority lower than or equal to the given value.
     * Value must be a valid &#x60;long&#x60; value.
     */
    priorityLowerThanOrEquals?: number;
  }): Observable<CountResultDto> {

    return this.getExternalTasksCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountResultDto>) => r.body as CountResultDto)
    );
  }

  /**
   * Path part for operation queryExternalTasksCount
   */
  static readonly QueryExternalTasksCountPath = '/external-task/count';

  /**
   * Queries for the number of external tasks that fulfill given parameters. This method takes the same message
   * body as the [Get External Tasks (POST)](https://docs.camunda.org/manual/7.14/reference/rest/external-task/post-query/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `queryExternalTasksCount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryExternalTasksCount$Response(params?: {
    body?: ExternalTaskQueryDto
  }): Observable<StrictHttpResponse<CountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.QueryExternalTasksCountPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * Queries for the number of external tasks that fulfill given parameters. This method takes the same message
   * body as the [Get External Tasks (POST)](https://docs.camunda.org/manual/7.14/reference/rest/external-task/post-query/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `queryExternalTasksCount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryExternalTasksCount(params?: {
    body?: ExternalTaskQueryDto
  }): Observable<CountResultDto> {

    return this.queryExternalTasksCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountResultDto>) => r.body as CountResultDto)
    );
  }

  /**
   * Path part for operation fetchAndLock
   */
  static readonly FetchAndLockPath = '/external-task/fetchAndLock';

  /**
   * Fetches and locks a specific number of external tasks for execution by a worker. Query can be restricted
   * to specific task topics and for each task topic an individual lock time can be provided.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fetchAndLock()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fetchAndLock$Response(params?: {
    body?: FetchExternalTasksDto
  }): Observable<StrictHttpResponse<Array<LockedExternalTaskDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.FetchAndLockPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LockedExternalTaskDto>>;
      })
    );
  }

  /**
   * Fetches and locks a specific number of external tasks for execution by a worker. Query can be restricted
   * to specific task topics and for each task topic an individual lock time can be provided.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `fetchAndLock$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fetchAndLock(params?: {
    body?: FetchExternalTasksDto
  }): Observable<Array<LockedExternalTaskDto>> {

    return this.fetchAndLock$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LockedExternalTaskDto>>) => r.body as Array<LockedExternalTaskDto>)
    );
  }

  /**
   * Path part for operation setExternalTaskRetries
   */
  static readonly SetExternalTaskRetriesPath = '/external-task/retries';

  /**
   * Sets the number of retries left to execute external tasks by id synchronously. If retries are set to 0, 
   * an incident is created.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setExternalTaskRetries()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setExternalTaskRetries$Response(params?: {
    body?: SetRetriesForExternalTasksDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.SetExternalTaskRetriesPath, 'put');
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
   * Sets the number of retries left to execute external tasks by id synchronously. If retries are set to 0, 
   * an incident is created.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setExternalTaskRetries$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setExternalTaskRetries(params?: {
    body?: SetRetriesForExternalTasksDto
  }): Observable<void> {

    return this.setExternalTaskRetries$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation setExternalTaskRetriesAsyncOperation
   */
  static readonly SetExternalTaskRetriesAsyncOperationPath = '/external-task/retries-async';

  /**
   * Sets the number of retries left to execute external tasks by id asynchronously. If retries are set to 0,
   * an incident is created.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setExternalTaskRetriesAsyncOperation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setExternalTaskRetriesAsyncOperation$Response(params?: {
    body?: SetRetriesForExternalTasksDto
  }): Observable<StrictHttpResponse<BatchDto>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.SetExternalTaskRetriesAsyncOperationPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BatchDto>;
      })
    );
  }

  /**
   * Sets the number of retries left to execute external tasks by id asynchronously. If retries are set to 0,
   * an incident is created.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setExternalTaskRetriesAsyncOperation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setExternalTaskRetriesAsyncOperation(params?: {
    body?: SetRetriesForExternalTasksDto
  }): Observable<BatchDto> {

    return this.setExternalTaskRetriesAsyncOperation$Response(params).pipe(
      map((r: StrictHttpResponse<BatchDto>) => r.body as BatchDto)
    );
  }

  /**
   * Path part for operation getTopicNames
   */
  static readonly GetTopicNamesPath = '/external-task/topic-names';

  /**
   * Queries for distinct topic names of external tasks that fulfill given parameters.
   * Query can be restricted to only tasks with retries left, tasks that are locked, or tasks
   * that are unlocked. The parameters withLockedTasks and withUnlockedTasks are
   * exclusive. Setting them both to true will return an empty list.
   * Providing no parameters will return a list of all distinct topic names with external tasks.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTopicNames()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopicNames$Response(params?: {

    /**
     * Only include external tasks that are currently locked (i.e., they have a lock time and it has not expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    withLockedTasks?: boolean;

    /**
     * Only include external tasks that are currently not locked (i.e., they have no lock or it has expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    withUnlockedTasks?: boolean;

    /**
     * Only include external tasks that have a positive (&amp;gt; 0) number of retries (or &#x60;null&#x60;). Value may only be
     * &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    withRetriesLeft?: boolean;
  }): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.GetTopicNamesPath, 'get');
    if (params) {
      rb.query('withLockedTasks', params.withLockedTasks, {});
      rb.query('withUnlockedTasks', params.withUnlockedTasks, {});
      rb.query('withRetriesLeft', params.withRetriesLeft, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * Queries for distinct topic names of external tasks that fulfill given parameters.
   * Query can be restricted to only tasks with retries left, tasks that are locked, or tasks
   * that are unlocked. The parameters withLockedTasks and withUnlockedTasks are
   * exclusive. Setting them both to true will return an empty list.
   * Providing no parameters will return a list of all distinct topic names with external tasks.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTopicNames$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopicNames(params?: {

    /**
     * Only include external tasks that are currently locked (i.e., they have a lock time and it has not expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    withLockedTasks?: boolean;

    /**
     * Only include external tasks that are currently not locked (i.e., they have no lock or it has expired).
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    withUnlockedTasks?: boolean;

    /**
     * Only include external tasks that have a positive (&amp;gt; 0) number of retries (or &#x60;null&#x60;). Value may only be
     * &#x60;true&#x60;, as &#x60;false&#x60; matches any external task.
     */
    withRetriesLeft?: boolean;
  }): Observable<Array<string>> {

    return this.getTopicNames$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation getExternalTask
   */
  static readonly GetExternalTaskPath = '/external-task/{id}';

  /**
   * Retrieves an external task by id, corresponding to the `ExternalTask` interface in the engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getExternalTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExternalTask$Response(params: {

    /**
     * The id of the external task to be retrieved.
     */
    id: string;
  }): Observable<StrictHttpResponse<ExternalTaskDto>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.GetExternalTaskPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ExternalTaskDto>;
      })
    );
  }

  /**
   * Retrieves an external task by id, corresponding to the `ExternalTask` interface in the engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getExternalTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExternalTask(params: {

    /**
     * The id of the external task to be retrieved.
     */
    id: string;
  }): Observable<ExternalTaskDto> {

    return this.getExternalTask$Response(params).pipe(
      map((r: StrictHttpResponse<ExternalTaskDto>) => r.body as ExternalTaskDto)
    );
  }

  /**
   * Path part for operation handleExternalTaskBpmnError
   */
  static readonly HandleExternalTaskBpmnErrorPath = '/external-task/{id}/bpmnError';

  /**
   * Reports a business error in the context of a running external task by id. The error code must be specified
   * to identify the BPMN error handler.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `handleExternalTaskBpmnError()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  handleExternalTaskBpmnError$Response(params: {

    /**
     * The id of the external task in which context a BPMN error is reported.
     */
    id: string;
    body?: ExternalTaskBpmnError
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.HandleExternalTaskBpmnErrorPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
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
   * Reports a business error in the context of a running external task by id. The error code must be specified
   * to identify the BPMN error handler.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `handleExternalTaskBpmnError$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  handleExternalTaskBpmnError(params: {

    /**
     * The id of the external task in which context a BPMN error is reported.
     */
    id: string;
    body?: ExternalTaskBpmnError
  }): Observable<void> {

    return this.handleExternalTaskBpmnError$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation completeExternalTaskResource
   */
  static readonly CompleteExternalTaskResourcePath = '/external-task/{id}/complete';

  /**
   * Completes an external task by id and updates process variables.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeExternalTaskResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeExternalTaskResource$Response(params: {

    /**
     * The id of the task to complete.
     */
    id: string;
    body?: CompleteExternalTaskDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.CompleteExternalTaskResourcePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
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
   * Completes an external task by id and updates process variables.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `completeExternalTaskResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeExternalTaskResource(params: {

    /**
     * The id of the task to complete.
     */
    id: string;
    body?: CompleteExternalTaskDto
  }): Observable<void> {

    return this.completeExternalTaskResource$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getExternalTaskErrorDetails
   */
  static readonly GetExternalTaskErrorDetailsPath = '/external-task/{id}/errorDetails';

  /**
   * Retrieves the error details in the context of a running external task by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getExternalTaskErrorDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExternalTaskErrorDetails$Response(params: {

    /**
     * The id of the external task for which the error details should be retrieved.
     */
    id: string;
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.GetExternalTaskErrorDetailsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Retrieves the error details in the context of a running external task by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getExternalTaskErrorDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExternalTaskErrorDetails(params: {

    /**
     * The id of the external task for which the error details should be retrieved.
     */
    id: string;
  }): Observable<string> {

    return this.getExternalTaskErrorDetails$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation extendLock
   */
  static readonly ExtendLockPath = '/external-task/{id}/extendLock';

  /**
   * Extends the timeout of the lock by a given amount of time.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `extendLock()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  extendLock$Response(params: {

    /**
     * The id of the external task.
     */
    id: string;
    body?: ExtendLockOnExternalTaskDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.ExtendLockPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
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
   * Extends the timeout of the lock by a given amount of time.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `extendLock$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  extendLock(params: {

    /**
     * The id of the external task.
     */
    id: string;
    body?: ExtendLockOnExternalTaskDto
  }): Observable<void> {

    return this.extendLock$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation handleFailure
   */
  static readonly HandleFailurePath = '/external-task/{id}/failure';

  /**
   * Reports a failure to execute an external task by id. A number of retries and a timeout until the task can
   * be retried can be specified. If retries are set to 0, an incident for this task is created.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `handleFailure()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  handleFailure$Response(params: {

    /**
     * The id of the external task to report a failure for.
     */
    id: string;
    body?: ExternalTaskFailureDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.HandleFailurePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
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
   * Reports a failure to execute an external task by id. A number of retries and a timeout until the task can
   * be retried can be specified. If retries are set to 0, an incident for this task is created.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `handleFailure$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  handleFailure(params: {

    /**
     * The id of the external task to report a failure for.
     */
    id: string;
    body?: ExternalTaskFailureDto
  }): Observable<void> {

    return this.handleFailure$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation setExternalTaskResourcePriority
   */
  static readonly SetExternalTaskResourcePriorityPath = '/external-task/{id}/priority';

  /**
   * Sets the priority of an existing external task by id. The default value of a priority is 0.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setExternalTaskResourcePriority()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setExternalTaskResourcePriority$Response(params: {

    /**
     * The id of the external task to set the priority for.
     */
    id: string;
    body?: PriorityDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.SetExternalTaskResourcePriorityPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
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
   * Sets the priority of an existing external task by id. The default value of a priority is 0.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setExternalTaskResourcePriority$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setExternalTaskResourcePriority(params: {

    /**
     * The id of the external task to set the priority for.
     */
    id: string;
    body?: PriorityDto
  }): Observable<void> {

    return this.setExternalTaskResourcePriority$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation setExternalTaskResourceRetries
   */
  static readonly SetExternalTaskResourceRetriesPath = '/external-task/{id}/retries';

  /**
   * Sets the number of retries left to execute an external task by id. If retries are set to 0, an 
   * incident is created.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setExternalTaskResourceRetries()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setExternalTaskResourceRetries$Response(params: {

    /**
     * The id of the external task to set the number of retries for.
     */
    id: string;
    body?: RetriesDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.SetExternalTaskResourceRetriesPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
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
   * Sets the number of retries left to execute an external task by id. If retries are set to 0, an 
   * incident is created.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setExternalTaskResourceRetries$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setExternalTaskResourceRetries(params: {

    /**
     * The id of the external task to set the number of retries for.
     */
    id: string;
    body?: RetriesDto
  }): Observable<void> {

    return this.setExternalTaskResourceRetries$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation unlock
   */
  static readonly UnlockPath = '/external-task/{id}/unlock';

  /**
   * Unlocks an external task by id. Clears the task's lock expiration time and worker id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlock()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlock$Response(params: {

    /**
     * The id of the external task to unlock.
     */
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalTaskService.UnlockPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
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
   * Unlocks an external task by id. Clears the task's lock expiration time and worker id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlock$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlock(params: {

    /**
     * The id of the external task to unlock.
     */
    id: string;
  }): Observable<void> {

    return this.unlock$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
