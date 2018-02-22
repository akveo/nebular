/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Inject, Injectable, Injector, Optional } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { of as observableOf } from 'rxjs/observable/of';

import { NbAbstractAuthProvider } from '../providers/abstract-auth.provider';
import { NB_AUTH_PROVIDERS } from '../auth.options';
import { NbAuthResult } from './auth-result';
import { NbTokenService } from './token/token.service';
import { NbAuthToken } from './token/token';

/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Providers.
 */
@Injectable()
export class NbAuthService {

  constructor(protected tokenService: NbTokenService,
              protected injector: Injector,
              @Optional() @Inject(NB_AUTH_PROVIDERS) protected providers = {}) {
  }

  /**
   * Retrieves current authenticated token stored
   * @returns {Observable<any>}
   */
  getToken(): Observable<NbAuthToken> {
    return this.tokenService.get();
  }

  /**
   * Returns true if auth token is presented in the token storage
   * @returns {Observable<any>}
   */
  isAuthenticated(): Observable<boolean> {
    return this.getToken()
      .pipe(map((token: NbAuthToken) => token.isValid()));
  }

  /**
   * Returns tokens stream
   * @returns {Observable<NbAuthSimpleToken>}
   */
  onTokenChange(): Observable<NbAuthToken> {
    return this.tokenService.tokenChange();
  }

  /**
   * Returns authentication status stream
   * @returns {Observable<boolean>}
   */
  onAuthenticationChange(): Observable<boolean> {
    return this.onTokenChange()
      .pipe(map((token: NbAuthToken) => token.isValid()));
  }

  /**
   * Authenticates with the selected provider
   * Stores received token in the token storage
   *
   * Example:
   * authenticate('email', {email: 'email@example.com', password: 'test'})
   *
   * @param provider
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  authenticate(provider: string, data?: any): Observable<NbAuthResult> {
    return this.getProvider(provider).authenticate(data)
      .pipe(
        switchMap((result: NbAuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  /**
   * Registers with the selected provider
   * Stores received token in the token storage
   *
   * Example:
   * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
   *
   * @param provider
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  register(provider: string, data?: any): Observable<NbAuthResult> {
    return this.getProvider(provider).register(data)
      .pipe(
        switchMap((result: NbAuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  /**
   * Sign outs with the selected provider
   * Removes token from the token storage
   *
   * Example:
   * logout('email')
   *
   * @param provider
   * @returns {Observable<NbAuthResult>}
   */
  logout(provider: string): Observable<NbAuthResult> {
    return this.getProvider(provider).logout()
      .pipe(
        switchMap((result: NbAuthResult) => {
          if (result.isSuccess()) {
            this.tokenService.clear()
              .pipe(map(() => result));
          }
          return observableOf(result);
        }),
      );
  }

  /**
   * Sends forgot password request to the selected provider
   *
   * Example:
   * requestPassword('email', {email: 'email@example.com'})
   *
   * @param provider
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  requestPassword(provider: string, data?: any): Observable<NbAuthResult> {
    return this.getProvider(provider).requestPassword(data);
  }

  /**
   * Tries to reset password with the selected provider
   *
   * Example:
   * resetPassword('email', {newPassword: 'test'})
   *
   * @param provider
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  resetPassword(provider: string, data?: any): Observable<NbAuthResult> {
    return this.getProvider(provider).resetPassword(data);
  }

  private processResultToken(result: NbAuthResult) {
    if (result.isSuccess() && result.getRawToken()) {
      return this.tokenService.setRaw(result.getRawToken())
        .pipe(
          switchMap(() => this.tokenService.get()),
          map((token: NbAuthToken) => {
            result.setToken(token);
            return result;
          }),
        );
    }

    return observableOf(result);
  }

  private getProvider(provider: string): NbAbstractAuthProvider {
    if (!this.providers[provider]) {
      throw new TypeError(`Nb auth provider '${provider}' is not registered`);
    }

    return this.injector.get(this.providers[provider].service);
  }
}
