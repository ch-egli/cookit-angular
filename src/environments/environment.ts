import { SBB_SSO_IDP_HINT_AZURE_AD, SBB_SSO_INT_ISSUER_URL } from '@sbb-esta/angular-core/oauth';
import { AuthConfig } from 'angular-oauth2-oidc';

import { Environment } from './environment.model';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// See https://confluence.sbb.ch/display/CLEW/sso.sbb.ch
const defaultAuthConfig: AuthConfig = {
  issuer: SBB_SSO_INT_ISSUER_URL,
  // The ClientId you created in the Client tab in am-ssp
  clientId: 'your-client-from-am-ssp',
  redirectUri: location.origin,
  responseType: 'code',
  scope: 'openid profile email sbbuid_ad offline_access',
  // The hint will ensure your clients will directly use the AzureAD identity provider.
  // Remove the line to enable the client to select from all available identity providers.
  customQueryParams: SBB_SSO_IDP_HINT_AZURE_AD,
  disableAtHashCheck: true,
  postLogoutRedirectUri: location.origin,
};

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: location.origin,
  silentRefreshRedirectUri: location.origin + '/silent-refresh.html',
  clientId: '288131662449-77rbf5afprn0u7nugord6k8hr7p63tjm.apps.googleusercontent.com',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid profile email',

  showDebugInformation: true,
  sessionChecksEnabled: true
};

export const environment: Environment = {
  production: false,
  authConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
