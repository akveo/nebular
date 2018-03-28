/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export interface NbOAuth2AuthOptions {
  baseEndpoint?: string;
  clientId: string,
  clientSecret: string,
  redirect?: {
    success?: string | null;
    failure?: string | null;
  };
  defaultErrors?: any[];
  defaultMessages?: any[];
  authorize?: {
    endpoint?: string;
    redirectUri?: string;
    responseType?: string;
    scope?: string;
    state?: string;
    params?: { [key: string]: string };
  };
  token?: {
    endpoint?: string;
    grantType?: string;
    redirectUri?: string;
  };
}
