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
import { CamundaResourceOptionsDto } from '../models/camunda-resource-options-dto';
import { CamundaUserCredentialsDto } from '../models/camunda-user-credentials-dto';
import { CamundaUserDto } from '../models/camunda-user-dto';
import { CamundaUserProfileDto } from '../models/camunda-user-profile-dto';

@Injectable({
  providedIn: 'root',
})
export class CamundaUserService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getUsers
   */
  static readonly GetUsersPath = '/user';

  /**
   * Get List.
   *
   * Query for a list of users using a list of parameters.
   * The size of the result set can be retrieved by using the Get User Count method.
   * [Get User Count](https://docs.camunda.org/manual/7.14/reference/rest/user/get-query-count/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers$Response(params?: {

    /**
     * Filter by user id
     */
    id?: string;

    /**
     * Filter by a comma-separated list of user ids.
     */
    idIn?: string;

    /**
     * Filter by the first name of the user. Exact match.
     */
    firstName?: string;

    /**
     * Filter by the first name that the parameter is a substring of.
     */
    firstNameLike?: string;

    /**
     * Filter by the last name of the user. Exact match.
     */
    lastName?: string;

    /**
     * Filter by the last name that the parameter is a substring of.
     */
    lastNameLike?: string;

    /**
     * Filter by the email of the user. Exact match.
     */
    email?: string;

    /**
     * Filter by the email that the parameter is a substring of.
     */
    emailLike?: string;

    /**
     * Filter for users which are members of the given group.
     */
    memberOfGroup?: string;

    /**
     * Filter for users which are members of the given tenant.
     */
    memberOfTenant?: string;

    /**
     * Only select Users that are potential starter for the given process definition.
     */
    potentialStarter?: string;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'instanceId' | 'caseInstanceId' | 'dueDate' | 'executionId' | 'caseExecutionId' | 'assignee' | 'created' | 'description' | 'id' | 'name' | 'nameCaseInsensitive' | 'priority' | 'processVariable' | 'executionVariable' | 'taskVariable' | 'caseExecutionVariable' | 'caseInstanceVariable';

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
  }): Observable<StrictHttpResponse<Array<CamundaUserProfileDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaUserService.GetUsersPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('idIn', params.idIn, {});
      rb.query('firstName', params.firstName, {});
      rb.query('firstNameLike', params.firstNameLike, {});
      rb.query('lastName', params.lastName, {});
      rb.query('lastNameLike', params.lastNameLike, {});
      rb.query('email', params.email, {});
      rb.query('emailLike', params.emailLike, {});
      rb.query('memberOfGroup', params.memberOfGroup, {});
      rb.query('memberOfTenant', params.memberOfTenant, {});
      rb.query('potentialStarter', params.potentialStarter, {});
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
        return r as StrictHttpResponse<Array<CamundaUserProfileDto>>;
      })
    );
  }

  /**
   * Get List.
   *
   * Query for a list of users using a list of parameters.
   * The size of the result set can be retrieved by using the Get User Count method.
   * [Get User Count](https://docs.camunda.org/manual/7.14/reference/rest/user/get-query-count/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers(params?: {

    /**
     * Filter by user id
     */
    id?: string;

    /**
     * Filter by a comma-separated list of user ids.
     */
    idIn?: string;

    /**
     * Filter by the first name of the user. Exact match.
     */
    firstName?: string;

    /**
     * Filter by the first name that the parameter is a substring of.
     */
    firstNameLike?: string;

    /**
     * Filter by the last name of the user. Exact match.
     */
    lastName?: string;

    /**
     * Filter by the last name that the parameter is a substring of.
     */
    lastNameLike?: string;

    /**
     * Filter by the email of the user. Exact match.
     */
    email?: string;

    /**
     * Filter by the email that the parameter is a substring of.
     */
    emailLike?: string;

    /**
     * Filter for users which are members of the given group.
     */
    memberOfGroup?: string;

    /**
     * Filter for users which are members of the given tenant.
     */
    memberOfTenant?: string;

    /**
     * Only select Users that are potential starter for the given process definition.
     */
    potentialStarter?: string;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'instanceId' | 'caseInstanceId' | 'dueDate' | 'executionId' | 'caseExecutionId' | 'assignee' | 'created' | 'description' | 'id' | 'name' | 'nameCaseInsensitive' | 'priority' | 'processVariable' | 'executionVariable' | 'taskVariable' | 'caseExecutionVariable' | 'caseInstanceVariable';

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
  }): Observable<Array<CamundaUserProfileDto>> {

    return this.getUsers$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CamundaUserProfileDto>>) => r.body as Array<CamundaUserProfileDto>)
    );
  }

  /**
   * Path part for operation availableOperations
   */
  static readonly AvailableOperationsPath = '/user';

  /**
   * Options.
   *
   * The `/user` resource supports two custom `OPTIONS` requests, one for the resource as such
   * and one for individual user instances. The `OPTIONS` request allows checking for the set of
   * available operations that the currently authenticated user can perform on the /user resource.
   * If the user can perform an operation or not may depend on various things, including the user's
   * authorizations to interact with this resource and the internal configuration of the process
   * engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `availableOperations()` instead.
   *
   * This method doesn't expect any request body.
   */
  availableOperations$Response(params?: {
  }): Observable<StrictHttpResponse<CamundaResourceOptionsDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaUserService.AvailableOperationsPath, 'options');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaResourceOptionsDto>;
      })
    );
  }

  /**
   * Options.
   *
   * The `/user` resource supports two custom `OPTIONS` requests, one for the resource as such
   * and one for individual user instances. The `OPTIONS` request allows checking for the set of
   * available operations that the currently authenticated user can perform on the /user resource.
   * If the user can perform an operation or not may depend on various things, including the user's
   * authorizations to interact with this resource and the internal configuration of the process
   * engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `availableOperations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  availableOperations(params?: {
  }): Observable<CamundaResourceOptionsDto> {

    return this.availableOperations$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaResourceOptionsDto>) => r.body as CamundaResourceOptionsDto)
    );
  }

  /**
   * Path part for operation getUserCount
   */
  static readonly GetUserCountPath = '/user/count';

  /**
   * Get List Count.
   *
   * Queries for the number of deployments that fulfill given parameters. Takes the same parameters as the
   * [Get Users](https://docs.camunda.org/manual/7.14/reference/rest/user/get-query/) method.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserCount$Response(params?: {

    /**
     * Filter by user id
     */
    id?: string;

    /**
     * Filter by a comma-separated list of user ids.
     */
    idIn?: string;

    /**
     * Filter by the first name of the user. Exact match.
     */
    firstName?: string;

    /**
     * Filter by the first name that the parameter is a substring of.
     */
    firstNameLike?: string;

    /**
     * Filter by the last name of the user. Exact match.
     */
    lastName?: string;

    /**
     * Filter by the last name that the parameter is a substring of.
     */
    lastNameLike?: string;

    /**
     * Filter by the email of the user. Exact match.
     */
    email?: string;

    /**
     * Filter by the email that the parameter is a substring of.
     */
    emailLike?: string;

    /**
     * Filter for users which are members of the given group.
     */
    memberOfGroup?: string;

    /**
     * Filter for users which are members of the given tenant.
     */
    memberOfTenant?: string;

    /**
     * Only select Users that are potential starter for the given process definition.
     */
    potentialStarter?: string;
  }): Observable<StrictHttpResponse<CamundaCountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaUserService.GetUserCountPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('idIn', params.idIn, {});
      rb.query('firstName', params.firstName, {});
      rb.query('firstNameLike', params.firstNameLike, {});
      rb.query('lastName', params.lastName, {});
      rb.query('lastNameLike', params.lastNameLike, {});
      rb.query('email', params.email, {});
      rb.query('emailLike', params.emailLike, {});
      rb.query('memberOfGroup', params.memberOfGroup, {});
      rb.query('memberOfTenant', params.memberOfTenant, {});
      rb.query('potentialStarter', params.potentialStarter, {});
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
   * Queries for the number of deployments that fulfill given parameters. Takes the same parameters as the
   * [Get Users](https://docs.camunda.org/manual/7.14/reference/rest/user/get-query/) method.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserCount(params?: {

    /**
     * Filter by user id
     */
    id?: string;

    /**
     * Filter by a comma-separated list of user ids.
     */
    idIn?: string;

    /**
     * Filter by the first name of the user. Exact match.
     */
    firstName?: string;

    /**
     * Filter by the first name that the parameter is a substring of.
     */
    firstNameLike?: string;

    /**
     * Filter by the last name of the user. Exact match.
     */
    lastName?: string;

    /**
     * Filter by the last name that the parameter is a substring of.
     */
    lastNameLike?: string;

    /**
     * Filter by the email of the user. Exact match.
     */
    email?: string;

    /**
     * Filter by the email that the parameter is a substring of.
     */
    emailLike?: string;

    /**
     * Filter for users which are members of the given group.
     */
    memberOfGroup?: string;

    /**
     * Filter for users which are members of the given tenant.
     */
    memberOfTenant?: string;

    /**
     * Only select Users that are potential starter for the given process definition.
     */
    potentialStarter?: string;
  }): Observable<CamundaCountResultDto> {

    return this.getUserCount$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaCountResultDto>) => r.body as CamundaCountResultDto)
    );
  }

  /**
   * Path part for operation createUser
   */
  static readonly CreateUserPath = '/user/create';

  /**
   * Create.
   *
   * Create a new user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params?: {
    body?: CamundaUserDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaUserService.CreateUserPath, 'post');
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
   * Create.
   *
   * Create a new user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params?: {
    body?: CamundaUserDto
  }): Observable<void> {

    return this.createUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteUser
   */
  static readonly DeleteUserPath = '/user/{id}';

  /**
   * Delete.
   *
   * Deletes a user by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: {

    /**
     * The id of the user to be deleted.
     */
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaUserService.DeleteUserPath, 'delete');
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
   * Delete.
   *
   * Deletes a user by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: {

    /**
     * The id of the user to be deleted.
     */
    id: string;
  }): Observable<void> {

    return this.deleteUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation availableUserOperations
   */
  static readonly AvailableUserOperationsPath = '/user/{id}';

  /**
   * Options.
   *
   * The `/user` resource supports two custom `OPTIONS` requests, one for the resource as such
   * and one for individual user instances. The `OPTIONS` request allows checking for the set of
   * available operations that the currently authenticated user can perform on the /user resource.
   * If the user can perform an operation or not may depend on various things, including the user's
   * authorizations to interact with this resource and the internal configuration of the process
   * engine.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `availableUserOperations()` instead.
   *
   * This method doesn't expect any request body.
   */
  availableUserOperations$Response(params: {

    /**
     * The id of the user to be deleted.
     */
    id: string;
  }): Observable<StrictHttpResponse<CamundaResourceOptionsDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaUserService.AvailableUserOperationsPath, 'options');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaResourceOptionsDto>;
      })
    );
  }

  /**
   * Options.
   *
   * The `/user` resource supports two custom `OPTIONS` requests, one for the resource as such
   * and one for individual user instances. The `OPTIONS` request allows checking for the set of
   * available operations that the currently authenticated user can perform on the /user resource.
   * If the user can perform an operation or not may depend on various things, including the user's
   * authorizations to interact with this resource and the internal configuration of the process
   * engine.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `availableUserOperations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  availableUserOperations(params: {

    /**
     * The id of the user to be deleted.
     */
    id: string;
  }): Observable<CamundaResourceOptionsDto> {

    return this.availableUserOperations$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaResourceOptionsDto>) => r.body as CamundaResourceOptionsDto)
    );
  }

  /**
   * Path part for operation updateCredentials
   */
  static readonly UpdateCredentialsPath = '/user/{id}/credentials';

  /**
   * Update Credentials.
   *
   * Updates a user's credentials (password)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCredentials()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCredentials$Response(params: {

    /**
     * The id of the user to be updated.
     */
    id: string;

    /**
     * The users new password.
     */
    password: string;

    /**
     * The password of the authenticated user who changes the password of the user
     * (i.e., the user with passed id as path parameter).
     */
    authenticatedUserPassword: string;
    body?: CamundaUserCredentialsDto
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaUserService.UpdateCredentialsPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('password', params.password, {});
      rb.query('authenticatedUserPassword', params.authenticatedUserPassword, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Update Credentials.
   *
   * Updates a user's credentials (password)
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCredentials$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCredentials(params: {

    /**
     * The id of the user to be updated.
     */
    id: string;

    /**
     * The users new password.
     */
    password: string;

    /**
     * The password of the authenticated user who changes the password of the user
     * (i.e., the user with passed id as path parameter).
     */
    authenticatedUserPassword: string;
    body?: CamundaUserCredentialsDto
  }): Observable<any> {

    return this.updateCredentials$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getUserProfile
   */
  static readonly GetUserProfilePath = '/user/{id}/profile';

  /**
   * Get Profile.
   *
   * Retrieves a user's profile.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserProfile$Response(params: {

    /**
     * The id of the user to retrieve.
     */
    id: string;
  }): Observable<StrictHttpResponse<Array<CamundaUserProfileDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaUserService.GetUserProfilePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CamundaUserProfileDto>>;
      })
    );
  }

  /**
   * Get Profile.
   *
   * Retrieves a user's profile.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserProfile(params: {

    /**
     * The id of the user to retrieve.
     */
    id: string;
  }): Observable<Array<CamundaUserProfileDto>> {

    return this.getUserProfile$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CamundaUserProfileDto>>) => r.body as Array<CamundaUserProfileDto>)
    );
  }

  /**
   * Path part for operation unlockUser
   */
  static readonly UnlockUserPath = '/user/{id}/unlock';

  /**
   * Unlock User.
   *
   * Unlocks a user by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unlockUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlockUser$Response(params: {

    /**
     * The id of the user to be unlocked.
     */
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaUserService.UnlockUserPath, 'post');
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
   * Unlock User.
   *
   * Unlocks a user by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unlockUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unlockUser(params: {

    /**
     * The id of the user to be unlocked.
     */
    id: string;
  }): Observable<void> {

    return this.unlockUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
