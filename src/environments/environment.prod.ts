import { SBB_SSO_IDP_HINT_AZURE_AD, SBB_SSO_ISSUER_URL } from '@sbb-esta/angular-core/oauth';
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

// See https://confluence.sbb.ch/display/CLEW/sso.sbb.ch
const authConfig: AuthConfig = {
  issuer: SBB_SSO_ISSUER_URL,
  // The ClientId you created in the Client tab in am-ssp
  clientId: 'your-client-from-am-ssp',
  redirectUri: location.origin,
  responseType: 'code',
  // Add offline_access scope, after RedHat SSO 7.3 has been rolled out:
  // https://confluence.sbb.ch/pages/viewrecentblogposts.action?key=IAM
  scope: 'openid profile email sbbuid_ad',
  // The hint will ensure your clients will directly use the AzureAD identity provider.
  // Remove the line to enable the client to select from all available identity providers.
  customQueryParams: SBB_SSO_IDP_HINT_AZURE_AD,
  disableAtHashCheck: true,
  postLogoutRedirectUri: location.origin,
};

export const environment: Environment = {
  production: process.env.PRODUCTION !== 'false',
  authConfig,
};
