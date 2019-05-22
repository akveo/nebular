/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { of as observableOf } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { NB_AUTH_OPTIONS, NB_AUTH_USER_OPTIONS, NB_AUTH_STRATEGIES, NB_AUTH_TOKENS } from '../auth.options';
import { NbAuthService } from './auth.service';
import { NbDummyAuthStrategy } from '../strategies/dummy/dummy-strategy';
import { nbStrategiesFactory, nbOptionsFactory } from '../auth.module';
import { NbAuthResult } from './auth-result';
import { NbTokenService } from './token/token.service';
import { NbAuthSimpleToken, nbAuthCreateToken, NbAuthJWTToken } from './token/token';
import { NbTokenLocalStorage, NbTokenStorage } from './token/token-storage';
import { NB_AUTH_FALLBACK_TOKEN, NbAuthTokenParceler } from './token/token-parceler';

describe('auth-service', () => {
  let authService: NbAuthService;
  let tokenService: NbTokenService;
  let dummyAuthStrategy: NbDummyAuthStrategy;
  const testTokenValue = 'test-token';
  const ownerStrategyName = 'dummy';


  const resp401 = new HttpResponse<Object>({body: {}, status: 401});
  const resp200 = new HttpResponse<Object>({body: {}, status: 200});

  const testToken = nbAuthCreateToken(NbAuthSimpleToken, testTokenValue, ownerStrategyName);
  const invalidToken = nbAuthCreateToken(NbAuthSimpleToken, testTokenValue, ownerStrategyName);
  const emptyToken = nbAuthCreateToken(NbAuthSimpleToken, null, null);

  const failResult = new NbAuthResult(false,
    resp401,
    null,
    ['Something went wrong.']);

  const successResult = new NbAuthResult(true,
    resp200,
    '/',
    [],
    ['Successfully logged in.'],
    testToken);

  const successLogoutResult = new NbAuthResult(true,
    resp200,
    '/',
    [],
    ['Successfully logged out.']);

  const successResetPasswordResult = new NbAuthResult(true,
    resp200,
    '/',
    [],
    ['Successfully reset password.']);

  const successRequestPasswordResult = new NbAuthResult(true,
    resp200,
    '/',
    [],
    ['Successfully requested password.']);

  const successRefreshTokenResult = new NbAuthResult(true,
    resp200,
    null,
    [],
    ['Successfully refreshed token.'],
    testToken);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NB_AUTH_OPTIONS, useValue: {} },
        { provide: NB_AUTH_FALLBACK_TOKEN, useValue: NbAuthSimpleToken },
        { provide: NB_AUTH_TOKENS, useValue: [NbAuthSimpleToken, NbAuthJWTToken] },
        NbAuthTokenParceler,
        {
          provide: NB_AUTH_USER_OPTIONS, useValue: {
            forms: {
              login: {
                redirectDelay: 3000,
              },
            },
            strategies: [
              NbDummyAuthStrategy.setup({
                name: 'dummy',

                alwaysFail: true,
                delay: 1000,
              }),
            ],
          },
        },
        { provide: NB_AUTH_OPTIONS, useFactory: nbOptionsFactory, deps: [NB_AUTH_USER_OPTIONS] },
        { provide: NB_AUTH_STRATEGIES, useFactory: nbStrategiesFactory, deps: [NB_AUTH_OPTIONS, Injector] },
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        NbTokenService,
        NbAuthService,
        NbDummyAuthStrategy,
      ],
    });
    authService = TestBed.get(NbAuthService);
    tokenService = TestBed.get(NbTokenService);
    dummyAuthStrategy = TestBed.get(NbDummyAuthStrategy);
  });

  it('get test token before set', () => {
      const spy = spyOn(tokenService, 'get')
        .and
        .returnValue(observableOf(testToken));

      authService.getToken().subscribe((val: NbAuthSimpleToken) => {
        expect(spy).toHaveBeenCalled();
        expect(val.getValue()).toEqual(testTokenValue);
      });
    },
  );

  it('is authenticated true if token exists', () => {
      const spy = spyOn(tokenService, 'get')
        .and
        .returnValue(observableOf(testToken));

      authService.isAuthenticated().subscribe((isAuth: boolean) => {
        expect(spy).toHaveBeenCalled();
        expect(isAuth).toBeTruthy();
      });
    },
  );

  it('is authenticated false if token doesn\'t exist', () => {
      const spy = spyOn(tokenService, 'get')
        .and
        .returnValue(observableOf(emptyToken));

      authService.isAuthenticated().subscribe((isAuth: boolean) => {
        expect(spy).toHaveBeenCalled();
        expect(isAuth).toBeFalsy();
      });
    },
  );

  it('isAuthenticatedOrRefresh, token valid, strategy refreshToken not called, returns true', (done) => {
      const spy = spyOn(dummyAuthStrategy, 'refreshToken')

      spyOn(tokenService, 'get')
        .and
        .returnValue(observableOf(testToken));

      authService.isAuthenticatedOrRefresh()
        .pipe(first())
        .subscribe((isAuth: boolean) => {
          expect(spy).not.toHaveBeenCalled();
          expect(isAuth).toBeTruthy();
          done();
        });
    },
  );

  it('isAuthenticatedOrRefresh, token invalid, strategy refreshToken called, returns true', (done) => {

      spyOn(invalidToken, 'isValid')
        .and
        .returnValue(false);

      const spy = spyOn(dummyAuthStrategy, 'refreshToken')
        .and
        .returnValue(observableOf(successResult));

      spyOn(tokenService, 'get')
        .and
        .returnValues(observableOf(invalidToken), observableOf(testToken));

      authService.isAuthenticatedOrRefresh()
        .pipe(first())
        .subscribe((isAuth: boolean) => {
          expect(spy).toHaveBeenCalled();
          expect(isAuth).toBeTruthy();
          done();
        });
    },
  );

  it('isAuthenticatedOrRefresh, token invalid, strategy refreshToken called, returns false', (done) => {

      spyOn(invalidToken, 'isValid')
        .and
        .returnValue(false);

      const spy = spyOn(dummyAuthStrategy, 'refreshToken')
        .and
        .returnValue(observableOf(failResult));

      spyOn(tokenService, 'get')
        .and
        .returnValues(observableOf(invalidToken), observableOf(invalidToken));

      authService.isAuthenticatedOrRefresh()
        .pipe(first())
        .subscribe((isAuth: boolean) => {
          expect(spy).toHaveBeenCalled();
          expect(isAuth).toBeFalsy();
          done();
        });
    },
  );

  it('isAuthenticatedOrRefresh, token doesn\'t exist, strategy refreshToken called, returns false', (done) => {
      const spy = spyOn(tokenService, 'get')
        .and
        .returnValue(observableOf(emptyToken));

      authService.isAuthenticatedOrRefresh()
        .pipe(first())
        .subscribe((isAuth: boolean) => {
          expect(spy).toHaveBeenCalled();
          expect(isAuth).toBeFalsy();
          done();
        });
    },
  );

  it('onTokenChange return correct stream and gets test token', (done) => {
      const spy = spyOn(tokenService, 'tokenChange')
        .and
        .returnValue(observableOf(testToken));

      authService.onTokenChange()
        .pipe(first())
        .subscribe((token: NbAuthSimpleToken) => {
          expect(spy).toHaveBeenCalled();
          expect(token.getValue()).toEqual(testTokenValue);
          done();
        });
    },
  );

  it('authenticate failed', (done) => {
      const spy = spyOn(dummyAuthStrategy, 'authenticate')
        .and
        .returnValue(observableOf(failResult)
          .pipe(
            delay(1000),
          ));

      authService.authenticate(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(spy).toHaveBeenCalled();
        expect(authRes.isFailure()).toBeTruthy();
        expect(authRes.isSuccess()).toBeFalsy();
        expect(authRes.getMessages()).toEqual([]);
        expect(authRes.getErrors()).toEqual(['Something went wrong.']);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getToken()).toBe(null);
        expect(authRes.getResponse()).toEqual(resp401);
        done();
      })
    },
  );

  it('authenticate succeed', (done) => {
      const strategySpy = spyOn(dummyAuthStrategy, 'authenticate')
        .and
        .returnValue(observableOf(successResult)
          .pipe(
            delay(1000),
          ));

      const tokenServiceSetSpy = spyOn(tokenService, 'set')
        .and
        .returnValue(observableOf(null));


      authService.authenticate(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(strategySpy).toHaveBeenCalled();
        expect(tokenServiceSetSpy).toHaveBeenCalled();


        expect(authRes.isFailure()).toBeFalsy();
        expect(authRes.isSuccess()).toBeTruthy();
        expect(authRes.getMessages()).toEqual(['Successfully logged in.']);
        expect(authRes.getErrors()).toEqual([]);
        expect(authRes.getRedirect()).toEqual('/');
        expect(authRes.getToken()).toEqual(testToken);
        expect(authRes.getResponse()).toEqual(resp200);
        done();
      })
    },
  );

  it('register failed', (done) => {
      const spy = spyOn(dummyAuthStrategy, 'register')
        .and
        .returnValue(observableOf(failResult)
          .pipe(
            delay(1000),
          ));

      authService.register(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(spy).toHaveBeenCalled();
        expect(authRes.isFailure()).toBeTruthy();
        expect(authRes.isSuccess()).toBeFalsy();
        expect(authRes.getMessages()).toEqual([]);
        expect(authRes.getErrors()).toEqual(['Something went wrong.']);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getToken()).toBe(null);
        expect(authRes.getResponse()).toEqual(resp401);
        done();
      })
    },
  );

  it('register succeed', (done) => {
      const strategySpy = spyOn(dummyAuthStrategy, 'register')
        .and
        .returnValue(observableOf(successResult)
          .pipe(
            delay(1000),
          ));

      const tokenServiceSetSpy = spyOn(tokenService, 'set')
        .and
        .returnValue(observableOf(null));

      authService.register(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(strategySpy).toHaveBeenCalled();
        expect(tokenServiceSetSpy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeFalsy();
        expect(authRes.isSuccess()).toBeTruthy();
        expect(authRes.getMessages()).toEqual(['Successfully logged in.']);
        expect(authRes.getErrors()).toEqual([]);
        expect(authRes.getRedirect()).toEqual('/');
        expect(authRes.getToken()).toEqual(testToken);
        expect(authRes.getResponse()).toEqual(resp200);
        done();
      })
    },
  );

  it('logout failed', (done) => {
      const spy = spyOn(dummyAuthStrategy, 'logout')
        .and
        .returnValue(observableOf(failResult)
          .pipe(
            delay(1000),
          ));

      authService.logout(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(spy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeTruthy();
        expect(authRes.isSuccess()).toBeFalsy();
        expect(authRes.getMessages()).toEqual([]);
        expect(authRes.getErrors()).toEqual(['Something went wrong.']);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getToken()).toBe(null);
        expect(authRes.getResponse()).toEqual(resp401);
        done();
      })
    },
  );

  it('logout succeed', (done) => {
      const strategyLogoutSpy = spyOn(dummyAuthStrategy, 'logout')
        .and
        .returnValue(observableOf(successLogoutResult)
          .pipe(
            delay(1000),
          ));
      const tokenServiceClearSpy = spyOn(tokenService, 'clear').and.returnValue(observableOf('STUB'));

      authService.logout(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(strategyLogoutSpy).toHaveBeenCalled();
        expect(tokenServiceClearSpy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeFalsy();
        expect(authRes.isSuccess()).toBeTruthy();
        expect(authRes.getMessages()).toEqual(['Successfully logged out.']);
        expect(authRes.getErrors()).toEqual([]);
        expect(authRes.getRedirect()).toEqual('/');
        expect(authRes.getToken()).toBe(null);
        expect(authRes.getResponse()).toEqual(resp200);
        done();
      })
    },
  );

  it('requestPassword failed', (done) => {
      const spy = spyOn(dummyAuthStrategy, 'requestPassword')
        .and
        .returnValue(observableOf(failResult)
          .pipe(
            delay(1000),
          ));

      authService.requestPassword(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(spy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeTruthy();
        expect(authRes.isSuccess()).toBeFalsy();
        expect(authRes.getMessages()).toEqual([]);
        expect(authRes.getErrors()).toEqual(['Something went wrong.']);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getToken()).toBe(null);
        expect(authRes.getResponse()).toEqual(resp401);
        done();
      })
    },
  );

  it('requestPassword succeed', (done) => {
      const strategyLogoutSpy = spyOn(dummyAuthStrategy, 'requestPassword')
        .and
        .returnValue(observableOf(successRequestPasswordResult)
          .pipe(
            delay(1000),
          ));

      authService.requestPassword(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(strategyLogoutSpy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeFalsy();
        expect(authRes.isSuccess()).toBeTruthy();
        expect(authRes.getMessages()).toEqual(['Successfully requested password.']);
        expect(authRes.getErrors()).toEqual([]);
        expect(authRes.getRedirect()).toEqual('/');
        expect(authRes.getToken()).toBe(null);
        expect(authRes.getResponse()).toEqual(resp200);
        done();
      })
    },
  );

  it('resetPassword failed', (done) => {
      const spy = spyOn(dummyAuthStrategy, 'resetPassword')
        .and
        .returnValue(observableOf(failResult)
          .pipe(
            delay(1000),
          ));

      authService.resetPassword(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(spy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeTruthy();
        expect(authRes.isSuccess()).toBeFalsy();
        expect(authRes.getMessages()).toEqual([]);
        expect(authRes.getErrors()).toEqual(['Something went wrong.']);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getToken()).toBe(null);
        expect(authRes.getResponse()).toEqual(resp401);
        done();
      })
    },
  );

  it('resetPassword succeed', (done) => {
      const strategyLogoutSpy = spyOn(dummyAuthStrategy, 'resetPassword')
        .and
        .returnValue(observableOf(successResetPasswordResult)
          .pipe(
            delay(1000),
          ));

      authService.resetPassword(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(strategyLogoutSpy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeFalsy();
        expect(authRes.isSuccess()).toBeTruthy();
        expect(authRes.getMessages()).toEqual(['Successfully reset password.']);
        expect(authRes.getErrors()).toEqual([]);
        expect(authRes.getRedirect()).toEqual('/');
        expect(authRes.getToken()).toBe(null);
        expect(authRes.getResponse()).toEqual(resp200);
        done();
      })
    },
  );

  it('refreshToken failed', (done) => {
      const spy = spyOn(dummyAuthStrategy, 'refreshToken')
        .and
        .returnValue(observableOf(failResult)
          .pipe(
            delay(1000),
          ));

      authService.refreshToken(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(spy).toHaveBeenCalled();
        expect(authRes.isFailure()).toBeTruthy();
        expect(authRes.isSuccess()).toBeFalsy();
        expect(authRes.getMessages()).toEqual([]);
        expect(authRes.getErrors()).toEqual(['Something went wrong.']);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getToken()).toBe(null);
        expect(authRes.getResponse()).toEqual(resp401);
        done();
      })
    },
  );

  it('refreshToken succeed', (done) => {
      const strategySpy = spyOn(dummyAuthStrategy, 'refreshToken')
        .and
        .returnValue(observableOf(successRefreshTokenResult)
          .pipe(
            delay(1000),
          ));

      const tokenServiceSetSpy = spyOn(tokenService, 'set')
        .and
        .returnValue(observableOf(null));

      authService.refreshToken(ownerStrategyName).subscribe((authRes: NbAuthResult) => {
        expect(strategySpy).toHaveBeenCalled();
        expect(tokenServiceSetSpy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeFalsy();
        expect(authRes.isSuccess()).toBeTruthy();
        expect(authRes.getMessages()).toEqual(['Successfully refreshed token.']);
        expect(authRes.getErrors()).toEqual([]);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getToken()).toEqual(testToken);
        expect(authRes.getResponse()).toEqual(resp200);
        done();
      })
    },
  );
});
