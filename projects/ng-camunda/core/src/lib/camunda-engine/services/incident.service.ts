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
import { IncidentDto } from '../models/incident-dto';

@Injectable({
  providedIn: 'root',
})
export class IncidentService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getIncidents
   */
  static readonly GetIncidentsPath = '/incident';

  /**
   * Get List.
   *
   * Queries for incidents that fulfill given parameters. The size of the result set can be retrieved by using
   * the [Get Incident Count](https://docs.camunda.org/manual/7.14/reference/rest/incident/get-query-count/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIncidents()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncidents$Response(params?: {

    /**
     * Restricts to incidents that have the given id.
     */
    incidentId?: string;

    /**
     * Restricts to incidents that belong to the given incident type. See the
     * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types) for a list of incident
     * types.
     */
    incidentType?: string;

    /**
     * Restricts to incidents that have the given incident message.
     */
    incidentMessage?: string;

    /**
     * Restricts to incidents that incidents message is a substring of the given value. The string can include
     * the wildcard character &#x27;%&#x27; to express like-strategy: starts with (&#x60;string%&#x60;), ends with (&#x60;%string&#x60;) or
     * contains (&#x60;%string%&#x60;).
     */
    incidentMessageLike?: string;

    /**
     * Restricts to incidents that belong to a process definition with the given id.
     */
    processDefinitionId?: string;

    /**
     * Restricts to incidents that belong to a process definition with the given keys. Must be a
     * comma-separated list.
     */
    processDefinitionKeyIn?: string;

    /**
     * Restricts to incidents that belong to a process instance with the given id.
     */
    processInstanceId?: string;

    /**
     * Restricts to incidents that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Restricts to incidents that have an incidentTimestamp date before the given date. By default, the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    incidentTimestampBefore?: string;

    /**
     * Restricts to incidents that have an incidentTimestamp date after the given date. By default*, the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    incidentTimestampAfter?: string;

    /**
     * Restricts to incidents that belong to an activity with the given id.
     */
    activityId?: string;

    /**
     * Restricts to incidents that were created due to the failure of an activity with the given id.
     */
    failedActivityId?: string;

    /**
     * Restricts to incidents that have the given incident id as cause incident.
     */
    causeIncidentId?: string;

    /**
     * Restricts to incidents that have the given incident id as root cause incident.
     */
    rootCauseIncidentId?: string;

    /**
     * Restricts to incidents that have the given parameter set as configuration.
     */
    configuration?: string;

    /**
     * Restricts to incidents that have one of the given comma-separated tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Restricts to incidents that have one of the given comma-separated job definition ids.
     */
    jobDefinitionIdIn?: string;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'incidentId' | 'incidentMessage' | 'incidentTimestamp' | 'incidentType' | 'executionId' | 'activityId' | 'processInstanceId' | 'processDefinitionId' | 'causeIncidentId' | 'rootCauseIncidentId' | 'configuration' | 'tenantId';

    /**
     * Sort the results in a given order. Values may be asc for ascending order or desc for descending order.
     * Must be used in conjunction with the sortBy parameter.
     */
    sortOrder?: 'asc' | 'desc';
  }): Observable<StrictHttpResponse<Array<IncidentDto>>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentService.GetIncidentsPath, 'get');
    if (params) {
      rb.query('incidentId', params.incidentId, {});
      rb.query('incidentType', params.incidentType, {});
      rb.query('incidentMessage', params.incidentMessage, {});
      rb.query('incidentMessageLike', params.incidentMessageLike, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('processDefinitionKeyIn', params.processDefinitionKeyIn, {});
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('executionId', params.executionId, {});
      rb.query('incidentTimestampBefore', params.incidentTimestampBefore, {});
      rb.query('incidentTimestampAfter', params.incidentTimestampAfter, {});
      rb.query('activityId', params.activityId, {});
      rb.query('failedActivityId', params.failedActivityId, {});
      rb.query('causeIncidentId', params.causeIncidentId, {});
      rb.query('rootCauseIncidentId', params.rootCauseIncidentId, {});
      rb.query('configuration', params.configuration, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('jobDefinitionIdIn', params.jobDefinitionIdIn, {});
      rb.query('sortBy', params.sortBy, {});
      rb.query('sortOrder', params.sortOrder, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IncidentDto>>;
      })
    );
  }

  /**
   * Get List.
   *
   * Queries for incidents that fulfill given parameters. The size of the result set can be retrieved by using
   * the [Get Incident Count](https://docs.camunda.org/manual/7.14/reference/rest/incident/get-query-count/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIncidents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncidents(params?: {

    /**
     * Restricts to incidents that have the given id.
     */
    incidentId?: string;

    /**
     * Restricts to incidents that belong to the given incident type. See the
     * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types) for a list of incident
     * types.
     */
    incidentType?: string;

    /**
     * Restricts to incidents that have the given incident message.
     */
    incidentMessage?: string;

    /**
     * Restricts to incidents that incidents message is a substring of the given value. The string can include
     * the wildcard character &#x27;%&#x27; to express like-strategy: starts with (&#x60;string%&#x60;), ends with (&#x60;%string&#x60;) or
     * contains (&#x60;%string%&#x60;).
     */
    incidentMessageLike?: string;

    /**
     * Restricts to incidents that belong to a process definition with the given id.
     */
    processDefinitionId?: string;

    /**
     * Restricts to incidents that belong to a process definition with the given keys. Must be a
     * comma-separated list.
     */
    processDefinitionKeyIn?: string;

    /**
     * Restricts to incidents that belong to a process instance with the given id.
     */
    processInstanceId?: string;

    /**
     * Restricts to incidents that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Restricts to incidents that have an incidentTimestamp date before the given date. By default, the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    incidentTimestampBefore?: string;

    /**
     * Restricts to incidents that have an incidentTimestamp date after the given date. By default*, the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    incidentTimestampAfter?: string;

    /**
     * Restricts to incidents that belong to an activity with the given id.
     */
    activityId?: string;

    /**
     * Restricts to incidents that were created due to the failure of an activity with the given id.
     */
    failedActivityId?: string;

    /**
     * Restricts to incidents that have the given incident id as cause incident.
     */
    causeIncidentId?: string;

    /**
     * Restricts to incidents that have the given incident id as root cause incident.
     */
    rootCauseIncidentId?: string;

    /**
     * Restricts to incidents that have the given parameter set as configuration.
     */
    configuration?: string;

    /**
     * Restricts to incidents that have one of the given comma-separated tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Restricts to incidents that have one of the given comma-separated job definition ids.
     */
    jobDefinitionIdIn?: string;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'incidentId' | 'incidentMessage' | 'incidentTimestamp' | 'incidentType' | 'executionId' | 'activityId' | 'processInstanceId' | 'processDefinitionId' | 'causeIncidentId' | 'rootCauseIncidentId' | 'configuration' | 'tenantId';

    /**
     * Sort the results in a given order. Values may be asc for ascending order or desc for descending order.
     * Must be used in conjunction with the sortBy parameter.
     */
    sortOrder?: 'asc' | 'desc';
  }): Observable<Array<IncidentDto>> {

    return this.getIncidents$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IncidentDto>>) => r.body as Array<IncidentDto>)
    );
  }

  /**
   * Path part for operation getIncidentsCount
   */
  static readonly GetIncidentsCountPath = '/incident/count';

  /**
   * Get List Count.
   *
   * Queries for the number of incidents that fulfill given parameters. Takes the same parameters as the
   * [Get Incidents](https://docs.camunda.org/manual/7.14/reference/rest/incident/get-query/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIncidentsCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncidentsCount$Response(params?: {

    /**
     * Restricts to incidents that have the given id.
     */
    incidentId?: string;

    /**
     * Restricts to incidents that belong to the given incident type. See the
     * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types) for a list of incident
     * types.
     */
    incidentType?: string;

    /**
     * Restricts to incidents that have the given incident message.
     */
    incidentMessage?: string;

    /**
     * Restricts to incidents that incidents message is a substring of the given value. The string can include
     * the wildcard character &#x27;%&#x27; to express like-strategy: starts with (&#x60;string%&#x60;), ends with (&#x60;%string&#x60;) or
     * contains (&#x60;%string%&#x60;).
     */
    incidentMessageLike?: string;

    /**
     * Restricts to incidents that belong to a process definition with the given id.
     */
    processDefinitionId?: string;

    /**
     * Restricts to incidents that belong to a process definition with the given keys. Must be a
     * comma-separated list.
     */
    processDefinitionKeyIn?: string;

    /**
     * Restricts to incidents that belong to a process instance with the given id.
     */
    processInstanceId?: string;

    /**
     * Restricts to incidents that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Restricts to incidents that have an incidentTimestamp date before the given date. By default, the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    incidentTimestampBefore?: string;

    /**
     * Restricts to incidents that have an incidentTimestamp date after the given date. By default*, the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    incidentTimestampAfter?: string;

    /**
     * Restricts to incidents that belong to an activity with the given id.
     */
    activityId?: string;

    /**
     * Restricts to incidents that were created due to the failure of an activity with the given id.
     */
    failedActivityId?: string;

    /**
     * Restricts to incidents that have the given incident id as cause incident.
     */
    causeIncidentId?: string;

    /**
     * Restricts to incidents that have the given incident id as root cause incident.
     */
    rootCauseIncidentId?: string;

    /**
     * Restricts to incidents that have the given parameter set as configuration.
     */
    configuration?: string;

    /**
     * Restricts to incidents that have one of the given comma-separated tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Restricts to incidents that have one of the given comma-separated job definition ids.
     */
    jobDefinitionIdIn?: string;
  }): Observable<StrictHttpResponse<Array<CountResultDto>>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentService.GetIncidentsCountPath, 'get');
    if (params) {
      rb.query('incidentId', params.incidentId, {});
      rb.query('incidentType', params.incidentType, {});
      rb.query('incidentMessage', params.incidentMessage, {});
      rb.query('incidentMessageLike', params.incidentMessageLike, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('processDefinitionKeyIn', params.processDefinitionKeyIn, {});
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('executionId', params.executionId, {});
      rb.query('incidentTimestampBefore', params.incidentTimestampBefore, {});
      rb.query('incidentTimestampAfter', params.incidentTimestampAfter, {});
      rb.query('activityId', params.activityId, {});
      rb.query('failedActivityId', params.failedActivityId, {});
      rb.query('causeIncidentId', params.causeIncidentId, {});
      rb.query('rootCauseIncidentId', params.rootCauseIncidentId, {});
      rb.query('configuration', params.configuration, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('jobDefinitionIdIn', params.jobDefinitionIdIn, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CountResultDto>>;
      })
    );
  }

  /**
   * Get List Count.
   *
   * Queries for the number of incidents that fulfill given parameters. Takes the same parameters as the
   * [Get Incidents](https://docs.camunda.org/manual/7.14/reference/rest/incident/get-query/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIncidentsCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncidentsCount(params?: {

    /**
     * Restricts to incidents that have the given id.
     */
    incidentId?: string;

    /**
     * Restricts to incidents that belong to the given incident type. See the
     * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types) for a list of incident
     * types.
     */
    incidentType?: string;

    /**
     * Restricts to incidents that have the given incident message.
     */
    incidentMessage?: string;

    /**
     * Restricts to incidents that incidents message is a substring of the given value. The string can include
     * the wildcard character &#x27;%&#x27; to express like-strategy: starts with (&#x60;string%&#x60;), ends with (&#x60;%string&#x60;) or
     * contains (&#x60;%string%&#x60;).
     */
    incidentMessageLike?: string;

    /**
     * Restricts to incidents that belong to a process definition with the given id.
     */
    processDefinitionId?: string;

    /**
     * Restricts to incidents that belong to a process definition with the given keys. Must be a
     * comma-separated list.
     */
    processDefinitionKeyIn?: string;

    /**
     * Restricts to incidents that belong to a process instance with the given id.
     */
    processInstanceId?: string;

    /**
     * Restricts to incidents that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Restricts to incidents that have an incidentTimestamp date before the given date. By default, the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    incidentTimestampBefore?: string;

    /**
     * Restricts to incidents that have an incidentTimestamp date after the given date. By default*, the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    incidentTimestampAfter?: string;

    /**
     * Restricts to incidents that belong to an activity with the given id.
     */
    activityId?: string;

    /**
     * Restricts to incidents that were created due to the failure of an activity with the given id.
     */
    failedActivityId?: string;

    /**
     * Restricts to incidents that have the given incident id as cause incident.
     */
    causeIncidentId?: string;

    /**
     * Restricts to incidents that have the given incident id as root cause incident.
     */
    rootCauseIncidentId?: string;

    /**
     * Restricts to incidents that have the given parameter set as configuration.
     */
    configuration?: string;

    /**
     * Restricts to incidents that have one of the given comma-separated tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Restricts to incidents that have one of the given comma-separated job definition ids.
     */
    jobDefinitionIdIn?: string;
  }): Observable<Array<CountResultDto>> {

    return this.getIncidentsCount$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CountResultDto>>) => r.body as Array<CountResultDto>)
    );
  }

  /**
   * Path part for operation getIncident
   */
  static readonly GetIncidentPath = '/incident/{id}';

  /**
   * Get Incident.
   *
   * Retrieves an incident by ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIncident()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncident$Response(params: {

    /**
     * The id of the incident to be retrieved.
     */
    id: string;
  }): Observable<StrictHttpResponse<IncidentDto>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentService.GetIncidentPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IncidentDto>;
      })
    );
  }

  /**
   * Get Incident.
   *
   * Retrieves an incident by ID.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIncident$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncident(params: {

    /**
     * The id of the incident to be retrieved.
     */
    id: string;
  }): Observable<IncidentDto> {

    return this.getIncident$Response(params).pipe(
      map((r: StrictHttpResponse<IncidentDto>) => r.body as IncidentDto)
    );
  }

  /**
   * Path part for operation resolveIncident
   */
  static readonly ResolveIncidentPath = '/incident/{id}';

  /**
   * Resolve Incident.
   *
   * Resolves an incident with given id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resolveIncident()` instead.
   *
   * This method doesn't expect any request body.
   */
  resolveIncident$Response(params: {

    /**
     * The id of the incident to be resolved.
     */
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentService.ResolveIncidentPath, 'delete');
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
   * Resolve Incident.
   *
   * Resolves an incident with given id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `resolveIncident$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resolveIncident(params: {

    /**
     * The id of the incident to be resolved.
     */
    id: string;
  }): Observable<void> {

    return this.resolveIncident$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
