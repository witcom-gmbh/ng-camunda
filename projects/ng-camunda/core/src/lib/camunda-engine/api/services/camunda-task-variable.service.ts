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

import { CamundaMultiFormVariableBinaryDto } from '../models/camunda-multi-form-variable-binary-dto';
import { CamundaPatchVariablesDto } from '../models/camunda-patch-variables-dto';
import { CamundaVariableValueDto } from '../models/camunda-variable-value-dto';

@Injectable({
  providedIn: 'root',
})
export class CamundaTaskVariableService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTaskVariables
   */
  static readonly GetTaskVariablesPath = '/task/{id}/variables';

  /**
   * Retrieves all variables visible from the task. A variable is visible from the task if it is a local task
   * variable or declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskVariables()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskVariables$Response(params: {

    /**
     * The id of the task to retrieve the variables from.
     */
    id: string;

    /**
     * Determines whether serializable variable values (typically variables that store custom Java objects)
     * should be deserialized on the server side (default &#x60;true&#x60;).
     * If set to &#x60;true&#x60;, a serializable variable will be deserialized on server side and transformed to JSON
     * using [Jackson&#x27;s](https://github.com/FasterXML/jackson) POJO/bean property introspection feature.
     * Note that this requires the Java classes of the variable value to be on the REST API&#x27;s classpath.
     *
     * If set to &#x60;false&#x60;, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string containing XML.
     *
     * Note: While &#x60;true&#x60; is the default value for reasons of backward compatibility, we recommend setting this
     * parameter to &#x60;false&#x60; when developing web applications that are independent of the Java process
     * applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskVariableService.GetTaskVariablesPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('deserializeValues', params.deserializeValues, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>;
      })
    );
  }

  /**
   * Retrieves all variables visible from the task. A variable is visible from the task if it is a local task
   * variable or declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskVariables$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskVariables(params: {

    /**
     * The id of the task to retrieve the variables from.
     */
    id: string;

    /**
     * Determines whether serializable variable values (typically variables that store custom Java objects)
     * should be deserialized on the server side (default &#x60;true&#x60;).
     * If set to &#x60;true&#x60;, a serializable variable will be deserialized on server side and transformed to JSON
     * using [Jackson&#x27;s](https://github.com/FasterXML/jackson) POJO/bean property introspection feature.
     * Note that this requires the Java classes of the variable value to be on the REST API&#x27;s classpath.
     *
     * If set to &#x60;false&#x60;, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string containing XML.
     *
     * Note: While &#x60;true&#x60; is the default value for reasons of backward compatibility, we recommend setting this
     * parameter to &#x60;false&#x60; when developing web applications that are independent of the Java process
     * applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<{ [key: string]: CamundaVariableValueDto }> {

    return this.getTaskVariables$Response(params).pipe(
      map((r: StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>) => r.body as { [key: string]: CamundaVariableValueDto })
    );
  }

  /**
   * Path part for operation modifyTaskVariables
   */
  static readonly ModifyTaskVariablesPath = '/task/{id}/variables';

  /**
   * Updates or deletes the variables visible from the task. Updates precede deletions. So, if a variable is
   * updated AND deleted, the deletion overrides the update. A variable is visible from the task if it is a
   * local task variable or declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `modifyTaskVariables()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifyTaskVariables$Response(params: {

    /**
     * The id of the task to set variables for.
     */
    id: string;
    body?: CamundaPatchVariablesDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskVariableService.ModifyTaskVariablesPath, 'post');
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
   * Updates or deletes the variables visible from the task. Updates precede deletions. So, if a variable is
   * updated AND deleted, the deletion overrides the update. A variable is visible from the task if it is a
   * local task variable or declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `modifyTaskVariables$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifyTaskVariables(params: {

    /**
     * The id of the task to set variables for.
     */
    id: string;
    body?: CamundaPatchVariablesDto
  }): Observable<void> {

    return this.modifyTaskVariables$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getTaskVariable
   */
  static readonly GetTaskVariablePath = '/task/{id}/variables/{varName}';

  /**
   * Retrieves a variable from the context of a given task.
   * The variable must be visible from the task. It is visible from the task if it is a local task variable or
   * declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskVariable()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskVariable$Response(params: {

    /**
     * The id of the task to retrieve the variable from.
     */
    id: string;

    /**
     * The name of the variable to get.
     */
    varName: string;

    /**
     * Determines whether serializable variable values (typically variables that store custom Java objects)
     * should be deserialized on the server side (default &#x60;true&#x60;).
     *
     * If set to &#x60;true&#x60;, a serializable variable will be deserialized on server side and transformed to JSON
     * using [Jackson&#x27;s](https://github.com/FasterXML/jackson) POJO/bean property introspection feature.
     * Note that this requires the Java classes of the variable value to be on the REST API&#x27;s classpath.
     *
     * If set to &#x60;false&#x60;, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string containing XML.
     *
     * Note: While &#x60;true&#x60; is the default value for reasons of backward compatibility, we recommend setting this
     * parameter to &#x60;false&#x60; when developing web applications that are independent of the Java process
     * applications deployed to the engine.
     */
    deserializeValue?: boolean;
  }): Observable<StrictHttpResponse<CamundaVariableValueDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskVariableService.GetTaskVariablePath, 'get');
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
        return r as StrictHttpResponse<CamundaVariableValueDto>;
      })
    );
  }

  /**
   * Retrieves a variable from the context of a given task.
   * The variable must be visible from the task. It is visible from the task if it is a local task variable or
   * declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskVariable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskVariable(params: {

    /**
     * The id of the task to retrieve the variable from.
     */
    id: string;

    /**
     * The name of the variable to get.
     */
    varName: string;

    /**
     * Determines whether serializable variable values (typically variables that store custom Java objects)
     * should be deserialized on the server side (default &#x60;true&#x60;).
     *
     * If set to &#x60;true&#x60;, a serializable variable will be deserialized on server side and transformed to JSON
     * using [Jackson&#x27;s](https://github.com/FasterXML/jackson) POJO/bean property introspection feature.
     * Note that this requires the Java classes of the variable value to be on the REST API&#x27;s classpath.
     *
     * If set to &#x60;false&#x60;, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string containing XML.
     *
     * Note: While &#x60;true&#x60; is the default value for reasons of backward compatibility, we recommend setting this
     * parameter to &#x60;false&#x60; when developing web applications that are independent of the Java process
     * applications deployed to the engine.
     */
    deserializeValue?: boolean;
  }): Observable<CamundaVariableValueDto> {

    return this.getTaskVariable$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaVariableValueDto>) => r.body as CamundaVariableValueDto)
    );
  }

  /**
   * Path part for operation putTaskVariable
   */
  static readonly PutTaskVariablePath = '/task/{id}/variables/{varName}';

  /**
   * Updates a process variable that is visible from the Task scope. A variable is visible from the task if it
   * is a local task variable, or declared in a parent scope of the task. See the documentation on
   * [variable scopes and visibility](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables#variable-scopes-and-variable-visibility).
   *
   * **Note**: If a variable doesn't exist, the variable is created in the top-most scope
   * visible from the task.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putTaskVariable()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putTaskVariable$Response(params: {

    /**
     * The id of the task to set the variable for.
     */
    id: string;

    /**
     * The name of the variable to set.
     */
    varName: string;
    body?: CamundaVariableValueDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskVariableService.PutTaskVariablePath, 'put');
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
   * Updates a process variable that is visible from the Task scope. A variable is visible from the task if it
   * is a local task variable, or declared in a parent scope of the task. See the documentation on
   * [variable scopes and visibility](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables#variable-scopes-and-variable-visibility).
   *
   * **Note**: If a variable doesn't exist, the variable is created in the top-most scope
   * visible from the task.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putTaskVariable$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putTaskVariable(params: {

    /**
     * The id of the task to set the variable for.
     */
    id: string;

    /**
     * The name of the variable to set.
     */
    varName: string;
    body?: CamundaVariableValueDto
  }): Observable<void> {

    return this.putTaskVariable$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteTaskVariable
   */
  static readonly DeleteTaskVariablePath = '/task/{id}/variables/{varName}';

  /**
   * Removes a variable that is visible to a task. A variable is visible to a task if it is a local task
   * variable or declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTaskVariable()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTaskVariable$Response(params: {

    /**
     * The id of the task to delete the variable from.
     */
    id: string;

    /**
     * The name of the variable to be removed.
     */
    varName: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskVariableService.DeleteTaskVariablePath, 'delete');
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
   * Removes a variable that is visible to a task. A variable is visible to a task if it is a local task
   * variable or declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTaskVariable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTaskVariable(params: {

    /**
     * The id of the task to delete the variable from.
     */
    id: string;

    /**
     * The name of the variable to be removed.
     */
    varName: string;
  }): Observable<void> {

    return this.deleteTaskVariable$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getTaskVariableBinary
   */
  static readonly GetTaskVariableBinaryPath = '/task/{id}/variables/{varName}/data';

  /**
   * Retrieves a binary variable from the context of a given task. Applicable for byte array and file
   * variables. The variable must be visible from the task. It is visible from the task if it is a local task
   * variable or declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskVariableBinary$Any()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskVariableBinary$Any$Response(params: {

    /**
     * The id of the task to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskVariableService.GetTaskVariableBinaryPath, 'get');
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
   * Retrieves a binary variable from the context of a given task. Applicable for byte array and file
   * variables. The variable must be visible from the task. It is visible from the task if it is a local task
   * variable or declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskVariableBinary$Any$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskVariableBinary$Any(params: {

    /**
     * The id of the task to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<Blob> {

    return this.getTaskVariableBinary$Any$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Retrieves a binary variable from the context of a given task. Applicable for byte array and file
   * variables. The variable must be visible from the task. It is visible from the task if it is a local task
   * variable or declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskVariableBinary$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskVariableBinary$Plain$Response(params: {

    /**
     * The id of the task to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskVariableService.GetTaskVariableBinaryPath, 'get');
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
   * Retrieves a binary variable from the context of a given task. Applicable for byte array and file
   * variables. The variable must be visible from the task. It is visible from the task if it is a local task
   * variable or declared in a parent scope of the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskVariableBinary$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskVariableBinary$Plain(params: {

    /**
     * The id of the task to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<Blob> {

    return this.getTaskVariableBinary$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation setBinaryTaskVariable
   */
  static readonly SetBinaryTaskVariablePath = '/task/{id}/variables/{varName}/data';

  /**
   * Sets the serialized value for a binary variable or the binary value for a file variable visible from the
   * task. A variable is visible from the task if it is a local task variable or declared in a parent scope of
   * the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setBinaryTaskVariable()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  setBinaryTaskVariable$Response(params: {

    /**
     * The id of the task to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;

    /**
     * For binary variables a multipart form submit with the following parts:
     */
    body?: CamundaMultiFormVariableBinaryDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskVariableService.SetBinaryTaskVariablePath, 'post');
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
   * Sets the serialized value for a binary variable or the binary value for a file variable visible from the
   * task. A variable is visible from the task if it is a local task variable or declared in a parent scope of
   * the task. See documentation on
   * [visiblity of variables](https://docs.camunda.org/manual/7.14/user-guide/process-engine/variables/).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setBinaryTaskVariable$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  setBinaryTaskVariable(params: {

    /**
     * The id of the task to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;

    /**
     * For binary variables a multipart form submit with the following parts:
     */
    body?: CamundaMultiFormVariableBinaryDto
  }): Observable<void> {

    return this.setBinaryTaskVariable$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
