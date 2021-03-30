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

import { ActivityInstanceDto } from '../models/activity-instance-dto';
import { BatchDto } from '../models/batch-dto';
import { CountResultDto } from '../models/count-result-dto';
import { DeleteProcessInstancesDto } from '../models/delete-process-instances-dto';
import { MultiFormVariableBinaryDto } from '../models/multi-form-variable-binary-dto';
import { PatchVariablesDto } from '../models/patch-variables-dto';
import { ProcessInstanceDto } from '../models/process-instance-dto';
import { ProcessInstanceModificationDto } from '../models/process-instance-modification-dto';
import { ProcessInstanceQueryDto } from '../models/process-instance-query-dto';
import { ProcessInstanceSuspensionStateAsyncDto } from '../models/process-instance-suspension-state-async-dto';
import { ProcessInstanceSuspensionStateDto } from '../models/process-instance-suspension-state-dto';
import { SetJobRetriesByProcessDto } from '../models/set-job-retries-by-process-dto';
import { SetVariablesAsyncDto } from '../models/set-variables-async-dto';
import { SuspensionStateDto } from '../models/suspension-state-dto';
import { VariableValueDto } from '../models/variable-value-dto';

@Injectable({
  providedIn: 'root',
})
export class ProcessInstanceService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getProcessInstances
   */
  static readonly GetProcessInstancesPath = '/process-instance';

  /**
   * Queries for process instances that fulfill given parameters.
   * Parameters may be static as well as dynamic runtime properties of process instances.
   * The size of the result set can be retrieved by using the Get Instance Count method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessInstances()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstances$Response(params?: {

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'instanceId' | 'definitionKey' | 'definitionId' | 'tenantId' | 'businessKey';

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
     * Filter by a comma-separated list of process instance ids.
     */
    processInstanceIds?: string;

    /**
     * Filter by process instance business key.
     */
    businessKey?: string;

    /**
     * Filter by process instance business key that the parameter is a substring of.
     */
    businessKeyLike?: string;

    /**
     * Filter by case instance id.
     */
    caseInstanceId?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    processDefinitionId?: string;

    /**
     * Filter by the key of the process definition the instances run on.
     */
    processDefinitionKey?: string;

    /**
     * Filter by a comma-separated list of process definition keys.
     * A process instance must have one of the given process definition keys.
     */
    processDefinitionKeyIn?: string;

    /**
     * Exclude instances by a comma-separated list of process definition keys.
     * A process instance must not have one of the given process definition keys.
     */
    processDefinitionKeyNotIn?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    deploymentId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given process instance.
     * Takes a process instance id.
     */
    superProcessInstance?: string;

    /**
     * Restrict query to all process instances that have the given process instance as a sub process instance.
     * Takes a process instance id.
     */
    subProcessInstance?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance.
     * Takes a case instance id.
     */
    superCaseInstance?: string;

    /**
     * Restrict query to all process instances that have the given case instance as a sub case instance.
     * Takes a case instance id.
     */
    subCaseInstance?: string;

    /**
     * Only include active process instances. Value may only be true,
     * as false is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended process instances. Value may only be true,
     * as false is the default behavior.
     */
    suspended?: boolean;

    /**
     * Filter by presence of incidents. Selects only process instances that have an incident.
     */
    withIncident?: boolean;

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
     * Filter by a comma-separated list of tenant ids. A process instance must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include process instances which belong to no tenant.
     */
    withoutTenantId?: boolean;

    /**
     * Only include process instances which process definition has no tenant id.
     */
    processDefinitionWithoutTenantId?: boolean;

    /**
     * Filter by a comma-separated list of activity ids.
     * A process instance must currently wait in a leaf activity with one of the given activity ids.
     */
    activityIdIn?: string;

    /**
     * Restrict the query to all process instances that are top level process instances.
     */
    rootProcessInstances?: boolean;

    /**
     * Restrict the query to all process instances that are leaf instances. (i.e. don&#x27;t have any sub instances).
     */
    leafProcessInstances?: boolean;

    /**
     * Only include process instances that have variables with certain values.
     * Variable filtering expressions are comma-separated and are structured as follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    variables?: string;

    /**
     * Match all variable names in this query case-insensitively.
     * If set to true variableName and variablename are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values in this query case-insensitively.
     * If set to true variableValue and variablevalue are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;
  }): Observable<StrictHttpResponse<Array<ProcessInstanceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.GetProcessInstancesPath, 'get');
    if (params) {
      rb.query('sortBy', params.sortBy, {});
      rb.query('sortOrder', params.sortOrder, {});
      rb.query('firstResult', params.firstResult, {});
      rb.query('maxResults', params.maxResults, {});
      rb.query('processInstanceIds', params.processInstanceIds, {});
      rb.query('businessKey', params.businessKey, {});
      rb.query('businessKeyLike', params.businessKeyLike, {});
      rb.query('caseInstanceId', params.caseInstanceId, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('processDefinitionKey', params.processDefinitionKey, {});
      rb.query('processDefinitionKeyIn', params.processDefinitionKeyIn, {});
      rb.query('processDefinitionKeyNotIn', params.processDefinitionKeyNotIn, {});
      rb.query('deploymentId', params.deploymentId, {});
      rb.query('superProcessInstance', params.superProcessInstance, {});
      rb.query('subProcessInstance', params.subProcessInstance, {});
      rb.query('superCaseInstance', params.superCaseInstance, {});
      rb.query('subCaseInstance', params.subCaseInstance, {});
      rb.query('active', params.active, {});
      rb.query('suspended', params.suspended, {});
      rb.query('withIncident', params.withIncident, {});
      rb.query('incidentId', params.incidentId, {});
      rb.query('incidentType', params.incidentType, {});
      rb.query('incidentMessage', params.incidentMessage, {});
      rb.query('incidentMessageLike', params.incidentMessageLike, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('processDefinitionWithoutTenantId', params.processDefinitionWithoutTenantId, {});
      rb.query('activityIdIn', params.activityIdIn, {});
      rb.query('rootProcessInstances', params.rootProcessInstances, {});
      rb.query('leafProcessInstances', params.leafProcessInstances, {});
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
        return r as StrictHttpResponse<Array<ProcessInstanceDto>>;
      })
    );
  }

  /**
   * Queries for process instances that fulfill given parameters.
   * Parameters may be static as well as dynamic runtime properties of process instances.
   * The size of the result set can be retrieved by using the Get Instance Count method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessInstances$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstances(params?: {

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'instanceId' | 'definitionKey' | 'definitionId' | 'tenantId' | 'businessKey';

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
     * Filter by a comma-separated list of process instance ids.
     */
    processInstanceIds?: string;

    /**
     * Filter by process instance business key.
     */
    businessKey?: string;

    /**
     * Filter by process instance business key that the parameter is a substring of.
     */
    businessKeyLike?: string;

    /**
     * Filter by case instance id.
     */
    caseInstanceId?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    processDefinitionId?: string;

    /**
     * Filter by the key of the process definition the instances run on.
     */
    processDefinitionKey?: string;

    /**
     * Filter by a comma-separated list of process definition keys.
     * A process instance must have one of the given process definition keys.
     */
    processDefinitionKeyIn?: string;

    /**
     * Exclude instances by a comma-separated list of process definition keys.
     * A process instance must not have one of the given process definition keys.
     */
    processDefinitionKeyNotIn?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    deploymentId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given process instance.
     * Takes a process instance id.
     */
    superProcessInstance?: string;

    /**
     * Restrict query to all process instances that have the given process instance as a sub process instance.
     * Takes a process instance id.
     */
    subProcessInstance?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance.
     * Takes a case instance id.
     */
    superCaseInstance?: string;

    /**
     * Restrict query to all process instances that have the given case instance as a sub case instance.
     * Takes a case instance id.
     */
    subCaseInstance?: string;

    /**
     * Only include active process instances. Value may only be true,
     * as false is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended process instances. Value may only be true,
     * as false is the default behavior.
     */
    suspended?: boolean;

    /**
     * Filter by presence of incidents. Selects only process instances that have an incident.
     */
    withIncident?: boolean;

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
     * Filter by a comma-separated list of tenant ids. A process instance must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include process instances which belong to no tenant.
     */
    withoutTenantId?: boolean;

    /**
     * Only include process instances which process definition has no tenant id.
     */
    processDefinitionWithoutTenantId?: boolean;

    /**
     * Filter by a comma-separated list of activity ids.
     * A process instance must currently wait in a leaf activity with one of the given activity ids.
     */
    activityIdIn?: string;

    /**
     * Restrict the query to all process instances that are top level process instances.
     */
    rootProcessInstances?: boolean;

    /**
     * Restrict the query to all process instances that are leaf instances. (i.e. don&#x27;t have any sub instances).
     */
    leafProcessInstances?: boolean;

    /**
     * Only include process instances that have variables with certain values.
     * Variable filtering expressions are comma-separated and are structured as follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    variables?: string;

    /**
     * Match all variable names in this query case-insensitively.
     * If set to true variableName and variablename are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values in this query case-insensitively.
     * If set to true variableValue and variablevalue are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;
  }): Observable<Array<ProcessInstanceDto>> {

    return this.getProcessInstances$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProcessInstanceDto>>) => r.body as Array<ProcessInstanceDto>)
    );
  }

  /**
   * Path part for operation queryProcessInstances
   */
  static readonly QueryProcessInstancesPath = '/process-instance';

  /**
   * Queries for process instances that fulfill given parameters through a JSON object.
   * This method is slightly more powerful than the Get Instances method because
   * it allows filtering by multiple process variables of types `string`, `number` or `boolean`.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `queryProcessInstances()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryProcessInstances$Response(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: ProcessInstanceQueryDto
  }): Observable<StrictHttpResponse<Array<ProcessInstanceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.QueryProcessInstancesPath, 'post');
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
        return r as StrictHttpResponse<Array<ProcessInstanceDto>>;
      })
    );
  }

  /**
   * Queries for process instances that fulfill given parameters through a JSON object.
   * This method is slightly more powerful than the Get Instances method because
   * it allows filtering by multiple process variables of types `string`, `number` or `boolean`.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `queryProcessInstances$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryProcessInstances(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: ProcessInstanceQueryDto
  }): Observable<Array<ProcessInstanceDto>> {

    return this.queryProcessInstances$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProcessInstanceDto>>) => r.body as Array<ProcessInstanceDto>)
    );
  }

  /**
   * Path part for operation getProcessInstancesCount
   */
  static readonly GetProcessInstancesCountPath = '/process-instance/count';

  /**
   * Queries for the number of process instances that fulfill given parameters.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessInstancesCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstancesCount$Response(params?: {

    /**
     * Filter by a comma-separated list of process instance ids.
     */
    processInstanceIds?: string;

    /**
     * Filter by process instance business key.
     */
    businessKey?: string;

    /**
     * Filter by process instance business key that the parameter is a substring of.
     */
    businessKeyLike?: string;

    /**
     * Filter by case instance id.
     */
    caseInstanceId?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    processDefinitionId?: string;

    /**
     * Filter by the key of the process definition the instances run on.
     */
    processDefinitionKey?: string;

    /**
     * Filter by a comma-separated list of process definition keys.
     * A process instance must have one of the given process definition keys.
     */
    processDefinitionKeyIn?: string;

    /**
     * Exclude instances by a comma-separated list of process definition keys.
     * A process instance must not have one of the given process definition keys.
     */
    processDefinitionKeyNotIn?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    deploymentId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given process instance.
     * Takes a process instance id.
     */
    superProcessInstance?: string;

    /**
     * Restrict query to all process instances that have the given process instance as a sub process instance.
     * Takes a process instance id.
     */
    subProcessInstance?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance.
     * Takes a case instance id.
     */
    superCaseInstance?: string;

    /**
     * Restrict query to all process instances that have the given case instance as a sub case instance.
     * Takes a case instance id.
     */
    subCaseInstance?: string;

    /**
     * Only include active process instances. Value may only be true,
     * as false is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended process instances. Value may only be true,
     * as false is the default behavior.
     */
    suspended?: boolean;

    /**
     * Filter by presence of incidents. Selects only process instances that have an incident.
     */
    withIncident?: boolean;

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
     * Filter by a comma-separated list of tenant ids. A process instance must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include process instances which belong to no tenant.
     */
    withoutTenantId?: boolean;

    /**
     * Only include process instances which process definition has no tenant id.
     */
    processDefinitionWithoutTenantId?: boolean;

    /**
     * Filter by a comma-separated list of activity ids.
     * A process instance must currently wait in a leaf activity with one of the given activity ids.
     */
    activityIdIn?: string;

    /**
     * Restrict the query to all process instances that are top level process instances.
     */
    rootProcessInstances?: boolean;

    /**
     * Restrict the query to all process instances that are leaf instances. (i.e. don&#x27;t have any sub instances).
     */
    leafProcessInstances?: boolean;

    /**
     * Only include process instances that have variables with certain values.
     * Variable filtering expressions are comma-separated and are structured as follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    variables?: string;

    /**
     * Match all variable names in this query case-insensitively.
     * If set to true variableName and variablename are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values in this query case-insensitively.
     * If set to true variableValue and variablevalue are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;
  }): Observable<StrictHttpResponse<CountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.GetProcessInstancesCountPath, 'get');
    if (params) {
      rb.query('processInstanceIds', params.processInstanceIds, {});
      rb.query('businessKey', params.businessKey, {});
      rb.query('businessKeyLike', params.businessKeyLike, {});
      rb.query('caseInstanceId', params.caseInstanceId, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('processDefinitionKey', params.processDefinitionKey, {});
      rb.query('processDefinitionKeyIn', params.processDefinitionKeyIn, {});
      rb.query('processDefinitionKeyNotIn', params.processDefinitionKeyNotIn, {});
      rb.query('deploymentId', params.deploymentId, {});
      rb.query('superProcessInstance', params.superProcessInstance, {});
      rb.query('subProcessInstance', params.subProcessInstance, {});
      rb.query('superCaseInstance', params.superCaseInstance, {});
      rb.query('subCaseInstance', params.subCaseInstance, {});
      rb.query('active', params.active, {});
      rb.query('suspended', params.suspended, {});
      rb.query('withIncident', params.withIncident, {});
      rb.query('incidentId', params.incidentId, {});
      rb.query('incidentType', params.incidentType, {});
      rb.query('incidentMessage', params.incidentMessage, {});
      rb.query('incidentMessageLike', params.incidentMessageLike, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('processDefinitionWithoutTenantId', params.processDefinitionWithoutTenantId, {});
      rb.query('activityIdIn', params.activityIdIn, {});
      rb.query('rootProcessInstances', params.rootProcessInstances, {});
      rb.query('leafProcessInstances', params.leafProcessInstances, {});
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
   * Queries for the number of process instances that fulfill given parameters.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessInstancesCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstancesCount(params?: {

    /**
     * Filter by a comma-separated list of process instance ids.
     */
    processInstanceIds?: string;

    /**
     * Filter by process instance business key.
     */
    businessKey?: string;

    /**
     * Filter by process instance business key that the parameter is a substring of.
     */
    businessKeyLike?: string;

    /**
     * Filter by case instance id.
     */
    caseInstanceId?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    processDefinitionId?: string;

    /**
     * Filter by the key of the process definition the instances run on.
     */
    processDefinitionKey?: string;

    /**
     * Filter by a comma-separated list of process definition keys.
     * A process instance must have one of the given process definition keys.
     */
    processDefinitionKeyIn?: string;

    /**
     * Exclude instances by a comma-separated list of process definition keys.
     * A process instance must not have one of the given process definition keys.
     */
    processDefinitionKeyNotIn?: string;

    /**
     * Filter by the deployment the id belongs to.
     */
    deploymentId?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given process instance.
     * Takes a process instance id.
     */
    superProcessInstance?: string;

    /**
     * Restrict query to all process instances that have the given process instance as a sub process instance.
     * Takes a process instance id.
     */
    subProcessInstance?: string;

    /**
     * Restrict query to all process instances that are sub process instances of the given case instance.
     * Takes a case instance id.
     */
    superCaseInstance?: string;

    /**
     * Restrict query to all process instances that have the given case instance as a sub case instance.
     * Takes a case instance id.
     */
    subCaseInstance?: string;

    /**
     * Only include active process instances. Value may only be true,
     * as false is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended process instances. Value may only be true,
     * as false is the default behavior.
     */
    suspended?: boolean;

    /**
     * Filter by presence of incidents. Selects only process instances that have an incident.
     */
    withIncident?: boolean;

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
     * Filter by a comma-separated list of tenant ids. A process instance must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include process instances which belong to no tenant.
     */
    withoutTenantId?: boolean;

    /**
     * Only include process instances which process definition has no tenant id.
     */
    processDefinitionWithoutTenantId?: boolean;

    /**
     * Filter by a comma-separated list of activity ids.
     * A process instance must currently wait in a leaf activity with one of the given activity ids.
     */
    activityIdIn?: string;

    /**
     * Restrict the query to all process instances that are top level process instances.
     */
    rootProcessInstances?: boolean;

    /**
     * Restrict the query to all process instances that are leaf instances. (i.e. don&#x27;t have any sub instances).
     */
    leafProcessInstances?: boolean;

    /**
     * Only include process instances that have variables with certain values.
     * Variable filtering expressions are comma-separated and are structured as follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    variables?: string;

    /**
     * Match all variable names in this query case-insensitively.
     * If set to true variableName and variablename are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values in this query case-insensitively.
     * If set to true variableValue and variablevalue are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;
  }): Observable<CountResultDto> {

    return this.getProcessInstancesCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountResultDto>) => r.body as CountResultDto)
    );
  }

  /**
   * Path part for operation queryProcessInstancesCount
   */
  static readonly QueryProcessInstancesCountPath = '/process-instance/count';

  /**
   * Queries for the number of process instances that fulfill the given parameters.
   * This method takes the same message body as the Get Instances (POST) method and
   * therefore it is slightly more powerful than the Get Instance Count method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `queryProcessInstancesCount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryProcessInstancesCount$Response(params?: {
    body?: ProcessInstanceQueryDto
  }): Observable<StrictHttpResponse<CountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.QueryProcessInstancesCountPath, 'post');
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
   * Queries for the number of process instances that fulfill the given parameters.
   * This method takes the same message body as the Get Instances (POST) method and
   * therefore it is slightly more powerful than the Get Instance Count method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `queryProcessInstancesCount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryProcessInstancesCount(params?: {
    body?: ProcessInstanceQueryDto
  }): Observable<CountResultDto> {

    return this.queryProcessInstancesCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountResultDto>) => r.body as CountResultDto)
    );
  }

  /**
   * Path part for operation deleteProcessInstancesAsyncOperation
   */
  static readonly DeleteProcessInstancesAsyncOperationPath = '/process-instance/delete';

  /**
   * Deletes multiple process instances asynchronously (batch).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProcessInstancesAsyncOperation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteProcessInstancesAsyncOperation$Response(params?: {

    /**
     * **Unallowed property**: `historicProcessInstanceQuery`
     */
    body?: DeleteProcessInstancesDto
  }): Observable<StrictHttpResponse<BatchDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.DeleteProcessInstancesAsyncOperationPath, 'post');
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
   * Deletes multiple process instances asynchronously (batch).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProcessInstancesAsyncOperation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteProcessInstancesAsyncOperation(params?: {

    /**
     * **Unallowed property**: `historicProcessInstanceQuery`
     */
    body?: DeleteProcessInstancesDto
  }): Observable<BatchDto> {

    return this.deleteProcessInstancesAsyncOperation$Response(params).pipe(
      map((r: StrictHttpResponse<BatchDto>) => r.body as BatchDto)
    );
  }

  /**
   * Path part for operation deleteAsyncHistoricQueryBased
   */
  static readonly DeleteAsyncHistoricQueryBasedPath = '/process-instance/delete-historic-query-based';

  /**
   * Deletes a set of process instances asynchronously (batch) based on a historic process instance query.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAsyncHistoricQueryBased()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteAsyncHistoricQueryBased$Response(params?: {

    /**
     * **Unallowed property**: `processInstanceQuery`
     */
    body?: DeleteProcessInstancesDto
  }): Observable<StrictHttpResponse<BatchDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.DeleteAsyncHistoricQueryBasedPath, 'post');
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
   * Deletes a set of process instances asynchronously (batch) based on a historic process instance query.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAsyncHistoricQueryBased$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteAsyncHistoricQueryBased(params?: {

    /**
     * **Unallowed property**: `processInstanceQuery`
     */
    body?: DeleteProcessInstancesDto
  }): Observable<BatchDto> {

    return this.deleteAsyncHistoricQueryBased$Response(params).pipe(
      map((r: StrictHttpResponse<BatchDto>) => r.body as BatchDto)
    );
  }

  /**
   * Path part for operation setRetriesByProcess
   */
  static readonly SetRetriesByProcessPath = '/process-instance/job-retries';

  /**
   * Create a batch to set retries of jobs associated with given processes asynchronously.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setRetriesByProcess()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setRetriesByProcess$Response(params?: {

    /**
     * Please note that if both processInstances and processInstanceQuery are provided,
     * then the resulting execution will be performed on the union of these sets.
     * **Unallowed property**: `historicProcessInstanceQuery`
     */
    body?: SetJobRetriesByProcessDto
  }): Observable<StrictHttpResponse<BatchDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.SetRetriesByProcessPath, 'post');
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
   * Create a batch to set retries of jobs associated with given processes asynchronously.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setRetriesByProcess$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setRetriesByProcess(params?: {

    /**
     * Please note that if both processInstances and processInstanceQuery are provided,
     * then the resulting execution will be performed on the union of these sets.
     * **Unallowed property**: `historicProcessInstanceQuery`
     */
    body?: SetJobRetriesByProcessDto
  }): Observable<BatchDto> {

    return this.setRetriesByProcess$Response(params).pipe(
      map((r: StrictHttpResponse<BatchDto>) => r.body as BatchDto)
    );
  }

  /**
   * Path part for operation setRetriesByProcessHistoricQueryBased
   */
  static readonly SetRetriesByProcessHistoricQueryBasedPath = '/process-instance/job-retries-historic-query-based';

  /**
   * Create a batch to set retries of jobs asynchronously based on a historic process instance query.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setRetriesByProcessHistoricQueryBased()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setRetriesByProcessHistoricQueryBased$Response(params?: {

    /**
     * Please note that if both processInstances and historicProcessInstanceQuery are provided,
     * then the resulting execution will be performed on the union of these sets.
     * **Unallowed property**: `processInstanceQuery`
     */
    body?: SetJobRetriesByProcessDto
  }): Observable<StrictHttpResponse<BatchDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.SetRetriesByProcessHistoricQueryBasedPath, 'post');
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
   * Create a batch to set retries of jobs asynchronously based on a historic process instance query.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setRetriesByProcessHistoricQueryBased$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setRetriesByProcessHistoricQueryBased(params?: {

    /**
     * Please note that if both processInstances and historicProcessInstanceQuery are provided,
     * then the resulting execution will be performed on the union of these sets.
     * **Unallowed property**: `processInstanceQuery`
     */
    body?: SetJobRetriesByProcessDto
  }): Observable<BatchDto> {

    return this.setRetriesByProcessHistoricQueryBased$Response(params).pipe(
      map((r: StrictHttpResponse<BatchDto>) => r.body as BatchDto)
    );
  }

  /**
   * Path part for operation updateSuspensionState
   */
  static readonly UpdateSuspensionStatePath = '/process-instance/suspended';

  /**
   * Activates or suspends process instances by providing certain criteria:
   *
   * # Activate/Suspend Process Instance By Process Definition Id
   * * `suspend`
   * * `processDefinitionId`
   *
   * # Activate/Suspend Process Instance By Process Definition Key
   *
   * * `suspend`
   * * `processDefinitionKey`
   * * `processDefinitionTenantId`
   * * `processDefinitionWithoutTenantId`
   *
   * # Activate/Suspend Process Instance In Group
   * * `suspend`
   * * `processInstanceIds`
   * * `processInstanceQuery`
   * * `historicProcessInstanceQuery`
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSuspensionState()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSuspensionState$Response(params?: {
    body?: ProcessInstanceSuspensionStateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.UpdateSuspensionStatePath, 'put');
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
   * Activates or suspends process instances by providing certain criteria:
   *
   * # Activate/Suspend Process Instance By Process Definition Id
   * * `suspend`
   * * `processDefinitionId`
   *
   * # Activate/Suspend Process Instance By Process Definition Key
   *
   * * `suspend`
   * * `processDefinitionKey`
   * * `processDefinitionTenantId`
   * * `processDefinitionWithoutTenantId`
   *
   * # Activate/Suspend Process Instance In Group
   * * `suspend`
   * * `processInstanceIds`
   * * `processInstanceQuery`
   * * `historicProcessInstanceQuery`
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSuspensionState$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSuspensionState(params?: {
    body?: ProcessInstanceSuspensionStateDto
  }): Observable<void> {

    return this.updateSuspensionState$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateSuspensionStateAsyncOperation
   */
  static readonly UpdateSuspensionStateAsyncOperationPath = '/process-instance/suspended-async';

  /**
   * Activates or suspends process instances asynchronously with a list of process instance ids,
   * a process instance query, and/or a historical process instance query.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSuspensionStateAsyncOperation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSuspensionStateAsyncOperation$Response(params?: {
    body?: ProcessInstanceSuspensionStateAsyncDto
  }): Observable<StrictHttpResponse<BatchDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.UpdateSuspensionStateAsyncOperationPath, 'post');
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
   * Activates or suspends process instances asynchronously with a list of process instance ids,
   * a process instance query, and/or a historical process instance query.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSuspensionStateAsyncOperation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSuspensionStateAsyncOperation(params?: {
    body?: ProcessInstanceSuspensionStateAsyncDto
  }): Observable<BatchDto> {

    return this.updateSuspensionStateAsyncOperation$Response(params).pipe(
      map((r: StrictHttpResponse<BatchDto>) => r.body as BatchDto)
    );
  }

  /**
   * Path part for operation setVariablesAsyncOperation
   */
  static readonly SetVariablesAsyncOperationPath = '/process-instance/variables-async';

  /**
   * Update or create runtime process variables in the root scope of process instances.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setVariablesAsyncOperation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setVariablesAsyncOperation$Response(params?: {
    body?: SetVariablesAsyncDto
  }): Observable<StrictHttpResponse<BatchDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.SetVariablesAsyncOperationPath, 'post');
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
   * Update or create runtime process variables in the root scope of process instances.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setVariablesAsyncOperation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setVariablesAsyncOperation(params?: {
    body?: SetVariablesAsyncDto
  }): Observable<BatchDto> {

    return this.setVariablesAsyncOperation$Response(params).pipe(
      map((r: StrictHttpResponse<BatchDto>) => r.body as BatchDto)
    );
  }

  /**
   * Path part for operation getProcessInstance
   */
  static readonly GetProcessInstancePath = '/process-instance/{id}';

  /**
   * Get Process Instance.
   *
   * Retrieves a process instance by id, according to the `ProcessInstance` interface in the engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessInstance()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstance$Response(params: {

    /**
     * The id of the process instance to be retrieved.
     */
    id: string;
  }): Observable<StrictHttpResponse<ProcessInstanceDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.GetProcessInstancePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * Get Process Instance.
   *
   * Retrieves a process instance by id, according to the `ProcessInstance` interface in the engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessInstance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstance(params: {

    /**
     * The id of the process instance to be retrieved.
     */
    id: string;
  }): Observable<ProcessInstanceDto> {

    return this.getProcessInstance$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessInstanceDto>) => r.body as ProcessInstanceDto)
    );
  }

  /**
   * Path part for operation deleteProcessInstance
   */
  static readonly DeleteProcessInstancePath = '/process-instance/{id}';

  /**
   * Deletes a running process instance by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProcessInstance()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessInstance$Response(params: {

    /**
     * The id of the process instance to be deleted.
     */
    id: string;

    /**
     * If set to true, the custom listeners will be skipped.
     */
    skipCustomListeners?: boolean;

    /**
     * If set to true, the input/output mappings will be skipped.
     */
    skipIoMappings?: boolean;

    /**
     * If set to true, subprocesses related to deleted processes will be skipped.
     */
    skipSubprocesses?: boolean;

    /**
     * If set to false, the request will still be successful if the process id is not found.
     */
    failIfNotExists?: boolean;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.DeleteProcessInstancePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('skipCustomListeners', params.skipCustomListeners, {});
      rb.query('skipIoMappings', params.skipIoMappings, {});
      rb.query('skipSubprocesses', params.skipSubprocesses, {});
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
   * Deletes a running process instance by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProcessInstance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessInstance(params: {

    /**
     * The id of the process instance to be deleted.
     */
    id: string;

    /**
     * If set to true, the custom listeners will be skipped.
     */
    skipCustomListeners?: boolean;

    /**
     * If set to true, the input/output mappings will be skipped.
     */
    skipIoMappings?: boolean;

    /**
     * If set to true, subprocesses related to deleted processes will be skipped.
     */
    skipSubprocesses?: boolean;

    /**
     * If set to false, the request will still be successful if the process id is not found.
     */
    failIfNotExists?: boolean;
  }): Observable<void> {

    return this.deleteProcessInstance$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getActivityInstanceTree
   */
  static readonly GetActivityInstanceTreePath = '/process-instance/{id}/activity-instances';

  /**
   * Retrieves an Activity Instance (Tree) for a given process instance by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActivityInstanceTree()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivityInstanceTree$Response(params: {

    /**
     * The id of the process instance for which the activity instance should be retrieved.
     */
    id: string;
  }): Observable<StrictHttpResponse<ActivityInstanceDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.GetActivityInstanceTreePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ActivityInstanceDto>;
      })
    );
  }

  /**
   * Retrieves an Activity Instance (Tree) for a given process instance by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActivityInstanceTree$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivityInstanceTree(params: {

    /**
     * The id of the process instance for which the activity instance should be retrieved.
     */
    id: string;
  }): Observable<ActivityInstanceDto> {

    return this.getActivityInstanceTree$Response(params).pipe(
      map((r: StrictHttpResponse<ActivityInstanceDto>) => r.body as ActivityInstanceDto)
    );
  }

  /**
   * Path part for operation modifyProcessInstance
   */
  static readonly ModifyProcessInstancePath = '/process-instance/{id}/modification';

  /**
   * Submits a list of modification instructions to change a process instance's execution state.
   * A modification instruction is one of the following:
   *
   * * Starting execution before an activity
   * * Starting execution after an activity on its single outgoing sequence flow
   * * Starting execution on a specific sequence flow
   * * Canceling an activity instance, transition instance, or all instances (activity or transition) for an activity
   *
   * Instructions are executed immediately and in the order they are provided in this request's body.
   * Variables can be provided with every starting instruction.
   *
   * The exact semantics of modification can be read about in the [User guide](https://docs.camunda.org/manual/develop/user-guide/process-engine/process-instance-modification/).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `modifyProcessInstance()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifyProcessInstance$Response(params: {

    /**
     * The id of the process instance to modify.
     */
    id: string;
    body?: ProcessInstanceModificationDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.ModifyProcessInstancePath, 'post');
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
   * Submits a list of modification instructions to change a process instance's execution state.
   * A modification instruction is one of the following:
   *
   * * Starting execution before an activity
   * * Starting execution after an activity on its single outgoing sequence flow
   * * Starting execution on a specific sequence flow
   * * Canceling an activity instance, transition instance, or all instances (activity or transition) for an activity
   *
   * Instructions are executed immediately and in the order they are provided in this request's body.
   * Variables can be provided with every starting instruction.
   *
   * The exact semantics of modification can be read about in the [User guide](https://docs.camunda.org/manual/develop/user-guide/process-engine/process-instance-modification/).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `modifyProcessInstance$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifyProcessInstance(params: {

    /**
     * The id of the process instance to modify.
     */
    id: string;
    body?: ProcessInstanceModificationDto
  }): Observable<void> {

    return this.modifyProcessInstance$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation modifyProcessInstanceAsyncOperation
   */
  static readonly ModifyProcessInstanceAsyncOperationPath = '/process-instance/{id}/modification-async';

  /**
   * Submits a list of modification instructions to change a process instance's execution state async.
   * A modification instruction is one of the following:
   *
   * * Starting execution before an activity
   * * Starting execution after an activity on its single outgoing sequence flow
   * * Starting execution on a specific sequence flow
   * * Cancelling an activity instance, transition instance, or all instances (activity or transition) for an activity
   *
   * Instructions are executed asynchronous and in the order they are provided in this request's body.
   * Variables can be provided with every starting instruction.
   *
   * The exact semantics of modification can be read about in the
   * [User guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/process-instance-modification/).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `modifyProcessInstanceAsyncOperation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifyProcessInstanceAsyncOperation$Response(params: {

    /**
     * The id of the process instance to modify.
     */
    id: string;
    body?: ProcessInstanceModificationDto
  }): Observable<StrictHttpResponse<BatchDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.ModifyProcessInstanceAsyncOperationPath, 'post');
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
   * Submits a list of modification instructions to change a process instance's execution state async.
   * A modification instruction is one of the following:
   *
   * * Starting execution before an activity
   * * Starting execution after an activity on its single outgoing sequence flow
   * * Starting execution on a specific sequence flow
   * * Cancelling an activity instance, transition instance, or all instances (activity or transition) for an activity
   *
   * Instructions are executed asynchronous and in the order they are provided in this request's body.
   * Variables can be provided with every starting instruction.
   *
   * The exact semantics of modification can be read about in the
   * [User guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/process-instance-modification/).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `modifyProcessInstanceAsyncOperation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifyProcessInstanceAsyncOperation(params: {

    /**
     * The id of the process instance to modify.
     */
    id: string;
    body?: ProcessInstanceModificationDto
  }): Observable<BatchDto> {

    return this.modifyProcessInstanceAsyncOperation$Response(params).pipe(
      map((r: StrictHttpResponse<BatchDto>) => r.body as BatchDto)
    );
  }

  /**
   * Path part for operation updateSuspensionStateById
   */
  static readonly UpdateSuspensionStateByIdPath = '/process-instance/{id}/suspended';

  /**
   * Activates or suspends a given process instance by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSuspensionStateById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSuspensionStateById$Response(params: {

    /**
     * The id of the process instance to activate or suspend.
     */
    id: string;
    body?: SuspensionStateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.UpdateSuspensionStateByIdPath, 'put');
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
   * Activates or suspends a given process instance by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSuspensionStateById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSuspensionStateById(params: {

    /**
     * The id of the process instance to activate or suspend.
     */
    id: string;
    body?: SuspensionStateDto
  }): Observable<void> {

    return this.updateSuspensionStateById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProcessInstanceVariables
   */
  static readonly GetProcessInstanceVariablesPath = '/process-instance/{id}/variables';

  /**
   * Retrieves all variables of a given process instance by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessInstanceVariables()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstanceVariables$Response(params: {

    /**
     * The id of the process instance to retrieve the variables from.
     */
    id: string;

    /**
     * Determines whether serializable variable values (typically variables that store custom Java objects)
     * should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and transformed to JSON
     * using [Jackson&#x27;s](https://github.com/FasterXML/jackson) POJO/bean property introspection feature.
     * Note that this requires the Java classes of the variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string containing XML.
     *
     * Note: While true is the default value for reasons of backward compatibility, we recommend setting this parameter to false
     * when developing web applications that are independent of the Java process applications deployed to the engine.
     */
    deserializeValue?: boolean;
  }): Observable<StrictHttpResponse<{ [key: string]: VariableValueDto }>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.GetProcessInstanceVariablesPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('deserializeValue', params.deserializeValue, {});
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
   * Retrieves all variables of a given process instance by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessInstanceVariables$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstanceVariables(params: {

    /**
     * The id of the process instance to retrieve the variables from.
     */
    id: string;

    /**
     * Determines whether serializable variable values (typically variables that store custom Java objects)
     * should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and transformed to JSON
     * using [Jackson&#x27;s](https://github.com/FasterXML/jackson) POJO/bean property introspection feature.
     * Note that this requires the Java classes of the variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string containing XML.
     *
     * Note: While true is the default value for reasons of backward compatibility, we recommend setting this parameter to false
     * when developing web applications that are independent of the Java process applications deployed to the engine.
     */
    deserializeValue?: boolean;
  }): Observable<{ [key: string]: VariableValueDto }> {

    return this.getProcessInstanceVariables$Response(params).pipe(
      map((r: StrictHttpResponse<{ [key: string]: VariableValueDto }>) => r.body as { [key: string]: VariableValueDto })
    );
  }

  /**
   * Path part for operation modifyProcessInstanceVariables
   */
  static readonly ModifyProcessInstanceVariablesPath = '/process-instance/{id}/variables';

  /**
   * Updates or deletes the variables of a process instance by id. Updates precede deletions.
   * So, if a variable is updated AND deleted, the deletion overrides the update.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `modifyProcessInstanceVariables()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifyProcessInstanceVariables$Response(params: {

    /**
     * The id of the process instance to set variables for.
     */
    id: string;
    body?: PatchVariablesDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.ModifyProcessInstanceVariablesPath, 'post');
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
   * Updates or deletes the variables of a process instance by id. Updates precede deletions.
   * So, if a variable is updated AND deleted, the deletion overrides the update.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `modifyProcessInstanceVariables$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifyProcessInstanceVariables(params: {

    /**
     * The id of the process instance to set variables for.
     */
    id: string;
    body?: PatchVariablesDto
  }): Observable<void> {

    return this.modifyProcessInstanceVariables$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProcessInstanceVariable
   */
  static readonly GetProcessInstanceVariablePath = '/process-instance/{id}/variables/{varName}';

  /**
   * Retrieves a variable of a given process instance by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessInstanceVariable()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstanceVariable$Response(params: {

    /**
     * The id of the process instance to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;

    /**
     * Determines whether serializable variable values (typically variables that store custom Java objects)
     * should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and transformed to JSON
     * using [Jackson&#x27;s](https://github.com/FasterXML/jackson) POJO/bean property introspection feature.
     * Note that this requires the Java classes of the variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string containing XML.
     *
     * Note: While true is the default value for reasons of backward compatibility, we recommend setting this parameter to false
     * when developing web applications that are independent of the Java process applications deployed to the engine.
     */
    deserializeValue?: boolean;
  }): Observable<StrictHttpResponse<VariableValueDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.GetProcessInstanceVariablePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('varName', params.varName, {});
      rb.query('deserializeValue', params.deserializeValue, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VariableValueDto>;
      })
    );
  }

  /**
   * Retrieves a variable of a given process instance by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessInstanceVariable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstanceVariable(params: {

    /**
     * The id of the process instance to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;

    /**
     * Determines whether serializable variable values (typically variables that store custom Java objects)
     * should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and transformed to JSON
     * using [Jackson&#x27;s](https://github.com/FasterXML/jackson) POJO/bean property introspection feature.
     * Note that this requires the Java classes of the variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string containing XML.
     *
     * Note: While true is the default value for reasons of backward compatibility, we recommend setting this parameter to false
     * when developing web applications that are independent of the Java process applications deployed to the engine.
     */
    deserializeValue?: boolean;
  }): Observable<VariableValueDto> {

    return this.getProcessInstanceVariable$Response(params).pipe(
      map((r: StrictHttpResponse<VariableValueDto>) => r.body as VariableValueDto)
    );
  }

  /**
   * Path part for operation setProcessInstanceVariable
   */
  static readonly SetProcessInstanceVariablePath = '/process-instance/{id}/variables/{varName}';

  /**
   * Sets a variable of a given process instance by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setProcessInstanceVariable()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setProcessInstanceVariable$Response(params: {

    /**
     * The id of the process instance to set the variable for.
     */
    id: string;

    /**
     * The name of the variable to set.
     */
    varName: string;
    body?: VariableValueDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.SetProcessInstanceVariablePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('varName', params.varName, {});
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
   * Sets a variable of a given process instance by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setProcessInstanceVariable$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setProcessInstanceVariable(params: {

    /**
     * The id of the process instance to set the variable for.
     */
    id: string;

    /**
     * The name of the variable to set.
     */
    varName: string;
    body?: VariableValueDto
  }): Observable<void> {

    return this.setProcessInstanceVariable$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteProcessInstanceVariable
   */
  static readonly DeleteProcessInstanceVariablePath = '/process-instance/{id}/variables/{varName}';

  /**
   * Deletes a variable of a process instance by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProcessInstanceVariable()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessInstanceVariable$Response(params: {

    /**
     * The id of the process instance to delete the variable from.
     */
    id: string;

    /**
     * The name of the variable to delete.
     */
    varName: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.DeleteProcessInstanceVariablePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('varName', params.varName, {});
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
   * Deletes a variable of a process instance by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteProcessInstanceVariable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessInstanceVariable(params: {

    /**
     * The id of the process instance to delete the variable from.
     */
    id: string;

    /**
     * The name of the variable to delete.
     */
    varName: string;
  }): Observable<void> {

    return this.deleteProcessInstanceVariable$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getProcessInstanceVariableBinary
   */
  static readonly GetProcessInstanceVariableBinaryPath = '/process-instance/{id}/variables/{varName}/data';

  /**
   * Retrieves the content of a Process Variable by the Process Instance id and the Process Variable name.
   * Applicable for byte array or file Process Variables.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessInstanceVariableBinary$Any()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstanceVariableBinary$Any$Response(params: {

    /**
     * The id of the process instance to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.GetProcessInstanceVariableBinaryPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('varName', params.varName, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/octet-stream'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Retrieves the content of a Process Variable by the Process Instance id and the Process Variable name.
   * Applicable for byte array or file Process Variables.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessInstanceVariableBinary$Any$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstanceVariableBinary$Any(params: {

    /**
     * The id of the process instance to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<Blob> {

    return this.getProcessInstanceVariableBinary$Any$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Retrieves the content of a Process Variable by the Process Instance id and the Process Variable name.
   * Applicable for byte array or file Process Variables.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProcessInstanceVariableBinary$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstanceVariableBinary$Plain$Response(params: {

    /**
     * The id of the process instance to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.GetProcessInstanceVariableBinaryPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('varName', params.varName, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Retrieves the content of a Process Variable by the Process Instance id and the Process Variable name.
   * Applicable for byte array or file Process Variables.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProcessInstanceVariableBinary$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProcessInstanceVariableBinary$Plain(params: {

    /**
     * The id of the process instance to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<Blob> {

    return this.getProcessInstanceVariableBinary$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation setProcessInstanceVariableBinary
   */
  static readonly SetProcessInstanceVariableBinaryPath = '/process-instance/{id}/variables/{varName}/data';

  /**
   * Sets the serialized value for a binary variable or the binary value for a file variable.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setProcessInstanceVariableBinary()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  setProcessInstanceVariableBinary$Response(params: {

    /**
     * The id of the process instance to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;

    /**
     * For binary variables a multipart form submit with the following parts:
     */
    body?: MultiFormVariableBinaryDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProcessInstanceService.SetProcessInstanceVariableBinaryPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('varName', params.varName, {});
      rb.body(params.body, 'multipart/form-data');
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
   * Sets the serialized value for a binary variable or the binary value for a file variable.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setProcessInstanceVariableBinary$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  setProcessInstanceVariableBinary(params: {

    /**
     * The id of the process instance to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;

    /**
     * For binary variables a multipart form submit with the following parts:
     */
    body?: MultiFormVariableBinaryDto
  }): Observable<void> {

    return this.setProcessInstanceVariableBinary$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
