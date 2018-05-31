/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';

import { NbTokenLocalStorage, NbTokenStorage } from './token-storage';
import { NB_AUTH_TOKENS } from '../../auth.options';
import { NbAuthSimpleToken, nbAuthCreateToken } from './token';
import { NbAuthJWTToken } from '@nebular/auth/services/token/token';
import { NB_AUTH_FALLBACK_TOKEN, NbAuthTokenParceler } from './token-parceler';

describe('token-storage', () => {

  let tokenStorage: NbTokenStorage;
  let tokenParceler: NbAuthTokenParceler;
  const testTokenKey = 'auth_app_token';
  const testTokenValue = 'test-token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        { provide: NB_AUTH_FALLBACK_TOKEN, useValue: NbAuthSimpleToken },
        { provide: NB_AUTH_TOKENS, useValue: [NbAuthSimpleToken, NbAuthJWTToken] },
        NbAuthTokenParceler,
      ],
    });
  });

    beforeEach(async(inject(
    [NbTokenStorage, NbAuthTokenParceler],
    (_tokenStorage, _tokenParceler) => {
      tokenStorage = _tokenStorage;
      tokenParceler = _tokenParceler;
    },
  )));

  afterEach(() => {
    localStorage.removeItem(testTokenKey);
  });


  it('set test token', () => {
    const token = nbAuthCreateToken(NbAuthSimpleToken, testTokenValue);

    tokenStorage.set(token);
    expect(localStorage.getItem(testTokenKey)).toEqual(tokenParceler.wrap(token));
  });

  it('setter set invalid token to localStorage as empty string', () => {
    let token;

    token = nbAuthCreateToken(NbAuthSimpleToken, null);
    tokenStorage.set(token);
    expect(localStorage.getItem(testTokenKey)).toEqual(tokenParceler.wrap(token));

    token = nbAuthCreateToken(NbAuthSimpleToken, undefined);
    tokenStorage.set(token);
    expect(localStorage.getItem(testTokenKey)).toEqual(tokenParceler.wrap(token));
  });

  it('get return null in case token was not set', () => {
    const token = tokenStorage.get();
    expect(token.getValue()).toBe('');
    expect(token.isValid()).toBe(false);
  });

  it('should return correct value', () => {
    const token = nbAuthCreateToken(NbAuthSimpleToken, 'test');
    localStorage.setItem(testTokenKey, tokenParceler.wrap(token));

    expect(tokenStorage.get().getValue()).toEqual(token.getValue());
  });

  it('clear remove token', () => {
    const token = nbAuthCreateToken(NbAuthSimpleToken, 'test');
    localStorage.setItem(testTokenKey, tokenParceler.wrap(token));

    tokenStorage.clear();

    expect(localStorage.getItem(testTokenKey)).toBeNull();
  });

  it('clear remove token only', () => {
    const token = nbAuthCreateToken(NbAuthSimpleToken, 'test');
    localStorage.setItem(testTokenKey, tokenParceler.wrap(token));
    localStorage.setItem(testTokenKey + '2', tokenParceler.wrap(token));

    tokenStorage.clear();

    expect(localStorage.getItem(testTokenKey + '2')).toEqual(tokenParceler.wrap(token));
    expect(localStorage.getItem(testTokenKey)).toBeNull();
  });
});
