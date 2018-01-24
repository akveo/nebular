/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAuthSimpleToken, NbTokenService } from './token.service';
import { async, inject, TestBed } from '@angular/core/testing';
import { NB_AUTH_OPTIONS_TOKEN, NB_AUTH_TOKEN_WRAPPER_TOKEN } from '../auth.options';

describe('token-service: default config', () => {
  let tokenService: NbTokenService;
  let store;
  const testTokenKey = 'auth_app_token';
  const testTokenValue = 'test-token';

  beforeEach(() => {
    // mock for local storage
    store = {};
    const localStorage = window.localStorage;
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key] !== undefined ? store[key] : null;
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'removeItem').and.callFake(function (key, value) {
      delete store[key];
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
      store = {};
    });

    TestBed.configureTestingModule({
      providers: [
        {provide: NB_AUTH_OPTIONS_TOKEN, useValue: {}},
        {provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthSimpleToken},
        NbTokenService,
      ],
    });
  });

  // Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    [NbTokenService],
    (_tokenService) => {
      tokenService = _tokenService
    },
  )));

  it('set test token', () => {
      tokenService.set(testTokenValue).subscribe();
      expect(localStorage.getItem(testTokenKey)).toEqual(testTokenValue);
    },
  );

  it('set null as string', () => {
      tokenService.set(null);
      expect(localStorage.getItem(testTokenKey)).toEqual('null');
    },
  );

  it('get return null in case token was not set', () => {
    tokenService.get().subscribe(resp => {
      expect(resp['token']).toBeNull();
    });
  });

  it('should return correct value', () => {
    localStorage.setItem(testTokenKey, testTokenValue);

    tokenService.get().subscribe(resp => {
      expect(resp['token']).toEqual(testTokenValue);
    });
  });

  it('clear remove token', () => {
    localStorage.setItem(testTokenKey, testTokenValue);

    tokenService.clear().subscribe();

    expect(localStorage.getItem(testTokenKey)).toBeNull();
  });

  it('clear remove token only', () => {
    localStorage.setItem(testTokenKey, testTokenValue);
    localStorage.setItem(testTokenKey + '2', testTokenValue);

    tokenService.clear().subscribe();

    expect(localStorage.getItem(testTokenKey + '2')).toEqual(testTokenValue);
    expect(localStorage.getItem(testTokenKey)).toBeNull();
  });

  it('token should be published', () => {
    let token: any;

    const subscription = tokenService.tokenChange()
      .subscribe((changedToken: NbAuthSimpleToken) => {
        token = changedToken;
      });

    try {
      expect(token.getValue()).toBeNull();

      tokenService.set(testTokenValue).subscribe();
      expect(token.getValue()).toEqual(testTokenValue);

      tokenService.clear().subscribe();

      expect(token.getValue()).toBeNull();
    } finally {
      subscription.unsubscribe();
    }
  });
});
