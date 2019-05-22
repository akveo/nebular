/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAuthOAuth2Token, NbAuthTokenClass } from '../../services/token/token';
import { NbAuthStrategyOptions } from '../auth-strategy-options';

export enum NbOAuth2ResponseType {
  CODE = 'code',
  TOKEN = 'token',
}

// TODO: client_credentials
export enum NbOAuth2GrantType {
  AUTHORIZATION_CODE = 'authorization_code',
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token',
}

export enum NbOAuth2ClientAuthMethod {
  NONE = 'none',
  BASIC = 'basic',
  REQUEST_BODY = 'request-body',
}

export class NbOAuth2AuthStrategyOptions extends NbAuthStrategyOptions {
  baseEndpoint?: string = '';
  clientId: string = '';
  clientSecret?: string = '';
  clientAuthMethod?: string = NbOAuth2ClientAuthMethod.NONE;
  redirect?: { success?: string; failure?: string } = {
    success: '/',
    failure: null,
  };
  defaultErrors?: any[] = ['Something went wrong, please try again.'];
  defaultMessages?: any[] = ['You have been successfully authenticated.'];
  authorize?: {
    endpoint?: string;
    redirectUri?: string;
    responseType?: string;
    requireValidToken?: boolean; // used only with NbOAuth2ResponseType.TOKEN
    scope?: string;
    state?: string;
    params?: { [key: string]: string };
  } = {
    endpoint: 'authorize',
    responseType: NbOAuth2ResponseType.CODE,
  };
  token?: {
    endpoint?: string;
    grantType?: string;
    redirectUri?: string;
    scope?: string; // Used only with 'password' grantType
    requireValidToken?: boolean;
    class: NbAuthTokenClass,
  } = {
    endpoint: 'token',
    grantType: NbOAuth2GrantType.AUTHORIZATION_CODE,
    requireValidToken: false,
    class: NbAuthOAuth2Token,
  };
  refresh?: {
    endpoint?: string;
    grantType?: string;
    scope?: string;
    requireValidToken?: boolean;
  } = {
    endpoint: 'token',
    grantType: NbOAuth2GrantType.REFRESH_TOKEN,
  };
}

export const auth2StrategyOptions: NbOAuth2AuthStrategyOptions = new NbOAuth2AuthStrategyOptions();
