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

import { IdentityLinkDto } from '../models/identity-link-dto';

@Injectable({
  providedIn: 'root',
})
export class TaskIdentityLinkService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getIdentityLinks
   */
  static readonly GetIdentityLinksPath = '/task/{id}/identity-links';

  /**
   * Gets the identity links for a task by id, which are the users and groups that are in
   * *some* relation to it (including assignee and owner).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIdentityLinks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIdentityLinks$Response(params: {

    /**
     * The id of the task to retrieve the identity links for.
     */
    id: string;

    /**
     * Filter by the type of links to include.
     */
    type?: string;
  }): Observable<StrictHttpResponse<Array<IdentityLinkDto>>> {

    const rb = new RequestBuilder(this.rootUrl, TaskIdentityLinkService.GetIdentityLinksPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('type', params.type, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IdentityLinkDto>>;
      })
    );
  }

  /**
   * Gets the identity links for a task by id, which are the users and groups that are in
   * *some* relation to it (including assignee and owner).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIdentityLinks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIdentityLinks(params: {

    /**
     * The id of the task to retrieve the identity links for.
     */
    id: string;

    /**
     * Filter by the type of links to include.
     */
    type?: string;
  }): Observable<Array<IdentityLinkDto>> {

    return this.getIdentityLinks$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IdentityLinkDto>>) => r.body as Array<IdentityLinkDto>)
    );
  }

  /**
   * Path part for operation addIdentityLink
   */
  static readonly AddIdentityLinkPath = '/task/{id}/identity-links';

  /**
   * Adds an identity link to a task by id. Can be used to link any user or group to a task
   * and specify a relation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addIdentityLink()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addIdentityLink$Response(params: {

    /**
     * The id of the task to add a link to.
     */
    id: string;
    body?: IdentityLinkDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskIdentityLinkService.AddIdentityLinkPath, 'post');
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
   * Adds an identity link to a task by id. Can be used to link any user or group to a task
   * and specify a relation.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addIdentityLink$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addIdentityLink(params: {

    /**
     * The id of the task to add a link to.
     */
    id: string;
    body?: IdentityLinkDto
  }): Observable<void> {

    return this.addIdentityLink$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteIdentityLink
   */
  static readonly DeleteIdentityLinkPath = '/task/{id}/identity-links/delete';

  /**
   * Removes an identity link from a task by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteIdentityLink()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteIdentityLink$Response(params: {

    /**
     * The id of the task to remove a link from.
     */
    id: string;
    body?: IdentityLinkDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskIdentityLinkService.DeleteIdentityLinkPath, 'post');
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
   * Removes an identity link from a task by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteIdentityLink$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteIdentityLink(params: {

    /**
     * The id of the task to remove a link from.
     */
    id: string;
    body?: IdentityLinkDto
  }): Observable<void> {

    return this.deleteIdentityLink$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
