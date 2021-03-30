/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class CamundaFormsConfiguration {
  formioRootUrl: string = 'http://localhost:18080/forms';
  formPrefix:string="formio:";
}

/**
 * Parameters for `CoreModule.forRoot()`
 */
export interface CamundaFormsConfigurationParams {
  formioRootUrl?: string;
  formPrefix?:string;
}
