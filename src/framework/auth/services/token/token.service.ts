import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { filter, share } from 'rxjs/operators';

import { NbTokenStorage } from './token-storage';
import { isNbAuthRefreshableToken, NbAuthRefreshableToken, NbAuthToken } from './token';

/**
 * Service that allows you to manage authentication token - get, set, clear and also listen to token changes over time.
 */
@Injectable()
export class NbTokenService {

  protected token$: BehaviorSubject<NbAuthToken> = new BehaviorSubject(null);

  constructor(protected tokenStorage: NbTokenStorage) {
    this.publishStoredToken();
  }

  /**
   * Publishes token when it changes.
   * @returns {Observable<NbAuthToken>}
   */
  tokenChange(): Observable<NbAuthToken> {
    return this.token$
      .pipe(
        filter(value => !!value),
        share(),
      );
  }

  /**
   * Sets a token into the storage. This method is used by the NbAuthService automatically.
   *
   * Before storing, in case of refreshable token, and if no refresh token value is found,
   * (This means the backend did not repeat the refresh token value)
   * adds the refresh_token value of the existing token (if any)
   *
   * @param {NbAuthToken} token
   * @returns {Observable<any>}
   */
  set(token: NbAuthToken): Observable<null> {
    if (isNbAuthRefreshableToken(token) && token.getRefreshToken() === undefined) {
      this.get().subscribe(existingToken => {
        if (isNbAuthRefreshableToken(existingToken)) {
          const existingRefreshTokenValue = ((<NbAuthRefreshableToken>existingToken).getRefreshToken());
          token.setRefreshToken(existingRefreshTokenValue);
        }
      })
    }
      this.tokenStorage.set(token);
      this.publishStoredToken();
      return observableOf(null);
  }

  /**
   * Returns observable of current token
   * @returns {Observable<NbAuthToken>}
   */
  get(): Observable<NbAuthToken> {
    const token = this.tokenStorage.get();
    return observableOf(token);
  }

  /**
   * Removes the token and published token value
   *
   * @returns {Observable<any>}
   */
  clear(): Observable<null> {
    this.tokenStorage.clear();
    this.publishStoredToken();
    return observableOf(null);
  }

  protected publishStoredToken() {
    this.token$.next(this.tokenStorage.get());
  }
}
