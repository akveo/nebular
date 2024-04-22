/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import {
  NbTokenLocalStorage,
  NbTokenStorage,
  NbAuthSimpleToken,
  NbAuthToken,
  nbAuthCreateToken,
  NbTokenService,
  NbAuthJWTToken,
  NB_AUTH_FALLBACK_TOKEN,
  NbAuthTokenParceler,
  NB_AUTH_TOKENS,
} from '@nebular/auth';

const noop = () => {};
const ownerStrategyName = 'strategy';

describe('token-service', () => {
  let tokenService: NbTokenService;
  let tokenStorage: NbTokenLocalStorage;
  const simpleToken = nbAuthCreateToken(NbAuthSimpleToken, 'test value', ownerStrategyName);
  const emptyToken = nbAuthCreateToken(NbAuthSimpleToken, '', ownerStrategyName);
  const testTokenKey = 'auth_app_token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        { provide: NB_AUTH_FALLBACK_TOKEN, useValue: NbAuthSimpleToken },
        { provide: NB_AUTH_TOKENS, useValue: [NbAuthSimpleToken, NbAuthJWTToken] },
        NbAuthTokenParceler,
        NbTokenService,
      ],
    });
  });

  beforeEach(
    waitForAsync(
      inject([NbTokenService, NbTokenStorage], (_tokenService, _tokenStorage) => {
        tokenService = _tokenService;
        tokenStorage = _tokenStorage;
      }),
    ),
  );

  afterEach(() => {
    localStorage.removeItem(testTokenKey);
  });

  it('set calls storage set', () => {
    const spy = spyOn(tokenStorage, 'set').and.returnValue(null);

    tokenService.set(simpleToken).subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('get return null in case token was not set', () => {
    const spy = spyOn(tokenStorage, 'get').and.returnValue(emptyToken);

    tokenService.get().subscribe((token: NbAuthToken) => {
      expect(spy).toHaveBeenCalled();
      expect(token.getValue()).toEqual('');
      expect(token.isValid()).toBe(false);
    });
  });

  it('should return correct value', () => {
    tokenService.set(simpleToken).subscribe(noop);

    tokenService.get().subscribe((token: NbAuthToken) => {
      expect(token.getValue()).toEqual(simpleToken.getValue());
    });
  });

  it('clear remove token', () => {
    const spy = spyOn(tokenStorage, 'clear').and.returnValue(null);

    tokenService.set(simpleToken).subscribe(noop);

    tokenService.clear().subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('token should be published', (done) => {
    tokenService
      .tokenChange()
      .pipe(take(1))
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual('');
      });
    tokenService.set(simpleToken).subscribe(noop);
    tokenService.tokenChange().subscribe((token: NbAuthToken) => {
      expect(token.getValue()).toEqual(simpleToken.getValue());
      done();
    });
  });

  it('clear should be published', (done) => {
    tokenService
      .tokenChange()
      .pipe(take(1))
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual('');
      });
    tokenService.set(simpleToken).subscribe(noop);
    tokenService
      .tokenChange()
      .pipe(take(1))
      .subscribe((token: NbAuthToken) => {
        expect(token.getValue()).toEqual(simpleToken.getValue());
      });
    tokenService.clear().subscribe(noop);
    tokenService.tokenChange().subscribe((token: NbAuthToken) => {
      expect(token.getValue()).toEqual('');
      done();
    });
  });
});
