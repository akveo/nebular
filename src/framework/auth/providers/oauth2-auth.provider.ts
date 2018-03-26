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
    authorize: {
      endpoint: 'authorize',
      responseType: NbOAuth2ResponseType.CODE,
    },
    token: {
      endpoint: 'token',
      grantType: NbOAuth2GrantType.AUTHORIZATION_CODE,
    },
  };

  constructor(protected http: HttpClient, private route: ActivatedRoute) {
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
                      only 'token' and 'code' are supported now.`);
  }

  protected authorizeRedirect() {
    window.location.href = this.buildRedirectUrl();
  }

  protected getCodeRedirectResult(): Observable<NbAuthResult> {
    const url = this.getActionEndpoint('token');

    return this.route.queryParams.pipe(
      switchMap((params: any) => {
        return this.http.post(url, this.buildCodeRequestData(params.code));
      }),
      map((res) => {
        return new NbAuthResult(
          true,
          res,
          this.getConfigValue('redirect.success'),
          [],
          res);
      }),
      catchError((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = res.error['error'];
        } else {
          errors.push('Something went wrong.');
        }

        return observableOf(
          new NbAuthResult(
            false,
            res,
            this.getConfigValue('redirect.failure'),
            errors,
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
            params);
        }

        new NbAuthResult(
          false,
          params,
          this.getConfigValue('redirect.failure'),
          params,
        );
      }),
    );
  }

  protected isRedirectResult(): Observable<boolean> {
    return this.isTypeCode ? this.isCodeRedirectResult() : this.isTokenRedirectResult();
  }

  protected isCodeRedirectResult(): Observable<boolean> {
    return this.route.queryParams.pipe(
      map((params: any) => params && (params.code || params.error)),
    );
  }

  protected isTokenRedirectResult(): Observable<boolean> {
    return this.route.params.pipe(
      map((params: any) => params && (params.access_token || params.error)),
    );
  }

  protected buildCodeRequestData(code: string): any {
    return {
      grant_type: this.getConfigValue('token.grantType'),
      code: code,
      redirect_uri: this.getConfigValue('token.redirectUri'),
      client_id: this.getConfigValue('clientId'),
    }
  }

  protected buildRedirectUrl() {
    const params = {
      response_type: this.getConfigValue('authorize.responseType'),
      client_id: this.getConfigValue('clientId'),
      redirect_uri: this.getConfigValue('redirectUri'),
      scope: this.getConfigValue('authorize.scope'),
      state: this.getConfigValue('authorize.state'),

      ...this.getConfigValue('authorize.params'),
    };

    return Object.entries(params).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
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
