import { Injectable } from '@angular/core';
import { CamundaFormsConfiguration } from '../camunda-forms-configuration';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RequestBuilder } from '../utils/request-builder';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../utils/strict-http-response';

@Injectable({
  providedIn: 'root'
})
export class FormioApiService {

  constructor(
    protected config: CamundaFormsConfiguration,
    protected http: HttpClient
  ) { }


  getFormDefinition(formId: string): Observable<any> {

    const rb = new RequestBuilder(this.config.formioRootUrl, '/form/' + formId, 'get');
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r.body as StrictHttpResponse<any>;
      })
    );
  }

  public findComponentByKey(arr, itemKey): any {

    // if empty array then return
    if (arr.length == 0) return

    return arr.reduce((a, component) => {
      //console.log(a);

      if (a) return a;
      if (component.key === itemKey) return component;

      const hasColumns = component.columns && Array.isArray(component.columns);
      const hasRows = component.rows && Array.isArray(component.rows);
      const hasComps = component.components && Array.isArray(component.components);

      if (hasColumns) {
        return this.findComponentByKey(component.columns, itemKey);
      }
      if (hasRows) {
        return this.findComponentByKey(component.rows, itemKey);
      }
      if (hasComps) {
        return this.findComponentByKey(component.components, itemKey);
      }

    }, null);

  }




}
