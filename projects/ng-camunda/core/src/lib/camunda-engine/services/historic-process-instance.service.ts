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
import { CountResultDto } from '../models/count-result-dto';
import { DeleteHistoricProcessInstancesDto } from '../models/delete-historic-process-instances-dto';
import { HistoricProcessInstanceDto } from '../models/historic-process-instance-dto';
import { HistoricProcessInstanceQueryDto } from '../models/historic-process-instance-query-dto';
import { SetRemovalTimeToHistoricProcessInstancesDto } from '../models/set-removal-time-to-historic-process-instances-dto';

@Injectable({
  providedIn: 'root',
})
export class HistoricProcessInstanceService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getHistoricProcessInstances
   */
  static readonly GetHistoricProcessInstancesPath = '/history/process-instance';

  /**
   * Get List.
   *
   * Queries for historic process instances that fulfill the given parameters.
   * The size of the result set can be retrieved by using the
   * [Get Process Instance Count](https://docs.camunda.org/manual/7.14/reference/rest/history/process-instance/get-process-instance-query-count/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHistoricProcessInstances()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricProcessInstances$Response(params?: {

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'instanceId' | 'definitionId' | 'definitionKey' | 'definitionName' | 'definitionVersion' | 'businessKey' | 'startTime' | 'endTime' | 'duration' | 'tenantId';

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
     * Filter by process instance id.
     */
    processInstanceId?: string;

    /**
     * Filter by process instance ids. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processInstanceIds?: string;

    /**
     * Filter by the process definition the instances run on.
     */
    processDefinitionId?: string;

    /**
     * Filter by the key of the process definition the instances run on.
     */
    processDefinitionKey?: string;

    /**
     * Filter by a list of process definition keys. A process instance must have one of the given process definition keys. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processDefinitionKeyIn?: string;

    /**
     * Filter by the name of the process definition the instances run on.
     */
    processDefinitionName?: string;

    /**
     * Filter by process definition names that the parameter is a substring of.
     */
    processDefinitionNameLike?: string;

    /**
     * Exclude instances that belong to a set of process definitions. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processDefinitionKeyNotIn?: string;

    /**
     * Filter by process instance business key.
     */
    processInstanceBusinessKey?: string;

    /**
     * Filter by process instance business key that the parameter is a substring of.
     */
    processInstanceBusinessKeyLike?: string;

    /**
     * Restrict the query to all process instances that are top level process instances.
     */
    rootProcessInstances?: boolean;

    /**
     * Only include finished process instances. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    finished?: boolean;

    /**
     * Only include unfinished process instances. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    unfinished?: boolean;

    /**
     * Only include process instances which have an incident. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withIncidents?: boolean;

    /**
     * Only include process instances which have a root incident. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withRootIncidents?: boolean;

    /**
     * Filter by the incident type. See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types) for a list of incident types.
     */
    incidentType?: string;

    /**
     * Only include process instances which have an incident in status either open or resolved. To get all process instances, use the query parameter withIncidents.
     */
    incidentStatus?: 'open' | 'resolved';

    /**
     * Filter by the incident message. Exact match.
     */
    incidentMessage?: string;

    /**
     * Filter by the incident message that the parameter is a substring of.
     */
    incidentMessageLike?: string;

    /**
     * Restrict to instances that were started before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedBefore?: string;

    /**
     * Restrict to instances that were started after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedAfter?: string;

    /**
     * Restrict to instances that were finished before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedBefore?: string;

    /**
     * Restrict to instances that were finished after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedAfter?: string;

    /**
     * Restrict to instances that executed an activity after the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedActivityAfter?: string;

    /**
     * Restrict to instances that executed an activity before the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedActivityBefore?: string;

    /**
     * Restrict to instances that executed an job after the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedJobAfter?: string;

    /**
     * Restrict to instances that executed an job before the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedJobBefore?: string;

    /**
     * Only include process instances that were started by the given user.
     */
    startedBy?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given process instance. Takes a process instance id.
     */
    superProcessInstanceId?: string;

    /**
     * Restrict query to one process instance that has a sub process instance with the given id.
     */
    subProcessInstanceId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.
     */
    superCaseInstanceId?: string;

    /**
     * Restrict query to one process instance that has a sub case instance with the given id.
     */
    subCaseInstanceId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.
     */
    caseInstanceId?: string;

    /**
     * Filter by a list of tenant ids. A process instance must have one of the given tenant ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    tenantIdIn?: string;

    /**
     * Only include historic process instances which belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Restrict to instances that executed an activity with one of given ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    executedActivityIdIn?: string;

    /**
     * Restrict to instances that have an active activity with one of given ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    activeActivityIdIn?: string;

    /**
     * Restrict to instances that are active.
     */
    active?: boolean;

    /**
     * Restrict to instances that are suspended.
     */
    suspended?: boolean;

    /**
     * Restrict to instances that are completed.
     */
    completed?: boolean;

    /**
     * Restrict to instances that are externallyTerminated.
     */
    externallyTerminated?: boolean;

    /**
     * Restrict to instances that are internallyTerminated.
     */
    internallyTerminated?: boolean;

    /**
     * Only include process instances that have/had variables with certain values.
     * Variable filtering expressions are comma-separated and are structured as follows:
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name, &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note:** Values are always treated as String objects on server side.
     *
     * Valid operator values are: &#x60;eq&#x60; - equal to; &#x60;neq&#x60; - not equal to; &#x60;gt&#x60; - greater than; &#x60;gteq&#x60; - greater than or equal to; &#x60;lt&#x60; - lower than; &#x60;lteq&#x60; - lower than or equal to; &#x60;like&#x60;.
     *
     * Key and value may not contain underscore or comma characters.
     */
    variables?: string;

    /**
     * Match all variable names provided in variables case-insensitively. If set to &#x60;true&#x60; variableName and variablename are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values provided in variables case-insensitively. If set to &#x60;true&#x60; variableValue and variablevalue are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;
  }): Observable<StrictHttpResponse<Array<HistoricProcessInstanceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, HistoricProcessInstanceService.GetHistoricProcessInstancesPath, 'get');
    if (params) {
      rb.query('sortBy', params.sortBy, {});
      rb.query('sortOrder', params.sortOrder, {});
      rb.query('firstResult', params.firstResult, {});
      rb.query('maxResults', params.maxResults, {});
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('processInstanceIds', params.processInstanceIds, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('processDefinitionKey', params.processDefinitionKey, {});
      rb.query('processDefinitionKeyIn', params.processDefinitionKeyIn, {});
      rb.query('processDefinitionName', params.processDefinitionName, {});
      rb.query('processDefinitionNameLike', params.processDefinitionNameLike, {});
      rb.query('processDefinitionKeyNotIn', params.processDefinitionKeyNotIn, {});
      rb.query('processInstanceBusinessKey', params.processInstanceBusinessKey, {});
      rb.query('processInstanceBusinessKeyLike', params.processInstanceBusinessKeyLike, {});
      rb.query('rootProcessInstances', params.rootProcessInstances, {});
      rb.query('finished', params.finished, {});
      rb.query('unfinished', params.unfinished, {});
      rb.query('withIncidents', params.withIncidents, {});
      rb.query('withRootIncidents', params.withRootIncidents, {});
      rb.query('incidentType', params.incidentType, {});
      rb.query('incidentStatus', params.incidentStatus, {});
      rb.query('incidentMessage', params.incidentMessage, {});
      rb.query('incidentMessageLike', params.incidentMessageLike, {});
      rb.query('startedBefore', params.startedBefore, {});
      rb.query('startedAfter', params.startedAfter, {});
      rb.query('finishedBefore', params.finishedBefore, {});
      rb.query('finishedAfter', params.finishedAfter, {});
      rb.query('executedActivityAfter', params.executedActivityAfter, {});
      rb.query('executedActivityBefore', params.executedActivityBefore, {});
      rb.query('executedJobAfter', params.executedJobAfter, {});
      rb.query('executedJobBefore', params.executedJobBefore, {});
      rb.query('startedBy', params.startedBy, {});
      rb.query('superProcessInstanceId', params.superProcessInstanceId, {});
      rb.query('subProcessInstanceId', params.subProcessInstanceId, {});
      rb.query('superCaseInstanceId', params.superCaseInstanceId, {});
      rb.query('subCaseInstanceId', params.subCaseInstanceId, {});
      rb.query('caseInstanceId', params.caseInstanceId, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('executedActivityIdIn', params.executedActivityIdIn, {});
      rb.query('activeActivityIdIn', params.activeActivityIdIn, {});
      rb.query('active', params.active, {});
      rb.query('suspended', params.suspended, {});
      rb.query('completed', params.completed, {});
      rb.query('externallyTerminated', params.externallyTerminated, {});
      rb.query('internallyTerminated', params.internallyTerminated, {});
      rb.query('variables', params.variables, {});
      rb.query('variableNamesIgnoreCase', params.variableNamesIgnoreCase, {});
      rb.query('variableValuesIgnoreCase', params.variableValuesIgnoreCase, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<HistoricProcessInstanceDto>>;
      })
    );
  }

  /**
   * Get List.
   *
   * Queries for historic process instances that fulfill the given parameters.
   * The size of the result set can be retrieved by using the
   * [Get Process Instance Count](https://docs.camunda.org/manual/7.14/reference/rest/history/process-instance/get-process-instance-query-count/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHistoricProcessInstances$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricProcessInstances(params?: {

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'instanceId' | 'definitionId' | 'definitionKey' | 'definitionName' | 'definitionVersion' | 'businessKey' | 'startTime' | 'endTime' | 'duration' | 'tenantId';

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
     * Filter by process instance id.
     */
    processInstanceId?: string;

    /**
     * Filter by process instance ids. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processInstanceIds?: string;

    /**
     * Filter by the process definition the instances run on.
     */
    processDefinitionId?: string;

    /**
     * Filter by the key of the process definition the instances run on.
     */
    processDefinitionKey?: string;

    /**
     * Filter by a list of process definition keys. A process instance must have one of the given process definition keys. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processDefinitionKeyIn?: string;

    /**
     * Filter by the name of the process definition the instances run on.
     */
    processDefinitionName?: string;

    /**
     * Filter by process definition names that the parameter is a substring of.
     */
    processDefinitionNameLike?: string;

    /**
     * Exclude instances that belong to a set of process definitions. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processDefinitionKeyNotIn?: string;

    /**
     * Filter by process instance business key.
     */
    processInstanceBusinessKey?: string;

    /**
     * Filter by process instance business key that the parameter is a substring of.
     */
    processInstanceBusinessKeyLike?: string;

    /**
     * Restrict the query to all process instances that are top level process instances.
     */
    rootProcessInstances?: boolean;

    /**
     * Only include finished process instances. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    finished?: boolean;

    /**
     * Only include unfinished process instances. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    unfinished?: boolean;

    /**
     * Only include process instances which have an incident. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withIncidents?: boolean;

    /**
     * Only include process instances which have a root incident. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withRootIncidents?: boolean;

    /**
     * Filter by the incident type. See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types) for a list of incident types.
     */
    incidentType?: string;

    /**
     * Only include process instances which have an incident in status either open or resolved. To get all process instances, use the query parameter withIncidents.
     */
    incidentStatus?: 'open' | 'resolved';

    /**
     * Filter by the incident message. Exact match.
     */
    incidentMessage?: string;

    /**
     * Filter by the incident message that the parameter is a substring of.
     */
    incidentMessageLike?: string;

    /**
     * Restrict to instances that were started before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedBefore?: string;

    /**
     * Restrict to instances that were started after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedAfter?: string;

    /**
     * Restrict to instances that were finished before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedBefore?: string;

    /**
     * Restrict to instances that were finished after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedAfter?: string;

    /**
     * Restrict to instances that executed an activity after the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedActivityAfter?: string;

    /**
     * Restrict to instances that executed an activity before the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedActivityBefore?: string;

    /**
     * Restrict to instances that executed an job after the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedJobAfter?: string;

    /**
     * Restrict to instances that executed an job before the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedJobBefore?: string;

    /**
     * Only include process instances that were started by the given user.
     */
    startedBy?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given process instance. Takes a process instance id.
     */
    superProcessInstanceId?: string;

    /**
     * Restrict query to one process instance that has a sub process instance with the given id.
     */
    subProcessInstanceId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.
     */
    superCaseInstanceId?: string;

    /**
     * Restrict query to one process instance that has a sub case instance with the given id.
     */
    subCaseInstanceId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.
     */
    caseInstanceId?: string;

    /**
     * Filter by a list of tenant ids. A process instance must have one of the given tenant ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    tenantIdIn?: string;

    /**
     * Only include historic process instances which belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Restrict to instances that executed an activity with one of given ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    executedActivityIdIn?: string;

    /**
     * Restrict to instances that have an active activity with one of given ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    activeActivityIdIn?: string;

    /**
     * Restrict to instances that are active.
     */
    active?: boolean;

    /**
     * Restrict to instances that are suspended.
     */
    suspended?: boolean;

    /**
     * Restrict to instances that are completed.
     */
    completed?: boolean;

    /**
     * Restrict to instances that are externallyTerminated.
     */
    externallyTerminated?: boolean;

    /**
     * Restrict to instances that are internallyTerminated.
     */
    internallyTerminated?: boolean;

    /**
     * Only include process instances that have/had variables with certain values.
     * Variable filtering expressions are comma-separated and are structured as follows:
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name, &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note:** Values are always treated as String objects on server side.
     *
     * Valid operator values are: &#x60;eq&#x60; - equal to; &#x60;neq&#x60; - not equal to; &#x60;gt&#x60; - greater than; &#x60;gteq&#x60; - greater than or equal to; &#x60;lt&#x60; - lower than; &#x60;lteq&#x60; - lower than or equal to; &#x60;like&#x60;.
     *
     * Key and value may not contain underscore or comma characters.
     */
    variables?: string;

    /**
     * Match all variable names provided in variables case-insensitively. If set to &#x60;true&#x60; variableName and variablename are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values provided in variables case-insensitively. If set to &#x60;true&#x60; variableValue and variablevalue are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;
  }): Observable<Array<HistoricProcessInstanceDto>> {

    return this.getHistoricProcessInstances$Response(params).pipe(
      map((r: StrictHttpResponse<Array<HistoricProcessInstanceDto>>) => r.body as Array<HistoricProcessInstanceDto>)
    );
  }

  /**
   * Path part for operation queryHistoricProcessInstances
   */
  static readonly QueryHistoricProcessInstancesPath = '/history/process-instance';

  /**
   * Get List (POST).
   *
   * Queries for historic process instances that fulfill the given parameters.
   * This method is slightly more powerful than the
   * [Get Process Instance](https://docs.camunda.org/manual/7.14/reference/rest/history/process-instance/get-process-instance-query/)
   * because it allows filtering by multiple process variables of types `String`, `Number` or `Boolean`.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `queryHistoricProcessInstances()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryHistoricProcessInstances$Response(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: HistoricProcessInstanceQueryDto
  }): Observable<StrictHttpResponse<Array<HistoricProcessInstanceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, HistoricProcessInstanceService.QueryHistoricProcessInstancesPath, 'post');
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
        return r as StrictHttpResponse<Array<HistoricProcessInstanceDto>>;
      })
    );
  }

  /**
   * Get List (POST).
   *
   * Queries for historic process instances that fulfill the given parameters.
   * This method is slightly more powerful than the
   * [Get Process Instance](https://docs.camunda.org/manual/7.14/reference/rest/history/process-instance/get-process-instance-query/)
   * because it allows filtering by multiple process variables of types `String`, `Number` or `Boolean`.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `queryHistoricProcessInstances$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryHistoricProcessInstances(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: HistoricProcessInstanceQueryDto
  }): Observable<Array<HistoricProcessInstanceDto>> {

    return this.queryHistoricProcessInstances$Response(params).pipe(
      map((r: StrictHttpResponse<Array<HistoricProcessInstanceDto>>) => r.body as Array<HistoricProcessInstanceDto>)
    );
  }

  /**
   * Path part for operation getHistoricProcessInstancesCount
   */
  static readonly GetHistoricProcessInstancesCountPath = '/history/process-instance/count';

  /**
   * Get List Count.
   *
   * Queries for the number of historic process instances that fulfill the given parameters.
   * Takes the same parameters as the [Get Process Instances](https://docs.camunda.org/manual/7.14/reference/rest/history/process-instance/get-process-instance-query/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHistoricProcessInstancesCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricProcessInstancesCount$Response(params?: {

    /**
     * Filter by process instance id.
     */
    processInstanceId?: string;

    /**
     * Filter by process instance ids. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processInstanceIds?: string;

    /**
     * Filter by the process definition the instances run on.
     */
    processDefinitionId?: string;

    /**
     * Filter by the key of the process definition the instances run on.
     */
    processDefinitionKey?: string;

    /**
     * Filter by a list of process definition keys. A process instance must have one of the given process definition keys. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processDefinitionKeyIn?: string;

    /**
     * Filter by the name of the process definition the instances run on.
     */
    processDefinitionName?: string;

    /**
     * Filter by process definition names that the parameter is a substring of.
     */
    processDefinitionNameLike?: string;

    /**
     * Exclude instances that belong to a set of process definitions. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processDefinitionKeyNotIn?: string;

    /**
     * Filter by process instance business key.
     */
    processInstanceBusinessKey?: string;

    /**
     * Filter by process instance business key that the parameter is a substring of.
     */
    processInstanceBusinessKeyLike?: string;

    /**
     * Restrict the query to all process instances that are top level process instances.
     */
    rootProcessInstances?: boolean;

    /**
     * Only include finished process instances. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    finished?: boolean;

    /**
     * Only include unfinished process instances. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    unfinished?: boolean;

    /**
     * Only include process instances which have an incident. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withIncidents?: boolean;

    /**
     * Only include process instances which have a root incident. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withRootIncidents?: boolean;

    /**
     * Filter by the incident type. See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types) for a list of incident types.
     */
    incidentType?: string;

    /**
     * Only include process instances which have an incident in status either open or resolved. To get all process instances, use the query parameter withIncidents.
     */
    incidentStatus?: 'open' | 'resolved';

    /**
     * Filter by the incident message. Exact match.
     */
    incidentMessage?: string;

    /**
     * Filter by the incident message that the parameter is a substring of.
     */
    incidentMessageLike?: string;

    /**
     * Restrict to instances that were started before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedBefore?: string;

    /**
     * Restrict to instances that were started after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedAfter?: string;

    /**
     * Restrict to instances that were finished before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedBefore?: string;

    /**
     * Restrict to instances that were finished after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedAfter?: string;

    /**
     * Restrict to instances that executed an activity after the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedActivityAfter?: string;

    /**
     * Restrict to instances that executed an activity before the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedActivityBefore?: string;

    /**
     * Restrict to instances that executed an job after the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedJobAfter?: string;

    /**
     * Restrict to instances that executed an job before the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedJobBefore?: string;

    /**
     * Only include process instances that were started by the given user.
     */
    startedBy?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given process instance. Takes a process instance id.
     */
    superProcessInstanceId?: string;

    /**
     * Restrict query to one process instance that has a sub process instance with the given id.
     */
    subProcessInstanceId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.
     */
    superCaseInstanceId?: string;

    /**
     * Restrict query to one process instance that has a sub case instance with the given id.
     */
    subCaseInstanceId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.
     */
    caseInstanceId?: string;

    /**
     * Filter by a list of tenant ids. A process instance must have one of the given tenant ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    tenantIdIn?: string;

    /**
     * Only include historic process instances which belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Restrict to instances that executed an activity with one of given ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    executedActivityIdIn?: string;

    /**
     * Restrict to instances that have an active activity with one of given ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    activeActivityIdIn?: string;

    /**
     * Restrict to instances that are active.
     */
    active?: boolean;

    /**
     * Restrict to instances that are suspended.
     */
    suspended?: boolean;

    /**
     * Restrict to instances that are completed.
     */
    completed?: boolean;

    /**
     * Restrict to instances that are externallyTerminated.
     */
    externallyTerminated?: boolean;

    /**
     * Restrict to instances that are internallyTerminated.
     */
    internallyTerminated?: boolean;

    /**
     * Only include process instances that have/had variables with certain values.
     * Variable filtering expressions are comma-separated and are structured as follows:
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name, &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note:** Values are always treated as String objects on server side.
     *
     * Valid operator values are: &#x60;eq&#x60; - equal to; &#x60;neq&#x60; - not equal to; &#x60;gt&#x60; - greater than; &#x60;gteq&#x60; - greater than or equal to; &#x60;lt&#x60; - lower than; &#x60;lteq&#x60; - lower than or equal to; &#x60;like&#x60;.
     *
     * Key and value may not contain underscore or comma characters.
     */
    variables?: string;

    /**
     * Match all variable names provided in variables case-insensitively. If set to &#x60;true&#x60; variableName and variablename are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values provided in variables case-insensitively. If set to &#x60;true&#x60; variableValue and variablevalue are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;
  }): Observable<StrictHttpResponse<CountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, HistoricProcessInstanceService.GetHistoricProcessInstancesCountPath, 'get');
    if (params) {
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('processInstanceIds', params.processInstanceIds, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('processDefinitionKey', params.processDefinitionKey, {});
      rb.query('processDefinitionKeyIn', params.processDefinitionKeyIn, {});
      rb.query('processDefinitionName', params.processDefinitionName, {});
      rb.query('processDefinitionNameLike', params.processDefinitionNameLike, {});
      rb.query('processDefinitionKeyNotIn', params.processDefinitionKeyNotIn, {});
      rb.query('processInstanceBusinessKey', params.processInstanceBusinessKey, {});
      rb.query('processInstanceBusinessKeyLike', params.processInstanceBusinessKeyLike, {});
      rb.query('rootProcessInstances', params.rootProcessInstances, {});
      rb.query('finished', params.finished, {});
      rb.query('unfinished', params.unfinished, {});
      rb.query('withIncidents', params.withIncidents, {});
      rb.query('withRootIncidents', params.withRootIncidents, {});
      rb.query('incidentType', params.incidentType, {});
      rb.query('incidentStatus', params.incidentStatus, {});
      rb.query('incidentMessage', params.incidentMessage, {});
      rb.query('incidentMessageLike', params.incidentMessageLike, {});
      rb.query('startedBefore', params.startedBefore, {});
      rb.query('startedAfter', params.startedAfter, {});
      rb.query('finishedBefore', params.finishedBefore, {});
      rb.query('finishedAfter', params.finishedAfter, {});
      rb.query('executedActivityAfter', params.executedActivityAfter, {});
      rb.query('executedActivityBefore', params.executedActivityBefore, {});
      rb.query('executedJobAfter', params.executedJobAfter, {});
      rb.query('executedJobBefore', params.executedJobBefore, {});
      rb.query('startedBy', params.startedBy, {});
      rb.query('superProcessInstanceId', params.superProcessInstanceId, {});
      rb.query('subProcessInstanceId', params.subProcessInstanceId, {});
      rb.query('superCaseInstanceId', params.superCaseInstanceId, {});
      rb.query('subCaseInstanceId', params.subCaseInstanceId, {});
      rb.query('caseInstanceId', params.caseInstanceId, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('executedActivityIdIn', params.executedActivityIdIn, {});
      rb.query('activeActivityIdIn', params.activeActivityIdIn, {});
      rb.query('active', params.active, {});
      rb.query('suspended', params.suspended, {});
      rb.query('completed', params.completed, {});
      rb.query('externallyTerminated', params.externallyTerminated, {});
      rb.query('internallyTerminated', params.internallyTerminated, {});
      rb.query('variables', params.variables, {});
      rb.query('variableNamesIgnoreCase', params.variableNamesIgnoreCase, {});
      rb.query('variableValuesIgnoreCase', params.variableValuesIgnoreCase, {});
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
   * Get List Count.
   *
   * Queries for the number of historic process instances that fulfill the given parameters.
   * Takes the same parameters as the [Get Process Instances](https://docs.camunda.org/manual/7.14/reference/rest/history/process-instance/get-process-instance-query/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHistoricProcessInstancesCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricProcessInstancesCount(params?: {

    /**
     * Filter by process instance id.
     */
    processInstanceId?: string;

    /**
     * Filter by process instance ids. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processInstanceIds?: string;

    /**
     * Filter by the process definition the instances run on.
     */
    processDefinitionId?: string;

    /**
     * Filter by the key of the process definition the instances run on.
     */
    processDefinitionKey?: string;

    /**
     * Filter by a list of process definition keys. A process instance must have one of the given process definition keys. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processDefinitionKeyIn?: string;

    /**
     * Filter by the name of the process definition the instances run on.
     */
    processDefinitionName?: string;

    /**
     * Filter by process definition names that the parameter is a substring of.
     */
    processDefinitionNameLike?: string;

    /**
     * Exclude instances that belong to a set of process definitions. Filter by a comma-separated list of &#x60;Strings&#x60;.
     */
    processDefinitionKeyNotIn?: string;

    /**
     * Filter by process instance business key.
     */
    processInstanceBusinessKey?: string;

    /**
     * Filter by process instance business key that the parameter is a substring of.
     */
    processInstanceBusinessKeyLike?: string;

    /**
     * Restrict the query to all process instances that are top level process instances.
     */
    rootProcessInstances?: boolean;

    /**
     * Only include finished process instances. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    finished?: boolean;

    /**
     * Only include unfinished process instances. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    unfinished?: boolean;

    /**
     * Only include process instances which have an incident. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withIncidents?: boolean;

    /**
     * Only include process instances which have a root incident. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withRootIncidents?: boolean;

    /**
     * Filter by the incident type. See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types) for a list of incident types.
     */
    incidentType?: string;

    /**
     * Only include process instances which have an incident in status either open or resolved. To get all process instances, use the query parameter withIncidents.
     */
    incidentStatus?: 'open' | 'resolved';

    /**
     * Filter by the incident message. Exact match.
     */
    incidentMessage?: string;

    /**
     * Filter by the incident message that the parameter is a substring of.
     */
    incidentMessageLike?: string;

    /**
     * Restrict to instances that were started before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedBefore?: string;

    /**
     * Restrict to instances that were started after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    startedAfter?: string;

    /**
     * Restrict to instances that were finished before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedBefore?: string;

    /**
     * Restrict to instances that were finished after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    finishedAfter?: string;

    /**
     * Restrict to instances that executed an activity after the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedActivityAfter?: string;

    /**
     * Restrict to instances that executed an activity before the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedActivityBefore?: string;

    /**
     * Restrict to instances that executed an job after the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedJobAfter?: string;

    /**
     * Restrict to instances that executed an job before the given date (inclusive).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    executedJobBefore?: string;

    /**
     * Only include process instances that were started by the given user.
     */
    startedBy?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given process instance. Takes a process instance id.
     */
    superProcessInstanceId?: string;

    /**
     * Restrict query to one process instance that has a sub process instance with the given id.
     */
    subProcessInstanceId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.
     */
    superCaseInstanceId?: string;

    /**
     * Restrict query to one process instance that has a sub case instance with the given id.
     */
    subCaseInstanceId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.
     */
    caseInstanceId?: string;

    /**
     * Filter by a list of tenant ids. A process instance must have one of the given tenant ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    tenantIdIn?: string;

    /**
     * Only include historic process instances which belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Restrict to instances that executed an activity with one of given ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    executedActivityIdIn?: string;

    /**
     * Restrict to instances that have an active activity with one of given ids. Filter by a comma-separated list of &#x60;Strings&#x60;
     */
    activeActivityIdIn?: string;

    /**
     * Restrict to instances that are active.
     */
    active?: boolean;

    /**
     * Restrict to instances that are suspended.
     */
    suspended?: boolean;

    /**
     * Restrict to instances that are completed.
     */
    completed?: boolean;

    /**
     * Restrict to instances that are externallyTerminated.
     */
    externallyTerminated?: boolean;

    /**
     * Restrict to instances that are internallyTerminated.
     */
    internallyTerminated?: boolean;

    /**
     * Only include process instances that have/had variables with certain values.
     * Variable filtering expressions are comma-separated and are structured as follows:
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name, &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note:** Values are always treated as String objects on server side.
     *
     * Valid operator values are: &#x60;eq&#x60; - equal to; &#x60;neq&#x60; - not equal to; &#x60;gt&#x60; - greater than; &#x60;gteq&#x60; - greater than or equal to; &#x60;lt&#x60; - lower than; &#x60;lteq&#x60; - lower than or equal to; &#x60;like&#x60;.
     *
     * Key and value may not contain underscore or comma characters.
     */
    variables?: string;

    /**
     * Match all variable names provided in variables case-insensitively. If set to &#x60;true&#x60; variableName and variablename are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values provided in variables case-insensitively. If set to &#x60;true&#x60; variableValue and variablevalue are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;
  }): Observable<CountResultDto> {

    return this.getHistoricProcessInstancesCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountResultDto>) => r.body as CountResultDto)
    );
  }

  /**
   * Path part for operation queryHistoricProcessInstancesCount
   */
  static readonly QueryHistoricProcessInstancesCountPath = '/history/process-instance/count';

  /**
   * Get List Count (POST).
   *
   * Queries for the number of historic process instances that fulfill the given parameters.
   * This method takes the same message body as the [Get Process Instances (POST)](https://docs.camunda.org/manual/7.14/reference/rest/history/process-instance/get-process-instance-query/) method and
   * therefore it is slightly more powerful than the [Get Process Instance Count](https://docs.camunda.org/manual/7.14/reference/rest/history/process-instance/post-process-instance-query-count/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `queryHistoricProcessInstancesCount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryHistoricProcessInstancesCount$Response(params?: {
    body?: HistoricProcessInstanceQueryDto
  }): Observable<StrictHttpResponse<CountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, HistoricProcessInstanceService.QueryHistoricProcessInstancesCountPath, 'post');
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
   * Get List Count (POST).
   *
   * Queries for the number of historic process instances that fulfill the given parameters.
   * This method takes the same message body as the [Get Process Instances (POST)](https://docs.camunda.org/manual/7.14/reference/rest/history/process-instance/get-process-instance-query/) method and
   * therefore it is slightly more powerful than the [Get Process Instance Count](https://docs.camunda.org/manual/7.14/reference/rest/history/process-instance/post-process-instance-query-count/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `queryHistoricProcessInstancesCount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryHistoricProcessInstancesCount(params?: {
    body?: HistoricProcessInstanceQueryDto
  }): Observable<CountResultDto> {

    return this.queryHistoricProcessInstancesCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountResultDto>) => r.body as CountResultDto)
    );
  }

  /**
   * Path part for operation deleteHistoricProcessInstancesAsync
   */
  static readonly DeleteHistoricProcessInstancesAsyncPath = '/history/process-instance/delete';

  /**
   * Delete Async (POST).
   *
   * Delete multiple historic process instances asynchronously (batch).
   * At least `historicProcessInstanceIds` or `historicProcessInstanceQuery` has to be provided.
   * If both are provided then all instances matching query criterion and instances from the list will be deleted.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteHistoricProcessInstancesAsync()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteHistoricProcessInstancesAsync$Response(params?: {
    body?: DeleteHistoricProcessInstancesDto
  }): Observable<StrictHttpResponse<BatchDto>> {

    const rb = new RequestBuilder(this.rootUrl, HistoricProcessInstanceService.DeleteHistoricProcessInstancesAsyncPath, 'post');
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
   * Delete Async (POST).
   *
   * Delete multiple historic process instances asynchronously (batch).
   * At least `historicProcessInstanceIds` or `historicProcessInstanceQuery` has to be provided.
   * If both are provided then all instances matching query criterion and instances from the list will be deleted.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteHistoricProcessInstancesAsync$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteHistoricProcessInstancesAsync(params?: {
    body?: DeleteHistoricProcessInstancesDto
  }): Observable<BatchDto> {

    return this.deleteHistoricProcessInstancesAsync$Response(params).pipe(
      map((r: StrictHttpResponse<BatchDto>) => r.body as BatchDto)
    );
  }

  /**
   * Path part for operation getHistoricProcessInstanceDurationReport
   */
  static readonly GetHistoricProcessInstanceDurationReportPath = '/history/process-instance/report';

  /**
   * Get Duration Report.
   *
   * Retrieves a report about the duration of completed process instances, grouped by a period.
   * These reports include the maximum, minimum and average duration of all completed process instances which were started in a given period.
   *
   * **Note:** This only includes historic data.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHistoricProcessInstanceDurationReport()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricProcessInstanceDurationReport$Response(params: {

    /**
     * **Mandatory.** Specifies the type of the report to retrieve.
     * To retrieve a report about the duration of process instances, the value must be set to &#x60;duration&#x60;.
     */
    reportType: string;

    /**
     * **Mandatory.** Specifies the granularity of the report. Valid values are &#x60;month&#x60; and &#x60;quarter&#x60;.
     */
    periodUnit: 'month' | 'quarter';

    /**
     * Filter by process definition ids. Must be a comma-separated list of process definition ids.
     */
    processDefinitionIdIn?: string;

    /**
     * Filter by process definition keys. Must be a comma-separated list of process definition keys.
     */
    processDefinitionKeyIn?: string;

    /**
     * Restrict to instances that were started before the given date.
     * By [default](), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2016-01-23T14:42:45.000+0200&#x60;.
     */
    startedBefore?: string;

    /**
     * Restrict to instances that were started after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2016-01-23T14:42:45.000+0200&#x60;.
     */
    startedAfter?: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, HistoricProcessInstanceService.GetHistoricProcessInstanceDurationReportPath, 'get');
    if (params) {
      rb.query('reportType', params.reportType, {});
      rb.query('periodUnit', params.periodUnit, {});
      rb.query('processDefinitionIdIn', params.processDefinitionIdIn, {});
      rb.query('processDefinitionKeyIn', params.processDefinitionKeyIn, {});
      rb.query('startedBefore', params.startedBefore, {});
      rb.query('startedAfter', params.startedAfter, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/csv'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Get Duration Report.
   *
   * Retrieves a report about the duration of completed process instances, grouped by a period.
   * These reports include the maximum, minimum and average duration of all completed process instances which were started in a given period.
   *
   * **Note:** This only includes historic data.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHistoricProcessInstanceDurationReport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricProcessInstanceDurationReport(params: {

    /**
     * **Mandatory.** Specifies the type of the report to retrieve.
     * To retrieve a report about the duration of process instances, the value must be set to &#x60;duration&#x60;.
     */
    reportType: string;

    /**
     * **Mandatory.** Specifies the granularity of the report. Valid values are &#x60;month&#x60; and &#x60;quarter&#x60;.
     */
    periodUnit: 'month' | 'quarter';

    /**
     * Filter by process definition ids. Must be a comma-separated list of process definition ids.
     */
    processDefinitionIdIn?: string;

    /**
     * Filter by process definition keys. Must be a comma-separated list of process definition keys.
     */
    processDefinitionKeyIn?: string;

    /**
     * Restrict to instances that were started before the given date.
     * By [default](), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2016-01-23T14:42:45.000+0200&#x60;.
     */
    startedBefore?: string;

    /**
     * Restrict to instances that were started after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2016-01-23T14:42:45.000+0200&#x60;.
     */
    startedAfter?: string;
  }): Observable<any> {

    return this.getHistoricProcessInstanceDurationReport$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation setRemovalTimeAsync
   */
  static readonly SetRemovalTimeAsyncPath = '/history/process-instance/set-removal-time';

  /**
   * Set Removal Time Async (POST).
   *
   * Sets the removal time to multiple historic process instances asynchronously (batch).
   *
   * At least `historicProcessInstanceIds` or `historicProcessInstanceQuery` has to be provided.
   * If both are provided, all instances matching query criterion and instances from the list will be updated with a removal time.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setRemovalTimeAsync()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setRemovalTimeAsync$Response(params?: {
    body?: SetRemovalTimeToHistoricProcessInstancesDto
  }): Observable<StrictHttpResponse<BatchDto>> {

    const rb = new RequestBuilder(this.rootUrl, HistoricProcessInstanceService.SetRemovalTimeAsyncPath, 'post');
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
   * Set Removal Time Async (POST).
   *
   * Sets the removal time to multiple historic process instances asynchronously (batch).
   *
   * At least `historicProcessInstanceIds` or `historicProcessInstanceQuery` has to be provided.
   * If both are provided, all instances matching query criterion and instances from the list will be updated with a removal time.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setRemovalTimeAsync$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setRemovalTimeAsync(params?: {
    body?: SetRemovalTimeToHistoricProcessInstancesDto
  }): Observable<BatchDto> {

    return this.setRemovalTimeAsync$Response(params).pipe(
      map((r: StrictHttpResponse<BatchDto>) => r.body as BatchDto)
    );
  }

  /**
   * Path part for operation getHistoricProcessInstance
   */
  static readonly GetHistoricProcessInstancePath = '/history/process-instance/{id}';

  /**
   * Get.
   *
   * Retrieves a historic process instance by id, according to the `HistoricProcessInstance` interface in the engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHistoricProcessInstance()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricProcessInstance$Response(params: {

    /**
     * The id of the historic process instance to be retrieved.
     */
    id: string;
  }): Observable<StrictHttpResponse<HistoricProcessInstanceDto>> {

    const rb = new RequestBuilder(this.rootUrl, HistoricProcessInstanceService.GetHistoricProcessInstancePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<HistoricProcessInstanceDto>;
      })
    );
  }

  /**
   * Get.
   *
   * Retrieves a historic process instance by id, according to the `HistoricProcessInstance` interface in the engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHistoricProcessInstance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHistoricProcessInstance(params: {

    /**
     * The id of the historic process instance to be retrieved.
     */
    id: string;
  }): Observable<HistoricProcessInstanceDto> {

    return this.getHistoricProcessInstance$Response(params).pipe(
      map((r: StrictHttpResponse<HistoricProcessInstanceDto>) => r.body as HistoricProcessInstanceDto)
    );
  }

  /**
   * Path part for operation deleteHistoricProcessInstance
   */
  static readonly DeleteHistoricProcessInstancePath = '/history/process-instance/{id}';

  /**
   * Delete.
   *
   * Deletes a process instance from the history by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteHistoricProcessInstance()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteHistoricProcessInstance$Response(params: {

    /**
     * The id of the historic process instance to be deleted.
     */
    id: string;

    /**
     * If set to &#x60;false&#x60;, the request will still be successful if the process id is not found.
     */
    failIfNotExists?: boolean;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, HistoricProcessInstanceService.DeleteHistoricProcessInstancePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('failIfNotExists', params.failIfNotExists, {});
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
   * Delete.
   *
   * Deletes a process instance from the history by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteHistoricProcessInstance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteHistoricProcessInstance(params: {

    /**
     * The id of the historic process instance to be deleted.
     */
    id: string;

    /**
     * If set to &#x60;false&#x60;, the request will still be successful if the process id is not found.
     */
    failIfNotExists?: boolean;
  }): Observable<void> {

    return this.deleteHistoricProcessInstance$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteHistoricVariableInstancesOfHistoricProcessInstance
   */
  static readonly DeleteHistoricVariableInstancesOfHistoricProcessInstancePath = '/history/process-instance/{id}/variable-instances';

  /**
   * Delete Variable Instances.
   *
   * Deletes all variables of a process instance from the history by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteHistoricVariableInstancesOfHistoricProcessInstance()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteHistoricVariableInstancesOfHistoricProcessInstance$Response(params: {

    /**
     * The id of the process instance for which all historic variables are to be deleted.
     */
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, HistoricProcessInstanceService.DeleteHistoricVariableInstancesOfHistoricProcessInstancePath, 'delete');
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
   * Delete Variable Instances.
   *
   * Deletes all variables of a process instance from the history by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteHistoricVariableInstancesOfHistoricProcessInstance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteHistoricVariableInstancesOfHistoricProcessInstance(params: {

    /**
     * The id of the process instance for which all historic variables are to be deleted.
     */
    id: string;
  }): Observable<void> {

    return this.deleteHistoricVariableInstancesOfHistoricProcessInstance$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
