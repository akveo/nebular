/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NgEmailPassAuthProviderConfig } from './email-pass-auth.options';
import { NbAuthResult } from '../services/auth.service';
import { NbAbstractAuthProvider } from './abstract-auth.provider';
import { getDeepFromObject } from '../helpers';


@Injectable()
export class NbEmailPassAuthProvider extends NbAbstractAuthProvider {

  protected defaultConfig: NgEmailPassAuthProviderConfig = {
    baseEndpoint: '',
    login: {
      alwaysFail: false,
      rememberMe: true,
      endpoint: '/api/auth/login',
      redirect: {
        success: '/',
        failure: null,
      },
      defaultErrors: ['Login/Email combination is not correct, please try again.'],
      defaultMessages: ['You have been successfully logged in.'],
    },
    register: {
      alwaysFail: false,
      rememberMe: true,
      endpoint: '/api/auth/register',
      redirect: {
        success: '/',
        failure: null,
      },
      defaultErrors: ['Something went wrong, please try again.'],
      defaultMessages: ['You have been successfully registered.'],
    },
    logout: {
      alwaysFail: false,
      endpoint: '/api/auth/logout',
      redirect: {
        success: '/',
        failure: null,
      },
      defaultErrors: ['Something went wrong, please try again.'],
      defaultMessages: ['You have been successfully logged out.'],
    },
    requestPass: {
      endpoint: '/api/auth/request-pass',
      redirect: {
        success: '/',
        failure: null,
      },
      defaultErrors: ['Something went wrong, please try again.'],
      defaultMessages: ['Reset password instructions have been sent to your email.'],
    },
    resetPass: {
      endpoint: '/api/auth/reset-pass',
      redirect: {
        success: '/',
        failure: null,
      },
      resetPasswordTokenKey: 'reset_password_token',
      defaultErrors: ['Something went wrong, please try again.'],
      defaultMessages: ['Your password has been successfully changed.'],
    },
    token: {
      key: 'data.token',
      getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
        this.getConfigValue('token.key')),
    },
    errors: {
      key: 'data.errors',
      getter: (module: string, res: HttpErrorResponse) => getDeepFromObject(res.error,
        this.getConfigValue('errors.key'),
        this.getConfigValue(`${module}.defaultErrors`)),
    },
    messages: {
      key: 'data.messages',
      getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
        this.getConfigValue('messages.key'),
        this.getConfigValue(`${module}.defaultMessages`)),
    },
  };

  constructor(protected http: HttpClient, private route: ActivatedRoute) {
    super();
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    return this.http.post(this.getActionEndpoint('login'), data, { observe: 'response' })
      .map((res) => {
        if (this.getConfigValue('login.alwaysFail')) {
          throw this.createFailResponse(data);
        }

        return res;
      })
      .map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('login.redirect.success'),
          [],
          this.getConfigValue('messages.getter')('login', res),
          this.getConfigValue('token.getter')('login', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('login', res);
        } else {
          errors.push('Something went wrong.');
        }

        return Observable.of(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('login.redirect.failure'),
            errors,
          ));
      });
  }

  register(data?: any): Observable<NbAuthResult> {
    return this.http.post(this.getActionEndpoint('register'), data, { observe: 'response' })
      .map((res) => {
        if (this.getConfigValue('register.alwaysFail')) {
          throw this.createFailResponse(data);
        }

        return res;
      })
      .map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('register.redirect.success'),
          [],
          this.getConfigValue('messages.getter')('register', res),
          this.getConfigValue('token.getter')('register', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('register', res);
        } else {
          errors.push('Something went wrong.');
        }

        return Observable.of(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('register.redirect.failure'),
            errors,
          ));
      });
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return this.http.post(this.getActionEndpoint('requestPass'), data, { observe: 'response' })
      .map((res) => {
        if (this.getConfigValue('requestPass.alwaysFail')) {
          throw this.createFailResponse();
        }

        return res;
      })
      .map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('requestPass.redirect.success'),
          [],
          this.getConfigValue('messages.getter')('requestPass', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('requestPass', res);
        } else {
          errors.push('Something went wrong.');
        }

        return Observable.of(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('requestPass.redirect.failure'),
            errors,
          ));
      });
  }

  resetPassword(data: any = {}): Observable<NbAuthResult> {
    const tokenKey = this.getConfigValue('resetPass.resetPasswordTokenKey');
    data[tokenKey] = this.route.snapshot.queryParams[tokenKey];

    return this.http.post(this.getActionEndpoint('resetPass'), data, { observe: 'response' })
      .map((res) => {
        if (this.getConfigValue('resetPass.alwaysFail')) {
          throw this.createFailResponse();
        }

        return res;
      })
      .map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('resetPass.redirect.success'),
          [],
          this.getConfigValue('messages.getter')('resetPass', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('resetPass', res);
        } else {
          errors.push('Something went wrong.');
        }

        return Observable.of(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('resetPass.redirect.failure'),
            errors,
          ));
      });
  }

  logout(): Observable<NbAuthResult> {

    return Observable.of({})
      .switchMap((res: any) => {
        if (!this.getConfigValue('logout.endpoint')) {
          return Observable.of(res);
        }

        return this.http.delete(this.getActionEndpoint('logout'), { observe: 'response' });
      })
      .map((res) => {
        if (this.getConfigValue('logout.alwaysFail')) {
          throw this.createFailResponse();
        }

        return res;
      })
      .map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('logout.redirect.success'),
          [],
          this.getConfigValue('messages.getter')('logout', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('logout', res);
        } else {
          errors.push('Something went wrong.');
        }

        return Observable.of(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('logout.redirect.failure'),
            errors,
          ));
      });
  }

  protected getActionEndpoint(action: string): string {
    const actionEndpoint: string = this.getConfigValue(`${action}.endpoint`);
    const baseEndpoint: string = this.getConfigValue('baseEndpoint');
    return baseEndpoint + actionEndpoint;
  }
}
