/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { NbAuthResult } from '../../services/auth-result';
import { NbAuthStrategy } from '../auth-strategy';
import { NbAuthStrategyClass } from '../../auth.options';
import { NbPasswordAuthStrategyOptions, passwordStrategyOptions } from './password-strategy-options';
import { InvalidJWTTokenError } from '@nebular/auth';

/**
 * The most common authentication provider for email/password strategy.
 *
 * Strategy settings. Note, there is no need to copy over the whole object to change the settings you need.
 * Also, this.getOption call won't work outside of the default options declaration
 * (which is inside of the `NbPasswordAuthStrategy` class), so you have to replace it with a custom helper function
 * if you need it.
 *
 * ```ts
 *export class NbPasswordAuthStrategyOptions extends NbAuthStrategyOptions {
 *  name: string;
 *  baseEndpoint? = '/api/auth/';
 *  login?: boolean | NbPasswordStrategyModule = {
 *    alwaysFail: false,
 *    endpoint: 'login',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Login/Email combination is not correct, please try again.'],
 *    defaultMessages: ['You have been successfully logged in.'],
 *  };
 *  register?: boolean | NbPasswordStrategyModule = {
 *    alwaysFail: false,
 *    rememberMe: true,
 *    endpoint: 'register',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['You have been successfully registered.'],
 *  };
 *  requestPass?: boolean | NbPasswordStrategyModule = {
 *    endpoint: 'request-pass',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Reset password instructions have been sent to your email.'],
 *  };
 *  resetPass?: boolean | NbPasswordStrategyReset = {
 *    endpoint: 'reset-pass',
 *    method: 'put',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    resetPasswordTokenKey: 'reset_password_token',
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Your password has been successfully changed.'],
 *  };
 *  logout?: boolean | NbPasswordStrategyReset = {
 *    alwaysFail: false,
 *    endpoint: 'logout',
 *    method: 'delete',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['You have been successfully logged out.'],
 *  };
 *  refreshToken?: boolean | NbPasswordStrategyModule = {
 *    endpoint: 'refresh-token',
 *    method: 'post',
 *    redirect: {
 *      success: null,
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Your token has been successfully refreshed.'],
 *  };
 *  token?: NbPasswordStrategyToken = {
 *    class: NbAuthSimpleToken,
 *    key: 'data.token',
 *    getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
 *      res.body,
 *      options.token.key,
 *    ),
 *  };
 *  errors?: NbPasswordStrategyMessage = {
 *    key: 'data.errors',
 *    getter: (module: string, res: HttpErrorResponse, options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
 *      res.error,
 *      options.errors.key,
 *      options[module].defaultErrors,
 *    ),
 *  };
 *  messages?: NbPasswordStrategyMessage = {
 *    key: 'data.messages',
 *    getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
 *      res.body,
 *      options.messages.key,
 *      options[module].defaultMessages,
 *    ),
 *  };
 *  validation?: {
 *    password?: {
 *      required?: boolean;
 *      minLength?: number | null;
 *      maxLength?: number | null;
 *      regexp?: string | null;
 *    };
 *    email?: {
 *      required?: boolean;
 *      regexp?: string | null;
 *    };
 *    fullName?: {
 *      required?: boolean;
 *      minLength?: number | null;
 *      maxLength?: number | null;
 *      regexp?: string | null;
 *    };
 *  };
 *}
 * ```
 */
@Injectable()
export class NbPasswordAuthStrategy extends NbAuthStrategy {

  protected defaultOptions: NbPasswordAuthStrategyOptions = passwordStrategyOptions;

  static setup(options: NbPasswordAuthStrategyOptions): [NbAuthStrategyClass, NbPasswordAuthStrategyOptions] {
    return [NbPasswordAuthStrategy, options];
  }

  constructor(protected http: HttpClient, private route: ActivatedRoute) {
    super();
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    const method = this.getOption('login.method');
    const url = this.getActionEndpoint('login');
    return this.http.request(method, url, {body: data, observe: 'response'})
      .pipe(
        map((res) => {
          if (this.getOption('login.alwaysFail')) {
            throw this.createFailResponse(data);
          }
          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('login.redirect.success'),
            [],
            this.getOption('messages.getter')('login', res, this.options),
            this.createToken(this.getOption('token.getter')('login', res, this.options)));
        }),
        catchError((res) => {
          return this.handleResponseError(res, 'login');
        }),
      );
  }

  register(data?: any): Observable<NbAuthResult> {
    const method = this.getOption('register.method');
    const url = this.getActionEndpoint('register');
    return this.http.request(method, url, {body: data, observe: 'response'})
      .pipe(
        map((res) => {
          if (this.getOption('register.alwaysFail')) {
            throw this.createFailResponse(data);
          }

          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('register.redirect.success'),
            [],
            this.getOption('messages.getter')('register', res, this.options),
            this.createToken(this.getOption('token.getter')('login', res, this.options)));
        }),
        catchError((res) => {
          return this.handleResponseError(res, 'register');
        }),
      );
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    const method = this.getOption('requestPass.method');
    const url = this.getActionEndpoint('requestPass');
    return this.http.request(method, url, {body: data, observe: 'response'})
      .pipe(
        map((res) => {
          if (this.getOption('requestPass.alwaysFail')) {
            throw this.createFailResponse();
          }

          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('requestPass.redirect.success'),
            [],
            this.getOption('messages.getter')('requestPass', res, this.options));
        }),
        catchError((res) => {
        return this.handleResponseError(res, 'requestPass');
        }),
      );
  }

  resetPassword(data: any = {}): Observable<NbAuthResult> {
    const tokenKey = this.getOption('resetPass.resetPasswordTokenKey');
    data[tokenKey] = this.route.snapshot.queryParams[tokenKey];

    const method = this.getOption('resetPass.method');
    const url = this.getActionEndpoint('resetPass');
    return this.http.request(method, url, {body: data, observe: 'response'})
      .pipe(
        map((res) => {
          if (this.getOption('resetPass.alwaysFail')) {
            throw this.createFailResponse();
          }

          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('resetPass.redirect.success'),
            [],
            this.getOption('messages.getter')('resetPass', res, this.options));
        }),
        catchError((res) => {
          return this.handleResponseError(res, 'resetPass');
        }),
      );
  }

  logout(): Observable<NbAuthResult> {

    const method = this.getOption('logout.method');
    const url = this.getActionEndpoint('logout');

    return observableOf({})
      .pipe(
        switchMap((res: any) => {
          if (!url) {
            return observableOf(res);
          }
          return this.http.request(method, url, {observe: 'response'});
        }),
        map((res) => {
          if (this.getOption('logout.alwaysFail')) {
            throw this.createFailResponse();
          }

          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('logout.redirect.success'),
            [],
            this.getOption('messages.getter')('logout', res, this.options));
        }),
        catchError((res) => {
          return this.handleResponseError(res, 'logout');
        }),
      );
  }

  refreshToken(data?: any): Observable<NbAuthResult> {

    const method = this.getOption('refreshToken.method');
    const url = this.getActionEndpoint('refreshToken');

    return this.http.request(method, url, {body: data, observe: 'response'})
      .pipe(
        map((res) => {
          if (this.getOption('refreshToken.alwaysFail')) {
            throw this.createFailResponse(data);
          }

          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('refreshToken.redirect.success'),
            [],
            this.getOption('messages.getter')('refreshToken', res, this.options),
            this.createToken(this.getOption('token.getter')('login', res, this.options)));
        }),
        catchError((res) => {
          return this.handleResponseError(res, 'refreshToken');
        }),
      );
  }

  protected handleResponseError(res: any, phase: string): Observable<NbAuthResult> {
    let errors = [];
    if (res instanceof HttpErrorResponse) {
      errors = this.getOption('errors.getter')(phase, res, this.options);
    } else if (res instanceof InvalidJWTTokenError) {
      errors.push(res.message)
    } else {
      errors.push('Something went wrong.');
    }
    return observableOf(
      new NbAuthResult(
        false,
        res,
        this.getOption(`${phase}.redirect.failure`),
        errors,
      ));
  }
}
