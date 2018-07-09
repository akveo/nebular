/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAuthOAuth2Token, NbAuthTokenClass } from '../../services';

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

export class NbOAuth2AuthStrategyOptions {
  name: string;
  baseEndpoint?: string = '';
  clientId: string = '';
  clientSecret: string = '';
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
    class: NbAuthTokenClass,
  } = {
    endpoint: 'token',
    grantType: NbOAuth2GrantType.AUTHORIZATION_CODE,
    class: NbAuthOAuth2Token,
  };
  refresh?: {
    endpoint?: string;
    grantType?: string;
    scope?: string;
  } = {
    endpoint: 'token',
    grantType: NbOAuth2GrantType.REFRESH_TOKEN,
  };
}

export const auth2StrategyOptions: NbOAuth2AuthStrategyOptions = new NbOAuth2AuthStrategyOptions();
