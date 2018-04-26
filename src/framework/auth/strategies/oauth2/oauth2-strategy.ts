/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { NB_WINDOW } from '@nebular/theme';

import { NbAuthStrategy } from '../auth-strategy';
import { NbAuthRefreshableToken, NbAuthResult } from '../../services/';
import { NbOAuth2AuthStrategyOptions, NbOAuth2ResponseType, auth2StrategyOptions } from './oauth2-strategy.options';


// TODO: handle state
@Injectable()
export class NbOAuth2AuthStrategy extends NbAuthStrategy {

  get isTypeCode(): boolean {
    return this.getOption('authorize.responseType') === NbOAuth2ResponseType.CODE;
  }

  get isTypeToken(): boolean {
    return this.getOption('authorize.responseType') === NbOAuth2ResponseType.TOKEN;
  }

  protected defaultOptions: NbOAuth2AuthStrategyOptions = auth2StrategyOptions;

  constructor(protected http: HttpClient,
              private route: ActivatedRoute,
              @Inject(NB_WINDOW) private window: any) {
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

    throw new Error(`'${this.getOption('authorize.responseType')}' responseType is not supported,
                      only 'token' and 'code' are supported now`);
  }

  refreshToken(token: NbAuthRefreshableToken): Observable<NbAuthResult> {
    const url = this.getActionEndpoint('refresh');

    return this.http.post(url, this.buildRefreshRequestData(token))
      .pipe(
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('redirect.success'),
            [],
            this.getOption('defaultMessages'),
            this.createToken(res));
        }),
        catchError((res) => {
          let errors = [];
          if (res instanceof HttpErrorResponse) {
            errors = this.getOption('defaultErrors');
          } else {
            errors.push('Something went wrong.');
          }

          return observableOf(
            new NbAuthResult(
              false,
              res,
              this.getOption('redirect.failure'),
              errors,
              [],
            ));
        }),
      );
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
            this.getOption('redirect.failure'),
            this.getOption('defaultErrors'),
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
            this.getOption('redirect.success'),
            [],
            this.getOption('defaultMessages'),
            this.createToken(res));
        }),
        catchError((res) => {
          let errors = [];
          if (res instanceof HttpErrorResponse) {
            errors = this.getOption('defaultErrors');
          } else {
            errors.push('Something went wrong.');
          }

          return observableOf(
            new NbAuthResult(
              false,
              res,
              this.getOption('redirect.failure'),
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
            this.getOption('redirect.success'),
            [],
            this.getOption('defaultMessages'),
            this.createToken(params));
        }

        return new NbAuthResult(
          false,
          params,
          this.getOption('redirect.failure'),
          this.getOption('defaultErrors'),
          [],
          );
      }),
    );
  }

  protected buildCodeRequestData(code: string): any {
    const params = {
      grant_type: this.getOption('token.grantType'),
      code: code,
      redirect_uri: this.getOption('token.redirectUri'),
      client_id: this.getOption('clientId'),
    };

    Object.entries(params)
      .forEach(([key, val]) => !val && delete params[key]);

    return params;
  }

  protected buildRefreshRequestData(token: NbAuthRefreshableToken): any {
    const params = {
      grant_type: this.getOption('refresh.grantType'),
      refresh_token: token.getRefresh(),
      scope: this.getOption('refresh.scope'),
    };

    Object.entries(params)
      .forEach(([key, val]) => !val && delete params[key]);

    return params;
  }

  protected buildRedirectUrl() {
    const params = {
      response_type: this.getOption('authorize.responseType'),
      client_id: this.getOption('clientId'),
      redirect_uri: this.getOption('authorize.redirectUri'),
      scope: this.getOption('authorize.scope'),
      state: this.getOption('authorize.state'),

      ...this.getOption('authorize.params'),
    };

    const endpoint = this.getActionEndpoint('authorize');
    const query = Object.entries(params)
      .filter(([key, val]) => !!val)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');

    return `${endpoint}?${query}`;
  }

  register(data?: any): Observable<NbAuthResult> {
    throw new Error('`register` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`.');
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    throw new Error('`requestPassword` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`.');
  }

  resetPassword(data: any = {}): Observable<NbAuthResult> {
    throw new Error('`resetPassword` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`.');
  }

  logout(): Observable<NbAuthResult> {
    throw new Error('`logout` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`.');
  }
}
