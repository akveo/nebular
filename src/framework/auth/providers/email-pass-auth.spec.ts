/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';
import { NbEmailPassAuthProvider } from './email-pass-auth.provider';
import { NbAuthResult } from '../services/auth-result';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

describe('email-pass-auth-provider', () => {

  let provider: NbEmailPassAuthProvider;
  let httpMock: HttpTestingController;

  const successResponse: any = {
    data: {
      'token': 'token',
      'messages': ['Success message'],
      'errors': ['Error message'],
    },
  };
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
        { provide: NbEmailPassAuthProvider, useClass: NbEmailPassAuthProvider },
      ],
    });
  });

  beforeEach(async(inject(
    [NbEmailPassAuthProvider, HttpTestingController],
    (_provider, _httpMock) => {
      provider = _provider;
      httpMock = _httpMock;

      provider.setConfig({});
    },
  )));

  afterEach(() => {
    httpMock.verify();
  });

  describe('out of the box', () => {

    beforeEach(() => {
      provider.setConfig({});
    });

    it('authenticate success', (done: DoneFn) => {
      provider.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRawToken()).toEqual(successResponse.data.token);
          expect(result.getRedirect()).toEqual('/');

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(successResponse);
    });

    it('authenticate fail', (done: DoneFn) => {
      provider.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('register success', (done: DoneFn) => {
      provider.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRawToken()).toEqual(successResponse.data.token);
          expect(result.getRedirect()).toEqual('/');

          done();
        });

      httpMock.expectOne('/api/auth/register').flush(successResponse);
    });

    it('register fail', (done: DoneFn) => {
      provider.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('requestPassword success', (done: DoneFn) => {
      provider.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual('/');

          done();
        });

      httpMock.expectOne('/api/auth/request-pass').flush(successResponse);
    });

    it('requestPassword fail', (done: DoneFn) => {
      provider.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/request-pass')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('resetPassword success', (done: DoneFn) => {
      provider.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual('/');

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass').flush(successResponse);
    });

    it('resetPassword fail', (done: DoneFn) => {
      provider.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });
    it('logout success', (done: DoneFn) => {
      provider.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual('/');

          done();
        });

      httpMock.expectOne('/api/auth/logout').flush(successResponse);
    });

    it('logout fail', (done: DoneFn) => {
      provider.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/logout')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('refreshToken success', (done: DoneFn) => {
      provider.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual(successResponse.data.messages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRawToken()).toEqual(successResponse.data.token);
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token').flush(successResponse);
    });

    it('refreshToken fail', (done: DoneFn) => {
      provider.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(successResponse.data.errors); // no error message, response is success
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

  });

  describe('always fail', () => {

    beforeEach(() => {
      provider.setConfig({
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
      provider.authenticate(loginData)
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
      provider.register(loginData)
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
      provider.requestPassword(loginData)
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
      provider.resetPassword(loginData)
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
      provider.logout()
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
      provider.refreshToken()
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
      provider.setConfig({
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
      provider.authenticate(loginData)
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
      provider.register(loginData)
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
      provider.requestPassword(loginData)
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
      provider.resetPassword(loginData)
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
      provider.logout()
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
      provider.refreshToken()
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
      provider.setConfig({
        baseEndpoint: '/api/auth/custom/',
      });
    });

    it('authenticate', (done: DoneFn) => {
      provider.authenticate(loginData)
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
      provider.register(loginData)
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
      provider.requestPassword(loginData)
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
      provider.resetPassword(loginData)
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
      provider.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);

          done();
        });

      httpMock.expectOne('/api/auth/custom/logout')
        .flush(successResponse);
    });

    it('refreshToken', (done: DoneFn) => {
      provider.refreshToken()
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
      provider.setConfig({
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
      provider.authenticate(loginData)
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
      provider.register(loginData)
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
      provider.requestPassword(loginData)
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
      provider.resetPassword(loginData)
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
      provider.logout()
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
      provider.refreshToken()
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

      provider.setConfig({
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
      provider.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(successResponse);
    });

    it('authenticate fail', (done: DoneFn) => {
      provider.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.failure);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('register success', (done: DoneFn) => {
      provider.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(successResponse);
    });

    it('register fail', (done: DoneFn) => {
      provider.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.failure);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('requestPassword success', (done: DoneFn) => {
      provider.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/request-pass')
        .flush(successResponse);
    });

    it('requestPassword fail', (done: DoneFn) => {
      provider.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.failure);

          done();
        });

      httpMock.expectOne('/api/auth/request-pass')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('resetPassword success', (done: DoneFn) => {
      provider.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass')
        .flush(successResponse);
    });

    it('resetPassword fail', (done: DoneFn) => {
      provider.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.failure);

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('logout success', (done: DoneFn) => {
      provider.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/logout')
        .flush(successResponse);
    });

    it('logout fail', (done: DoneFn) => {
      provider.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.failure);

          done();
        });

      httpMock.expectOne('/api/auth/logout')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('refreshToken success', (done: DoneFn) => {
      provider.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getRedirect()).toBe(redirect.success);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(successResponse);
    });

    it('refreshToken fail', (done: DoneFn) => {
      provider.refreshToken()
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
      defaultMessages: ['this is error message'],
    };

    beforeEach(() => {

      provider.setConfig({
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
      provider.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(noMessageResponse);
    });

    it('authenticate fail', (done: DoneFn) => {
      provider.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getErrors()).toEqual(messages.defaultErrors);

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(noMessageResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('register success', (done: DoneFn) => {
      provider.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(noMessageResponse);
    });

    it('register fail', (done: DoneFn) => {
      provider.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getErrors()).toEqual(messages.defaultErrors);

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(noMessageResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('requestPassword success', (done: DoneFn) => {
      provider.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/request-pass')
        .flush(noMessageResponse);
    });

    it('requestPassword fail', (done: DoneFn) => {
      provider.requestPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getErrors()).toEqual(messages.defaultErrors);

          done();
        });

      httpMock.expectOne('/api/auth/request-pass')
        .flush({}, { status: 401, statusText: 'Unauthorized' });
    });

    it('resetPassword success', (done: DoneFn) => {
      provider.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass')
        .flush(noMessageResponse);
    });

    it('resetPassword fail', (done: DoneFn) => {
      provider.resetPassword(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getErrors()).toEqual(messages.defaultErrors);

          done();
        });

      httpMock.expectOne('/api/auth/reset-pass')
        .flush(noMessageResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('logout success', (done: DoneFn) => {
      provider.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/logout')
        .flush(noMessageResponse);
    });

    it('logout fail', (done: DoneFn) => {
      provider.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getErrors()).toEqual(messages.defaultErrors);

          done();
        });

      httpMock.expectOne('/api/auth/logout')
        .flush(noMessageResponse, { status: 401, statusText: 'Unauthorized' });
    });

    it('refreshToken success', (done: DoneFn) => {
      provider.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.getMessages()).toEqual(messages.defaultMessages);

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(noMessageResponse);
    });

    it('refreshToken fail', (done: DoneFn) => {
      provider.refreshToken()
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
      provider.setConfig({
        token: {
          key: 'token',
        },
      });
    });

    it('authenticate', (done: DoneFn) => {
      provider.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getRawToken()).toBe('token');

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(customResponse);
    });

    it('register', (done: DoneFn) => {
      provider.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getRawToken()).toBe('token');

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(customResponse);
    });

    it('refreshToken', (done: DoneFn) => {
      provider.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getRawToken()).toBe('token');

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(customResponse);
    });

  });

  describe('custom token extractor', () => {

    beforeEach(() => {
      provider.setConfig({
        token: {
          getter: (module: string, res: HttpResponse<Object>) => res.body['token'],
        },
      });
    });

    it('authenticate', (done: DoneFn) => {
      provider.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getRawToken()).toBe('token');

          done();
        });

      httpMock.expectOne('/api/auth/login')
        .flush(customResponse);
    });

    it('register', (done: DoneFn) => {
      provider.register(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getRawToken()).toBe('token');

          done();
        });

      httpMock.expectOne('/api/auth/register')
        .flush(customResponse);
    });

    it('refreshToken', (done: DoneFn) => {
      provider.refreshToken()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isFailure()).toBe(false);
          expect(result.isSuccess()).toBe(true);
          expect(result.getRawToken()).toBe('token');

          done();
        });

      httpMock.expectOne('/api/auth/refresh-token')
        .flush(customResponse);
    });

  });

  describe('custom message key', () => {

    beforeEach(() => {
      provider.setConfig({
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
      provider.authenticate(loginData)
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
      provider.authenticate(loginData)
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
      provider.register(loginData)
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
      provider.register(loginData)
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
      provider.refreshToken()
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
      provider.refreshToken()
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
      provider.setConfig({
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
      provider.authenticate(loginData)
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
      provider.authenticate(loginData)
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
      provider.register(loginData)
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
      provider.register(loginData)
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
      provider.refreshToken()
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
      provider.refreshToken()
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

});
