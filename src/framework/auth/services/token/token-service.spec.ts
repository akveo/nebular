/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';

import { NbTokenLocalStorage, NbTokenStorage } from './token-storage';
import { NB_AUTH_TOKEN_CLASS } from '../../auth.options';
import { NbAuthSimpleToken, NbAuthToken, nbCreateToken, NbTokenClass } from './token';
import { NbTokenService } from './token.service';

const noop = () => {};

describe('token-service', () => {

  let tokenService: NbTokenService;
  let tokenClass: NbTokenClass;
  const testTokenKey = 'auth_app_token';
  const testTokenValue = 'test-token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthSimpleToken },
        NbTokenService,
      ],
    });
  });

    beforeEach(async(inject(
    [NbTokenService, NB_AUTH_TOKEN_CLASS],
    (_tokenService, _tokenClass) => {
      tokenService = _tokenService;
      tokenClass = _tokenClass;
    },
  )));

  afterEach(() => {
    localStorage.removeItem(testTokenKey);
  });

  it('set test raw token', () => {
      tokenService.setRaw(testTokenValue).subscribe(noop);
      expect(localStorage.getItem(testTokenKey)).toEqual(testTokenValue);
  });

  it('setter set raw invalid token to localStorage as raw value', () => {
      tokenService.setRaw(null).subscribe(noop);
      expect(localStorage.getItem(testTokenKey)).toEqual('null');
      tokenService.setRaw(undefined).subscribe(noop);
      expect(localStorage.getItem(testTokenKey)).toEqual('undefined');
  });

  it('set test token', () => {
    const token = nbCreateToken(tokenClass, testTokenValue);

    tokenService.set(token).subscribe(noop);
    expect(localStorage.getItem(testTokenKey)).toEqual(testTokenValue);
  });

  it('setter set invalid token to localStorage as empty string', () => {
    let token;

    token = nbCreateToken(tokenClass, null);
    tokenService.set(token).subscribe(noop);
    expect(localStorage.getItem(testTokenKey)).toEqual('');

    token = nbCreateToken(tokenClass, undefined);
    tokenService.set(token).subscribe(noop);
    expect(localStorage.getItem(testTokenKey)).toEqual('');
  });

  it('get return null in case token was not set', () => {
    tokenService.get()
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toBeNull();
        expect(token.isValid()).toBe(false);
      })
  });

  it('should return correct value', () => {
    localStorage.setItem(testTokenKey, testTokenValue);

    tokenService.get()
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual(testTokenValue);
      });
  });

  it('clear remove token', () => {
    localStorage.setItem(testTokenKey, testTokenValue);

    tokenService.clear().subscribe(noop);

    expect(localStorage.getItem(testTokenKey)).toBeNull();
  });

  it('clear remove token only', () => {
    localStorage.setItem(testTokenKey, testTokenValue);
    localStorage.setItem(testTokenKey + '2', testTokenValue);

    tokenService.clear().subscribe(noop);

    expect(localStorage.getItem(testTokenKey + '2')).toEqual(testTokenValue);
    expect(localStorage.getItem(testTokenKey)).toBeNull();
  });

  it('token should be published', (done) => {
    tokenService.set(nbCreateToken(tokenClass, testTokenValue)).subscribe(noop);
    tokenService.tokenChange()
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual(testTokenValue);
        done();
      });
  });

  it('raw token should be published as token object', (done) => {
    tokenService.setRaw(testTokenValue).subscribe(noop);
    tokenService.tokenChange()
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual(testTokenValue);
        done();
      });
  });

  it('clear should be published', (done) => {
    tokenService.set(nbCreateToken(tokenClass, testTokenValue)).subscribe(noop);
    tokenService.clear().subscribe(noop);
    tokenService.tokenChange()
      .subscribe((token: NbAuthSimpleToken) => {
        expect(token.getValue()).toBeNull();
        done();
      });
  });
});
