import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { NB_AUTH_OPTIONS_TOKEN, NB_AUTH_TOKEN_WRAPPER_TOKEN } from '../auth.options';
import { deepExtend, getDeepFromObject, urlBase64Decode } from '../helpers';

/**
 * Wrapper for simple (text) token
 */
@Injectable()
export class NbAuthSimpleToken {

  protected token: string = '';

  setValue(token: string) {
    this.token = token;
  }

  /**
   * Returns the token value
   * @returns string
   */
  getValue() {
    return this.token;
  }
}

/**
 * Wrapper for JWT token with additional methods.
 */
@Injectable()
export class NbAuthJWTToken extends NbAuthSimpleToken {

  /**
   * TODO: check for this.token to be not null
   * Returns payload object
   * @returns any
   */
  getPayload(): any {
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

      getter: (): Observable<NbAuthSimpleToken> => {
        const tokenValue = localStorage.getItem(this.getConfigValue('token.key'));
        this.tokenWrapper.setValue(tokenValue);
        return Observable.of(this.tokenWrapper);
      },

      setter: (token: string|NbAuthSimpleToken): Observable<null> => {
        const raw = token instanceof NbAuthSimpleToken ? token.getValue() : token;
        localStorage.setItem(this.getConfigValue('token.key'), raw);
        return Observable.of(null);
      },

      deleter: (): Observable<null> => {
        localStorage.removeItem(this.getConfigValue('token.key'));
        return Observable.of(null);
      },
    },
  };
  protected config: any = {};
  protected token$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(@Inject(NB_AUTH_OPTIONS_TOKEN) protected options: any,
              @Inject(NB_AUTH_TOKEN_WRAPPER_TOKEN) protected tokenWrapper: NbAuthSimpleToken) {
    this.setConfig(options);

    this.get().subscribe(token => this.publishToken(token));
  }

  setConfig(config: any): void {
    this.config = deepExtend({}, this.defaultConfig, config);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  /**
   * Sets the token into the storage. This method is used by the NbAuthService automatically.
   * @param {string} rawToken
   * @returns {Observable<any>}
   */
  set(rawToken: string): Observable<null> {
    return this.getConfigValue('token.setter')(rawToken)
      .switchMap(_ => this.get())
      .do((token: NbAuthSimpleToken) => {
        this.publishToken(token);
      });
  }

  /**
   * Returns observable of current token
   * @returns {Observable<NbAuthSimpleToken>}
   */
  get(): Observable<NbAuthSimpleToken> {
    return this.getConfigValue('token.getter')();
  }

  /**
   * Publishes token when it changes.
   * @returns {Observable<NbAuthSimpleToken>}
   */
  tokenChange(): Observable<NbAuthSimpleToken> {
    return this.token$.publish().refCount();
  }

  /**
   * Removes the token
   * @returns {Observable<any>}
   */
  clear(): Observable<any> {
    this.publishToken(null);

    return this.getConfigValue('token.deleter')();
  }

  protected publishToken(token: NbAuthSimpleToken): void {
    this.token$.next(token);
  }
}
