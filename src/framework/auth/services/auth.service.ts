/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Inject, Injectable, Injector, Optional } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { of as observableOf } from 'rxjs/observable/of';

import { NbAbstractAuthProvider } from '../providers/abstract-auth.provider';
import { NbAuthSimpleToken, NbTokenService } from './token.service';
import { NB_AUTH_PROVIDERS_TOKEN } from '../auth.options';
import { NbAuthResult } from './auth-result';

/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Providers.
 */
@Injectable()
export class NbAuthService {

  constructor(protected tokenService: NbTokenService,
              protected injector: Injector,
              @Optional() @Inject(NB_AUTH_PROVIDERS_TOKEN) protected providers = {}) {
  }

  /**
   * Retrieves current authenticated token stored
   * @returns {Observable<any>}
   */
  getToken(): Observable<NbAuthSimpleToken> {
    return this.tokenService.get();
  }

  /**
   * Returns true if auth token is presented in the token storage
   * // TODO: check exp date for JWT token
   * // TODO: to implement previous todo lets use isValid method of token
   * @returns {Observable<any>}
   */
  isAuthenticated(): Observable<boolean> {
    return this.getToken().pipe(map(token => !!(token && token.getValue())));
  }

  /**
   * Returns tokens stream
   * @returns {Observable<NbAuthSimpleToken>}
   */
  onTokenChange(): Observable<NbAuthSimpleToken> {
    return this.tokenService.tokenChange();
  }

  /**
   * Returns authentication status stream
   *  // TODO: check exp date for JWT token
   *  // TODO: to implement previous todo lets use isValid method of token
   * @returns {Observable<boolean>}
   */
  onAuthenticationChange(): Observable<boolean> {
    return this.onTokenChange().pipe(map((token: NbAuthSimpleToken) => !!(token && token.getValue())));
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
          // TODO move this duplicate code in the separate method (see register)
          // TODO is it necessary to chech for token here
          if (result.isSuccess() && result.getTokenValue()) {
            return this.tokenService.set(result.getTokenValue())
              .pipe(
                switchMap(() => this.tokenService.get()),
                map((token: NbAuthSimpleToken) => {
                  result.replaceToken(token);
                  return result;
                }),
              );
          }

          return observableOf(result);
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
          if (result.isSuccess() && result.getTokenValue()) {
            return this.tokenService.set(result.getTokenValue())
              .pipe(
                switchMap(_ => this.tokenService.get()),
                map((token: NbAuthSimpleToken) => {
                  result.replaceToken(token);
                  return result;
                }),
              );
          }

          return observableOf(result);
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
        tap((result: NbAuthResult) => {
          if (result.isSuccess()) {
            this.tokenService.clear().subscribe(() => {
            });
          }
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

  private getProvider(provider: string): NbAbstractAuthProvider {
    if (!this.providers[provider]) {
      throw new TypeError(`Nb auth provider '${provider}' is not registered`);
    }

    return this.injector.get(this.providers[provider].service);
  }
}
