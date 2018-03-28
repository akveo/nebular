/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { NbWindow } from '@nebular/theme';

import { NbAuthResult } from '../services/auth-result';
import { NbAbstractAuthProvider } from './abstract-auth.provider';
import { NbOAuth2AuthOptions } from './oauth2-auth.options';

export enum NbOAuth2ResponseType {
  CODE = 'code',
  TOKEN = 'token',
}

// TODO: password, client_credentials
export enum NbOAuth2GrantType {
  AUTHORIZATION_CODE = 'authorization_code',
  REFRESH_TOKEN = 'refresh_token',
}

// TODO: handle state
// TODO: refresh token
// TODO: oauth2 token
@Injectable()
export class NbOAuth2AuthProvider extends NbAbstractAuthProvider {

  get isTypeCode(): boolean {
    return this.getConfigValue('authorize.responseType') === NbOAuth2ResponseType.CODE;
  }

  get isTypeToken(): boolean {
    return this.getConfigValue('authorize.responseType') === NbOAuth2ResponseType.TOKEN;
  }

  protected defaultConfig: NbOAuth2AuthOptions = {
    baseEndpoint: '',
    clientId: '',
    clientSecret: '',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully authenticated.'],
    authorize: {
      endpoint: 'authorize',
      responseType: NbOAuth2ResponseType.CODE,

    },
    token: {
      endpoint: 'token',
      grantType: NbOAuth2GrantType.AUTHORIZATION_CODE,
    },
  };

  constructor(protected http: HttpClient,
              private route: ActivatedRoute,
              private window: NbWindow) {
    super();
  }

  authenticate(): Observable<NbAuthResult> {
    return this.isRedirectResult()
      .pipe(
        switchMap((result: boolean) => {
          if (!result) {
            this.authorizeRedirect();
            return observableOf(null);
          }
          return this.getAuthorizationResult();
        }),
      );
  }

  getAuthorizationResult(): Observable<any> {
    if (this.isTypeCode) {
      return this.getCodeRedirectResult();
    } else if (this.isTypeToken) {
      return this.getTokenRedirectResult();
    }

    throw new Error(`'${this.getConfigValue('authorize.responseType')}' responseType is not supported,
                      only 'token' and 'code' are supported now`);
  }

  protected authorizeRedirect() {
    this.window.location.href = this.buildRedirectUrl();
  }

  protected isRedirectResult(): Observable<boolean> {
    return this.isTypeCode ? this.isCodeRedirectResult() : this.isTokenRedirectResult();
  }

  protected isCodeRedirectResult(): Observable<boolean> {
    return this.route.queryParams.pipe(
      map((params: any) => !!(params && (params.code || params.error))),
    );
  }

  protected isTokenRedirectResult(): Observable<boolean> {
    return this.route.params.pipe(
      map((params: any) => !!(params && (params.access_token || params.error))),
    );
  }

  protected getCodeRedirectResult(): Observable<NbAuthResult> {
    return this.route.queryParams.pipe(
      switchMap((params: any) => {
        if (params.code) {
          return this.requestToken(params.code)
        }

        return observableOf(
          new NbAuthResult(
            false,
            params,
            this.getConfigValue('redirect.failure'),
            this.getConfigValue('defaultErrors'),
            [],
          ));
      }),
    );
  }

  protected requestToken(code: string) {
    const url = this.getActionEndpoint('token');

    return this.http.post(url, this.buildCodeRequestData(code))
      .pipe(
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getConfigValue('redirect.success'),
            [],
            this.getConfigValue('defaultMessages'),
            res);
        }),
        catchError((res) => {
          let errors = [];
          if (res instanceof HttpErrorResponse) {
            errors = this.getConfigValue('defaultErrors');
          } else {
            errors.push('Something went wrong.');
          }

          return observableOf(
            new NbAuthResult(
              false,
              res,
              this.getConfigValue('redirect.failure'),
              errors,
              [],
            ));
        }),
      );
  }

  protected getTokenRedirectResult(): Observable<NbAuthResult> {
    return this.route.params.pipe(
      map((params: any) => {
        if (!params.error) {
          return new NbAuthResult(
            true,
            params,
            this.getConfigValue('redirect.success'),
            [],
            this.getConfigValue('defaultMessages'),
            params);
        }

        return new NbAuthResult(
          false,
          params,
          this.getConfigValue('redirect.failure'),
          this.getConfigValue('defaultErrors'),
          [],
          );
      }),
    );
  }

  protected buildCodeRequestData(code: string): any {
    const params = {
      grant_type: this.getConfigValue('token.grantType'),
      code: code,
      redirect_uri: this.getConfigValue('token.redirectUri'),
      client_id: this.getConfigValue('clientId'),
    };

    Object.entries(params)
      .forEach(([key, val]) => !val && delete params[key]);

    return params;
  }

  protected buildRedirectUrl() {
    const params = {
      response_type: this.getConfigValue('authorize.responseType'),
      client_id: this.getConfigValue('clientId'),
      redirect_uri: this.getConfigValue('authorize.redirectUri'),
      scope: this.getConfigValue('authorize.scope'),
      state: this.getConfigValue('authorize.state'),

      ...this.getConfigValue('authorize.params'),
    };

    const endpoint = this.getActionEndpoint('authorize');
    const query = Object.entries(params)
      .filter(([key, val]) => !!val)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');

    return `${endpoint}?${query}`;
  }

  register(data?: any): Observable<NbAuthResult> {
    throw new Error('`register` is not supported by `NbOAuth2AuthProvider`, use `authenticate`.')
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    throw new Error('`requestPassword` is not supported by `NbOAuth2AuthProvider`, use `authenticate`.')
  }

  resetPassword(data: any = {}): Observable<NbAuthResult> {
    throw new Error('`resetPassword` is not supported by `NbOAuth2AuthProvider`, use `authenticate`.')
  }

  logout(): Observable<NbAuthResult> {
    throw new Error('`logout` is not supported by `NbOAuth2AuthProvider`, use `authenticate`.')
  }
}
