/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAuthJWTToken, NbAuthSimpleToken, NbTokenService } from './token.service';
import { async, inject, TestBed } from '@angular/core/testing';
import { NB_AUTH_OPTIONS_TOKEN, NB_AUTH_TOKEN_WRAPPER_TOKEN } from '../auth.options';

describe('token-service: default config', () => {
  let tokenService: NbTokenService;
  const testTokenKey = 'auth_app_token';
  const testTokenValue = 'test-token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NB_AUTH_OPTIONS_TOKEN, useValue: {}},
        {provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthSimpleToken},
        NbTokenService,
      ],
    });
    tokenService = TestBed.get(NbTokenService);
  });

  // Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    [NbTokenService],
    (_tokenService) => {
      tokenService = _tokenService
    },
  )));

  afterEach(() => {
    localStorage.removeItem(testTokenKey);
  });

  it('set test token', () => {
      tokenService.set(testTokenValue).subscribe();
      expect(localStorage.getItem(testTokenKey)).toEqual(testTokenValue);
    },
  );

  it('setter set invalid token to localStorage as empty string', () => {
      tokenService.set(null);
      expect(localStorage.getItem(testTokenKey)).toEqual('');
      tokenService.set(undefined);
      expect(localStorage.getItem(testTokenKey)).toEqual('');
    },
  );

  it('get return null in case token was not set', () => {
    tokenService.get().subscribe((resp: NbAuthSimpleToken) => {
      expect(resp.getValue()).toBeNull();
    });
  });

  it('should return correct value', () => {
    localStorage.setItem(testTokenKey, testTokenValue);

    tokenService.get().subscribe((resp: NbAuthSimpleToken) => {
      expect(resp.getValue()).toEqual(testTokenValue);
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

  it('token should be published', (done) => {
    tokenService.set(testTokenValue).subscribe();
    tokenService.tokenChange()
      .subscribe((token: NbAuthSimpleToken) => {
        expect(token.getValue()).toEqual(testTokenValue);
        done();
      });
  });

  it('clear should be published', (done) => {
    tokenService.set(testTokenValue).subscribe();
    tokenService.clear().subscribe();
    tokenService.tokenChange()
      .subscribe((token: NbAuthSimpleToken) => {
        expect(token.getValue()).toBeNull();
        done();
      });
  });
});

describe('auth JWT token', () => {
  const validJWTToken = new NbAuthJWTToken();
  // tslint:disable
  validJWTToken.setValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjI1MTczMTQwNjYxNzUsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0=.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773');
  const emptyJWTToken = new NbAuthJWTToken();
  emptyJWTToken.setValue('..');

  const invakidJWTToken = new NbAuthJWTToken();
  invakidJWTToken.setValue('.');

  const noExpJWTToken = new NbAuthJWTToken();
  noExpJWTToken.setValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJuYW1lIjoiQ2hyaXMgU2V2aWxsZWphIiwiYWRtaW4iOnRydWV9.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773');

  const expiredJWTToken = new NbAuthJWTToken();
  expiredJWTToken.setValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773');
  // tslint:enable

  it('getPayload success', () => {
    expect(validJWTToken.getPayload())
      .toEqual(JSON.parse('{"iss":"scotch.io","exp":2517314066175,"name":"Chris Sevilleja","admin":true}'));
  });

  it('getPayload, not valid JWT token, must consist of three parts', () => {
    expect(() => {
      invakidJWTToken.getPayload();
    })
      .toThrow(new Error(
        `The token ${invakidJWTToken.getValue()} is not valid JWT token and must consist of three parts.`));
  });

  it('getPayload, not valid JWT token, cannot be decoded', () => {
    expect(() => {
      emptyJWTToken.getPayload();
    })
      .toThrow(new Error(
        `The token ${emptyJWTToken.getValue()} is not valid JWT token and cannot be decoded.`));
  });

  it('getTokenExpDate success', () => {
    const date = new Date(0);
    date.setUTCSeconds(2517314066175);
    expect(validJWTToken.getTokenExpDate()).toEqual(date);
  });

  it('getTokenExpDate fail', () => {
    expect(noExpJWTToken.getTokenExpDate()).toBeNull();
  });

  it('isValid success', () => {
    expect(validJWTToken.isValid()).toBeTruthy();
  });

  it('isValid fail', () => {
    // without token
    expect(new NbAuthJWTToken().isValid()).toBeFalsy();

    // expired date
    expect(expiredJWTToken.isValid()).toBeFalsy();
  });
});
