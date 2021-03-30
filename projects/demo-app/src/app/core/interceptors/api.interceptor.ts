import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { ErrorHandlerService, ApplicationConfigurationService } from '@test-app/core/services';
import { NextRequestState } from './next-request-state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@test-app/env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private nextRequestState: NextRequestState,
    private errorHandler: ErrorHandlerService,
    private appConfig: ApplicationConfigurationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {



    if (!request.url.includes(this.appConfig.camundaTasksConfig.rootUrl)) {
      // This is not a request to the API! proceed as is

      return next.handle(request);
    }



    const ignoreError = this.nextRequestState.ignoreNextError;
    // ... but immediately clear the flag, as it is only for the next request (which is this one)
    this.nextRequestState.ignoreNextError = false;

    request = this.nextRequestState.apply(request);

    // Also handle errors globally
    return next.handle(request).pipe(
      tap(x => {

        if (x instanceof HttpResponse) {
          this.nextRequestState.finish(request);
        }
        return x;
      }, err => {
          this.nextRequestState.finish(request);

          if (!ignoreError) {
          this.errorHandler.handleHttpError(err);
          }
      })
    );


    return next.handle(request);
  }
}
