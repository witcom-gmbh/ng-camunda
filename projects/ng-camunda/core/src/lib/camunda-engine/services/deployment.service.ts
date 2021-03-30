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
import { DeploymentDto } from '../models/deployment-dto';
import { DeploymentResourceDto } from '../models/deployment-resource-dto';
import { DeploymentWithDefinitionsDto } from '../models/deployment-with-definitions-dto';
import { MultiFormDeploymentDto } from '../models/multi-form-deployment-dto';
import { RedeploymentDto } from '../models/redeployment-dto';

@Injectable({
  providedIn: 'root',
})
export class DeploymentService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDeployments
   */
  static readonly GetDeploymentsPath = '/deployment';

  /**
   * Queries for deployments that fulfill given parameters. Parameters may be the properties of deployments,
   * such as the id or name or a range of the deployment time. The size of the result set can be retrieved by
   * using the [Get Deployment count](https://docs.camunda.org/manual/7.14/reference/rest/deployment/get-query-count/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeployments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployments$Response(params?: {

    /**
     * Filter by deployment id
     */
    id?: string;

    /**
     * Filter by the deployment name. Exact match.
     */
    name?: string;

    /**
     * Filter by the deployment name that the parameter is a substring of. The parameter can include the
     * wildcard &#x60;%&#x60; to express like-strategy such as: starts with (&#x60;%&#x60;name), ends with (name&#x60;%&#x60;) or contains
     * (&#x60;%&#x60;name&#x60;%&#x60;).
     */
    nameLike?: string;

    /**
     * Filter by the deployment source.
     */
    source?: string;

    /**
     * Filter by the deployment source whereby source is equal to &#x60;null&#x60;.
     */
    withoutSource?: boolean;

    /**
     * Filter by a comma-separated list of tenant ids. A deployment must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include deployments which belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default
     * behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Include deployments which belong to no tenant. Can be used in combination with &#x60;tenantIdIn&#x60;. Value may
     * only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeDeploymentsWithoutTenantId?: boolean;

    /**
     * Restricts to all deployments after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    after?: string;

    /**
     * Restricts to all deployments before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    before?: string;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: string;

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
  }): Observable<StrictHttpResponse<Array<DeploymentDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DeploymentService.GetDeploymentsPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('name', params.name, {});
      rb.query('nameLike', params.nameLike, {});
      rb.query('source', params.source, {});
      rb.query('withoutSource', params.withoutSource, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('includeDeploymentsWithoutTenantId', params.includeDeploymentsWithoutTenantId, {});
      rb.query('after', params.after, {});
      rb.query('before', params.before, {});
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
        return r as StrictHttpResponse<Array<DeploymentDto>>;
      })
    );
  }

  /**
   * Queries for deployments that fulfill given parameters. Parameters may be the properties of deployments,
   * such as the id or name or a range of the deployment time. The size of the result set can be retrieved by
   * using the [Get Deployment count](https://docs.camunda.org/manual/7.14/reference/rest/deployment/get-query-count/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeployments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployments(params?: {

    /**
     * Filter by deployment id
     */
    id?: string;

    /**
     * Filter by the deployment name. Exact match.
     */
    name?: string;

    /**
     * Filter by the deployment name that the parameter is a substring of. The parameter can include the
     * wildcard &#x60;%&#x60; to express like-strategy such as: starts with (&#x60;%&#x60;name), ends with (name&#x60;%&#x60;) or contains
     * (&#x60;%&#x60;name&#x60;%&#x60;).
     */
    nameLike?: string;

    /**
     * Filter by the deployment source.
     */
    source?: string;

    /**
     * Filter by the deployment source whereby source is equal to &#x60;null&#x60;.
     */
    withoutSource?: boolean;

    /**
     * Filter by a comma-separated list of tenant ids. A deployment must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include deployments which belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default
     * behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Include deployments which belong to no tenant. Can be used in combination with &#x60;tenantIdIn&#x60;. Value may
     * only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeDeploymentsWithoutTenantId?: boolean;

    /**
     * Restricts to all deployments after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    after?: string;

    /**
     * Restricts to all deployments before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    before?: string;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: string;

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
  }): Observable<Array<DeploymentDto>> {

    return this.getDeployments$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DeploymentDto>>) => r.body as Array<DeploymentDto>)
    );
  }

  /**
   * Path part for operation getDeploymentsCount
   */
  static readonly GetDeploymentsCountPath = '/deployment/count';

  /**
   * Queries for the number of deployments that fulfill given parameters. Takes the same parameters as the
   * [Get Deployments](https://docs.camunda.org/manual/7.14/reference/rest/deployment/get-query/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeploymentsCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeploymentsCount$Response(params?: {

    /**
     * Filter by deployment id
     */
    id?: string;

    /**
     * Filter by the deployment name. Exact match.
     */
    name?: string;

    /**
     * Filter by the deployment name that the parameter is a substring of. The parameter can include the
     * wildcard &#x60;%&#x60; to express like-strategy such as: starts with (&#x60;%&#x60;name), ends with (name&#x60;%&#x60;) or contains
     * (&#x60;%&#x60;name&#x60;%&#x60;).
     */
    nameLike?: string;

    /**
     * Filter by the deployment source.
     */
    source?: string;

    /**
     * Filter by the deployment source whereby source is equal to &#x60;null&#x60;.
     */
    withoutSource?: boolean;

    /**
     * Filter by a comma-separated list of tenant ids. A deployment must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include deployments which belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default
     * behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Include deployments which belong to no tenant. Can be used in combination with &#x60;tenantIdIn&#x60;. Value may
     * only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeDeploymentsWithoutTenantId?: boolean;

    /**
     * Restricts to all deployments after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    after?: string;

    /**
     * Restricts to all deployments before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    before?: string;
  }): Observable<StrictHttpResponse<CountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, DeploymentService.GetDeploymentsCountPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('name', params.name, {});
      rb.query('nameLike', params.nameLike, {});
      rb.query('source', params.source, {});
      rb.query('withoutSource', params.withoutSource, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('includeDeploymentsWithoutTenantId', params.includeDeploymentsWithoutTenantId, {});
      rb.query('after', params.after, {});
      rb.query('before', params.before, {});
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
   * Queries for the number of deployments that fulfill given parameters. Takes the same parameters as the
   * [Get Deployments](https://docs.camunda.org/manual/7.14/reference/rest/deployment/get-query/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeploymentsCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeploymentsCount(params?: {

    /**
     * Filter by deployment id
     */
    id?: string;

    /**
     * Filter by the deployment name. Exact match.
     */
    name?: string;

    /**
     * Filter by the deployment name that the parameter is a substring of. The parameter can include the
     * wildcard &#x60;%&#x60; to express like-strategy such as: starts with (&#x60;%&#x60;name), ends with (name&#x60;%&#x60;) or contains
     * (&#x60;%&#x60;name&#x60;%&#x60;).
     */
    nameLike?: string;

    /**
     * Filter by the deployment source.
     */
    source?: string;

    /**
     * Filter by the deployment source whereby source is equal to &#x60;null&#x60;.
     */
    withoutSource?: boolean;

    /**
     * Filter by a comma-separated list of tenant ids. A deployment must have one of the given tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include deployments which belong to no tenant. Value may only be &#x60;true&#x60;, as &#x60;false&#x60; is the default
     * behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Include deployments which belong to no tenant. Can be used in combination with &#x60;tenantIdIn&#x60;. Value may
     * only be &#x60;true&#x60;, as &#x60;false&#x60; is the default behavior.
     */
    includeDeploymentsWithoutTenantId?: boolean;

    /**
     * Restricts to all deployments after the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    after?: string;

    /**
     * Restricts to all deployments before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
     * &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.000+0200&#x60;.
     */
    before?: string;
  }): Observable<CountResultDto> {

    return this.getDeploymentsCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountResultDto>) => r.body as CountResultDto)
    );
  }

  /**
   * Path part for operation createDeployment
   */
  static readonly CreateDeploymentPath = '/deployment/create';

  /**
   * Creates a deployment.
   *
   * **Security Consideration**
   *
   * Deployments can contain custom code in form of scripts or EL expressions to customize process behavior.
   * This may be abused for remote execution of arbitrary code.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDeployment()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createDeployment$Response(params?: {
    body?: MultiFormDeploymentDto
  }): Observable<StrictHttpResponse<DeploymentWithDefinitionsDto>> {

    const rb = new RequestBuilder(this.rootUrl, DeploymentService.CreateDeploymentPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DeploymentWithDefinitionsDto>;
      })
    );
  }

  /**
   * Creates a deployment.
   *
   * **Security Consideration**
   *
   * Deployments can contain custom code in form of scripts or EL expressions to customize process behavior.
   * This may be abused for remote execution of arbitrary code.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createDeployment$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createDeployment(params?: {
    body?: MultiFormDeploymentDto
  }): Observable<DeploymentWithDefinitionsDto> {

    return this.createDeployment$Response(params).pipe(
      map((r: StrictHttpResponse<DeploymentWithDefinitionsDto>) => r.body as DeploymentWithDefinitionsDto)
    );
  }

  /**
   * Path part for operation getDeployment
   */
  static readonly GetDeploymentPath = '/deployment/{id}';

  /**
   * Retrieves a deployment by id, according to the `Deployment` interface of the engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeployment()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployment$Response(params: {

    /**
     * The id of the deployment.
     */
    id: string;
  }): Observable<StrictHttpResponse<Array<DeploymentDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DeploymentService.GetDeploymentPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DeploymentDto>>;
      })
    );
  }

  /**
   * Retrieves a deployment by id, according to the `Deployment` interface of the engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeployment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployment(params: {

    /**
     * The id of the deployment.
     */
    id: string;
  }): Observable<Array<DeploymentDto>> {

    return this.getDeployment$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DeploymentDto>>) => r.body as Array<DeploymentDto>)
    );
  }

  /**
   * Path part for operation deleteDeployment
   */
  static readonly DeleteDeploymentPath = '/deployment/{id}';

  /**
   * Deletes a deployment by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDeployment()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeployment$Response(params: {

    /**
     * The id of the deployment to be deleted.
     */
    id: string;

    /**
     * &#x60;true&#x60;, if all process instances, historic process instances and jobs for this deployment
     * should be deleted.
     */
    cascade?: boolean;

    /**
     * &#x60;true&#x60;, if only the built-in ExecutionListeners should be notified with the end event.
     */
    skipCustomListeners?: boolean;

    /**
     * &#x60;true&#x60;, if all input/output mappings should not be invoked.
     */
    skipIoMappings?: boolean;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DeploymentService.DeleteDeploymentPath, 'delete');
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
   * Deletes a deployment by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDeployment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeployment(params: {

    /**
     * The id of the deployment to be deleted.
     */
    id: string;

    /**
     * &#x60;true&#x60;, if all process instances, historic process instances and jobs for this deployment
     * should be deleted.
     */
    cascade?: boolean;

    /**
     * &#x60;true&#x60;, if only the built-in ExecutionListeners should be notified with the end event.
     */
    skipCustomListeners?: boolean;

    /**
     * &#x60;true&#x60;, if all input/output mappings should not be invoked.
     */
    skipIoMappings?: boolean;
  }): Observable<void> {

    return this.deleteDeployment$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation redeploy
   */
  static readonly RedeployPath = '/deployment/{id}/redeploy';

  /**
   * Re-deploys an existing deployment.
   *
   * The deployment resources to re-deploy can be restricted by using the properties `resourceIds` or
   * `resourceNames`. If no deployment resources to re-deploy are passed then all existing resources of the
   * given deployment are re-deployed.
   *
   * **Warning**: Deployments can contain custom code in form of scripts or EL expressions to customize
   * process behavior. This may be abused for remote execution of arbitrary code. See the section on
   * [security considerations for custom code](https://docs.camunda.org/manual/7.14/user-guide/process-engine/securing-custom-code/) in
   * the user guide for details.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `redeploy()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  redeploy$Response(params: {

    /**
     * The id of the deployment to re-deploy.
     */
    id: string;
    body?: RedeploymentDto
  }): Observable<StrictHttpResponse<DeploymentWithDefinitionsDto>> {

    const rb = new RequestBuilder(this.rootUrl, DeploymentService.RedeployPath, 'post');
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
        return r as StrictHttpResponse<DeploymentWithDefinitionsDto>;
      })
    );
  }

  /**
   * Re-deploys an existing deployment.
   *
   * The deployment resources to re-deploy can be restricted by using the properties `resourceIds` or
   * `resourceNames`. If no deployment resources to re-deploy are passed then all existing resources of the
   * given deployment are re-deployed.
   *
   * **Warning**: Deployments can contain custom code in form of scripts or EL expressions to customize
   * process behavior. This may be abused for remote execution of arbitrary code. See the section on
   * [security considerations for custom code](https://docs.camunda.org/manual/7.14/user-guide/process-engine/securing-custom-code/) in
   * the user guide for details.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `redeploy$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  redeploy(params: {

    /**
     * The id of the deployment to re-deploy.
     */
    id: string;
    body?: RedeploymentDto
  }): Observable<DeploymentWithDefinitionsDto> {

    return this.redeploy$Response(params).pipe(
      map((r: StrictHttpResponse<DeploymentWithDefinitionsDto>) => r.body as DeploymentWithDefinitionsDto)
    );
  }

  /**
   * Path part for operation getDeploymentResources
   */
  static readonly GetDeploymentResourcesPath = '/deployment/{id}/resources';

  /**
   * Retrieves all deployment resources of a given deployment.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeploymentResources()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeploymentResources$Response(params: {

    /**
     * The id of the deployment to retrieve the deployment resources for.
     */
    id: string;
  }): Observable<StrictHttpResponse<Array<DeploymentResourceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DeploymentService.GetDeploymentResourcesPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DeploymentResourceDto>>;
      })
    );
  }

  /**
   * Retrieves all deployment resources of a given deployment.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeploymentResources$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeploymentResources(params: {

    /**
     * The id of the deployment to retrieve the deployment resources for.
     */
    id: string;
  }): Observable<Array<DeploymentResourceDto>> {

    return this.getDeploymentResources$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DeploymentResourceDto>>) => r.body as Array<DeploymentResourceDto>)
    );
  }

  /**
   * Path part for operation getDeploymentResource
   */
  static readonly GetDeploymentResourcePath = '/deployment/{id}/resources/{resourceId}';

  /**
   * Retrieves a deployment resource by resource id for the given deployment.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeploymentResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeploymentResource$Response(params: {

    /**
     * The id of the deployment
     */
    id: string;

    /**
     * The id of the deployment resource
     */
    resourceId: string;
  }): Observable<StrictHttpResponse<DeploymentResourceDto>> {

    const rb = new RequestBuilder(this.rootUrl, DeploymentService.GetDeploymentResourcePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('resourceId', params.resourceId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DeploymentResourceDto>;
      })
    );
  }

  /**
   * Retrieves a deployment resource by resource id for the given deployment.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeploymentResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeploymentResource(params: {

    /**
     * The id of the deployment
     */
    id: string;

    /**
     * The id of the deployment resource
     */
    resourceId: string;
  }): Observable<DeploymentResourceDto> {

    return this.getDeploymentResource$Response(params).pipe(
      map((r: StrictHttpResponse<DeploymentResourceDto>) => r.body as DeploymentResourceDto)
    );
  }

  /**
   * Path part for operation getDeploymentResourceData
   */
  static readonly GetDeploymentResourceDataPath = '/deployment/{id}/resources/{resourceId}/data';

  /**
   * Retrieves the binary content of a deployment resource for the given deployment by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeploymentResourceData()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeploymentResourceData$Response(params: {

    /**
     * The id of the deployment.
     */
    id: string;

    /**
     * The id of the deployment resource.
     */
    resourceId: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, DeploymentService.GetDeploymentResourceDataPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('resourceId', params.resourceId, {});
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
   * Retrieves the binary content of a deployment resource for the given deployment by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeploymentResourceData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeploymentResourceData(params: {

    /**
     * The id of the deployment.
     */
    id: string;

    /**
     * The id of the deployment resource.
     */
    resourceId: string;
  }): Observable<Blob> {

    return this.getDeploymentResourceData$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
