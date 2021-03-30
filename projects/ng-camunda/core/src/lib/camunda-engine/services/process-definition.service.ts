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

import { ActivityStatisticsResultDto } from '../models/activity-statistics-result-dto';
import { BatchDto } from '../models/batch-dto';
import { CountResultDto } from '../models/count-result-dto';
import { FormDto } from '../models/form-dto';
import { HistoryTimeToLiveDto } from '../models/history-time-to-live-dto';
import { ProcessDefinitionDiagramDto } from '../models/process-definition-diagram-dto';
import { ProcessDefinitionDto } from '../models/process-definition-dto';
import { ProcessDefinitionStatisticsResultDto } from '../models/process-definition-statistics-result-dto';
import { ProcessDefinitionSuspensionStateDto } from '../models/process-definition-suspension-state-dto';
import { ProcessInstanceDto } from '../models/process-instance-dto';
import { ProcessInstanceWithVariablesDto } from '../models/process-instance-with-variables-dto';
import { RestartProcessInstanceDto } from '../models/restart-process-instance-dto';
import { StartProcessInstanceDto } from '../models/start-process-instance-dto';
import { StartProcessInstanceFormDto } from '../models/start-process-instance-form-dto';
import { VariableValueDto } from '../models/variable-value-dto';

@Injectable({
  providedIn: 'root',
})
export class ProcessDefinitionService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getProcessDefinitions
   */
  static readonly GetProcessDefinitionsPath = '/process-definition';

  /**
   * Get List.
   *
   * Queries for process definitions that fulfill given parameters. Parameters may be the properties of 
   * process definitions, such as the name, key or version. The size of the result set can be retrieved
   * by using the [Get Definition Count](https://docs.camunda.org/manual/7.14/reference/rest/process-definition/get-query-count/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessDefinitions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitions$Response(params?: {

    /**
     * Filter by process definition id.
     */
    processDefinitionId?: string;

    /**
     * Filter by a comma-separated list of process definition ids.
     */
    processDefinitionIdIn?: string;

    /**
     * Filter by process definition name.
     */
    name?: string;

    /**
     * Filter by process definition names that the parameter is a substring of.
     */
    nameLike?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    deploymentId?: string;

    /**
     * Filter by the deploy time of the deployment the process definition belongs to.
     * Only selects process definitions that have been deployed after (exclusive) a specific time.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    deployedAfter?: string;

    /**
     * Filter by the deploy time of the deployment the process definition belongs to.
     * Only selects process definitions that have been deployed at a specific time (exact match).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    deployedAt?: string;

    /**
     * Filter by process definition key, i.e., the id in the BPMN 2.0 XML. Exact match.
     */
    key?: string;

    /**
     * Filter by a comma-separated list of process definition keys.
     */
    keysIn?: string;

    /**
     * Filter by process definition keys that the parameter is a substring of.
     */
    keyLike?: string;

    /**
     * Filter by process definition category. Exact match.
     */
    category?: string;

    /**
     * Filter by process definition categories that the parameter is a substring of.
     */
    categoryLike?: string;

    /**
     * Filter by process definition version.
     */
    version?: number;

    /**
     * Only include those process definitions that are latest versions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    latestVersion?: boolean;

    /**
     * Filter by the name of the process definition resource. Exact match.
     */
    resourceName?: string;

    /**
     * Filter by names of those process definition resources that the parameter is a substring of.
     */
    resourceNameLike?: string;

    /**
     * Filter by a user name who is allowed to start the process.
     */
    startableBy?: string;

    /**
     * Only include active process definitions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended process definitions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    suspended?: boolean;

    /**
     * Filter by the incident id.
     */
    incidentId?: string;

    /**
     * Filter by the incident type.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentType?: string;

    /**
     * Filter by the incident message. Exact match.
     */
    incidentMessage?: string;

    /**
     * Filter by the incident message that the parameter is a substring of.
     */
    incidentMessageLike?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * A process definition must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include process definitions which belong to no tenant.
     * Value may only be true, as false is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Include process definitions which belong to no tenant. Can be used in combination with &#x60;tenantIdIn&#x60;.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeProcessDefinitionsWithoutTenantId?: boolean;

    /**
     * Filter by the version tag.
     */
    versionTag?: string;

    /**
     * Filter by the version tag that the parameter is a substring of.
     */
    versionTagLike?: string;

    /**
     * Only include process definitions without a &#x60;versionTag&#x60;.
     */
    withoutVersionTag?: boolean;

    /**
     * Filter by process definitions which are startable in Tasklist..
     */
    startableInTasklist?: boolean;

    /**
     * Filter by process definitions which are not startable in Tasklist.
     */
    notStartableInTasklist?: boolean;

    /**
     * Filter by process definitions which the user is allowed to start in Tasklist.
     * If the user doesn&#x27;t have these permissions the result will be empty list.
     * The permissions are:
     * * &#x60;CREATE&#x60; permission for all Process instances
     * * &#x60;CREATE_INSTANCE&#x60; and &#x60;READ&#x60; permission on Process definition level
     */
    startablePermissionCheck?: boolean;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'category' | 'key' | 'id' | 'name' | 'version' | 'deploymentId' | 'deployTime' | 'tenantId ' | 'versionTag';

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
  }): Observable<StrictHttpResponse<Array<ProcessDefinitionDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetProcessDefinitionsPath, 'get');
    if (params) {
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('processDefinitionIdIn', params.processDefinitionIdIn, {});
      rb.query('name', params.name, {});
      rb.query('nameLike', params.nameLike, {});
      rb.query('deploymentId', params.deploymentId, {});
      rb.query('deployedAfter', params.deployedAfter, {});
      rb.query('deployedAt', params.deployedAt, {});
      rb.query('key', params.key, {});
      rb.query('keysIn', params.keysIn, {});
      rb.query('keyLike', params.keyLike, {});
      rb.query('category', params.category, {});
      rb.query('categoryLike', params.categoryLike, {});
      rb.query('version', params.version, {});
      rb.query('latestVersion', params.latestVersion, {});
      rb.query('resourceName', params.resourceName, {});
      rb.query('resourceNameLike', params.resourceNameLike, {});
      rb.query('startableBy', params.startableBy, {});
      rb.query('active', params.active, {});
      rb.query('suspended', params.suspended, {});
      rb.query('incidentId', params.incidentId, {});
      rb.query('incidentType', params.incidentType, {});
      rb.query('incidentMessage', params.incidentMessage, {});
      rb.query('incidentMessageLike', params.incidentMessageLike, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('includeProcessDefinitionsWithoutTenantId', params.includeProcessDefinitionsWithoutTenantId, {});
      rb.query('versionTag', params.versionTag, {});
      rb.query('versionTagLike', params.versionTagLike, {});
      rb.query('withoutVersionTag', params.withoutVersionTag, {});
      rb.query('startableInTasklist', params.startableInTasklist, {});
      rb.query('notStartableInTasklist', params.notStartableInTasklist, {});
      rb.query('startablePermissionCheck', params.startablePermissionCheck, {});
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
        return r as StrictHttpResponse<Array<ProcessDefinitionDto>>;
      })
    );
  }

  /**
   * Get List.
   *
   * Queries for process definitions that fulfill given parameters. Parameters may be the properties of 
   * process definitions, such as the name, key or version. The size of the result set can be retrieved
   * by using the [Get Definition Count](https://docs.camunda.org/manual/7.14/reference/rest/process-definition/get-query-count/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessDefinitions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitions(params?: {

    /**
     * Filter by process definition id.
     */
    processDefinitionId?: string;

    /**
     * Filter by a comma-separated list of process definition ids.
     */
    processDefinitionIdIn?: string;

    /**
     * Filter by process definition name.
     */
    name?: string;

    /**
     * Filter by process definition names that the parameter is a substring of.
     */
    nameLike?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    deploymentId?: string;

    /**
     * Filter by the deploy time of the deployment the process definition belongs to.
     * Only selects process definitions that have been deployed after (exclusive) a specific time.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    deployedAfter?: string;

    /**
     * Filter by the deploy time of the deployment the process definition belongs to.
     * Only selects process definitions that have been deployed at a specific time (exact match).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    deployedAt?: string;

    /**
     * Filter by process definition key, i.e., the id in the BPMN 2.0 XML. Exact match.
     */
    key?: string;

    /**
     * Filter by a comma-separated list of process definition keys.
     */
    keysIn?: string;

    /**
     * Filter by process definition keys that the parameter is a substring of.
     */
    keyLike?: string;

    /**
     * Filter by process definition category. Exact match.
     */
    category?: string;

    /**
     * Filter by process definition categories that the parameter is a substring of.
     */
    categoryLike?: string;

    /**
     * Filter by process definition version.
     */
    version?: number;

    /**
     * Only include those process definitions that are latest versions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    latestVersion?: boolean;

    /**
     * Filter by the name of the process definition resource. Exact match.
     */
    resourceName?: string;

    /**
     * Filter by names of those process definition resources that the parameter is a substring of.
     */
    resourceNameLike?: string;

    /**
     * Filter by a user name who is allowed to start the process.
     */
    startableBy?: string;

    /**
     * Only include active process definitions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended process definitions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    suspended?: boolean;

    /**
     * Filter by the incident id.
     */
    incidentId?: string;

    /**
     * Filter by the incident type.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentType?: string;

    /**
     * Filter by the incident message. Exact match.
     */
    incidentMessage?: string;

    /**
     * Filter by the incident message that the parameter is a substring of.
     */
    incidentMessageLike?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * A process definition must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include process definitions which belong to no tenant.
     * Value may only be true, as false is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Include process definitions which belong to no tenant. Can be used in combination with &#x60;tenantIdIn&#x60;.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeProcessDefinitionsWithoutTenantId?: boolean;

    /**
     * Filter by the version tag.
     */
    versionTag?: string;

    /**
     * Filter by the version tag that the parameter is a substring of.
     */
    versionTagLike?: string;

    /**
     * Only include process definitions without a &#x60;versionTag&#x60;.
     */
    withoutVersionTag?: boolean;

    /**
     * Filter by process definitions which are startable in Tasklist..
     */
    startableInTasklist?: boolean;

    /**
     * Filter by process definitions which are not startable in Tasklist.
     */
    notStartableInTasklist?: boolean;

    /**
     * Filter by process definitions which the user is allowed to start in Tasklist.
     * If the user doesn&#x27;t have these permissions the result will be empty list.
     * The permissions are:
     * * &#x60;CREATE&#x60; permission for all Process instances
     * * &#x60;CREATE_INSTANCE&#x60; and &#x60;READ&#x60; permission on Process definition level
     */
    startablePermissionCheck?: boolean;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'category' | 'key' | 'id' | 'name' | 'version' | 'deploymentId' | 'deployTime' | 'tenantId ' | 'versionTag';

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
  }): Observable<Array<ProcessDefinitionDto>> {

    return this.getProcessDefinitions$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProcessDefinitionDto>>) => r.body as Array<ProcessDefinitionDto>)
    );
  }

  /**
   * Path part for operation getProcessDefinitionsCount
   */
  static readonly GetProcessDefinitionsCountPath = '/process-definition/count';

  /**
   * Get List Count.
   *
   * Requests the number of process definitions that fulfill the query criteria.
   * Takes the same filtering parameters as the [Get Definitions](https://docs.camunda.org/manual/7.14/reference/rest/process-definition/get-query/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessDefinitionsCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionsCount$Response(params?: {

    /**
     * Filter by process definition id.
     */
    processDefinitionId?: string;

    /**
     * Filter by a comma-separated list of process definition ids.
     */
    processDefinitionIdIn?: string;

    /**
     * Filter by process definition name.
     */
    name?: string;

    /**
     * Filter by process definition names that the parameter is a substring of.
     */
    nameLike?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    deploymentId?: string;

    /**
     * Filter by the deploy time of the deployment the process definition belongs to.
     * Only selects process definitions that have been deployed after (exclusive) a specific time.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    deployedAfter?: string;

    /**
     * Filter by the deploy time of the deployment the process definition belongs to.
     * Only selects process definitions that have been deployed at a specific time (exact match).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    deployedAt?: string;

    /**
     * Filter by process definition key, i.e., the id in the BPMN 2.0 XML. Exact match.
     */
    key?: string;

    /**
     * Filter by a comma-separated list of process definition keys.
     */
    keysIn?: string;

    /**
     * Filter by process definition keys that the parameter is a substring of.
     */
    keyLike?: string;

    /**
     * Filter by process definition category. Exact match.
     */
    category?: string;

    /**
     * Filter by process definition categories that the parameter is a substring of.
     */
    categoryLike?: string;

    /**
     * Filter by process definition version.
     */
    version?: number;

    /**
     * Only include those process definitions that are latest versions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    latestVersion?: boolean;

    /**
     * Filter by the name of the process definition resource. Exact match.
     */
    resourceName?: string;

    /**
     * Filter by names of those process definition resources that the parameter is a substring of.
     */
    resourceNameLike?: string;

    /**
     * Filter by a user name who is allowed to start the process.
     */
    startableBy?: string;

    /**
     * Only include active process definitions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended process definitions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    suspended?: boolean;

    /**
     * Filter by the incident id.
     */
    incidentId?: string;

    /**
     * Filter by the incident type.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentType?: string;

    /**
     * Filter by the incident message. Exact match.
     */
    incidentMessage?: string;

    /**
     * Filter by the incident message that the parameter is a substring of.
     */
    incidentMessageLike?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * A process definition must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include process definitions which belong to no tenant.
     * Value may only be true, as false is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Include process definitions which belong to no tenant. Can be used in combination with &#x60;tenantIdIn&#x60;.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeProcessDefinitionsWithoutTenantId?: boolean;

    /**
     * Filter by the version tag.
     */
    versionTag?: string;

    /**
     * Filter by the version tag that the parameter is a substring of.
     */
    versionTagLike?: string;

    /**
     * Only include process definitions without a &#x60;versionTag&#x60;.
     */
    withoutVersionTag?: boolean;

    /**
     * Filter by process definitions which are startable in Tasklist..
     */
    startableInTasklist?: boolean;

    /**
     * Filter by process definitions which are not startable in Tasklist.
     */
    notStartableInTasklist?: boolean;

    /**
     * Filter by process definitions which the user is allowed to start in Tasklist.
     * If the user doesn&#x27;t have these permissions the result will be empty list.
     * The permissions are:
     * * &#x60;CREATE&#x60; permission for all Process instances
     * * &#x60;CREATE_INSTANCE&#x60; and &#x60;READ&#x60; permission on Process definition level
     */
    startablePermissionCheck?: boolean;
  }): Observable<StrictHttpResponse<CountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetProcessDefinitionsCountPath, 'get');
    if (params) {
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('processDefinitionIdIn', params.processDefinitionIdIn, {});
      rb.query('name', params.name, {});
      rb.query('nameLike', params.nameLike, {});
      rb.query('deploymentId', params.deploymentId, {});
      rb.query('deployedAfter', params.deployedAfter, {});
      rb.query('deployedAt', params.deployedAt, {});
      rb.query('key', params.key, {});
      rb.query('keysIn', params.keysIn, {});
      rb.query('keyLike', params.keyLike, {});
      rb.query('category', params.category, {});
      rb.query('categoryLike', params.categoryLike, {});
      rb.query('version', params.version, {});
      rb.query('latestVersion', params.latestVersion, {});
      rb.query('resourceName', params.resourceName, {});
      rb.query('resourceNameLike', params.resourceNameLike, {});
      rb.query('startableBy', params.startableBy, {});
      rb.query('active', params.active, {});
      rb.query('suspended', params.suspended, {});
      rb.query('incidentId', params.incidentId, {});
      rb.query('incidentType', params.incidentType, {});
      rb.query('incidentMessage', params.incidentMessage, {});
      rb.query('incidentMessageLike', params.incidentMessageLike, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('includeProcessDefinitionsWithoutTenantId', params.includeProcessDefinitionsWithoutTenantId, {});
      rb.query('versionTag', params.versionTag, {});
      rb.query('versionTagLike', params.versionTagLike, {});
      rb.query('withoutVersionTag', params.withoutVersionTag, {});
      rb.query('startableInTasklist', params.startableInTasklist, {});
      rb.query('notStartableInTasklist', params.notStartableInTasklist, {});
      rb.query('startablePermissionCheck', params.startablePermissionCheck, {});
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
   * Requests the number of process definitions that fulfill the query criteria.
   * Takes the same filtering parameters as the [Get Definitions](https://docs.camunda.org/manual/7.14/reference/rest/process-definition/get-query/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessDefinitionsCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionsCount(params?: {

    /**
     * Filter by process definition id.
     */
    processDefinitionId?: string;

    /**
     * Filter by a comma-separated list of process definition ids.
     */
    processDefinitionIdIn?: string;

    /**
     * Filter by process definition name.
     */
    name?: string;

    /**
     * Filter by process definition names that the parameter is a substring of.
     */
    nameLike?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    deploymentId?: string;

    /**
     * Filter by the deploy time of the deployment the process definition belongs to.
     * Only selects process definitions that have been deployed after (exclusive) a specific time.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    deployedAfter?: string;

    /**
     * Filter by the deploy time of the deployment the process definition belongs to.
     * Only selects process definitions that have been deployed at a specific time (exact match).
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    deployedAt?: string;

    /**
     * Filter by process definition key, i.e., the id in the BPMN 2.0 XML. Exact match.
     */
    key?: string;

    /**
     * Filter by a comma-separated list of process definition keys.
     */
    keysIn?: string;

    /**
     * Filter by process definition keys that the parameter is a substring of.
     */
    keyLike?: string;

    /**
     * Filter by process definition category. Exact match.
     */
    category?: string;

    /**
     * Filter by process definition categories that the parameter is a substring of.
     */
    categoryLike?: string;

    /**
     * Filter by process definition version.
     */
    version?: number;

    /**
     * Only include those process definitions that are latest versions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    latestVersion?: boolean;

    /**
     * Filter by the name of the process definition resource. Exact match.
     */
    resourceName?: string;

    /**
     * Filter by names of those process definition resources that the parameter is a substring of.
     */
    resourceNameLike?: string;

    /**
     * Filter by a user name who is allowed to start the process.
     */
    startableBy?: string;

    /**
     * Only include active process definitions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended process definitions.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    suspended?: boolean;

    /**
     * Filter by the incident id.
     */
    incidentId?: string;

    /**
     * Filter by the incident type.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentType?: string;

    /**
     * Filter by the incident message. Exact match.
     */
    incidentMessage?: string;

    /**
     * Filter by the incident message that the parameter is a substring of.
     */
    incidentMessageLike?: string;

    /**
     * Filter by a comma-separated list of tenant ids.
     * A process definition must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include process definitions which belong to no tenant.
     * Value may only be true, as false is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Include process definitions which belong to no tenant. Can be used in combination with &#x60;tenantIdIn&#x60;.
     * Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeProcessDefinitionsWithoutTenantId?: boolean;

    /**
     * Filter by the version tag.
     */
    versionTag?: string;

    /**
     * Filter by the version tag that the parameter is a substring of.
     */
    versionTagLike?: string;

    /**
     * Only include process definitions without a &#x60;versionTag&#x60;.
     */
    withoutVersionTag?: boolean;

    /**
     * Filter by process definitions which are startable in Tasklist..
     */
    startableInTasklist?: boolean;

    /**
     * Filter by process definitions which are not startable in Tasklist.
     */
    notStartableInTasklist?: boolean;

    /**
     * Filter by process definitions which the user is allowed to start in Tasklist.
     * If the user doesn&#x27;t have these permissions the result will be empty list.
     * The permissions are:
     * * &#x60;CREATE&#x60; permission for all Process instances
     * * &#x60;CREATE_INSTANCE&#x60; and &#x60;READ&#x60; permission on Process definition level
     */
    startablePermissionCheck?: boolean;
  }): Observable<CountResultDto> {

    return this.getProcessDefinitionsCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountResultDto>) => r.body as CountResultDto)
    );
  }

  /**
   * Path part for operation getProcessDefinitionByKey
   */
  static readonly GetProcessDefinitionByKeyPath = '/process-definition/key/{key}';

  /**
   * Get.
   *
   * Retrieves the latest version of the process definition which belongs to no tenant according to the `ProcessDefinition` interface in the engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessDefinitionByKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionByKey$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;
  }): Observable<StrictHttpResponse<ProcessDefinitionDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetProcessDefinitionByKeyPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessDefinitionDto>;
      })
    );
  }

  /**
   * Get.
   *
   * Retrieves the latest version of the process definition which belongs to no tenant according to the `ProcessDefinition` interface in the engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessDefinitionByKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionByKey(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;
  }): Observable<ProcessDefinitionDto> {

    return this.getProcessDefinitionByKey$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessDefinitionDto>) => r.body as ProcessDefinitionDto)
    );
  }

  /**
   * Path part for operation deleteProcessDefinitionsByKey
   */
  static readonly DeleteProcessDefinitionsByKeyPath = '/process-definition/key/{key}';

  /**
   * Delete By Key.
   *
   * Deletes process definitions by a given key which belong to no tenant id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProcessDefinitionsByKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessDefinitionsByKey$Response(params: {

    /**
     * The key of the process definitions to be deleted.
     */
    key: string;

    /**
     * &#x60;true&#x60;, if all process instances, historic process instances and jobs
     * for this process definition should be deleted.
     */
    cascade?: boolean;

    /**
     * &#x60;true&#x60;, if only the built-in ExecutionListeners should be notified with the end event.
     */
    skipCustomListeners?: boolean;

    /**
     * A boolean value to control whether input/output mappings should be executed during deletion.
     * &#x60;true&#x60;, if input/output mappings should not be invoked.
     */
    skipIoMappings?: boolean;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.DeleteProcessDefinitionsByKeyPath, 'delete');
    if (params) {
      rb.path('key', params.key, {});
      rb.query('cascade', params.cascade, {});
      rb.query('skipCustomListeners', params.skipCustomListeners, {});
      rb.query('skipIoMappings', params.skipIoMappings, {});
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
   * Delete By Key.
   *
   * Deletes process definitions by a given key which belong to no tenant id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProcessDefinitionsByKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessDefinitionsByKey(params: {

    /**
     * The key of the process definitions to be deleted.
     */
    key: string;

    /**
     * &#x60;true&#x60;, if all process instances, historic process instances and jobs
     * for this process definition should be deleted.
     */
    cascade?: boolean;

    /**
     * &#x60;true&#x60;, if only the built-in ExecutionListeners should be notified with the end event.
     */
    skipCustomListeners?: boolean;

    /**
     * A boolean value to control whether input/output mappings should be executed during deletion.
     * &#x60;true&#x60;, if input/output mappings should not be invoked.
     */
    skipIoMappings?: boolean;
  }): Observable<void> {

    return this.deleteProcessDefinitionsByKey$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDeployedStartFormByKey
   */
  static readonly GetDeployedStartFormByKeyPath = '/process-definition/key/{key}/deployed-start-form';

  /**
   * Get Deployed Start Form.
   *
   * Retrieves the deployed form that can be referenced from a start event.
   * For further information please refer to [User Guide](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#embedded-task-forms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeployedStartFormByKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployedStartFormByKey$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetDeployedStartFormByKeyPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/xhtml+xml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Get Deployed Start Form.
   *
   * Retrieves the deployed form that can be referenced from a start event.
   * For further information please refer to [User Guide](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#embedded-task-forms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeployedStartFormByKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployedStartFormByKey(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;
  }): Observable<Blob> {

    return this.getDeployedStartFormByKey$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getProcessDefinitionDiagramByKey
   */
  static readonly GetProcessDefinitionDiagramByKeyPath = '/process-definition/key/{key}/diagram';

  /**
   * Get Diagram.
   *
   * Retrieves the diagram for the latest version of the process definition which belongs to no tenant.
   *
   * If the process definition's deployment contains an image resource with the same file name
   * as the process definition, the deployed image will be returned by the Get Diagram endpoint.
   * Example: `someProcess.bpmn` and `someProcess.png`.
   * Supported file extentions for the image are: `svg`, `png`, `jpg`, and `gif`.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessDefinitionDiagramByKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionDiagramByKey$Response(params: {

    /**
     * The key of the process definition.
     */
    key: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetProcessDefinitionDiagramByKeyPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Get Diagram.
   *
   * Retrieves the diagram for the latest version of the process definition which belongs to no tenant.
   *
   * If the process definition's deployment contains an image resource with the same file name
   * as the process definition, the deployed image will be returned by the Get Diagram endpoint.
   * Example: `someProcess.bpmn` and `someProcess.png`.
   * Supported file extentions for the image are: `svg`, `png`, `jpg`, and `gif`.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessDefinitionDiagramByKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionDiagramByKey(params: {

    /**
     * The key of the process definition.
     */
    key: string;
  }): Observable<Blob> {

    return this.getProcessDefinitionDiagramByKey$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getStartFormVariablesByKey
   */
  static readonly GetStartFormVariablesByKeyPath = '/process-definition/key/{key}/form-variables';

  /**
   * Get Start Form Variables.
   *
   * Retrieves the start form variables for the latest process definition which belongs to no tenant
   * (only if they are defined via the 
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms) approach).
   * The start form variables take form data specified on the start event into account.
   * If form fields are defined, the variable types and default values
   * of the form fields are taken into account.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStartFormVariablesByKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartFormVariablesByKey$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * A comma-separated list of variable names. Allows restricting the list of requested
     * variables to the variable names in the list. It is best practice to restrict the
     * list of variables to the variables actually required by the form in order to
     * minimize fetching of data. If the query parameter is ommitted all variables are
     * fetched. If the query parameter contains non-existent variable names, the variable
     * names are ignored.
     */
    variableNames?: string;

    /**
     * Determines whether serializable variable values (typically variables that store
     * custom Java objects) should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and
     * transformed to JSON using [Jackson&#x27;s](http://jackson.codehaus.org/) POJO/bean
     * property introspection feature. Note that this requires the Java classes of the
     * variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string
     * containing XML.
     *
     * **Note**: While true is the default value for reasons of backward compatibility, we
     * recommend setting this parameter to false when developing web applications that are
     * independent of the Java process applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<StrictHttpResponse<{ [key: string]: VariableValueDto }>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetStartFormVariablesByKeyPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
      rb.query('variableNames', params.variableNames, {});
      rb.query('deserializeValues', params.deserializeValues, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ [key: string]: VariableValueDto }>;
      })
    );
  }

  /**
   * Get Start Form Variables.
   *
   * Retrieves the start form variables for the latest process definition which belongs to no tenant
   * (only if they are defined via the 
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms) approach).
   * The start form variables take form data specified on the start event into account.
   * If form fields are defined, the variable types and default values
   * of the form fields are taken into account.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStartFormVariablesByKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartFormVariablesByKey(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * A comma-separated list of variable names. Allows restricting the list of requested
     * variables to the variable names in the list. It is best practice to restrict the
     * list of variables to the variables actually required by the form in order to
     * minimize fetching of data. If the query parameter is ommitted all variables are
     * fetched. If the query parameter contains non-existent variable names, the variable
     * names are ignored.
     */
    variableNames?: string;

    /**
     * Determines whether serializable variable values (typically variables that store
     * custom Java objects) should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and
     * transformed to JSON using [Jackson&#x27;s](http://jackson.codehaus.org/) POJO/bean
     * property introspection feature. Note that this requires the Java classes of the
     * variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string
     * containing XML.
     *
     * **Note**: While true is the default value for reasons of backward compatibility, we
     * recommend setting this parameter to false when developing web applications that are
     * independent of the Java process applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<{ [key: string]: VariableValueDto }> {

    return this.getStartFormVariablesByKey$Response(params).pipe(
      map((r: StrictHttpResponse<{ [key: string]: VariableValueDto }>) => r.body as { [key: string]: VariableValueDto })
    );
  }

  /**
   * Path part for operation updateHistoryTimeToLiveByProcessDefinitionKey
   */
  static readonly UpdateHistoryTimeToLiveByProcessDefinitionKeyPath = '/process-definition/key/{key}/history-time-to-live';

  /**
   * Update History Time to Live.
   *
   * Updates history time to live for the latest version of the process definition which belongs to no tenant.
   * The field is used within [History cleanup](https://docs.camunda.org/manual/7.14/user-guide/process-engine/history/#history-cleanup).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateHistoryTimeToLiveByProcessDefinitionKey()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHistoryTimeToLiveByProcessDefinitionKey$Response(params: {

    /**
     * The key of the process definition to change history time to live.
     */
    key: string;
    body?: HistoryTimeToLiveDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.UpdateHistoryTimeToLiveByProcessDefinitionKeyPath, 'put');
    if (params) {
      rb.path('key', params.key, {});
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
   * Update History Time to Live.
   *
   * Updates history time to live for the latest version of the process definition which belongs to no tenant.
   * The field is used within [History cleanup](https://docs.camunda.org/manual/7.14/user-guide/process-engine/history/#history-cleanup).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateHistoryTimeToLiveByProcessDefinitionKey$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHistoryTimeToLiveByProcessDefinitionKey(params: {

    /**
     * The key of the process definition to change history time to live.
     */
    key: string;
    body?: HistoryTimeToLiveDto
  }): Observable<void> {

    return this.updateHistoryTimeToLiveByProcessDefinitionKey$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getRenderedStartFormByKey
   */
  static readonly GetRenderedStartFormByKeyPath = '/process-definition/key/{key}/rendered-form';

  /**
   * Get Rendered Start Form.
   *
   * Retrieves  the rendered form for the latest version of the process definition which belongs to no tenant.
   * This method can be used to get the HTML rendering of a
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRenderedStartFormByKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRenderedStartFormByKey$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetRenderedStartFormByKeyPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/xhtml+xml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Get Rendered Start Form.
   *
   * Retrieves  the rendered form for the latest version of the process definition which belongs to no tenant.
   * This method can be used to get the HTML rendering of a
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRenderedStartFormByKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRenderedStartFormByKey(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;
  }): Observable<Blob> {

    return this.getRenderedStartFormByKey$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation startProcessInstanceByKey
   */
  static readonly StartProcessInstanceByKeyPath = '/process-definition/key/{key}/start';

  /**
   * Start Instance.
   *
   * Instantiates a given process definition, starts the latest version of the process definition
   * which belongs to no tenant.
   * Process variables and business key may be supplied in the request body.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `startProcessInstanceByKey()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  startProcessInstanceByKey$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;
    body?: StartProcessInstanceDto
  }): Observable<StrictHttpResponse<ProcessInstanceWithVariablesDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.StartProcessInstanceByKeyPath, 'post');
    if (params) {
      rb.path('key', params.key, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessInstanceWithVariablesDto>;
      })
    );
  }

  /**
   * Start Instance.
   *
   * Instantiates a given process definition, starts the latest version of the process definition
   * which belongs to no tenant.
   * Process variables and business key may be supplied in the request body.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `startProcessInstanceByKey$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  startProcessInstanceByKey(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;
    body?: StartProcessInstanceDto
  }): Observable<ProcessInstanceWithVariablesDto> {

    return this.startProcessInstanceByKey$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessInstanceWithVariablesDto>) => r.body as ProcessInstanceWithVariablesDto)
    );
  }

  /**
   * Path part for operation getStartFormByKey
   */
  static readonly GetStartFormByKeyPath = '/process-definition/key/{key}/startForm';

  /**
   * Get Start Form Key.
   *
   * Retrieves the key of the start form for the latest version of the process definition
   * which belongs to no tenant.
   * The form key corresponds to the `FormData#formKey` property in the engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStartFormByKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartFormByKey$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) for which the form key is to be retrieved.
     */
    key: string;
  }): Observable<StrictHttpResponse<FormDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetStartFormByKeyPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FormDto>;
      })
    );
  }

  /**
   * Get Start Form Key.
   *
   * Retrieves the key of the start form for the latest version of the process definition
   * which belongs to no tenant.
   * The form key corresponds to the `FormData#formKey` property in the engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStartFormByKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartFormByKey(params: {

    /**
     * The key of the process definition (the latest version thereof) for which the form key is to be retrieved.
     */
    key: string;
  }): Observable<FormDto> {

    return this.getStartFormByKey$Response(params).pipe(
      map((r: StrictHttpResponse<FormDto>) => r.body as FormDto)
    );
  }

  /**
   * Path part for operation getActivityStatisticsByProcessDefinitionKey
   */
  static readonly GetActivityStatisticsByProcessDefinitionKeyPath = '/process-definition/key/{key}/statistics';

  /**
   * Get Activity Instance Statistics.
   *
   * Retrieves runtime statistics of the latest version of the given process definition
   * which belongs to no tenant, grouped by activities.
   * These statistics include the number of running activity instances, optionally the number of failed jobs
   * and also optionally the number of incidents either grouped by incident types or
   * for a specific incident type.
   * **Note**: This does not include historic data.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActivityStatisticsByProcessDefinitionKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivityStatisticsByProcessDefinitionKey$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * Whether to include the number of failed jobs in the result or not. Valid values are &#x60;true&#x60; or &#x60;false&#x60;.
     */
    failedJobs?: boolean;

    /**
     * Valid values for this property are &#x60;true&#x60; or &#x60;false&#x60;.
     * If this property has been set to &#x60;true&#x60; the result will include the corresponding number of incidents
     * for each occurred incident type.
     * If it is set to &#x60;false&#x60;, the incidents will not be included in the result.
     * Cannot be used in combination with &#x60;incidentsForType&#x60;.
     */
    incidents?: boolean;

    /**
     * If this property has been set with any incident type (i.e., a string value) the result
     * will only include the number of incidents for the assigned incident type.
     * Cannot be used in combination with &#x60;incidents&#x60;.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentsForType?: string;
  }): Observable<StrictHttpResponse<Array<ActivityStatisticsResultDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetActivityStatisticsByProcessDefinitionKeyPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
      rb.query('failedJobs', params.failedJobs, {});
      rb.query('incidents', params.incidents, {});
      rb.query('incidentsForType', params.incidentsForType, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ActivityStatisticsResultDto>>;
      })
    );
  }

  /**
   * Get Activity Instance Statistics.
   *
   * Retrieves runtime statistics of the latest version of the given process definition
   * which belongs to no tenant, grouped by activities.
   * These statistics include the number of running activity instances, optionally the number of failed jobs
   * and also optionally the number of incidents either grouped by incident types or
   * for a specific incident type.
   * **Note**: This does not include historic data.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActivityStatisticsByProcessDefinitionKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivityStatisticsByProcessDefinitionKey(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * Whether to include the number of failed jobs in the result or not. Valid values are &#x60;true&#x60; or &#x60;false&#x60;.
     */
    failedJobs?: boolean;

    /**
     * Valid values for this property are &#x60;true&#x60; or &#x60;false&#x60;.
     * If this property has been set to &#x60;true&#x60; the result will include the corresponding number of incidents
     * for each occurred incident type.
     * If it is set to &#x60;false&#x60;, the incidents will not be included in the result.
     * Cannot be used in combination with &#x60;incidentsForType&#x60;.
     */
    incidents?: boolean;

    /**
     * If this property has been set with any incident type (i.e., a string value) the result
     * will only include the number of incidents for the assigned incident type.
     * Cannot be used in combination with &#x60;incidents&#x60;.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentsForType?: string;
  }): Observable<Array<ActivityStatisticsResultDto>> {

    return this.getActivityStatisticsByProcessDefinitionKey$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ActivityStatisticsResultDto>>) => r.body as Array<ActivityStatisticsResultDto>)
    );
  }

  /**
   * Path part for operation submitFormByKey
   */
  static readonly SubmitFormByKeyPath = '/process-definition/key/{key}/submit-form';

  /**
   * Submit Start Form.
   *
   * Starts the latest version of the process definition which belongs to no tenant
   * using a set of process variables and the business key.
   * If the start event has Form Field Metadata defined, the process engine will perform backend validation
   * for any form fields which have validators defined.
   * See [Documentation on Generated Task Forms](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `submitFormByKey()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  submitFormByKey$Response(params: {

    /**
     * The key of the process definition to submit the form for.
     */
    key: string;
    body?: StartProcessInstanceFormDto
  }): Observable<StrictHttpResponse<ProcessInstanceDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.SubmitFormByKeyPath, 'post');
    if (params) {
      rb.path('key', params.key, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessInstanceDto>;
      })
    );
  }

  /**
   * Submit Start Form.
   *
   * Starts the latest version of the process definition which belongs to no tenant
   * using a set of process variables and the business key.
   * If the start event has Form Field Metadata defined, the process engine will perform backend validation
   * for any form fields which have validators defined.
   * See [Documentation on Generated Task Forms](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `submitFormByKey$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  submitFormByKey(params: {

    /**
     * The key of the process definition to submit the form for.
     */
    key: string;
    body?: StartProcessInstanceFormDto
  }): Observable<ProcessInstanceDto> {

    return this.submitFormByKey$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessInstanceDto>) => r.body as ProcessInstanceDto)
    );
  }

  /**
   * Path part for operation updateProcessDefinitionSuspensionStateByKey
   */
  static readonly UpdateProcessDefinitionSuspensionStateByKeyPath = '/process-definition/key/{key}/suspended';

  /**
   * Activate/Suspend by Id.
   *
   * Activates or suspends a given process definition by latest version of process definition key
   * which belongs to no tenant.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProcessDefinitionSuspensionStateByKey()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProcessDefinitionSuspensionStateByKey$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be activated/suspended.
     */
    key: string;

    /**
     * **Note**: Unallowed properties are `processDefinitionId` and `processDefinitionKey`.
     */
    body?: ProcessDefinitionSuspensionStateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.UpdateProcessDefinitionSuspensionStateByKeyPath, 'put');
    if (params) {
      rb.path('key', params.key, {});
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
   * Activate/Suspend by Id.
   *
   * Activates or suspends a given process definition by latest version of process definition key
   * which belongs to no tenant.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateProcessDefinitionSuspensionStateByKey$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProcessDefinitionSuspensionStateByKey(params: {

    /**
     * The key of the process definition (the latest version thereof) to be activated/suspended.
     */
    key: string;

    /**
     * **Note**: Unallowed properties are `processDefinitionId` and `processDefinitionKey`.
     */
    body?: ProcessDefinitionSuspensionStateDto
  }): Observable<void> {

    return this.updateProcessDefinitionSuspensionStateByKey$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getLatestProcessDefinitionByTenantId
   */
  static readonly GetLatestProcessDefinitionByTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}';

  /**
   * Get.
   *
   * Retrieves the latest version of the process definition for tenant according to
   * the `ProcessDefinition` interface in the engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLatestProcessDefinitionByTenantId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLatestProcessDefinitionByTenantId$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
  }): Observable<StrictHttpResponse<ProcessDefinitionDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetLatestProcessDefinitionByTenantIdPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessDefinitionDto>;
      })
    );
  }

  /**
   * Get.
   *
   * Retrieves the latest version of the process definition for tenant according to
   * the `ProcessDefinition` interface in the engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLatestProcessDefinitionByTenantId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLatestProcessDefinitionByTenantId(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
  }): Observable<ProcessDefinitionDto> {

    return this.getLatestProcessDefinitionByTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessDefinitionDto>) => r.body as ProcessDefinitionDto)
    );
  }

  /**
   * Path part for operation deleteProcessDefinitionsByKeyAndTenantId
   */
  static readonly DeleteProcessDefinitionsByKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}';

  /**
   * Delete By Key.
   *
   * Deletes process definitions by a given key and which belong to a tenant id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProcessDefinitionsByKeyAndTenantId()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessDefinitionsByKeyAndTenantId$Response(params: {

    /**
     * The key of the process definitions to be deleted.
     */
    key: string;

    /**
     * The id of the tenant the process definitions belong to.
     */
    'tenant-id': string;

    /**
     * &#x60;true&#x60;, if all process instances, historic process instances and jobs
     * for this process definition should be deleted.
     */
    cascade?: boolean;

    /**
     * &#x60;true&#x60;, if only the built-in ExecutionListeners should be notified with the end event.
     */
    skipCustomListeners?: boolean;

    /**
     * A boolean value to control whether input/output mappings should be executed during deletion.
     * &#x60;true&#x60;, if input/output mappings should not be invoked.
     */
    skipIoMappings?: boolean;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.DeleteProcessDefinitionsByKeyAndTenantIdPath, 'delete');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
      rb.query('cascade', params.cascade, {});
      rb.query('skipCustomListeners', params.skipCustomListeners, {});
      rb.query('skipIoMappings', params.skipIoMappings, {});
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
   * Delete By Key.
   *
   * Deletes process definitions by a given key and which belong to a tenant id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProcessDefinitionsByKeyAndTenantId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessDefinitionsByKeyAndTenantId(params: {

    /**
     * The key of the process definitions to be deleted.
     */
    key: string;

    /**
     * The id of the tenant the process definitions belong to.
     */
    'tenant-id': string;

    /**
     * &#x60;true&#x60;, if all process instances, historic process instances and jobs
     * for this process definition should be deleted.
     */
    cascade?: boolean;

    /**
     * &#x60;true&#x60;, if only the built-in ExecutionListeners should be notified with the end event.
     */
    skipCustomListeners?: boolean;

    /**
     * A boolean value to control whether input/output mappings should be executed during deletion.
     * &#x60;true&#x60;, if input/output mappings should not be invoked.
     */
    skipIoMappings?: boolean;
  }): Observable<void> {

    return this.deleteProcessDefinitionsByKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDeployedStartFormByKeyAndTenantId
   */
  static readonly GetDeployedStartFormByKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}/deployed-start-form';

  /**
   * Get Deployed Start Form.
   *
   * Retrieves the deployed form that can be referenced from a start event.
   * For further information please refer to [User Guide](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#embedded-task-forms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeployedStartFormByKeyAndTenantId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployedStartFormByKeyAndTenantId$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definitions belong to.
     */
    'tenant-id': string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetDeployedStartFormByKeyAndTenantIdPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/xhtml+xml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Get Deployed Start Form.
   *
   * Retrieves the deployed form that can be referenced from a start event.
   * For further information please refer to [User Guide](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#embedded-task-forms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeployedStartFormByKeyAndTenantId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployedStartFormByKeyAndTenantId(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definitions belong to.
     */
    'tenant-id': string;
  }): Observable<Blob> {

    return this.getDeployedStartFormByKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getProcessDefinitionDiagramByKeyAndTenantId
   */
  static readonly GetProcessDefinitionDiagramByKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}/diagram';

  /**
   * Get Diagram.
   *
   * Retrieves the diagram for the latest version of the process definition for tenant.
   *
   * If the process definition's deployment contains an image resource with the same file name
   * as the process definition, the deployed image will be returned by the Get Diagram endpoint.
   * Example: `someProcess.bpmn` and `someProcess.png`.
   * Supported file extentions for the image are: `svg`, `png`, `jpg`, and `gif`.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessDefinitionDiagramByKeyAndTenantId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionDiagramByKeyAndTenantId$Response(params: {

    /**
     * The key of the process definition.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetProcessDefinitionDiagramByKeyAndTenantIdPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Get Diagram.
   *
   * Retrieves the diagram for the latest version of the process definition for tenant.
   *
   * If the process definition's deployment contains an image resource with the same file name
   * as the process definition, the deployed image will be returned by the Get Diagram endpoint.
   * Example: `someProcess.bpmn` and `someProcess.png`.
   * Supported file extentions for the image are: `svg`, `png`, `jpg`, and `gif`.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessDefinitionDiagramByKeyAndTenantId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionDiagramByKeyAndTenantId(params: {

    /**
     * The key of the process definition.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
  }): Observable<Blob> {

    return this.getProcessDefinitionDiagramByKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getStartFormVariablesByKeyAndTenantId
   */
  static readonly GetStartFormVariablesByKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}/form-variables';

  /**
   * Get Start Form Variables.
   *
   * Retrieves the start form variables for the latest process definition for a tenant
   * (only if they are defined via the 
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms) approach).
   * The start form variables take form data specified on the start event into account.
   * If form fields are defined, the variable types and default values
   * of the form fields are taken into account.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStartFormVariablesByKeyAndTenantId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartFormVariablesByKeyAndTenantId$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;

    /**
     * A comma-separated list of variable names. Allows restricting the list of requested
     * variables to the variable names in the list. It is best practice to restrict the
     * list of variables to the variables actually required by the form in order to
     * minimize fetching of data. If the query parameter is ommitted all variables are
     * fetched. If the query parameter contains non-existent variable names, the variable
     * names are ignored.
     */
    variableNames?: string;

    /**
     * Determines whether serializable variable values (typically variables that store
     * custom Java objects) should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and
     * transformed to JSON using [Jackson&#x27;s](http://jackson.codehaus.org/) POJO/bean
     * property introspection feature. Note that this requires the Java classes of the
     * variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string
     * containing XML.
     *
     * **Note**: While true is the default value for reasons of backward compatibility, we
     * recommend setting this parameter to false when developing web applications that are
     * independent of the Java process applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<StrictHttpResponse<{ [key: string]: VariableValueDto }>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetStartFormVariablesByKeyAndTenantIdPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
      rb.query('variableNames', params.variableNames, {});
      rb.query('deserializeValues', params.deserializeValues, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ [key: string]: VariableValueDto }>;
      })
    );
  }

  /**
   * Get Start Form Variables.
   *
   * Retrieves the start form variables for the latest process definition for a tenant
   * (only if they are defined via the 
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms) approach).
   * The start form variables take form data specified on the start event into account.
   * If form fields are defined, the variable types and default values
   * of the form fields are taken into account.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStartFormVariablesByKeyAndTenantId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartFormVariablesByKeyAndTenantId(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;

    /**
     * A comma-separated list of variable names. Allows restricting the list of requested
     * variables to the variable names in the list. It is best practice to restrict the
     * list of variables to the variables actually required by the form in order to
     * minimize fetching of data. If the query parameter is ommitted all variables are
     * fetched. If the query parameter contains non-existent variable names, the variable
     * names are ignored.
     */
    variableNames?: string;

    /**
     * Determines whether serializable variable values (typically variables that store
     * custom Java objects) should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and
     * transformed to JSON using [Jackson&#x27;s](http://jackson.codehaus.org/) POJO/bean
     * property introspection feature. Note that this requires the Java classes of the
     * variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string
     * containing XML.
     *
     * **Note**: While true is the default value for reasons of backward compatibility, we
     * recommend setting this parameter to false when developing web applications that are
     * independent of the Java process applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<{ [key: string]: VariableValueDto }> {

    return this.getStartFormVariablesByKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<{ [key: string]: VariableValueDto }>) => r.body as { [key: string]: VariableValueDto })
    );
  }

  /**
   * Path part for operation updateHistoryTimeToLiveByProcessDefinitionKeyAndTenantId
   */
  static readonly UpdateHistoryTimeToLiveByProcessDefinitionKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}/history-time-to-live';

  /**
   * Update History Time to Live.
   *
   * Updates history time to live for the latest version of the process definition for a tenant.
   * The field is used within [History cleanup](https://docs.camunda.org/manual/7.14/user-guide/process-engine/history/#history-cleanup).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateHistoryTimeToLiveByProcessDefinitionKeyAndTenantId()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHistoryTimeToLiveByProcessDefinitionKeyAndTenantId$Response(params: {

    /**
     * The key of the process definition to change history time to live.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
    body?: HistoryTimeToLiveDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.UpdateHistoryTimeToLiveByProcessDefinitionKeyAndTenantIdPath, 'put');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
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
   * Update History Time to Live.
   *
   * Updates history time to live for the latest version of the process definition for a tenant.
   * The field is used within [History cleanup](https://docs.camunda.org/manual/7.14/user-guide/process-engine/history/#history-cleanup).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateHistoryTimeToLiveByProcessDefinitionKeyAndTenantId$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHistoryTimeToLiveByProcessDefinitionKeyAndTenantId(params: {

    /**
     * The key of the process definition to change history time to live.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
    body?: HistoryTimeToLiveDto
  }): Observable<void> {

    return this.updateHistoryTimeToLiveByProcessDefinitionKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getRenderedStartFormByKeyAndTenantId
   */
  static readonly GetRenderedStartFormByKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}/rendered-form';

  /**
   * Get Rendered Start Form.
   *
   * Retrieves  the rendered form for the latest version of the process definition for a tenant.
   * This method can be used to get the HTML rendering of a
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRenderedStartFormByKeyAndTenantId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRenderedStartFormByKeyAndTenantId$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetRenderedStartFormByKeyAndTenantIdPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/xhtml+xml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Get Rendered Start Form.
   *
   * Retrieves  the rendered form for the latest version of the process definition for a tenant.
   * This method can be used to get the HTML rendering of a
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRenderedStartFormByKeyAndTenantId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRenderedStartFormByKeyAndTenantId(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
  }): Observable<Blob> {

    return this.getRenderedStartFormByKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation startProcessInstanceByKeyAndTenantId
   */
  static readonly StartProcessInstanceByKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}/start';

  /**
   * Start Instance.
   *
   * Instantiates a given process definition, starts the latest version of the process definition for tenant.
   * Process variables and business key may be supplied in the request body.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `startProcessInstanceByKeyAndTenantId()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  startProcessInstanceByKeyAndTenantId$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
    body?: StartProcessInstanceDto
  }): Observable<StrictHttpResponse<ProcessInstanceWithVariablesDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.StartProcessInstanceByKeyAndTenantIdPath, 'post');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessInstanceWithVariablesDto>;
      })
    );
  }

  /**
   * Start Instance.
   *
   * Instantiates a given process definition, starts the latest version of the process definition for tenant.
   * Process variables and business key may be supplied in the request body.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `startProcessInstanceByKeyAndTenantId$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  startProcessInstanceByKeyAndTenantId(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
    body?: StartProcessInstanceDto
  }): Observable<ProcessInstanceWithVariablesDto> {

    return this.startProcessInstanceByKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessInstanceWithVariablesDto>) => r.body as ProcessInstanceWithVariablesDto)
    );
  }

  /**
   * Path part for operation getStartFormByKeyAndTenantId
   */
  static readonly GetStartFormByKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}/startForm';

  /**
   * Get Start Form Key.
   *
   * Retrieves the key of the start form for the latest version of the process definition for a tenant.
   * The form key corresponds to the `FormData#formKey` property in the engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStartFormByKeyAndTenantId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartFormByKeyAndTenantId$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) for which the form key is to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
  }): Observable<StrictHttpResponse<FormDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetStartFormByKeyAndTenantIdPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FormDto>;
      })
    );
  }

  /**
   * Get Start Form Key.
   *
   * Retrieves the key of the start form for the latest version of the process definition for a tenant.
   * The form key corresponds to the `FormData#formKey` property in the engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStartFormByKeyAndTenantId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartFormByKeyAndTenantId(params: {

    /**
     * The key of the process definition (the latest version thereof) for which the form key is to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
  }): Observable<FormDto> {

    return this.getStartFormByKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<FormDto>) => r.body as FormDto)
    );
  }

  /**
   * Path part for operation getActivityStatisticsByProcessDefinitionKeyAndTenantId
   */
  static readonly GetActivityStatisticsByProcessDefinitionKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}/statistics';

  /**
   * Get Activity Instance Statistics.
   *
   * Retrieves runtime statistics of the latest version of the given process definition for a tenant,
   * grouped by activities.
   * These statistics include the number of running activity instances, optionally the number of failed jobs
   * and also optionally the number of incidents either grouped by incident types or
   * for a specific incident type.
   * **Note**: This does not include historic data.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActivityStatisticsByProcessDefinitionKeyAndTenantId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivityStatisticsByProcessDefinitionKeyAndTenantId$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;

    /**
     * Whether to include the number of failed jobs in the result or not. Valid values are &#x60;true&#x60; or &#x60;false&#x60;.
     */
    failedJobs?: boolean;

    /**
     * Valid values for this property are &#x60;true&#x60; or &#x60;false&#x60;.
     * If this property has been set to &#x60;true&#x60; the result will include the corresponding number of incidents
     * for each occurred incident type.
     * If it is set to &#x60;false&#x60;, the incidents will not be included in the result.
     * Cannot be used in combination with &#x60;incidentsForType&#x60;.
     */
    incidents?: boolean;

    /**
     * If this property has been set with any incident type (i.e., a string value) the result
     * will only include the number of incidents for the assigned incident type.
     * Cannot be used in combination with &#x60;incidents&#x60;.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentsForType?: string;
  }): Observable<StrictHttpResponse<Array<ActivityStatisticsResultDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetActivityStatisticsByProcessDefinitionKeyAndTenantIdPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
      rb.query('failedJobs', params.failedJobs, {});
      rb.query('incidents', params.incidents, {});
      rb.query('incidentsForType', params.incidentsForType, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ActivityStatisticsResultDto>>;
      })
    );
  }

  /**
   * Get Activity Instance Statistics.
   *
   * Retrieves runtime statistics of the latest version of the given process definition for a tenant,
   * grouped by activities.
   * These statistics include the number of running activity instances, optionally the number of failed jobs
   * and also optionally the number of incidents either grouped by incident types or
   * for a specific incident type.
   * **Note**: This does not include historic data.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActivityStatisticsByProcessDefinitionKeyAndTenantId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivityStatisticsByProcessDefinitionKeyAndTenantId(params: {

    /**
     * The key of the process definition (the latest version thereof) to be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;

    /**
     * Whether to include the number of failed jobs in the result or not. Valid values are &#x60;true&#x60; or &#x60;false&#x60;.
     */
    failedJobs?: boolean;

    /**
     * Valid values for this property are &#x60;true&#x60; or &#x60;false&#x60;.
     * If this property has been set to &#x60;true&#x60; the result will include the corresponding number of incidents
     * for each occurred incident type.
     * If it is set to &#x60;false&#x60;, the incidents will not be included in the result.
     * Cannot be used in combination with &#x60;incidentsForType&#x60;.
     */
    incidents?: boolean;

    /**
     * If this property has been set with any incident type (i.e., a string value) the result
     * will only include the number of incidents for the assigned incident type.
     * Cannot be used in combination with &#x60;incidents&#x60;.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentsForType?: string;
  }): Observable<Array<ActivityStatisticsResultDto>> {

    return this.getActivityStatisticsByProcessDefinitionKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ActivityStatisticsResultDto>>) => r.body as Array<ActivityStatisticsResultDto>)
    );
  }

  /**
   * Path part for operation submitFormByKeyAndTenantId
   */
  static readonly SubmitFormByKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}/submit-form';

  /**
   * Submit Start Form.
   *
   * Starts the latest version of the process definition for a tenant
   * using a set of process variables and the business key.
   * If the start event has Form Field Metadata defined, the process engine will perform backend validation
   * for any form fields which have validators defined.
   * See [Documentation on Generated Task Forms](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `submitFormByKeyAndTenantId()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  submitFormByKeyAndTenantId$Response(params: {

    /**
     * The key of the process definition to submit the form for.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
    body?: StartProcessInstanceFormDto
  }): Observable<StrictHttpResponse<ProcessInstanceDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.SubmitFormByKeyAndTenantIdPath, 'post');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessInstanceDto>;
      })
    );
  }

  /**
   * Submit Start Form.
   *
   * Starts the latest version of the process definition for a tenant
   * using a set of process variables and the business key.
   * If the start event has Form Field Metadata defined, the process engine will perform backend validation
   * for any form fields which have validators defined.
   * See [Documentation on Generated Task Forms](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `submitFormByKeyAndTenantId$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  submitFormByKeyAndTenantId(params: {

    /**
     * The key of the process definition to submit the form for.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
    body?: StartProcessInstanceFormDto
  }): Observable<ProcessInstanceDto> {

    return this.submitFormByKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessInstanceDto>) => r.body as ProcessInstanceDto)
    );
  }

  /**
   * Path part for operation updateProcessDefinitionSuspensionStateByKeyAndTenantId
   */
  static readonly UpdateProcessDefinitionSuspensionStateByKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}/suspended';

  /**
   * Activate/Suspend by Id.
   *
   * Activates or suspends a given process definition by the latest version of
   * the process definition for tenant.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProcessDefinitionSuspensionStateByKeyAndTenantId()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProcessDefinitionSuspensionStateByKeyAndTenantId$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) to be activated/suspended.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;

    /**
     * **Note**: Unallowed properties are `processDefinitionId` and `processDefinitionKey`.
     */
    body?: ProcessDefinitionSuspensionStateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.UpdateProcessDefinitionSuspensionStateByKeyAndTenantIdPath, 'put');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
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
   * Activate/Suspend by Id.
   *
   * Activates or suspends a given process definition by the latest version of
   * the process definition for tenant.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateProcessDefinitionSuspensionStateByKeyAndTenantId$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProcessDefinitionSuspensionStateByKeyAndTenantId(params: {

    /**
     * The key of the process definition (the latest version thereof) to be activated/suspended.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;

    /**
     * **Note**: Unallowed properties are `processDefinitionId` and `processDefinitionKey`.
     */
    body?: ProcessDefinitionSuspensionStateDto
  }): Observable<void> {

    return this.updateProcessDefinitionSuspensionStateByKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProcessDefinitionBpmn20XmlByKeyAndTenantId
   */
  static readonly GetProcessDefinitionBpmn20XmlByKeyAndTenantIdPath = '/process-definition/key/{key}/tenant-id/{tenant-id}/xml';

  /**
   * Get XML.
   *
   * Retrieves latest version the BPMN 2.0 XML of a process definition.
   * Returns the XML for the latest version of the process definition for tenant.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessDefinitionBpmn20XmlByKeyAndTenantId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionBpmn20XmlByKeyAndTenantId$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) whose XML should be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
  }): Observable<StrictHttpResponse<ProcessDefinitionDiagramDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetProcessDefinitionBpmn20XmlByKeyAndTenantIdPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
      rb.path('tenant-id', params['tenant-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessDefinitionDiagramDto>;
      })
    );
  }

  /**
   * Get XML.
   *
   * Retrieves latest version the BPMN 2.0 XML of a process definition.
   * Returns the XML for the latest version of the process definition for tenant.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessDefinitionBpmn20XmlByKeyAndTenantId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionBpmn20XmlByKeyAndTenantId(params: {

    /**
     * The key of the process definition (the latest version thereof) whose XML should be retrieved.
     */
    key: string;

    /**
     * The id of the tenant the process definition belongs to.
     */
    'tenant-id': string;
  }): Observable<ProcessDefinitionDiagramDto> {

    return this.getProcessDefinitionBpmn20XmlByKeyAndTenantId$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessDefinitionDiagramDto>) => r.body as ProcessDefinitionDiagramDto)
    );
  }

  /**
   * Path part for operation getProcessDefinitionBpmn20XmlByKey
   */
  static readonly GetProcessDefinitionBpmn20XmlByKeyPath = '/process-definition/key/{key}/xml';

  /**
   * Get XML.
   *
   * Retrieves latest version the BPMN 2.0 XML of a process definition.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessDefinitionBpmn20XmlByKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionBpmn20XmlByKey$Response(params: {

    /**
     * The key of the process definition (the latest version thereof) whose XML should be retrieved.
     */
    key: string;
  }): Observable<StrictHttpResponse<ProcessDefinitionDiagramDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetProcessDefinitionBpmn20XmlByKeyPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessDefinitionDiagramDto>;
      })
    );
  }

  /**
   * Get XML.
   *
   * Retrieves latest version the BPMN 2.0 XML of a process definition.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessDefinitionBpmn20XmlByKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionBpmn20XmlByKey(params: {

    /**
     * The key of the process definition (the latest version thereof) whose XML should be retrieved.
     */
    key: string;
  }): Observable<ProcessDefinitionDiagramDto> {

    return this.getProcessDefinitionBpmn20XmlByKey$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessDefinitionDiagramDto>) => r.body as ProcessDefinitionDiagramDto)
    );
  }

  /**
   * Path part for operation getProcessDefinitionStatistics
   */
  static readonly GetProcessDefinitionStatisticsPath = '/process-definition/statistics';

  /**
   * Get Process Instance Statistics.
   *
   * Retrieves runtime statistics of the process engine, grouped by process definitions.
   * These statistics include the number of running process instances, optionally the number of failed jobs
   * and also optionally the number of incidents either grouped by incident types or
   * for a specific incident type.
   * **Note**: This does not include historic data.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessDefinitionStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionStatistics$Response(params?: {

    /**
     * Whether to include the number of failed jobs in the result or not. Valid values are &#x60;true&#x60; or &#x60;false&#x60;.
     */
    failedJobs?: boolean;

    /**
     * Valid values for this property are &#x60;true&#x60; or &#x60;false&#x60;.
     * If this property has been set to &#x60;true&#x60; the result will include the corresponding number of incidents
     * for each occurred incident type.
     * If it is set to &#x60;false&#x60;, the incidents will not be included in the result.
     * Cannot be used in combination with &#x60;incidentsForType&#x60;.
     */
    incidents?: boolean;

    /**
     * If this property has been set with any incident type (i.e., a string value) the result
     * will only include the number of incidents for the assigned incident type.
     * Cannot be used in combination with &#x60;incidents&#x60;.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentsForType?: string;

    /**
     * Valid values for this property are &#x60;true&#x60; or &#x60;false&#x60;.
     * If this property has been set to &#x60;true&#x60; the result will include the corresponding number of
     * root incidents for each occurred incident type.
     * If it is set to &#x60;false&#x60;, the incidents will not be included in the result.
     * Cannot be used in combination with &#x60;incidentsForType&#x60; or &#x60;incidents&#x60;.
     */
    rootIncidents?: boolean;
  }): Observable<StrictHttpResponse<Array<ProcessDefinitionStatisticsResultDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetProcessDefinitionStatisticsPath, 'get');
    if (params) {
      rb.query('failedJobs', params.failedJobs, {});
      rb.query('incidents', params.incidents, {});
      rb.query('incidentsForType', params.incidentsForType, {});
      rb.query('rootIncidents', params.rootIncidents, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProcessDefinitionStatisticsResultDto>>;
      })
    );
  }

  /**
   * Get Process Instance Statistics.
   *
   * Retrieves runtime statistics of the process engine, grouped by process definitions.
   * These statistics include the number of running process instances, optionally the number of failed jobs
   * and also optionally the number of incidents either grouped by incident types or
   * for a specific incident type.
   * **Note**: This does not include historic data.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessDefinitionStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionStatistics(params?: {

    /**
     * Whether to include the number of failed jobs in the result or not. Valid values are &#x60;true&#x60; or &#x60;false&#x60;.
     */
    failedJobs?: boolean;

    /**
     * Valid values for this property are &#x60;true&#x60; or &#x60;false&#x60;.
     * If this property has been set to &#x60;true&#x60; the result will include the corresponding number of incidents
     * for each occurred incident type.
     * If it is set to &#x60;false&#x60;, the incidents will not be included in the result.
     * Cannot be used in combination with &#x60;incidentsForType&#x60;.
     */
    incidents?: boolean;

    /**
     * If this property has been set with any incident type (i.e., a string value) the result
     * will only include the number of incidents for the assigned incident type.
     * Cannot be used in combination with &#x60;incidents&#x60;.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentsForType?: string;

    /**
     * Valid values for this property are &#x60;true&#x60; or &#x60;false&#x60;.
     * If this property has been set to &#x60;true&#x60; the result will include the corresponding number of
     * root incidents for each occurred incident type.
     * If it is set to &#x60;false&#x60;, the incidents will not be included in the result.
     * Cannot be used in combination with &#x60;incidentsForType&#x60; or &#x60;incidents&#x60;.
     */
    rootIncidents?: boolean;
  }): Observable<Array<ProcessDefinitionStatisticsResultDto>> {

    return this.getProcessDefinitionStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProcessDefinitionStatisticsResultDto>>) => r.body as Array<ProcessDefinitionStatisticsResultDto>)
    );
  }

  /**
   * Path part for operation updateProcessDefinitionSuspensionState
   */
  static readonly UpdateProcessDefinitionSuspensionStatePath = '/process-definition/suspended';

  /**
   * Activate/Suspend By Key.
   *
   * Activates or suspends process definitions with the given process definition key.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProcessDefinitionSuspensionState()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProcessDefinitionSuspensionState$Response(params?: {

    /**
     * **Note**: Unallowed property is `processDefinitionId`.
     */
    body?: ProcessDefinitionSuspensionStateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.UpdateProcessDefinitionSuspensionStatePath, 'put');
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
   * Activate/Suspend By Key.
   *
   * Activates or suspends process definitions with the given process definition key.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateProcessDefinitionSuspensionState$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProcessDefinitionSuspensionState(params?: {

    /**
     * **Note**: Unallowed property is `processDefinitionId`.
     */
    body?: ProcessDefinitionSuspensionStateDto
  }): Observable<void> {

    return this.updateProcessDefinitionSuspensionState$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProcessDefinition
   */
  static readonly GetProcessDefinitionPath = '/process-definition/{id}';

  /**
   * Get.
   *
   * Retrieves a process definition according to the `ProcessDefinition` interface in the engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessDefinition()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinition$Response(params: {

    /**
     * The id of the process definition to be retrieved.
     */
    id: string;
  }): Observable<StrictHttpResponse<ProcessDefinitionDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetProcessDefinitionPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessDefinitionDto>;
      })
    );
  }

  /**
   * Get.
   *
   * Retrieves a process definition according to the `ProcessDefinition` interface in the engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessDefinition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinition(params: {

    /**
     * The id of the process definition to be retrieved.
     */
    id: string;
  }): Observable<ProcessDefinitionDto> {

    return this.getProcessDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessDefinitionDto>) => r.body as ProcessDefinitionDto)
    );
  }

  /**
   * Path part for operation deleteProcessDefinition
   */
  static readonly DeleteProcessDefinitionPath = '/process-definition/{id}';

  /**
   * Delete.
   *
   * Deletes a running process instance by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProcessDefinition()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessDefinition$Response(params: {

    /**
     * The id of the process definition to be deleted.
     */
    id: string;

    /**
     * &#x60;true&#x60;, if all process instances, historic process instances and jobs
     * for this process definition should be deleted.
     */
    cascade?: boolean;

    /**
     * &#x60;true&#x60;, if only the built-in ExecutionListeners should be notified with the end event.
     */
    skipCustomListeners?: boolean;

    /**
     * A boolean value to control whether input/output mappings should be executed during deletion.
     * &#x60;true&#x60;, if input/output mappings should not be invoked.
     */
    skipIoMappings?: boolean;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.DeleteProcessDefinitionPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('cascade', params.cascade, {});
      rb.query('skipCustomListeners', params.skipCustomListeners, {});
      rb.query('skipIoMappings', params.skipIoMappings, {});
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
   * Deletes a running process instance by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProcessDefinition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessDefinition(params: {

    /**
     * The id of the process definition to be deleted.
     */
    id: string;

    /**
     * &#x60;true&#x60;, if all process instances, historic process instances and jobs
     * for this process definition should be deleted.
     */
    cascade?: boolean;

    /**
     * &#x60;true&#x60;, if only the built-in ExecutionListeners should be notified with the end event.
     */
    skipCustomListeners?: boolean;

    /**
     * A boolean value to control whether input/output mappings should be executed during deletion.
     * &#x60;true&#x60;, if input/output mappings should not be invoked.
     */
    skipIoMappings?: boolean;
  }): Observable<void> {

    return this.deleteProcessDefinition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDeployedStartForm
   */
  static readonly GetDeployedStartFormPath = '/process-definition/{id}/deployed-start-form';

  /**
   * Get Deployed Start Form.
   *
   * Retrieves the deployed form that can be referenced from a start event.
   * For further information please refer to [User Guide](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#embedded-task-forms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeployedStartForm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployedStartForm$Response(params: {

    /**
     * The id of the process definition to get the deployed start form for.
     */
    id: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetDeployedStartFormPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/xhtml+xml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Get Deployed Start Form.
   *
   * Retrieves the deployed form that can be referenced from a start event.
   * For further information please refer to [User Guide](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#embedded-task-forms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeployedStartForm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployedStartForm(params: {

    /**
     * The id of the process definition to get the deployed start form for.
     */
    id: string;
  }): Observable<Blob> {

    return this.getDeployedStartForm$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getProcessDefinitionDiagram
   */
  static readonly GetProcessDefinitionDiagramPath = '/process-definition/{id}/diagram';

  /**
   * Get Diagram.
   *
   * Retrieves the diagram of a process definition.
   *
   * If the process definition's deployment contains an image resource with the same file name
   * as the process definition, the deployed image will be returned by the Get Diagram endpoint.
   * Example: `someProcess.bpmn` and `someProcess.png`.
   * Supported file extentions for the image are: `svg`, `png`, `jpg`, and `gif`.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessDefinitionDiagram()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionDiagram$Response(params: {

    /**
     * The id of the process definition.
     */
    id: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetProcessDefinitionDiagramPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Get Diagram.
   *
   * Retrieves the diagram of a process definition.
   *
   * If the process definition's deployment contains an image resource with the same file name
   * as the process definition, the deployed image will be returned by the Get Diagram endpoint.
   * Example: `someProcess.bpmn` and `someProcess.png`.
   * Supported file extentions for the image are: `svg`, `png`, `jpg`, and `gif`.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessDefinitionDiagram$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionDiagram(params: {

    /**
     * The id of the process definition.
     */
    id: string;
  }): Observable<Blob> {

    return this.getProcessDefinitionDiagram$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getStartFormVariables
   */
  static readonly GetStartFormVariablesPath = '/process-definition/{id}/form-variables';

  /**
   * Get Start Form Variables.
   *
   * Retrieves the start form variables for a process definition
   * (only if they are defined via the 
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms) approach).
   * The start form variables take form data specified on the start event into account.
   * If form fields are defined, the variable types and default values
   * of the form fields are taken into account.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStartFormVariables()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartFormVariables$Response(params: {

    /**
     * The id of the process definition to retrieve the variables for.
     */
    id: string;

    /**
     * A comma-separated list of variable names. Allows restricting the list of requested
     * variables to the variable names in the list. It is best practice to restrict the
     * list of variables to the variables actually required by the form in order to
     * minimize fetching of data. If the query parameter is ommitted all variables are
     * fetched. If the query parameter contains non-existent variable names, the variable
     * names are ignored.
     */
    variableNames?: string;

    /**
     * Determines whether serializable variable values (typically variables that store
     * custom Java objects) should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and
     * transformed to JSON using [Jackson&#x27;s](http://jackson.codehaus.org/) POJO/bean
     * property introspection feature. Note that this requires the Java classes of the
     * variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string
     * containing XML.
     *
     * **Note**: While true is the default value for reasons of backward compatibility, we
     * recommend setting this parameter to false when developing web applications that are
     * independent of the Java process applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<StrictHttpResponse<{ [key: string]: VariableValueDto }>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetStartFormVariablesPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('variableNames', params.variableNames, {});
      rb.query('deserializeValues', params.deserializeValues, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ [key: string]: VariableValueDto }>;
      })
    );
  }

  /**
   * Get Start Form Variables.
   *
   * Retrieves the start form variables for a process definition
   * (only if they are defined via the 
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms) approach).
   * The start form variables take form data specified on the start event into account.
   * If form fields are defined, the variable types and default values
   * of the form fields are taken into account.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStartFormVariables$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartFormVariables(params: {

    /**
     * The id of the process definition to retrieve the variables for.
     */
    id: string;

    /**
     * A comma-separated list of variable names. Allows restricting the list of requested
     * variables to the variable names in the list. It is best practice to restrict the
     * list of variables to the variables actually required by the form in order to
     * minimize fetching of data. If the query parameter is ommitted all variables are
     * fetched. If the query parameter contains non-existent variable names, the variable
     * names are ignored.
     */
    variableNames?: string;

    /**
     * Determines whether serializable variable values (typically variables that store
     * custom Java objects) should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and
     * transformed to JSON using [Jackson&#x27;s](http://jackson.codehaus.org/) POJO/bean
     * property introspection feature. Note that this requires the Java classes of the
     * variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string
     * containing XML.
     *
     * **Note**: While true is the default value for reasons of backward compatibility, we
     * recommend setting this parameter to false when developing web applications that are
     * independent of the Java process applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<{ [key: string]: VariableValueDto }> {

    return this.getStartFormVariables$Response(params).pipe(
      map((r: StrictHttpResponse<{ [key: string]: VariableValueDto }>) => r.body as { [key: string]: VariableValueDto })
    );
  }

  /**
   * Path part for operation updateHistoryTimeToLiveByProcessDefinitionId
   */
  static readonly UpdateHistoryTimeToLiveByProcessDefinitionIdPath = '/process-definition/{id}/history-time-to-live';

  /**
   * Update History Time to Live.
   *
   * Updates history time to live for process definition.
   * The field is used within [History cleanup](https://docs.camunda.org/manual/7.14/user-guide/process-engine/history/#history-cleanup).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateHistoryTimeToLiveByProcessDefinitionId()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHistoryTimeToLiveByProcessDefinitionId$Response(params: {

    /**
     * The id of the process definition to change history time to live.
     */
    id: string;
    body?: HistoryTimeToLiveDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.UpdateHistoryTimeToLiveByProcessDefinitionIdPath, 'put');
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
   * Update History Time to Live.
   *
   * Updates history time to live for process definition.
   * The field is used within [History cleanup](https://docs.camunda.org/manual/7.14/user-guide/process-engine/history/#history-cleanup).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateHistoryTimeToLiveByProcessDefinitionId$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHistoryTimeToLiveByProcessDefinitionId(params: {

    /**
     * The id of the process definition to change history time to live.
     */
    id: string;
    body?: HistoryTimeToLiveDto
  }): Observable<void> {

    return this.updateHistoryTimeToLiveByProcessDefinitionId$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getRenderedStartForm
   */
  static readonly GetRenderedStartFormPath = '/process-definition/{id}/rendered-form';

  /**
   * Get Rendered Start Form.
   *
   * Retrieves the rendered form for a process definition.
   * This method can be used to get the HTML rendering of a
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRenderedStartForm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRenderedStartForm$Response(params: {

    /**
     * The id of the process definition to get the rendered start form for.
     */
    id: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetRenderedStartFormPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/xhtml+xml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Get Rendered Start Form.
   *
   * Retrieves the rendered form for a process definition.
   * This method can be used to get the HTML rendering of a
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRenderedStartForm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRenderedStartForm(params: {

    /**
     * The id of the process definition to get the rendered start form for.
     */
    id: string;
  }): Observable<Blob> {

    return this.getRenderedStartForm$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation restartProcessInstance
   */
  static readonly RestartProcessInstancePath = '/process-definition/{id}/restart';

  /**
   * Restart Process Instance.
   *
   * Restarts process instances that were canceled or terminated synchronously.
   * Can also restart completed process instances.
   * It will create a new instance using the original instance information.
   * To execute the restart asynchronously, use the
   * [Restart Process Instance Async](https://docs.camunda.org/manual/7.14/reference/rest/process-definition/post-restart-process-instance-async/) method.
   *
   * For more information about the difference between synchronous and asynchronous execution,
   * please refer to the related section of the
   * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/process-instance-restart/#execution).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restartProcessInstance()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  restartProcessInstance$Response(params: {

    /**
     * The id of the process definition of the process instances to restart.
     */
    id: string;
    body?: RestartProcessInstanceDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.RestartProcessInstancePath, 'post');
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
   * Restart Process Instance.
   *
   * Restarts process instances that were canceled or terminated synchronously.
   * Can also restart completed process instances.
   * It will create a new instance using the original instance information.
   * To execute the restart asynchronously, use the
   * [Restart Process Instance Async](https://docs.camunda.org/manual/7.14/reference/rest/process-definition/post-restart-process-instance-async/) method.
   *
   * For more information about the difference between synchronous and asynchronous execution,
   * please refer to the related section of the
   * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/process-instance-restart/#execution).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `restartProcessInstance$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  restartProcessInstance(params: {

    /**
     * The id of the process definition of the process instances to restart.
     */
    id: string;
    body?: RestartProcessInstanceDto
  }): Observable<void> {

    return this.restartProcessInstance$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation restartProcessInstanceAsyncOperation
   */
  static readonly RestartProcessInstanceAsyncOperationPath = '/process-definition/{id}/restart-async';

  /**
   * Restart Process Instance Async.
   *
   * Restarts process instances that were canceled or terminated asynchronously.
   * Can also restart completed process instances.
   * It will create a new instance using the original instance information.
   * To execute the restart asynchronously, use the
   * [Restart Process Instance](https://docs.camunda.org/manual/7.14/reference/rest/process-definition/post-restart-process-instance-sync/) method.
   *
   * For more information about the difference between synchronous and asynchronous execution,
   * please refer to the related section of the
   * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/process-instance-restart/#execution).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restartProcessInstanceAsyncOperation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  restartProcessInstanceAsyncOperation$Response(params: {

    /**
     * The id of the process definition of the process instances to restart.
     */
    id: string;
    body?: RestartProcessInstanceDto
  }): Observable<StrictHttpResponse<BatchDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.RestartProcessInstanceAsyncOperationPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
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
   * Restart Process Instance Async.
   *
   * Restarts process instances that were canceled or terminated asynchronously.
   * Can also restart completed process instances.
   * It will create a new instance using the original instance information.
   * To execute the restart asynchronously, use the
   * [Restart Process Instance](https://docs.camunda.org/manual/7.14/reference/rest/process-definition/post-restart-process-instance-sync/) method.
   *
   * For more information about the difference between synchronous and asynchronous execution,
   * please refer to the related section of the
   * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/process-instance-restart/#execution).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `restartProcessInstanceAsyncOperation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  restartProcessInstanceAsyncOperation(params: {

    /**
     * The id of the process definition of the process instances to restart.
     */
    id: string;
    body?: RestartProcessInstanceDto
  }): Observable<BatchDto> {

    return this.restartProcessInstanceAsyncOperation$Response(params).pipe(
      map((r: StrictHttpResponse<BatchDto>) => r.body as BatchDto)
    );
  }

  /**
   * Path part for operation startProcessInstance
   */
  static readonly StartProcessInstancePath = '/process-definition/{id}/start';

  /**
   * Start Instance.
   *
   * Instantiates a given process definition.
   * Process variables and business key may be supplied in the request body.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `startProcessInstance()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  startProcessInstance$Response(params: {

    /**
     * The id of the process definition to be retrieved.
     */
    id: string;
    body?: StartProcessInstanceDto
  }): Observable<StrictHttpResponse<ProcessInstanceWithVariablesDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.StartProcessInstancePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessInstanceWithVariablesDto>;
      })
    );
  }

  /**
   * Start Instance.
   *
   * Instantiates a given process definition.
   * Process variables and business key may be supplied in the request body.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `startProcessInstance$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  startProcessInstance(params: {

    /**
     * The id of the process definition to be retrieved.
     */
    id: string;
    body?: StartProcessInstanceDto
  }): Observable<ProcessInstanceWithVariablesDto> {

    return this.startProcessInstance$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessInstanceWithVariablesDto>) => r.body as ProcessInstanceWithVariablesDto)
    );
  }

  /**
   * Path part for operation getStartForm
   */
  static readonly GetStartFormPath = '/process-definition/{id}/startForm';

  /**
   * Get Start Form Key.
   *
   * Retrieves the key of the start form for a process definition.
   * The form key corresponds to the `FormData#formKey` property in the engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStartForm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartForm$Response(params: {

    /**
     * The id of the process definition to get the start form key for.
     */
    id: string;
  }): Observable<StrictHttpResponse<FormDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetStartFormPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FormDto>;
      })
    );
  }

  /**
   * Get Start Form Key.
   *
   * Retrieves the key of the start form for a process definition.
   * The form key corresponds to the `FormData#formKey` property in the engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStartForm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStartForm(params: {

    /**
     * The id of the process definition to get the start form key for.
     */
    id: string;
  }): Observable<FormDto> {

    return this.getStartForm$Response(params).pipe(
      map((r: StrictHttpResponse<FormDto>) => r.body as FormDto)
    );
  }

  /**
   * Path part for operation getActivityStatistics
   */
  static readonly GetActivityStatisticsPath = '/process-definition/{id}/statistics';

  /**
   * Get Activity Instance Statistics.
   *
   * Retrieves runtime statistics of a given process definition, grouped by activities.
   * These statistics include the number of running activity instances, optionally the number of failed jobs
   * and also optionally the number of incidents either grouped by incident types or for a specific incident type.
   * **Note**: This does not include historic data.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActivityStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivityStatistics$Response(params: {

    /**
     * The id of the process definition.
     */
    id: string;

    /**
     * Whether to include the number of failed jobs in the result or not. Valid values are &#x60;true&#x60; or &#x60;false&#x60;.
     */
    failedJobs?: boolean;

    /**
     * Valid values for this property are &#x60;true&#x60; or &#x60;false&#x60;.
     * If this property has been set to &#x60;true&#x60; the result will include the corresponding number of incidents
     * for each occurred incident type.
     * If it is set to &#x60;false&#x60;, the incidents will not be included in the result.
     * Cannot be used in combination with &#x60;incidentsForType&#x60;.
     */
    incidents?: boolean;

    /**
     * If this property has been set with any incident type (i.e., a string value) the result
     * will only include the number of incidents for the assigned incident type.
     * Cannot be used in combination with &#x60;incidents&#x60;.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentsForType?: string;
  }): Observable<StrictHttpResponse<Array<ActivityStatisticsResultDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetActivityStatisticsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('failedJobs', params.failedJobs, {});
      rb.query('incidents', params.incidents, {});
      rb.query('incidentsForType', params.incidentsForType, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ActivityStatisticsResultDto>>;
      })
    );
  }

  /**
   * Get Activity Instance Statistics.
   *
   * Retrieves runtime statistics of a given process definition, grouped by activities.
   * These statistics include the number of running activity instances, optionally the number of failed jobs
   * and also optionally the number of incidents either grouped by incident types or for a specific incident type.
   * **Note**: This does not include historic data.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActivityStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivityStatistics(params: {

    /**
     * The id of the process definition.
     */
    id: string;

    /**
     * Whether to include the number of failed jobs in the result or not. Valid values are &#x60;true&#x60; or &#x60;false&#x60;.
     */
    failedJobs?: boolean;

    /**
     * Valid values for this property are &#x60;true&#x60; or &#x60;false&#x60;.
     * If this property has been set to &#x60;true&#x60; the result will include the corresponding number of incidents
     * for each occurred incident type.
     * If it is set to &#x60;false&#x60;, the incidents will not be included in the result.
     * Cannot be used in combination with &#x60;incidentsForType&#x60;.
     */
    incidents?: boolean;

    /**
     * If this property has been set with any incident type (i.e., a string value) the result
     * will only include the number of incidents for the assigned incident type.
     * Cannot be used in combination with &#x60;incidents&#x60;.
     * See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types)
     * for a list of incident types.
     */
    incidentsForType?: string;
  }): Observable<Array<ActivityStatisticsResultDto>> {

    return this.getActivityStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ActivityStatisticsResultDto>>) => r.body as Array<ActivityStatisticsResultDto>)
    );
  }

  /**
   * Path part for operation submitForm
   */
  static readonly SubmitFormPath = '/process-definition/{id}/submit-form';

  /**
   * Submit Start Form.
   *
   * Starts a process instance using a set of process variables and the business key.
   * If the start event has Form Field Metadata defined, the process engine will perform backend validation
   * for any form fields which have validators defined.
   * See [Documentation on Generated Task Forms](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `submitForm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  submitForm$Response(params: {

    /**
     * The id of the process definition to submit the form for.
     */
    id: string;
    body?: StartProcessInstanceFormDto
  }): Observable<StrictHttpResponse<ProcessInstanceDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.SubmitFormPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessInstanceDto>;
      })
    );
  }

  /**
   * Submit Start Form.
   *
   * Starts a process instance using a set of process variables and the business key.
   * If the start event has Form Field Metadata defined, the process engine will perform backend validation
   * for any form fields which have validators defined.
   * See [Documentation on Generated Task Forms](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `submitForm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  submitForm(params: {

    /**
     * The id of the process definition to submit the form for.
     */
    id: string;
    body?: StartProcessInstanceFormDto
  }): Observable<ProcessInstanceDto> {

    return this.submitForm$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessInstanceDto>) => r.body as ProcessInstanceDto)
    );
  }

  /**
   * Path part for operation updateProcessDefinitionSuspensionStateById
   */
  static readonly UpdateProcessDefinitionSuspensionStateByIdPath = '/process-definition/{id}/suspended';

  /**
   * Activate/Suspend By Id.
   *
   * Activates or suspends a given process definition by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProcessDefinitionSuspensionStateById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProcessDefinitionSuspensionStateById$Response(params: {

    /**
     * The id of the process definition to activate or suspend.
     */
    id: string;

    /**
     * **Note**: Unallowed properties are `processDefinitionId` and `processDefinitionKey`.
     */
    body?: ProcessDefinitionSuspensionStateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.UpdateProcessDefinitionSuspensionStateByIdPath, 'put');
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
   * Activate/Suspend By Id.
   *
   * Activates or suspends a given process definition by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateProcessDefinitionSuspensionStateById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProcessDefinitionSuspensionStateById(params: {

    /**
     * The id of the process definition to activate or suspend.
     */
    id: string;

    /**
     * **Note**: Unallowed properties are `processDefinitionId` and `processDefinitionKey`.
     */
    body?: ProcessDefinitionSuspensionStateDto
  }): Observable<void> {

    return this.updateProcessDefinitionSuspensionStateById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProcessDefinitionBpmn20Xml
   */
  static readonly GetProcessDefinitionBpmn20XmlPath = '/process-definition/{id}/xml';

  /**
   * Get XML.
   *
   * Retrieves the BPMN 2.0 XML of a process definition.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessDefinitionBpmn20Xml()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionBpmn20Xml$Response(params: {

    /**
     * The id of the process definition.
     */
    id: string;
  }): Observable<StrictHttpResponse<ProcessDefinitionDiagramDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessDefinitionService.GetProcessDefinitionBpmn20XmlPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessDefinitionDiagramDto>;
      })
    );
  }

  /**
   * Get XML.
   *
   * Retrieves the BPMN 2.0 XML of a process definition.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessDefinitionBpmn20Xml$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessDefinitionBpmn20Xml(params: {

    /**
     * The id of the process definition.
     */
    id: string;
  }): Observable<ProcessDefinitionDiagramDto> {

    return this.getProcessDefinitionBpmn20Xml$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessDefinitionDiagramDto>) => r.body as ProcessDefinitionDiagramDto)
    );
  }

}
