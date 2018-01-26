/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAuthSimpleToken, NbTokenService } from './token.service';
import { async, inject, TestBed } from '@angular/core/testing';
import { NB_AUTH_OPTIONS_TOKEN, NB_AUTH_TOKEN_WRAPPER_TOKEN, NB_AUTH_USER_OPTIONS_TOKEN } from '../auth.options';
import { NbAuthResult, NbAuthService } from './auth.service';
import { nbAuthServiceFactory } from '../../../../docs/framework/auth/auth.module';
import { Injector } from '@angular/core';
import { NbDummyAuthProvider } from '../providers/dummy-auth.provider';
import { nbOptionsFactory } from '../auth.module';
import { HttpResponse } from '@angular/common/http';
import { of as observableOf } from 'rxjs/observable/of';
import { first } from 'rxjs/operators';

describe('auth-service', () => {
  let authService: NbAuthService;
  let tokenService: NbTokenService;
  let dummyAuthProvider: NbDummyAuthProvider;
  let store;
  const testTokenValue = 'test-token';

  const resp401 = new HttpResponse<Object>({body: {}, status: 401});
  const resp200 = new HttpResponse<Object>({body: {}, status: 200});

  const tokenWrapper = new NbAuthSimpleToken();

  const failResult = new NbAuthResult(false,
    resp401,
    null,
    ['Something went wrong.']);

  const successResult = new NbAuthResult(true,
    resp200,
    '/',
    [],
    ['Successfully logged in.'],

    // TODO in case we dont set this optional param we will not replace to new one during authenticate
    tokenWrapper);

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
        {
          provide: NB_AUTH_USER_OPTIONS_TOKEN, useValue: {
            forms: {
              login: {
                redirectDelay: 3000,
              },
            },
            providers: {
              dummy: {
                service: NbDummyAuthProvider,
                config: {
                  alwaysFail: true,
                  delay: 1000,
                },
              },
            },
          },
        },
        {provide: NB_AUTH_OPTIONS_TOKEN, useFactory: nbOptionsFactory, deps: [NB_AUTH_USER_OPTIONS_TOKEN]},
        NbTokenService,
        {
          provide: NbAuthService,
          useFactory: nbAuthServiceFactory,
          deps: [NB_AUTH_OPTIONS_TOKEN, NbTokenService, Injector],
        },
        NbDummyAuthProvider,
      ],
    });
    tokenService = TestBed.get(NbTokenService);
    dummyAuthProvider = TestBed.get(NbDummyAuthProvider);
    tokenWrapper.setValue(testTokenValue);
  });

  // Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    [NbAuthService],
    (_authService) => {
      authService = _authService
    },
  )));

  it('get test token before set', () => {
      const spy = spyOn(tokenService, 'get')
        .and
        .returnValue(observableOf(tokenWrapper));

      authService.getToken().subscribe((val: NbAuthSimpleToken) => {
        expect(spy).toHaveBeenCalled();
        expect(val.getValue()).toEqual(testTokenValue);
      });
    },
  );

  it('is authenticated true if token exists', () => {
      const spy = spyOn(tokenService, 'get')
        .and
        .returnValue(observableOf(tokenWrapper));

      authService.isAuthenticated().subscribe((isAuth: boolean) => {
        expect(spy).toHaveBeenCalled();
        expect(isAuth).toBeTruthy();
      });
    },
  );

  it('is authenticated false if token doesn\'t exist', () => {
      tokenWrapper.setValue('');
      const spy = spyOn(tokenService, 'get')
        .and
        .returnValue(observableOf(tokenWrapper));

      authService.isAuthenticated().subscribe((isAuth: boolean) => {
        expect(spy).toHaveBeenCalled();
        expect(isAuth).toBeFalsy();
      });
    },
  );

  it('onTokenChange return correct stream and gets test token', (done) => {
      const spy = spyOn(tokenService, 'tokenChange')
        .and
        .returnValue(observableOf(tokenWrapper));

      authService.onTokenChange()
        .pipe(first())
        .subscribe((token: NbAuthSimpleToken) => {
          expect(spy).toHaveBeenCalled();
          expect(token.getValue()).toEqual(testTokenValue);
          done();
        });
    },
  );

  // TODO Could be removed if token immutable
  it('onTokenChange return correct stream and return null token', (done) => {
      tokenWrapper.setValue(null);
      const spy = spyOn(tokenService, 'tokenChange')
        .and
        .returnValue(observableOf(tokenWrapper));

      authService.onTokenChange()
        .pipe(first())
        .subscribe((token: NbAuthSimpleToken) => {
          expect(spy).toHaveBeenCalled();
          expect(token.getValue()).toBeNull();
          done();
        });
    },
  );

  it('authenticate failed with dummy provider', (done) => {
      const spy = spyOn(dummyAuthProvider, 'authenticate')
        .and
        .returnValue(observableOf(failResult).delay(1000));

      authService.authenticate('dummy').subscribe((authRes: NbAuthResult) => {
        expect(spy).toHaveBeenCalled();
        expect(authRes.isFailure()).toBeTruthy();
        expect(authRes.isSuccess()).toBeFalsy();
        expect(authRes.getMessages()).toEqual([]);
        expect(authRes.getErrors()).toEqual(['Something went wrong.']);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getTokenValue()).toBeUndefined();
        expect(authRes.getResponse()).toEqual(resp401);
        done();
      })
    },
  );

  it('authenticate succeed with dummy provider', (done) => {
      const providerSpy = spyOn(dummyAuthProvider, 'authenticate')
        .and
        .returnValue(observableOf(successResult).delay(1000));

      const tokenServiceSetSpy = spyOn(tokenService, 'set')
        .and
        .returnValue(observableOf('STUB'));

      tokenWrapper.setValue('Replaced');
      const tokenServiceGetSpy = spyOn(tokenService, 'get')
        .and
        .returnValue(observableOf(tokenWrapper));

      authService.authenticate('dummy').subscribe((authRes: NbAuthResult) => {
        expect(providerSpy).toHaveBeenCalled();
        expect(tokenServiceSetSpy).toHaveBeenCalled();
        expect(tokenServiceGetSpy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeFalsy();
        expect(authRes.isSuccess()).toBeTruthy();
        expect(authRes.getMessages()).toEqual(['Successfully logged in.']);
        expect(authRes.getErrors()).toEqual([]);
        expect(authRes.getRedirect()).toEqual('/');
        expect(authRes.getTokenValue()).toEqual(tokenWrapper);
        expect(authRes.getResponse()).toEqual(resp200);
        done();
      })
    },
  );

  it('register failed with dummy provider', (done) => {
      const spy = spyOn(dummyAuthProvider, 'register')
        .and
        .returnValue(observableOf(failResult).delay(1000));

      authService.register('dummy').subscribe((authRes: NbAuthResult) => {
        expect(spy).toHaveBeenCalled();
        expect(authRes.isFailure()).toBeTruthy();
        expect(authRes.isSuccess()).toBeFalsy();
        expect(authRes.getMessages()).toEqual([]);
        expect(authRes.getErrors()).toEqual(['Something went wrong.']);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getTokenValue()).toBeUndefined();
        expect(authRes.getResponse()).toEqual(resp401);
        done();
      })
    },
  );

  it('register succeed with dummy provider', (done) => {
      const providerSpy = spyOn(dummyAuthProvider, 'register')
        .and
        .returnValue(observableOf(successResult).delay(1000));

      const tokenServiceSetSpy = spyOn(tokenService, 'set')
        .and
        .returnValue(observableOf('STUB'));

      tokenWrapper.setValue('Replaced');
      const tokenServiceGetSpy = spyOn(tokenService, 'get')
        .and
        .returnValue(observableOf(tokenWrapper));

      authService.register('dummy').subscribe((authRes: NbAuthResult) => {
        expect(providerSpy).toHaveBeenCalled();
        expect(tokenServiceSetSpy).toHaveBeenCalled();
        expect(tokenServiceGetSpy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeFalsy();
        expect(authRes.isSuccess()).toBeTruthy();
        expect(authRes.getMessages()).toEqual(['Successfully logged in.']);
        expect(authRes.getErrors()).toEqual([]);
        expect(authRes.getRedirect()).toEqual('/');
        expect(authRes.getTokenValue()).toEqual(tokenWrapper);
        expect(authRes.getResponse()).toEqual(resp200);
        done();
      })
    },
  );

  it('logout failed with dummy provider', (done) => {
      const spy = spyOn(dummyAuthProvider, 'logout')
        .and
        .returnValue(observableOf(failResult).delay(1000));

      authService.logout('dummy').subscribe((authRes: NbAuthResult) => {
        expect(spy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeTruthy();
        expect(authRes.isSuccess()).toBeFalsy();
        expect(authRes.getMessages()).toEqual([]);
        expect(authRes.getErrors()).toEqual(['Something went wrong.']);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getTokenValue()).toBeUndefined();
        expect(authRes.getResponse()).toEqual(resp401);
        done();
      })
    },
  );

  it('logout succeed with dummy provider', (done) => {
      const providerLogoutSpy = spyOn(dummyAuthProvider, 'logout')
        .and
        .returnValue(observableOf(successLogoutResult).delay(1000));

      const tokenServiceClearSpy = spyOn(tokenService, 'clear').and.returnValue(observableOf('STUB'));

      authService.logout('dummy').subscribe((authRes: NbAuthResult) => {
        expect(providerLogoutSpy).toHaveBeenCalled();
        expect(tokenServiceClearSpy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeFalsy();
        expect(authRes.isSuccess()).toBeTruthy();
        expect(authRes.getMessages()).toEqual(['Successfully logged out.']);
        expect(authRes.getErrors()).toEqual([]);
        expect(authRes.getRedirect()).toEqual('/');
        expect(authRes.getTokenValue()).toBeUndefined();
        expect(authRes.getResponse()).toEqual(resp200);
        done();
      })
    },
  );

  it('requestPassword failed with dummy provider', (done) => {
      const spy = spyOn(dummyAuthProvider, 'requestPassword')
        .and
        .returnValue(observableOf(failResult).delay(1000));

      authService.requestPassword('dummy').subscribe((authRes: NbAuthResult) => {
        expect(spy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeTruthy();
        expect(authRes.isSuccess()).toBeFalsy();
        expect(authRes.getMessages()).toEqual([]);
        expect(authRes.getErrors()).toEqual(['Something went wrong.']);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getTokenValue()).toBeUndefined();
        expect(authRes.getResponse()).toEqual(resp401);
        done();
      })
    },
  );

  it('requestPassword succeed with dummy provider', (done) => {
      const providerLogoutSpy = spyOn(dummyAuthProvider, 'requestPassword')
        .and
        .returnValue(observableOf(successRequestPasswordResult).delay(1000));

      authService.requestPassword('dummy').subscribe((authRes: NbAuthResult) => {
        expect(providerLogoutSpy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeFalsy();
        expect(authRes.isSuccess()).toBeTruthy();
        expect(authRes.getMessages()).toEqual(['Successfully requested password.']);
        expect(authRes.getErrors()).toEqual([]);
        expect(authRes.getRedirect()).toEqual('/');
        expect(authRes.getTokenValue()).toBeUndefined();
        expect(authRes.getResponse()).toEqual(resp200);
        done();
      })
    },
  );

  it('resetPassword failed with dummy provider', (done) => {
      const spy = spyOn(dummyAuthProvider, 'resetPassword')
        .and
        .returnValue(observableOf(failResult).delay(1000));

      authService.resetPassword('dummy').subscribe((authRes: NbAuthResult) => {
        expect(spy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeTruthy();
        expect(authRes.isSuccess()).toBeFalsy();
        expect(authRes.getMessages()).toEqual([]);
        expect(authRes.getErrors()).toEqual(['Something went wrong.']);
        expect(authRes.getRedirect()).toBeNull();
        expect(authRes.getTokenValue()).toBeUndefined();
        expect(authRes.getResponse()).toEqual(resp401);
        done();
      })
    },
  );

  it('resetPassword succeed with dummy provider', (done) => {
      const providerLogoutSpy = spyOn(dummyAuthProvider, 'resetPassword')
        .and
        .returnValue(observableOf(successResetPasswordResult).delay(1000));

      authService.resetPassword('dummy').subscribe((authRes: NbAuthResult) => {
        expect(providerLogoutSpy).toHaveBeenCalled();

        expect(authRes.isFailure()).toBeFalsy();
        expect(authRes.isSuccess()).toBeTruthy();
        expect(authRes.getMessages()).toEqual(['Successfully reset password.']);
        expect(authRes.getErrors()).toEqual([]);
        expect(authRes.getRedirect()).toEqual('/');
        expect(authRes.getTokenValue()).toBeUndefined();
        expect(authRes.getResponse()).toEqual(resp200);
        done();
      })
    },
  );
});
