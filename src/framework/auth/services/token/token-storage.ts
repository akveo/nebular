import { Inject, Injectable } from '@angular/core';

import { NB_AUTH_TOKEN_CLASS } from '../../auth.options';
import { NbAuthToken, nbCreateToken, NbTokenClass } from './token';

export abstract class NbTokenStorage {

  abstract get(): NbAuthToken;
  abstract set(token: NbAuthToken);
  abstract setRaw(token: string);
  abstract clear();
}

/**
 * Service that uses browser localStorage as a storage.
 *
 * The token storage is provided into auth module the following way:
 * ```
 * { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
 * ```
 *
 * If you need to change the storage behaviour or provide your own - just extend your class from basic `NbTokenStorage`
 * or `NbTokenLocalStorage` and provide in your `app.module`:
 * ```
 * { provide: NbTokenStorage, useClass: NbTokenCustomStorage },
 * ```
 *
 */
@Injectable()
export class NbTokenLocalStorage implements NbTokenStorage {

  protected key = 'auth_app_token';

  constructor(@Inject(NB_AUTH_TOKEN_CLASS) protected tokenClass: NbTokenClass) {
  }

  /**
   * Returns token from localStorage
   * @returns {NbAuthToken}
   */
  get(): NbAuthToken {
    return nbCreateToken(this.tokenClass, localStorage.getItem(this.key));
  }

  /**
   * Sets token to localStorage
   * @param {NbAuthToken} token
   */
  set(token: NbAuthToken) {
    localStorage.setItem(this.key, token.toString());
  }

  /**
   * Sets raw (string) token to localStorage
   * @param {string} token
   */
  setRaw(token: string) {
    localStorage.setItem(this.key, token);
  }

  /**
   * Clears token from localStorage
   */
  clear() {
    localStorage.removeItem(this.key);
  }
}
