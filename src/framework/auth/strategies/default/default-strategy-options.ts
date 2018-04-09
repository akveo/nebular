import { NbAuthSimpleToken } from '../../services';
import { NbAuthStrategyOptions } from '../strategy-options';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export interface NbDefaultStrategyModule {
  alwaysFail?: boolean;
  rememberMe?: boolean;
  endpoint?: string;
  method?: string;
  redirect?: {
    success?: string | null;
    failure?: string | null;
  };
  defaultErrors?: string[];
  defaultMessages?: string[];
}

export interface NbDefaultStrategyReset extends NbDefaultStrategyModule {
  resetPasswordTokenKey?: string;
}

export class NbDefaultAuthStrategyOptions extends NbAuthStrategyOptions {
  name: 'email';
  baseEndpoint?: string = '/api/auth/';
  login?: boolean | NbDefaultStrategyModule = {
    alwaysFail: false,
    rememberMe: true, // TODO: what does that mean?
    endpoint: 'login',
    method: 'post',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Login/Email combination is not correct, please try again.'],
    defaultMessages: ['You have been successfully logged in.'],
  };
  register?: boolean | NbDefaultStrategyModule = {
    alwaysFail: false,
    rememberMe: true,
    endpoint: 'register',
    method: 'post',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully registered.'],
  };
  requestPass?: boolean | NbDefaultStrategyModule = {
    endpoint: 'request-pass',
    method: 'post',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Reset password instructions have been sent to your email.'],
  };
  resetPass?: boolean | NbDefaultStrategyReset = {
    endpoint: 'reset-pass',
    method: 'put',
    redirect: {
      success: '/',
      failure: null,
    },
    resetPasswordTokenKey: 'reset_password_token',
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Your password has been successfully changed.'],
  };
  logout?: boolean | NbDefaultStrategyReset = {
    alwaysFail: false,
    endpoint: 'logout',
    method: 'delete',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully logged out.'],
  };
  token = {
    key: 'data.token',
    getter: (module: string, res: HttpResponse<Object>, options: any) => getDeepFromObject(res.body, options.token.key),
    class: NbAuthSimpleToken,
  };
  errors? = {
    key: 'data.errors',
    getter: (module: string, res: HttpErrorResponse, options: any) => getDeepFromObject(res.error,
      options.errors.key,
      options[module].defaultErrors,
    ),
  };
  messages? = {
    key: 'data.messages',
    getter: (module: string, res: HttpResponse<Object>, options: any) => getDeepFromObject(res.body,
      options.messages.key,
      options[module].defaultMessages,
    ),
  };
  validation?: {
    password?: {
      required?: boolean;
      minLength?: number | null;
      maxLength?: number | null;
      regexp?: string | null;
    };
    email?: {
      required?: boolean;
      regexp?: string | null;
    };
    fullName?: {
      required?: boolean;
      minLength?: number | null;
      maxLength?: number | null;
      regexp?: string | null;
    };
  };
}

export const defaultOptions: NbDefaultAuthStrategyOptions = new NbDefaultAuthStrategyOptions();
