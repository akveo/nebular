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
  redirect?: { success?: string; failure?: string } = {
    success: '/',
    failure: null,
  };
  errors?: NbPasswordStrategyMessage = {
    key: 'message',
    getter: (module: string, res, options: NbFirebaseGoogleStrategyOptions) => getDeepFromObject(
      res,
      options.errors.key,
      options.defaultErrors,
    ),
  };
  scopes?: string[] = [];
  customParameters?: { [key: string]: string } = {};
  defaultErrors?: any[] = ['Something went wrong, please try again.'];
  defaultMessages?: any[] = ['You have been successfully authenticated.'];
}

export const firebaseGoolgeStrategyOptions: NbFirebaseGoogleStrategyOptions = new NbFirebaseGoogleStrategyOptions();
