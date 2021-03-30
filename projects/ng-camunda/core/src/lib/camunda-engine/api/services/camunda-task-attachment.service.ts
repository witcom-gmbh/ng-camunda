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

import { CamundaAttachmentDto } from '../models/camunda-attachment-dto';
import { CamundaMultiFormAttachmentDto } from '../models/camunda-multi-form-attachment-dto';

@Injectable({
  providedIn: 'root',
})
export class CamundaTaskAttachmentService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAttachments
   */
  static readonly GetAttachmentsPath = '/task/{id}/attachment';

  /**
   * Gets the attachments for a task.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAttachments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAttachments$Response(params: {

    /**
     * The id of the task to retrieve the attachments for.
     */
    id: string;
  }): Observable<StrictHttpResponse<Array<CamundaAttachmentDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskAttachmentService.GetAttachmentsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CamundaAttachmentDto>>;
      })
    );
  }

  /**
   * Gets the attachments for a task.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAttachments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAttachments(params: {

    /**
     * The id of the task to retrieve the attachments for.
     */
    id: string;
  }): Observable<Array<CamundaAttachmentDto>> {

    return this.getAttachments$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CamundaAttachmentDto>>) => r.body as Array<CamundaAttachmentDto>)
    );
  }

  /**
   * Path part for operation addAttachment
   */
  static readonly AddAttachmentPath = '/task/{id}/attachment/create';

  /**
   * Creates an attachment for a task.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAttachment()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  addAttachment$Response(params: {

    /**
     * The id of the task to add the attachment to.
     */
    id: string;
    body?: CamundaMultiFormAttachmentDto
  }): Observable<StrictHttpResponse<CamundaAttachmentDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskAttachmentService.AddAttachmentPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaAttachmentDto>;
      })
    );
  }

  /**
   * Creates an attachment for a task.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAttachment$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  addAttachment(params: {

    /**
     * The id of the task to add the attachment to.
     */
    id: string;
    body?: CamundaMultiFormAttachmentDto
  }): Observable<CamundaAttachmentDto> {

    return this.addAttachment$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaAttachmentDto>) => r.body as CamundaAttachmentDto)
    );
  }

  /**
   * Path part for operation getAttachment
   */
  static readonly GetAttachmentPath = '/task/{id}/attachment/{attachmentId}';

  /**
   * Retrieves a task attachment by task id and attachment id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAttachment()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAttachment$Response(params: {

    /**
     * The id of the task.
     */
    id: string;

    /**
     * The id of the attachment to be retrieved.
     */
    attachmentId: string;
  }): Observable<StrictHttpResponse<CamundaAttachmentDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskAttachmentService.GetAttachmentPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('attachmentId', params.attachmentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaAttachmentDto>;
      })
    );
  }

  /**
   * Retrieves a task attachment by task id and attachment id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAttachment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAttachment(params: {

    /**
     * The id of the task.
     */
    id: string;

    /**
     * The id of the attachment to be retrieved.
     */
    attachmentId: string;
  }): Observable<CamundaAttachmentDto> {

    return this.getAttachment$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaAttachmentDto>) => r.body as CamundaAttachmentDto)
    );
  }

  /**
   * Path part for operation deleteAttachment
   */
  static readonly DeleteAttachmentPath = '/task/{id}/attachment/{attachmentId}';

  /**
   * Removes an attachment from a task by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAttachment()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAttachment$Response(params: {

    /**
     * The id of the task.
     */
    id: string;

    /**
     * The id of the attachment to be removed.
     */
    attachmentId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskAttachmentService.DeleteAttachmentPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('attachmentId', params.attachmentId, {});
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
   * Removes an attachment from a task by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAttachment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAttachment(params: {

    /**
     * The id of the task.
     */
    id: string;

    /**
     * The id of the attachment to be removed.
     */
    attachmentId: string;
  }): Observable<void> {

    return this.deleteAttachment$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAttachmentData
   */
  static readonly GetAttachmentDataPath = '/task/{id}/attachment/{attachmentId}/data';

  /**
   * Retrieves the binary content of a task attachment by task id and attachment id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAttachmentData$Any()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAttachmentData$Any$Response(params: {

    /**
     * The id of the task.
     */
    id: string;

    /**
     * The id of the attachment to be retrieved.
     */
    attachmentId: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskAttachmentService.GetAttachmentDataPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('attachmentId', params.attachmentId, {});
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
   * Retrieves the binary content of a task attachment by task id and attachment id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAttachmentData$Any$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAttachmentData$Any(params: {

    /**
     * The id of the task.
     */
    id: string;

    /**
     * The id of the attachment to be retrieved.
     */
    attachmentId: string;
  }): Observable<Blob> {

    return this.getAttachmentData$Any$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Retrieves the binary content of a task attachment by task id and attachment id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAttachmentData$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAttachmentData$Plain$Response(params: {

    /**
     * The id of the task.
     */
    id: string;

    /**
     * The id of the attachment to be retrieved.
     */
    attachmentId: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskAttachmentService.GetAttachmentDataPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('attachmentId', params.attachmentId, {});
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
   * Retrieves the binary content of a task attachment by task id and attachment id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAttachmentData$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAttachmentData$Plain(params: {

    /**
     * The id of the task.
     */
    id: string;

    /**
     * The id of the attachment to be retrieved.
     */
    attachmentId: string;
  }): Observable<Blob> {

    return this.getAttachmentData$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
