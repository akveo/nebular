/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  NbPasswordStrategyMessage,
  NbPasswordStrategyModule,
  NbAuthJWTToken,
  NbAuthStrategyOptions,
  NbStrategyToken,
} from '@nebular/auth';

export class NbFirebaseIdentityProviderStrategyOptions extends NbAuthStrategyOptions {
  token?: NbStrategyToken = {
    class: NbAuthJWTToken,
  };
  logout?: boolean | NbPasswordStrategyModule = {
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully logged out.'],
  };
  authenticate?: boolean | NbPasswordStrategyModule = {
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully authenticated.'],
  };
  errors?: NbPasswordStrategyMessage = {
    key: 'message',
    getter: (module: string, res, options: NbFirebaseIdentityProviderStrategyOptions) => options[module].defaultErrors,
  };
  messages?: NbPasswordStrategyMessage = {
    key: 'message',
    getter: (module: string, res, options: NbFirebaseIdentityProviderStrategyOptions) => {
      return options[module].defaultMessages;
    },
  };
  scopes?: string[] = [];
  customParameters?: { [key: string]: string } = {};
}
