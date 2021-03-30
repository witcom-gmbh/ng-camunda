import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import{ApplicationConfigurationService} from'@demo-app/core/services';

export function initializeKeycloak(keycloak: KeycloakService,configService:ApplicationConfigurationService) {
  return () =>
    keycloak.init({
      config: configService.keycloakConfig,
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      }
    });
}
