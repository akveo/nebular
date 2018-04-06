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
import {NbDjangoRestAuthProvider} from '@nebular/auth/providers/django-rest-auth.provider';
import {ActivatedRoute} from '@angular/router';
import {TestRequest} from '@angular/common/http/testing/src/request';

describe('django-rest-auth-provider', () => {

  let provider: NbEmailPassAuthProvider;
  let httpMock: HttpTestingController;

  const successResponse: any = {
    data: {
      'token': 'token',
      'messages': ['Success message'],
      'errors': ['Error message'],
    },
  };

  const loginData = { email: 'test@test.com', password: '123456' };
  const registerData = {
    'fullName': 'John Smith',
    'email': 'test@test.com',
    'password': '123',
    'confirmPassword': '123',
  };
  const requestPasswordData = {email: 'test@test.com'};
  const resetPasswordData = {password: '123', confirmPassword: '123'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: NbDjangoRestAuthProvider, useClass: NbDjangoRestAuthProvider },
        { provide: ActivatedRoute, useValue: {
          firstChild: {
            firstChild: {
              snapshot: {
                params: {
                  uid: 'xxx',
                  token: 'yyy',
                },
              },
            },
          },
        }},
      ],
    });
  });

  beforeEach(async(inject(
    [NbDjangoRestAuthProvider, HttpTestingController],
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
      let request: TestRequest;
      provider.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual(provider.getConfigValue('login.defaultMessages'));
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getFieldErrors()).toEqual({});
          expect(result.getRawToken()).toEqual('xxx');
          expect(result.getRedirect()).toEqual('/');

          expect(request.request.body).toEqual(loginData);
          done();
        });

      request = httpMock.expectOne('/api/auth/login/');
      request.flush({
        'key': 'xxx',
      });
    });

    it('authenticate fail', (done: DoneFn) => {
      provider.authenticate(loginData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(['Unable to log in with provided credentials.']);
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/login/').flush(
        {
          'non_field_errors': [
            'Unable to log in with provided credentials.',
          ],
        },
        { status: 401, statusText: 'Unauthorized' },
      );
    });

    it('register success', (done: DoneFn) => {
      let request: TestRequest;
      provider.register(registerData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual(provider.getConfigValue('register.defaultMessages'));
          expect(result.getErrors()).toEqual([]);
          expect(result.getFieldErrors()).toEqual({});
          expect(result.getRawToken()).toEqual('xxx');
          expect(result.getRedirect()).toEqual('/');

          expect(request.request.body).toEqual({
            'username': 'John Smith',
            'email': 'test@test.com',
            'password1': '123',
            'password2': '123',
          });
          done();
        });

      request = httpMock.expectOne('/api/auth/registration/');
      request.flush({
        'key': 'xxx',
      });
    });

    it('register fail', (done: DoneFn) => {
      provider.register(registerData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(provider.getConfigValue('register.defaultErrors'));
          expect(result.getFieldErrors()).toEqual({
            'fullName': [
              'This field may not be blank.',
            ],
            'email': [
              'Enter a valid email address.',
            ],
            'password': [
              'This password is too short. It must contain at least 8 characters.',
              'This password is entirely numeric.',
            ],
            'rePass': [
              'This field may not be blank.',
            ],
          });
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/registration/').flush(
        {
          'username': [
            'This field may not be blank.',
          ],
          'email': [
            'Enter a valid email address.',
          ],
          'password1': [
            'This password is too short. It must contain at least 8 characters.',
            'This password is entirely numeric.',
          ],
          'password2': [
            'This field may not be blank.',
          ],
        },
        { status: 401, statusText: 'Unauthorized' },
      );
    });

    it('requestPassword success', (done: DoneFn) => {
      let request: TestRequest;
      provider.requestPassword(requestPasswordData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual(['Password reset e-mail has been sent.']);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual('/');

          expect(request.request.body).toEqual({email: 'test@test.com'});
          done();
        });

      request = httpMock.expectOne('/api/auth/password/reset/');
      request.flush({'detail': 'Password reset e-mail has been sent.'});
    });

    it('requestPassword fail', (done: DoneFn) => {
      provider.requestPassword(requestPasswordData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeUndefined();
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(provider.getConfigValue('requestPass.defaultErrors'));
          expect(result.getFieldErrors()).toEqual({
            'email': [
              'Enter a valid email address.',
            ],
          });
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/password/reset/').flush(
        {
          'email': [
            'Enter a valid email address.',
          ],
        },
        { status: 401, statusText: 'Unauthorized' },
      );
    });

    it('resetPassword success', (done: DoneFn) => {
      let request: TestRequest;
      provider.resetPassword(resetPasswordData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual(['Password has been reset with the new password.']);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual('/');

          expect(request.request.body).toEqual({
            new_password1: '123',
            new_password2: '123',
            uid: 'xxx',
            token: 'yyy',
          });
          done();
        });

      request = httpMock.expectOne('/api/auth/password/reset/confirm/');
      request.flush(
        {
          'detail': 'Password has been reset with the new password.',
        },
      );
    });

    it('resetPassword fail', (done: DoneFn) => {
      provider.resetPassword(resetPasswordData)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual([
            ...provider.getConfigValue('resetPass.defaultErrors'),
            'uid: Invalid value',
          ]);
          expect(result.getFieldErrors()).toEqual({
            'password': [
              'This field may not be blank.',
            ],
            'confirmPassword': [
              'This field may not be blank.',
            ],
          });
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      const request = httpMock.expectOne('/api/auth/password/reset/confirm/');
      request.flush(
        {
          'new_password1': [
            'This field may not be blank.',
          ],
          'new_password2': [
            'This field may not be blank.',
          ],
          'uid': [
            'Invalid value',
          ],
        },
        { status: 401, statusText: 'Unauthorized' },
      );
    });
    it('logout success', (done: DoneFn) => {
      provider.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual(['Successfully logged out.']);
          expect(result.getErrors()).toEqual([]);
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual('/');

          done();
        });

      httpMock.expectOne('/api/auth/logout/').flush(
        {
          'detail': 'Successfully logged out.',
        },
      );
    });

    it('logout fail', (done: DoneFn) => {
      provider.logout()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeUndefined(); // we don't have a token at this stage yet
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(provider.getConfigValue('resetPass.defaultErrors'));
          expect(result.getRawToken()).toBeUndefined();
          expect(result.getRedirect()).toEqual(null);

          done();
        });

      httpMock.expectOne('/api/auth/logout/')
        .flush(successResponse, { status: 401, statusText: 'Unauthorized' });
    });

  });

});
