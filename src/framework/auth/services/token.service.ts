import { Inject, Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { switchMapTo } from 'rxjs/operators/switchMapTo';
import { tap } from 'rxjs/operators/tap';
import { share } from 'rxjs/operators/share';

import { NB_AUTH_OPTIONS_TOKEN, NB_AUTH_TOKEN_WRAPPER_TOKEN } from '../auth.options';
import { deepExtend, getDeepFromObject, urlBase64Decode } from '../helpers';

export interface NbAuthToken {
  getValue(): string;
  isValid(): boolean;
  toString(): string;
}

/**
 * Wrapper for simple (text) token
 */
export class NbAuthSimpleToken implements NbAuthToken {

  constructor(readonly token: string) {
  }

  /**
   * Returns the token value
   * @returns string
   */
  getValue() {
    return this.token;
  }

  /**
   * Is current token could be processed
   * @returns {boolean}
   */
  isValid(): boolean {
    return !!this.token;
  }

  /**
   * Validate value and convert to string, if value is not valid return empty string
   * @returns {string}
   */
  toString(): string {
    return !!this.token ? this.token : '';
  }
}

/**
 * Wrapper for JWT token with additional methods.
 */
export class NbAuthJWTToken extends NbAuthSimpleToken {

  /**
   * Returns payload object
   * @returns any
   */
  getPayload(): any {
    if (!this.token) {
      throw new Error('Token can not be null.');
    }

    const parts = this.token.split('.');

    if (parts.length !== 3) {
      throw new Error(`The token ${this.token} is not valid JWT token and must consist of three parts.`);
    }

    const decoded = urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error(`The token ${this.token} is not valid JWT token and cannot be decoded.`);
    }

    return JSON.parse(decoded);
  }

  /**
   * Returns expiration date
   * @returns Date
   */
  getTokenExpDate(): Date {
    const decoded = this.getPayload();
    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  /**
   * Is data expired
   * @returns {boolean}
   */
  isValid(): boolean {
    return super.isValid() && new Date() < this.getTokenExpDate();
  }
}

export interface NbTokenWrapperClass {
  new (raw: string): NbAuthToken
}

/**
 * Nebular token service. Provides access to the stored token.
 * By default returns NbAuthSimpleToken instance,
 * but you can inject NbAuthJWTToken if you need additional methods for JWT token.
 *
 * @example Injecting NbAuthJWTToken, so that NbTokenService will now return NbAuthJWTToken instead
 * of the default NbAuthSimpleToken
 *
 * ```
 * // import token and service into your AppModule
 * import { NB_AUTH_TOKEN_WRAPPER_TOKEN,  NbAuthJWTToken} from '@nebular/auth';
 *
 * // add to a list of providers
 * providers: [
 *  // ...
 *  { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthJWTToken },
 * ],
 * ```
 */
@Injectable()
export class NbTokenService {

  protected defaultConfig: any = {
    token: {
      key: 'auth_app_token',

      getter: (): Observable<NbAuthToken> => {
        const rawToken = localStorage.getItem(this.getConfigValue('token.key'));
        return observableOf(new this.TokenWrapperClass(rawToken));
      },

      setter: (token: NbAuthToken): Observable<null> => {
        localStorage.setItem(this.getConfigValue('token.key'), token.toString());
        return observableOf(null);
      },

      deleter: (): Observable<null> => {
        localStorage.removeItem(this.getConfigValue('token.key'));
        return observableOf(null);
      },
    },
  };

  protected config: any = {};
  protected token$: BehaviorSubject<NbAuthToken> = new BehaviorSubject(null);

  constructor(@Inject(NB_AUTH_OPTIONS_TOKEN) protected options: any,
              @Inject(NB_AUTH_TOKEN_WRAPPER_TOKEN) protected TokenWrapperClass: NbTokenWrapperClass) {
    this.setConfig(options);

    this.get().subscribe(token => {
      this.publishToken(token)
    });
  }

  setConfig(config: any): void {
    this.config = deepExtend({}, this.defaultConfig, config);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  /**
   * Sets the token into the storage. This method is used by the NbAuthService automatically.
   *
   * Note: don't forget to subscribe
   * @param {string} rawToken
   * @returns {Observable<any>}
   */
  set(rawToken: string): Observable<null> {
    return this.getConfigValue('token.setter')(new this.TokenWrapperClass(rawToken))
      .pipe(
        switchMapTo(this.fetch()),
        tap((token: NbAuthToken) => {
          this.publishToken(token);
        }),
      );
  }

  /**
   * Returns observable of current token
   * @returns {Observable<NbAuthToken>}
   */
  get(): Observable<NbAuthToken> {
    return this.fetch();
  }

  /**
   * Publishes token when it changes.
   * @returns {Observable<NbAuthToken>}
   */
  tokenChange(): Observable<NbAuthToken> {
    return this.token$.pipe(share());
  }

  /**
   * Removes the token
   *
   * Note: don't forget to subscribe
   * @returns {Observable<any>}
   */
  clear(): Observable<NbAuthToken> {
    return this.getConfigValue('token.deleter')()
      .pipe(
        switchMapTo(this.fetch()),
        tap((token: NbAuthToken) => {
          this.publishToken(token);
        }),
      );
  }

  private fetch(): Observable<NbAuthToken> {
    return this.getConfigValue('token.getter')();
  }

  protected publishToken(token: NbAuthToken): void {
    this.token$.next(token);
  }
}
