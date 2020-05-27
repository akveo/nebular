/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAuthStrategyOptions } from '../../../auth/strategies/auth-strategy-options';
import { NbPasswordStrategyMessage } from '../../../auth/strategies/password/password-strategy-options';
import { getDeepFromObject } from '../../../auth/helpers';
import {
  NbFirebasePasswordStrategyModule,
  NbFirebasePasswordStrategyOptions,
} from '../password/firebase-password-strategy.options';


export class NbFirebaseGoogleStrategyOptions extends NbAuthStrategyOptions {
  login?: boolean | NbFirebasePasswordStrategyModule = {
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Login/Email combination is not correct, please try again.'],
    defaultMessages: ['You have been successfully logged in.'],
  };
  errors?: NbPasswordStrategyMessage = {
    key: 'message',
    getter: (module: string, res, options: NbFirebasePasswordStrategyOptions) => getDeepFromObject(
      res,
      options.errors.key,
      options[module].defaultErrors,
    ),
  };
  messages?: NbPasswordStrategyMessage = {
    key: 'messages',
    getter: (module: string, res, options: NbFirebasePasswordStrategyOptions) => getDeepFromObject(
      res.body,
      options.messages.key,
      options[module].defaultMessages,
    ),
  };
}

export const firebaseGoolgeStrategyOptions: NbFirebaseGoogleStrategyOptions = new NbFirebaseGoogleStrategyOptions();
