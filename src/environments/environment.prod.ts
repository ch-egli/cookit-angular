import { AuthConfig } from 'angular-oauth2-oidc';
import 'angular-server-side-configuration/process';

import { Environment } from './environment.model';

/**
 * How to use angular-server-side-configuration:
 *
 * Use process.env.NAME_OF_YOUR_ENVIRONMENT_VARIABLE
 *
 * export const environment = {
 *   stringValue: process.env.STRING_VALUE,
 *   stringValueWithDefault: process.env.STRING_VALUE || 'defaultValue',
 *   numberValue: Number(process.env.NUMBER_VALUE),
 *   numberValueWithDefault: Number(process.env.NUMBER_VALUE || 10),
 *   booleanValue: Boolean(process.env.BOOLEAN_VALUE),
 *   booleanValueInverted: process.env.BOOLEAN_VALUE_INVERTED !== 'false',
 * };
 */

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
  production: process.env.PRODUCTION !== 'false',
  authConfig,
};
