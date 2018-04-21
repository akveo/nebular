import { Injectable } from '@angular/core';

import { NbAuthToken } from './token';
import { NbAuthTokenParceler } from './token-parceler';

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
export class NbTokenLocalStorage extends NbTokenStorage {

  protected key = 'auth_app_token';

  constructor(private tokenPacker: NbAuthTokenParceler) {
    super();
  }

  /**
   * Returns token from localStorage
   * @returns {NbAuthToken}
   */
  get(): NbAuthToken {
    const raw = localStorage.getItem(this.key);
    return this.tokenPacker.unwrap(raw);
  }

  /**
   * Sets token to localStorage
   * @param {NbAuthToken} token
   */
  set(token: NbAuthToken) {
    const raw = this.tokenPacker.wrap(token);
    localStorage.setItem(this.key, raw);
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
