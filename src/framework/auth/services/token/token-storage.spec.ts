/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';

import { NbTokenLocalStorage, NbTokenStorage } from './token-storage';
import { NB_AUTH_TOKEN_CLASS } from '../../auth.options';
import { NbAuthSimpleToken, nbCreateToken, NbTokenClass } from './token';

describe('token-storage', () => {

  let tokenStorage: NbTokenStorage;
  let tokenClass: NbTokenClass;
  const testTokenKey = 'auth_app_token';
  const testTokenValue = 'test-token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthSimpleToken },
      ],
    });
  });

    beforeEach(async(inject(
    [NbTokenStorage, NB_AUTH_TOKEN_CLASS],
    (_tokenStorage, _tokenClass) => {
      tokenStorage = _tokenStorage;
      tokenClass = _tokenClass;
    },
  )));

  afterEach(() => {
    localStorage.removeItem(testTokenKey);
  });

  it('set test raw token', () => {
      tokenStorage.setRaw(testTokenValue);
      expect(localStorage.getItem(testTokenKey)).toEqual(testTokenValue);
  });

  it('setter set raw invalid token to localStorage as raw value', () => {
      tokenStorage.setRaw(null);
      expect(localStorage.getItem(testTokenKey)).toEqual('null');
      tokenStorage.setRaw(undefined);
      expect(localStorage.getItem(testTokenKey)).toEqual('undefined');
  });

  it('set test token', () => {
    const token = nbCreateToken(tokenClass, testTokenValue);

    tokenStorage.set(token);
    expect(localStorage.getItem(testTokenKey)).toEqual(testTokenValue);
  });

  it('setter set invalid token to localStorage as empty string', () => {
    let token;

    token = nbCreateToken(tokenClass, null);
    tokenStorage.set(token);
    expect(localStorage.getItem(testTokenKey)).toEqual('');

    token = nbCreateToken(tokenClass, undefined);
    tokenStorage.set(token);
    expect(localStorage.getItem(testTokenKey)).toEqual('');
  });

  it('get return null in case token was not set', () => {
    const token = tokenStorage.get();
    expect(token.getValue()).toBeNull();
    expect(token.isValid()).toBe(false);
  });


  it('should return correct value', () => {
    localStorage.setItem(testTokenKey, testTokenValue);

    const token = tokenStorage.get();
    expect(token.getValue()).toEqual(testTokenValue);
  });

  it('clear remove token', () => {
    localStorage.setItem(testTokenKey, testTokenValue);

    tokenStorage.clear();

    expect(localStorage.getItem(testTokenKey)).toBeNull();
  });

  it('clear remove token only', () => {
    localStorage.setItem(testTokenKey, testTokenValue);
    localStorage.setItem(testTokenKey + '2', testTokenValue);

    tokenStorage.clear();

    expect(localStorage.getItem(testTokenKey + '2')).toEqual(testTokenValue);
    expect(localStorage.getItem(testTokenKey)).toBeNull();
  });
});
