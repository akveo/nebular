/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { NbTokenLocalStorage, NbTokenStorage } from './token-storage';
import {NbAuthSimpleToken, NbAuthToken, nbAuthCreateToken, NbAuthOAuth2JWTToken} from './token';
import { NbTokenService } from './token.service';
import { NbAuthJWTToken } from '@nebular/auth/services/token/token';
import { NB_AUTH_FALLBACK_TOKEN, NbAuthTokenParceler } from './token-parceler';
import { NB_AUTH_TOKENS } from '../../auth.options';

const noop = () => {};
const ownerStrategyName = 'strategy';

describe('token-service', () => {

  let tokenService: NbTokenService;
  let tokenStorage: NbTokenLocalStorage;
  const simpleToken = nbAuthCreateToken(NbAuthSimpleToken, 'test value', ownerStrategyName);
  const emptyToken = nbAuthCreateToken(NbAuthSimpleToken, '', ownerStrategyName);
  const testTokenKey = 'auth_app_token';

  const expiredTokenPayload = {
    // tslint:disable-next-line
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsImV4cCI6MTUzMjQ1MDgwMCwic3ViIjoiQWxhaW4gQ0hBUkxFUyIsImFkbWluIjp0cnVlfQ.sGgt_HzYoA8o859xSNmCh5ubHrh1qpxeLhubZ1Fyfy8',
    expires_in: 100000,
    refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
    token_type: 'bearer',
  };

  const refreshedTokenPayload = {
    // tslint:disable-next-line
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzI1NTA4MDAsImV4cCI6MjUzMjU1MDgwMCwic3ViIjoiQWxhaW4gQ0hBUkxFUyIsImFkbWluIjp0cnVlfQ.Sfkh1qqAVHG5Pqx_XA9i1qEhNa9Qw1wOplrym0Dq91s',
    expires_in: 1000000000,
    token_type: 'bearer',
  };

  const refreshedTokenStoredPayload = {
    ... refreshedTokenPayload,
    refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
  }

  const expiredToken = nbAuthCreateToken(NbAuthOAuth2JWTToken, expiredTokenPayload, ownerStrategyName);
  const refreshedToken = nbAuthCreateToken(NbAuthOAuth2JWTToken, refreshedTokenPayload, ownerStrategyName);
  const refreshedTokenStored = nbAuthCreateToken(NbAuthOAuth2JWTToken, refreshedTokenStoredPayload, ownerStrategyName);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        { provide: NB_AUTH_FALLBACK_TOKEN, useValue: NbAuthSimpleToken },
        { provide: NB_AUTH_TOKENS, useValue: [NbAuthSimpleToken, NbAuthJWTToken, NbAuthOAuth2JWTToken] },
        NbAuthTokenParceler,
        NbTokenService,
      ],
    });
  });

    beforeEach(async(inject(
    [NbTokenService, NbTokenStorage],
    (_tokenService, _tokenStorage) => {
      tokenService = _tokenService;
      tokenStorage = _tokenStorage;
    },
  )));

  afterEach(() => {
    localStorage.removeItem(testTokenKey);
  });

  it('set calls storage set', () => {

    const spy = spyOn(tokenStorage, 'set')
      .and
      .returnValue(null);

    tokenService.set(simpleToken).subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('get return null in case token was not set', () => {

    const spy = spyOn(tokenStorage, 'get')
      .and
      .returnValue(emptyToken);

    tokenService.get()
      .subscribe((token: NbAuthToken) => {
        expect(spy).toHaveBeenCalled();
        expect(token.getValue()).toEqual('');
        expect(token.isValid()).toBe(false);
      })
  });

  it('should return correct value', () => {
    tokenService.set(simpleToken).subscribe(noop);

    tokenService.get()
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual(simpleToken.getValue());
      });
  });

  it('clear remove token', () => {

    const spy = spyOn(tokenStorage, 'clear')
      .and
      .returnValue(null);

    tokenService.set(simpleToken).subscribe(noop);

    tokenService.clear().subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('token should be published', (done) => {
    tokenService.tokenChange()
      .pipe(take(1))
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual('');
      });
    tokenService.set(simpleToken).subscribe(noop);
    tokenService.tokenChange()
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual(simpleToken.getValue());
        done();
      });
  });

  it('clear should be published', (done) => {
    tokenService.tokenChange()
      .pipe(take(1))
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual('');
      });
    tokenService.set(simpleToken).subscribe(noop);
    tokenService.tokenChange()
      .pipe(take(1))
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual(simpleToken.getValue());
      });
    tokenService.clear().subscribe(noop);
    tokenService.tokenChange()
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual('');
        done();
      });
  })

  it('Stored refreshed token must have the refresh token value', () => {
    tokenService.set(expiredToken).subscribe(noop);
    tokenService.set(refreshedToken).subscribe(noop);
    tokenService.get().subscribe((token: NbAuthToken) => {
      expect(token).toEqual(refreshedTokenStored);
    })
  });

});
