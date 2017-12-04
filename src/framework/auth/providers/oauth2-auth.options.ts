/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

// TODO postfix to options
export interface NbBaseConfig {
  method?: string,
  redirect?: {
    success?: string | null;
    failure?: string | null;
  };
}

export interface Data {
  key?: string,
  value?: string
}

// TODO postfix to options
export interface NbOAuth2ProviderConfig {
  login?: boolean | NbBaseConfig;
  register?: boolean | NbBaseConfig;
  requestPass?: boolean | NbBaseConfig;
  resetPass?: boolean | NbBaseConfig;
  logout?: boolean | NbBaseConfig;
  oAuthTokenRequestBase?: {
    handler?: Function | null,
    client?: {
      id?: string,
      secret?: string,
      idParamName?: string,
      secretParamName?: string,
    },
    auth?: {
      tokenHost?: string,
      tokenPath?: string,
    },
    http?: {
      headers?: Data[] | null,
    },
    body?: {
      format?: string,
      data?: Data[],
    },
    options?: {
      useBodyAuth?: boolean,
      useBasicAuthorizationHeader?: boolean,
      usernameParamName?: string,
      passwordParamName?: string,
    },
  },
}
