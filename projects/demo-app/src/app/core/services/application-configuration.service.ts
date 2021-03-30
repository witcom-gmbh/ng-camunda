import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import t from 'typy';
import {  NgxLoggerLevel, LoggerConfig } from 'ngx-logger';
import { CamundaEngineConfigurationParams,CamundaFormsConfigurationParams } from '@ng-camunda/core';
import { KeycloakConfig } from 'keycloak-js';


@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigurationService {

  private _config: any = {};

  constructor(private http: HttpClient) { }

  get data(): any {
    return this._config ? { ...this._config } : {};
  }

  get logConfig():LoggerConfig{

    let logger=new LoggerConfig();
    logger.level = this._config["logLevel"] || 1;
    logger.serverLogLevel = this._config["serverLogLevel"] || 1;
    logger.serverLoggingUrl="";
    logger.disableConsoleLogging=false;
    logger.httpResponseType="json";

    return logger;

  }

  get camundaEngineConfig():CamundaEngineConfigurationParams{

    let camundaTasksConfig:CamundaEngineConfigurationParams = {
        rootUrl: this._config["camundaRootUrl"]
    }
    return camundaTasksConfig;
  }

  get camundaFormsConfig():CamundaFormsConfigurationParams{
    let camundaTasksConfig:CamundaFormsConfigurationParams = {
        formioRootUrl: this._config["formioRootUrl"]
    }
    return camundaTasksConfig;
  }



  get keycloakConfig():any{
    let keycloakConfig: KeycloakConfig = {
      url: this._config["keycloakUrl"],
      realm: this._config["keycloakRealm"],
      clientId: this._config["keycloakClientId"]
    };

    return keycloakConfig;
  }

  loadAppConfig() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');


    return this.http.get(`/assets/configdata/appconfig.json?cb=${new Date().getTime()}`, { headers }).toPromise()
      .then(data => {
        //console.log(data);
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            this._config[key.replace('APP_', '').toLowerCase().split('_').map((el, i) => (i > 0 ? el.charAt(0).toUpperCase() + el.slice(1) : el)).join('')] = data[key];
          }
        }
        //console.log(this._config);
        return this._config;

        //this._config = data;
    })
    .catch((data) => {
      console.log("Error loading application config: ",data );

    });


  }

}
