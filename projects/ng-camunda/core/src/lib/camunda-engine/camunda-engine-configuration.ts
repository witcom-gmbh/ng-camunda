/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class CamundaEngineConfiguration {
  rootUrl: string = 'http://localhost:8080/engine-rest';
}

/**
 * Parameters for `CamundaEngine.forRoot()`
 */
export interface CamundaEngineConfigurationParams {
  rootUrl?: string;
}
