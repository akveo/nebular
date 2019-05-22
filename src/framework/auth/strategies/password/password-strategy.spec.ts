/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';
import { NbPasswordAuthStrategy } from './password-strategy';
import { NbAuthResult } from '../../services/auth-result';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { nbAuthCreateToken, NbAuthSimpleToken } from '../../services/token/token';

const ownerStrategyName = 'strategy';

describe('password-auth-strategy', () => {

  let strategy: NbPasswordAuthStrategy;
  let httpMock: HttpTestingController;

  const successResponse: any = {
    data: {
      'token': 'token',
      'messages': ['Success message'],
      'errors': ['Error message'],
    },
  };

  const successToken = nbAuthCreateToken(NbAuthSimpleToken, 'token', ownerStrategyName);

  const noMessageResponse: any = {
    data: {
      'token': 'token',
    },
  };
  const customResponse: any = {
    'token': 'token',
    'messages': ['Success message'],
    'errors': ['Error message'],
  };
  const loginData: any = { email: 'test@test.com', password: '123456' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: NbPasswordAuthStrategy, useClass: NbPasswordAuthStrategy },
      ],
    });
  });

  beforeEach(async(inject(
    [NbPasswordAuthStrategy, HttpTestingController],
    (_strategy, _httpMock) => {
      strategy = _strategy;
      httpMock = _httpMock;

      strategy.setOptions({name: ownerStrategyName});
    },
  )));

  afterEach(() => {
    httpMock.verify();
  });

  describe('out of the box', () => {

    beforeEach(() => {
      strategy.setOptions({name: ownerStrategyName});
    });

    it('authenticate success', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getRedirect()).toEqual('/');

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(successResponse);
    });

    it('authenticate fail', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getToken()).toBe(null);
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('register success', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getRedirect()).toEqual('/');

          done();
        });

      httpMock.expectOne('/api/auth/register').flush(successResponse);
    });

    it('register fail', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getToken()).toBe(null);
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('requestPassword success', (done: DoneFn) => {
      strategy.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getToken()).toBe(null);
          expect(result.getRedirect()).toEqual('/');

          done();
        });

      httpMock.expectOne('/api/auth/request-pass').flush(successResponse);
    });

    it('requestPassword fail', (done: DoneFn) => {
      strategy.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getToken()).toBe(null);
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/request-pass')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('resetPassword success', (done: DoneFn) => {
      strategy.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getToken()).toBe(null);
          expect(result.getRedirect()).toEqual('/');

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass').flush(successResponse);
    });

    it('resetPassword fail', (done: DoneFn) => {
      strategy.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getToken()).toBe(null);
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });
    it('logout success', (done: DoneFn) => {
      strategy.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getToken()).toBe(null);
          expect(result.getRedirect()).toEqual('/');

          done();
        });

      httpMock.expectOne('/api/auth/logout').flush(successResponse);
    });

    it('logout fail', (done: DoneFn) => {
      strategy.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getToken()).toBe(null);
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/logout')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('refreshToken success', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token').flush(successResponse);
    });

    it('refreshToken fail', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBe(null);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

  });

  describe('always fail', () => {

    beforeEach(() => {
      strategy.setOptions({
        name: ownerStrategyName,
        login: {
          alwaysFail: true,
        },
        register: {
          alwaysFail: true,
        },
        logout: {
          alwaysFail: true,
        },
        requestPass: {
          alwaysFail: true,
        },
        resetPass: {
          alwaysFail: true,
        },
        refreshToken: {
          alwaysFail: true,
        },
      });
    });

    it('authenticate fail', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(successResponse);
    });

    it('register fail', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(successResponse);
    });

    it('requestPassword fail', (done: DoneFn) => {
      strategy.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);

          done();
        });

      httpMock.expectOne('/api/auth/request-pass')
        .flush(successResponse);
    });

    it('resetPassword fail', (done: DoneFn) => {
      strategy.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass')
        .flush(successResponse);
    });

    it('logout fail', (done: DoneFn) => {
      strategy.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);

          done();
        });

      httpMock.expectOne('/api/auth/logout')
        .flush(successResponse);
    });

    it('refreshToken fail', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(successResponse);
    });

  });

  describe('custom endpoint', () => {

    beforeEach(() => {
      strategy.setOptions({
        name: ownerStrategyName,
        login: {
          endpoint: 'new',
        },
        register: {
          endpoint: 'new',
        },
        logout: {
          endpoint: 'new',
        },
        requestPass: {
          endpoint: 'new',
        },
        resetPass: {
          endpoint: 'new',
        },
        refreshToken: {
          endpoint: 'new',
        },
      });
    });

    it('authenticate', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/new')
        .flush(successResponse);
    });

    it('register', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/new')
        .flush(successResponse);
    });

    it('requestPassword', (done: DoneFn) => {
      strategy.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/new')
        .flush(successResponse);
    });

    it('resetPassword', (done: DoneFn) => {
      strategy.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/new')
        .flush(successResponse);
    });

    it('logout', (done: DoneFn) => {
      strategy.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/new')
        .flush(successResponse);
    });

    it('refreshToken', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/new')
        .flush(successResponse);
    });

  });

  describe('custom base endpoint', () => {

    beforeEach(() => {
      strategy.setOptions({
        name: ownerStrategyName,
        baseEndpoint: '/api/auth/custom/',
      });
    });

    it('authenticate', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/custom/login')
        .flush(successResponse);
    });

    it('register', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/custom/register')
        .flush(successResponse);
    });

    it('requestPassword', (done: DoneFn) => {
      strategy.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/custom/request-pass')
        .flush(successResponse);
    });

    it('resetPassword', (done: DoneFn) => {
      strategy.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/custom/reset-pass')
        .flush(successResponse);
    });

    it('logout', (done: DoneFn) => {
      strategy.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/custom/logout')
        .flush(successResponse);
    });

    it('logout with no endpoint', (done: DoneFn) => {

      strategy.setOptions({
        name: ownerStrategyName,
        baseEndpoint: '/api/auth/custom/',
        logout: {
          endpoint: '',
        },
      });

      strategy.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectNone('/api/auth/custom/');
    });

    it('refreshToken', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/custom/refresh-token')
        .flush(successResponse);
    });

  });

  describe('custom method', () => {

    beforeEach(() => {
      strategy.setOptions({
        name: ownerStrategyName,
        login: {
          method: 'get',
        },
        register: {
          method: 'get',
        },
        logout: {
          method: 'get',
        },
        requestPass: {
          method: 'get',
        },
        resetPass: {
          method: 'get',
        },
        refreshToken: {
          method: 'get',
        },
      });
    });

    it('authenticate', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne({ method: 'get' })
        .flush(successResponse);
    });

    it('register', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne({ method: 'get' })
        .flush(successResponse);
    });

    it('requestPassword', (done: DoneFn) => {
      strategy.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne({ method: 'get' })
        .flush(successResponse);
    });

    it('resetPassword', (done: DoneFn) => {
      strategy.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne({ method: 'get' })
        .flush(successResponse);
    });

    it('logout', (done: DoneFn) => {
      strategy.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne({ method: 'get' })
        .flush(successResponse);
    });

    it('refreshToken', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne({ method: 'get' })
        .flush(successResponse);
    });

  });

  describe('custom redirect', () => {

    const redirect = {
      success: '/success',
      failure: '/error',
    };

    beforeEach(() => {

      strategy.setOptions({
        name: ownerStrategyName,
        login: {
          redirect,
        },
        register: {
          redirect,
        },
        logout: {
          redirect,
        },
        requestPass: {
          redirect,
        },
        resetPass: {
          redirect,
        },
        refreshToken: {
          redirect,
        },
      });
    });

    it('authenticate success', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(successResponse);
    });

    it('authenticate fail', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.failure);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('register success', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(successResponse);
    });

    it('register fail', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.failure);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('requestPassword success', (done: DoneFn) => {
      strategy.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/request-pass')
        .flush(successResponse);
    });

    it('requestPassword fail', (done: DoneFn) => {
      strategy.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.failure);

          done();
        });

      httpMock.expectOne('/api/auth/request-pass')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('resetPassword success', (done: DoneFn) => {
      strategy.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass')
        .flush(successResponse);
    });

    it('resetPassword fail', (done: DoneFn) => {
      strategy.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.failure);

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('logout success', (done: DoneFn) => {
      strategy.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/logout')
        .flush(successResponse);
    });

    it('logout fail', (done: DoneFn) => {
      strategy.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.failure);

          done();
        });

      httpMock.expectOne('/api/auth/logout')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('refreshToken success', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(successResponse);
    });

    it('refreshToken fail', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.failure);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

  });

  describe('custom message', () => {

    const messages = {
      defaultErrors: ['this is error message'],
      defaultMessages: ['this is success message'],
    };

    beforeEach(() => {

      strategy.setOptions({
        name: ownerStrategyName,
        login: {
          ...messages,
        },
        register: {
          ...messages,
        },
        logout: {
          ...messages,
        },
        requestPass: {
          ...messages,
        },
        resetPass: {
          ...messages,
        },
        refreshToken: {
          ...messages,
        },
      });
    });

    it('authenticate success', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(noMessageResponse);
    });

    it('authenticate fail', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getErrors()).toEqual(messages.defaultErrors);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(noMessageResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('register success', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(noMessageResponse);
    });

    it('register fail', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getErrors()).toEqual(messages.defaultErrors);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(noMessageResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('requestPassword success', (done: DoneFn) => {
      strategy.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/request-pass')
        .flush(noMessageResponse);
    });

    it('requestPassword fail', (done: DoneFn) => {
      strategy.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getErrors()).toEqual(messages.defaultErrors);

          done();
        });

      httpMock.expectOne('/api/auth/request-pass')
        .flush({}, { status: 401, statusText: 'Unauthorized' });
    });

    it('resetPassword success', (done: DoneFn) => {
      strategy.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass')
        .flush(noMessageResponse);
    });

    it('resetPassword fail', (done: DoneFn) => {
      strategy.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getErrors()).toEqual(messages.defaultErrors);

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass')
        .flush(noMessageResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('logout success', (done: DoneFn) => {
      strategy.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/logout')
        .flush(noMessageResponse);
    });

    it('logout fail', (done: DoneFn) => {
      strategy.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getErrors()).toEqual(messages.defaultErrors);

          done();
        });

      httpMock.expectOne('/api/auth/logout')
        .flush(noMessageResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('refreshToken success', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(noMessageResponse);
    });

    it('refreshToken fail', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getErrors()).toEqual(messages.defaultErrors);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(noMessageResponse, { status: 401, statusText: 'Unauthorized' });
    });

  });

  describe('custom token key', () => {

    beforeEach(() => {
      strategy.setOptions({
        name: ownerStrategyName,
        token: {
          key: 'token',
        },
      });
    });

    it('authenticate', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(customResponse);
    });

    it('register', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(customResponse);
    });

    it('refreshToken', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(customResponse);
    });

  });

  describe('custom token extractor', () => {

    beforeEach(() => {
      strategy.setOptions({
        name: ownerStrategyName,
        token: {
          getter: (module: string, res: HttpResponse<Object>) => res.body['token'],
        },
      });
    });

    it('authenticate', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(customResponse);
    });

    it('register', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(customResponse);
    });

    it('refreshToken', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(customResponse);
    });

  });

  describe('custom message key', () => {

    beforeEach(() => {
      strategy.setOptions({
        name: ownerStrategyName,
        token: {
          key: 'token',
        },
        messages: {
          key: 'messages',
        },
        errors: {
          key: 'errors',
        },
      });
    });

    it('authenticate success', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getMessages()[0]).toBe('Success message');

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(customResponse);
    });

    it('authenticate fail', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);
          expect(result.getErrors()[0]).toBe('Error message');

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(customResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('register success', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getMessages()[0]).toBe('Success message');

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(customResponse);
    });

    it('register fail', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);
          expect(result.getErrors()[0]).toBe('Error message');

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(customResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('refreshToken success', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getMessages()[0]).toBe('Success message');

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(customResponse);
    });

    it('refreshToken fail', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);
          expect(result.getErrors()[0]).toBe('Error message');

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(customResponse, { status: 401, statusText: 'Unauthorized' });
    });

  });

  describe('custom message extractor', () => {

    beforeEach(() => {
      strategy.setOptions({
        name: ownerStrategyName,
        token: {
          key: 'token',
        },
        messages: {
          getter: (module: string, res: HttpResponse<Object>) => res.body['messages'],
        },
        errors: {
          getter: (module: string, res: HttpErrorResponse) => res.error['errors'],
        },
      });
    });

    it('authenticate success', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getMessages()[0]).toBe('Success message');

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(customResponse);
    });

    it('authenticate fail', (done: DoneFn) => {
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);
          expect(result.getErrors()[0]).toBe('Error message');

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(customResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('register success', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getMessages()[0]).toBe('Success message');

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(customResponse);
    });

    it('register fail', (done: DoneFn) => {
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);
          expect(result.getErrors()[0]).toBe('Error message');

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(customResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('refreshToken success', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getMessages()[0]).toBe('Success message');

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(customResponse);
    });

    it('refreshToken fail', (done: DoneFn) => {
      strategy.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);
          expect(result.getErrors()[0]).toBe('Error message');

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(customResponse, { status: 401, statusText: 'Unauthorized' });
    });

  });

  describe('custom requireValidToken', () => {

    it('authenticate fail as no token when requireValidToken is set', (done: DoneFn) => {
      strategy.setOptions({
        name: ownerStrategyName,
        login: {
          requireValidToken: true,
        },
      });
      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()[0]).toEqual('Token is empty or invalid.');
          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush({data: {
          message: 'Successfully logged in!',
        }});
    });

    it('authenticate does not fail even when no token', (done: DoneFn) => {

      strategy.setOptions({
        name: ownerStrategyName,
        login: {
          requireValidToken: false,
        },
      });

      strategy.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getMessages()[0]).toEqual('You have been successfully logged in.');
          expect(result.getErrors()).toEqual([]);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush({});
    });

    it('register fail as no token and requireValidtoken is set', (done: DoneFn) => {
      strategy.setOptions({
        name: ownerStrategyName,
        register: {
          requireValidToken: true,
        },
      });
      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()[0]).toEqual('Token is empty or invalid.');

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush({});
    });

    it('register does not fail even when no token', (done: DoneFn) => {

      strategy.setOptions({
        name: ownerStrategyName,
        register: {
          requireValidToken: false,
        },
      });

      strategy.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getMessages()[0]).toEqual('You have been successfully registered.');
          expect(result.getErrors()).toEqual([]);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush({});
    });

    it('refreshToken fail as no token and requireValidToken is set', (done: DoneFn) => {
      strategy.setOptions({
        name: ownerStrategyName,
        refreshToken: {
          requireValidToken: true,
        },
      });
      strategy.refreshToken(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(true);
          expect(result.isSuccess()).toBe(false);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()[0]).toEqual('Token is empty or invalid.');

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush({});
    });

    it('refreshToken does not fail even when no token', (done: DoneFn) => {

      strategy.setOptions({
        name: ownerStrategyName,
        refreshToken: {
          requireValidToken: false,
        },
      });

      strategy.refreshToken(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getMessages()[0]).toEqual('Your token has been successfully refreshed.');
          expect(result.getErrors()).toEqual([]);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush({});
    });
  });

});
