import {ApplicationConfigurationService} from '@demo-app/core/services';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { AlertService } from '@full-fledged/alerts';

export function ApplicationConfigProvider(
  config: ApplicationConfigurationService,
  alertService: AlertService,
  configDeps: (() => Function)[]
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
        config.loadAppConfig().then(data =>{
          return Promise.all(configDeps.map(dep => dep()));
        })
        .then(() => {
          // Once configuration dependencies are resolved, then resolve factory
          resolve(null);
        })
        .catch((data) => {
console.log(data);

          alertService.danger("Applikation konnte nicht initialisiert werden !!");
          resolve(data);
        });
    });
  };
}

