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
export class CamundaTaskLocalVariableService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTaskLocalVariables
   */
  static readonly GetTaskLocalVariablesPath = '/task/{id}/localVariables';

  /**
   * Retrieves all variables of a given task by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskLocalVariables()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskLocalVariables$Response(params: {

    /**
     * The id of the task to retrieve the variables from.
     */
    id: string;

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
     * **Note:** While &#x60;true&#x60; is the default value for reasons of backward compatibility, we recommend setting this
     * parameter to &#x60;false&#x60; when developing web applications that are independent of the Java process
     * applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskLocalVariableService.GetTaskLocalVariablesPath, 'get');
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
   * Retrieves all variables of a given task by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskLocalVariables$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskLocalVariables(params: {

    /**
     * The id of the task to retrieve the variables from.
     */
    id: string;

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
     * **Note:** While &#x60;true&#x60; is the default value for reasons of backward compatibility, we recommend setting this
     * parameter to &#x60;false&#x60; when developing web applications that are independent of the Java process
     * applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<{ [key: string]: CamundaVariableValueDto }> {

    return this.getTaskLocalVariables$Response(params).pipe(
      map((r: StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>) => r.body as { [key: string]: CamundaVariableValueDto })
    );
  }

  /**
   * Path part for operation modifyTaskLocalVariables
   */
  static readonly ModifyTaskLocalVariablesPath = '/task/{id}/localVariables';

  /**
   * Updates or deletes the variables in the context of a task. Updates precede deletions. So, if a variable is
   * updated AND deleted, the deletion overrides the update.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `modifyTaskLocalVariables()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifyTaskLocalVariables$Response(params: {

    /**
     * The id of the task to set variables for.
     */
    id: string;
    body?: CamundaPatchVariablesDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskLocalVariableService.ModifyTaskLocalVariablesPath, 'post');
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
   * Updates or deletes the variables in the context of a task. Updates precede deletions. So, if a variable is
   * updated AND deleted, the deletion overrides the update.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `modifyTaskLocalVariables$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  modifyTaskLocalVariables(params: {

    /**
     * The id of the task to set variables for.
     */
    id: string;
    body?: CamundaPatchVariablesDto
  }): Observable<void> {

    return this.modifyTaskLocalVariables$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getTaskLocalVariable
   */
  static readonly GetTaskLocalVariablePath = '/task/{id}/localVariables/{varName}';

  /**
   * Retrieves a variable from the context of a given task by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskLocalVariable()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskLocalVariable$Response(params: {

    /**
     * The id of the task to retrieve the variable from.
     */
    id: string;

    /**
     * The name of the variable to get
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

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskLocalVariableService.GetTaskLocalVariablePath, 'get');
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
   * Retrieves a variable from the context of a given task by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskLocalVariable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskLocalVariable(params: {

    /**
     * The id of the task to retrieve the variable from.
     */
    id: string;

    /**
     * The name of the variable to get
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

    return this.getTaskLocalVariable$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaVariableValueDto>) => r.body as CamundaVariableValueDto)
    );
  }

  /**
   * Path part for operation putTaskLocalVariable
   */
  static readonly PutTaskLocalVariablePath = '/task/{id}/localVariables/{varName}';

  /**
   * Sets a variable in the context of a given task.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putTaskLocalVariable()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putTaskLocalVariable$Response(params: {

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

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskLocalVariableService.PutTaskLocalVariablePath, 'put');
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
   * Sets a variable in the context of a given task.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putTaskLocalVariable$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putTaskLocalVariable(params: {

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

    return this.putTaskLocalVariable$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteTaskLocalVariable
   */
  static readonly DeleteTaskLocalVariablePath = '/task/{id}/localVariables/{varName}';

  /**
   * Removes a local variable from a task by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTaskLocalVariable()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTaskLocalVariable$Response(params: {

    /**
     * The id of the task to delete the variable from.
     */
    id: string;

    /**
     * The name of the variable to be removed.
     */
    varName: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskLocalVariableService.DeleteTaskLocalVariablePath, 'delete');
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
   * Removes a local variable from a task by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTaskLocalVariable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTaskLocalVariable(params: {

    /**
     * The id of the task to delete the variable from.
     */
    id: string;

    /**
     * The name of the variable to be removed.
     */
    varName: string;
  }): Observable<void> {

    return this.deleteTaskLocalVariable$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getTaskLocalVariableBinary
   */
  static readonly GetTaskLocalVariableBinaryPath = '/task/{id}/localVariables/{varName}/data';

  /**
   * Retrieves a binary variable from the context of a given task by id. Applicable for byte array and file
   * variables.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskLocalVariableBinary$Any()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskLocalVariableBinary$Any$Response(params: {

    /**
     * The id of the task to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskLocalVariableService.GetTaskLocalVariableBinaryPath, 'get');
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
   * Retrieves a binary variable from the context of a given task by id. Applicable for byte array and file
   * variables.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskLocalVariableBinary$Any$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskLocalVariableBinary$Any(params: {

    /**
     * The id of the task to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<Blob> {

    return this.getTaskLocalVariableBinary$Any$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Retrieves a binary variable from the context of a given task by id. Applicable for byte array and file
   * variables.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskLocalVariableBinary$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskLocalVariableBinary$Plain$Response(params: {

    /**
     * The id of the task to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskLocalVariableService.GetTaskLocalVariableBinaryPath, 'get');
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
   * Retrieves a binary variable from the context of a given task by id. Applicable for byte array and file
   * variables.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskLocalVariableBinary$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskLocalVariableBinary$Plain(params: {

    /**
     * The id of the task to retrieve the variable for.
     */
    id: string;

    /**
     * The name of the variable to retrieve.
     */
    varName: string;
  }): Observable<Blob> {

    return this.getTaskLocalVariableBinary$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation setBinaryTaskLocalVariable
   */
  static readonly SetBinaryTaskLocalVariablePath = '/task/{id}/localVariables/{varName}/data';

  /**
   * Sets the serialized value for a binary variable or the binary value for a file variable.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setBinaryTaskLocalVariable()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  setBinaryTaskLocalVariable$Response(params: {

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

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskLocalVariableService.SetBinaryTaskLocalVariablePath, 'post');
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
   * To access the full response (for headers, for example), `setBinaryTaskLocalVariable$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  setBinaryTaskLocalVariable(params: {

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

    return this.setBinaryTaskLocalVariable$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
