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

import { CommentDto } from '../models/comment-dto';

@Injectable({
  providedIn: 'root',
})
export class TaskCommentService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getComments
   */
  static readonly GetCommentsPath = '/task/{id}/comment';

  /**
   * Gets the comments for a task by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComments$Response(params: {

    /**
     * The id of the task to retrieve the comments for.
     */
    id: string;
  }): Observable<StrictHttpResponse<Array<CommentDto>>> {

    const rb = new RequestBuilder(this.rootUrl, TaskCommentService.GetCommentsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CommentDto>>;
      })
    );
  }

  /**
   * Gets the comments for a task by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComments(params: {

    /**
     * The id of the task to retrieve the comments for.
     */
    id: string;
  }): Observable<Array<CommentDto>> {

    return this.getComments$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CommentDto>>) => r.body as Array<CommentDto>)
    );
  }

  /**
   * Path part for operation createComment
   */
  static readonly CreateCommentPath = '/task/{id}/comment/create';

  /**
   * Creates a comment for a task by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComment$Response(params: {

    /**
     * The id of the task to add the comment to.
     */
    id: string;

    /**
     * **Note:** Only the `message` property will be used. Every other property passed to this endpoint will be ignored.
     */
    body?: CommentDto
  }): Observable<StrictHttpResponse<CommentDto>> {

    const rb = new RequestBuilder(this.rootUrl, TaskCommentService.CreateCommentPath, 'post');
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
        return r as StrictHttpResponse<CommentDto>;
      })
    );
  }

  /**
   * Creates a comment for a task by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComment(params: {

    /**
     * The id of the task to add the comment to.
     */
    id: string;

    /**
     * **Note:** Only the `message` property will be used. Every other property passed to this endpoint will be ignored.
     */
    body?: CommentDto
  }): Observable<CommentDto> {

    return this.createComment$Response(params).pipe(
      map((r: StrictHttpResponse<CommentDto>) => r.body as CommentDto)
    );
  }

  /**
   * Path part for operation getComment
   */
  static readonly GetCommentPath = '/task/{id}/comment/{commentId}';

  /**
   * Retrieves a task comment by task id and comment id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComment()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComment$Response(params: {

    /**
     * The id of the task.
     */
    id: string;

    /**
     * The id of the comment to be retrieved.
     */
    commentId: string;
  }): Observable<StrictHttpResponse<CommentDto>> {

    const rb = new RequestBuilder(this.rootUrl, TaskCommentService.GetCommentPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('commentId', params.commentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommentDto>;
      })
    );
  }

  /**
   * Retrieves a task comment by task id and comment id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComment(params: {

    /**
     * The id of the task.
     */
    id: string;

    /**
     * The id of the comment to be retrieved.
     */
    commentId: string;
  }): Observable<CommentDto> {

    return this.getComment$Response(params).pipe(
      map((r: StrictHttpResponse<CommentDto>) => r.body as CommentDto)
    );
  }

}
