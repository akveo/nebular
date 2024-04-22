/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Inject, Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { NbAuthStrategy } from '../strategies/auth-strategy';
import { NB_AUTH_STRATEGIES } from '../auth.options';
import { NbAuthResult } from './auth-result';
import { NbTokenService } from './token/token.service';
import { NbAuthToken } from './token/token';

/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Strategy.
 */
@Injectable()
export class NbAuthService {
  constructor(protected tokenService: NbTokenService, @Inject(NB_AUTH_STRATEGIES) protected strategies) {}

  /**
   * Retrieves current authenticated token stored
   * @returns {Observable<any>}
   */
  getToken(): Observable<NbAuthToken> {
    return this.tokenService.get();
  }

  /**
   * Returns true if auth token is present in the token storage
   * @returns {Observable<boolean>}
   */
  isAuthenticated(): Observable<boolean> {
    return this.getToken().pipe(map((token: NbAuthToken) => token.isValid()));
  }

  /**
   * Returns true if valid auth token is present in the token storage.
   * If not, calls the strategy refreshToken, and returns isAuthenticated() if success, false otherwise
   * @returns {Observable<boolean>}
   */
  isAuthenticatedOrRefresh(): Observable<boolean> {
    return this.getToken().pipe(
      switchMap((token) => {
        if (token.getValue() && !token.isValid()) {
          return this.refreshToken(token.getOwnerStrategyName(), token).pipe(
            switchMap((res) => {
              if (res.isSuccess()) {
                return this.isAuthenticated();
              } else {
                return observableOf(false);
              }
            }),
          );
        } else {
          return observableOf(token.isValid());
        }
      }),
    );
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
    return this.onTokenChange().pipe(map((token: NbAuthToken) => token.isValid()));
  }

  /**
   * Authenticates with the selected strategy
   * Stores received token in the token storage
   *
   * Example:
   * authenticate('email', {email: 'email@example.com', password: 'test'})
   *
   * @param strategyName
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  authenticate(strategyName: string, data?: any): Observable<NbAuthResult> {
    return this.getStrategy(strategyName)
      .authenticate(data)
      .pipe(
        switchMap((result: NbAuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  /**
   * Registers with the selected strategy
   * Stores received token in the token storage
   *
   * Example:
   * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
   *
   * @param strategyName
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  register(strategyName: string, data?: any): Observable<NbAuthResult> {
    return this.getStrategy(strategyName)
      .register(data)
      .pipe(
        switchMap((result: NbAuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  /**
   * Sign outs with the selected strategy
   * Removes token from the token storage
   *
   * Example:
   * logout('email')
   *
   * @param strategyName
   * @returns {Observable<NbAuthResult>}
   */
  logout(strategyName: string): Observable<NbAuthResult> {
    return this.getStrategy(strategyName)
      .logout()
      .pipe(
        switchMap((result: NbAuthResult) => {
          if (result.isSuccess()) {
            this.tokenService.clear().pipe(map(() => result));
          }
          return observableOf(result);
        }),
      );
  }

  /**
   * Sends forgot password request to the selected strategy
   *
   * Example:
   * requestPassword('email', {email: 'email@example.com'})
   *
   * @param strategyName
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  requestPassword(strategyName: string, data?: any): Observable<NbAuthResult> {
    return this.getStrategy(strategyName).requestPassword(data);
  }

  /**
   * Tries to reset password with the selected strategy
   *
   * Example:
   * resetPassword('email', {newPassword: 'test'})
   *
   * @param strategyName
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  resetPassword(strategyName: string, data?: any): Observable<NbAuthResult> {
    return this.getStrategy(strategyName).resetPassword(data);
  }

  /**
   * Sends a refresh token request
   * Stores received token in the token storage
   *
   * Example:
   * refreshToken('email', {token: token})
   *
   * @param {string} strategyName
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  refreshToken(strategyName: string, data?: any): Observable<NbAuthResult> {
    return this.getStrategy(strategyName)
      .refreshToken(data)
      .pipe(
        switchMap((result: NbAuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  /**
   * Get registered strategy by name
   *
   * Example:
   * getStrategy('email')
   *
   * @param {string} provider
   * @returns {NbAbstractAuthProvider}
   */
  protected getStrategy(strategyName: string): NbAuthStrategy {
    const found = this.strategies.find((strategy: NbAuthStrategy) => strategy.getName() === strategyName);

    if (!found) {
      throw new TypeError(`There is no Auth Strategy registered under '${strategyName}' name`);
    }

    return found;
  }

  private processResultToken(result: NbAuthResult) {
    if (result.isSuccess() && result.getToken()) {
      return this.tokenService.set(result.getToken()).pipe(
        map((token: NbAuthToken) => {
          return result;
        }),
      );
    }

    return observableOf(result);
  }
}
