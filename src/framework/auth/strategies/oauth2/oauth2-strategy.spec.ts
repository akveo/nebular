/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NB_WINDOW } from '@nebular/theme';

import { NbOAuth2AuthStrategy } from './oauth2-strategy';
import { NbOAuth2GrantType, NbOAuth2ResponseType } from './oauth2-strategy.options';
import { NbAuthResult, nbAuthCreateToken, NbAuthOAuth2Token } from '../../services';

function createURL(params: any) {
  return Object.keys(params).map((k) => {
    return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
  }).join('&');
}

describe('oauth2-auth-strategy', () => {

  let strategy: NbOAuth2AuthStrategy;
  let httpMock: HttpTestingController;
  let routeMock: any;
  let windowMock: any;

  const successMessages = ['You have been successfully authenticated.'];
  const errorMessages = ['Something went wrong, please try again.'];

  const tokenSuccessResponse = {
    access_token: '2YotnFZFEjr1zCsicMWpAA',
    expires_in: 3600,
    refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
    example_parameter: 'example_value',
  };

  const tokenErrorResponse = {
    error: 'unauthorized_client',
    error_description: 'unauthorized',
    error_uri: 'some',
  };

  const successToken = nbAuthCreateToken(NbAuthOAuth2Token, tokenSuccessResponse) as NbAuthOAuth2Token;


  beforeEach(() => {
    windowMock = { location: { href: '' } };
    routeMock = { snapshot: { params: {}, queryParams: {}, fragment: '' } };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        NbOAuth2AuthStrategy,
        { provide: ActivatedRoute, useFactory: () => routeMock },
        { provide: NB_WINDOW, useFactory: () => windowMock }, // useValue will clone, we need reference
      ],
    });
  });

  beforeEach(async(inject(
    [NbOAuth2AuthStrategy, HttpTestingController],
    (_strategy, _httpMock) => {
      strategy = _strategy;
      httpMock = _httpMock;

      strategy.setOptions({});
    },
  )));

  afterEach(() => {
    httpMock.verify();
  });

  describe('out of the box: type CODE', () => {

    beforeEach(() => {
      strategy.setOptions({
        baseEndpoint: 'http://example.com/',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
      });
    });

     it('redirect to auth server', (done: DoneFn) => {
      windowMock.location = {
        set href(value: string) {
          expect(value).toEqual('http://example.com/authorize?response_type=code&client_id=clientId');
          done();
        },
      };

      strategy.authenticate()
        .subscribe(() => {});
    });

    it('handle success redirect and sends correct token request', (done: DoneFn) => {
      routeMock.snapshot.queryParams = { code: 'code' };

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toEqual(successToken);
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => req.url === 'http://example.com/token'
            && req.body['grant_type'] === NbOAuth2GrantType.AUTHORIZATION_CODE
            && req.body['code'] === 'code'
            && req.body['client_id'] === 'clientId'
            && !req.body['redirect_uri'],
      ).flush(tokenSuccessResponse);
    });

    it('handle error redirect back', (done: DoneFn) => {
      routeMock.snapshot.queryParams = tokenErrorResponse;

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeNull();
          expect(result.getResponse()).toEqual(tokenErrorResponse);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(errorMessages);
          expect(result.getRedirect()).toEqual(null);
          done();
        });
    });

    it('handle error token response', (done: DoneFn) => {
      routeMock.snapshot.queryParams = {code: 'code'};

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {

          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeNull();
          expect(result.getResponse().error).toEqual(tokenErrorResponse);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual([ tokenErrorResponse.error_description] );
          expect(result.getRedirect()).toEqual(null);
          done();
        });

      httpMock.expectOne('http://example.com/token')
        .flush(tokenErrorResponse, { status: 400, statusText: 'Bad Request' });
    });

    it('handle refresh token', (done: DoneFn) => {


      strategy.refreshToken(successToken)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toEqual(successToken);
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => req.url === 'http://example.com/token'
          && req.body['grant_type'] === NbOAuth2GrantType.REFRESH_TOKEN
          && req.body['refresh_token'] === successToken.getRefreshToken()
          && !req.body['scope'],
      ).flush(tokenSuccessResponse);
    });

    it('handle error token refresh response', (done: DoneFn) => {

      strategy.refreshToken(successToken)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeNull(); // we don't have a token at this stage yet
          expect(result.getResponse().error).toEqual(tokenErrorResponse);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual([ tokenErrorResponse.error_description] );
          expect(result.getRedirect()).toEqual(null);
          done();
        });

      httpMock.expectOne('http://example.com/token')
        .flush(tokenErrorResponse, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('configured: type TOKEN', () => {

    beforeEach(() => {
      strategy.setOptions({
        baseEndpoint: 'http://example.com/',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        authorize: {
          responseType: NbOAuth2ResponseType.TOKEN,
        },
      });
    });

    it('redirect to auth server', (done: DoneFn) => {
      windowMock.location = {
        set href(value: string) {
          expect(value).toEqual('http://example.com/authorize?response_type=token&client_id=clientId');
          done();
        },
      };

      strategy.authenticate()
        .subscribe(() => {});
    });

    it('handle success redirect back with token', (done: DoneFn) => {
      const token = { access_token: 'token', token_type: 'bearer' };

      routeMock.snapshot.fragment = createURL(token);

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toEqual(nbAuthCreateToken(NbAuthOAuth2Token, token));
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });
    });

    it('handle error redirect back', (done: DoneFn) => {
      routeMock.snapshot.fragment = createURL(tokenErrorResponse);

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeNull(); // we don't have a token at this stage yet
          expect(result.getResponse()).toEqual(tokenErrorResponse);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(errorMessages);
          expect(result.getRedirect()).toEqual(null);
          done();
        });
    });
  });

  describe('configured redirect, redirectUri, scope and additional params: type TOKEN', () => {

    beforeEach(() => {
      strategy.setOptions({
        baseEndpoint: 'http://example.com/',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        redirect: {
          success: '/success',
          failure: '/failure',
        },
        authorize: {
          endpoint: 'custom',
          redirectUri: 'http://localhost:4200/callback',
          scope: 'read',
          params: {
            display: 'popup',
            foo: 'bar',
          },
        },
        token: {
          endpoint: 'custom',
          redirectUri: 'http://localhost:4200/callback',
        },
        refresh: {
          endpoint: 'custom',
          scope: 'read',
        },
      });
    });

    it('redirect to auth server', (done: DoneFn) => {
      windowMock.location = {
        set href(value: string) {
          const baseUrl = 'http://example.com/custom?response_type=code&client_id=clientId&redirect_uri=';
          const redirect = encodeURIComponent('http://localhost:4200/callback');
          const url = `${baseUrl}${redirect}&scope=read&display=popup&foo=bar`;

          expect(value).toEqual(url);
          done();
        },
      };

      strategy.authenticate()
        .subscribe(() => {});
    });

    it('handle success redirect and sends correct token request', (done: DoneFn) => {
      routeMock.snapshot.queryParams = { code: 'code' };

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toEqual(successToken);
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/success');
          done();
        });

      httpMock.expectOne(
        req => req.url === 'http://example.com/custom'
          && req.body['grant_type'] === NbOAuth2GrantType.AUTHORIZATION_CODE
          && req.body['code'] === 'code'
          && req.body['client_id'] === 'clientId'
          && req.body['redirect_uri'] === 'http://localhost:4200/callback',
      ).flush(tokenSuccessResponse);
    });

    it('handle success redirect back with token request', (done: DoneFn) => {
      routeMock.snapshot.queryParams = { code: 'code' };

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toEqual(successToken);
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/success');
          done();
        });

      httpMock.expectOne('http://example.com/custom')
        .flush(tokenSuccessResponse);
    });

    it('handle error redirect back', (done: DoneFn) => {
      routeMock.snapshot.queryParams = tokenErrorResponse;

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeNull();
          expect(result.getResponse()).toEqual(tokenErrorResponse);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual(errorMessages);
          expect(result.getRedirect()).toEqual('/failure');
          done();
        });
    });

    it('handle refresh token', (done: DoneFn) => {

      strategy.refreshToken(successToken)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toEqual(successToken);
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/success');
          done();
        });

      httpMock.expectOne(
        req => req.url === 'http://example.com/custom'
          && req.body['grant_type'] === NbOAuth2GrantType.REFRESH_TOKEN
          && req.body['refresh_token'] === successToken.getRefreshToken()
          && req.body['scope'] === 'read',
      ).flush(tokenSuccessResponse);
    });

    it('handle error token response', (done: DoneFn) => {
      routeMock.snapshot.queryParams = { code: 'code' };

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {

          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeNull();
          expect(result.getResponse().error).toEqual(tokenErrorResponse);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual([ tokenErrorResponse.error_description] );
          expect(result.getRedirect()).toEqual('/failure');
          done();
        });

      httpMock.expectOne('http://example.com/custom')
        .flush(tokenErrorResponse, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('configured: additionnal param: token, grant_type:password', () => {

    beforeEach(() => {
      strategy.setOptions({
        baseEndpoint: 'http://example.com/',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        token: {
          grantType: NbOAuth2GrantType.PASSWORD,
          endpoint: 'token',
        },
      });
    });

    it('handle success login', (done: DoneFn) => {
      const credentials = { email: 'example@akveo.com', password: '123456' };


      strategy.authenticate(credentials)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken()).toEqual(successToken);
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => req.url === 'http://example.com/token'
          && req.body['grant_type'] === NbOAuth2GrantType.PASSWORD
          && req.body['email'] === credentials.email
          && req.body['password'] === credentials.password,
      ).flush(tokenSuccessResponse);
    });

    it('handle error login', (done: DoneFn) => {
      const credentials = { email: 'example@akveo.com', password: '123456' };

      strategy.authenticate(credentials)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(false);
          expect(result.isFailure()).toBe(true);
          expect(result.getToken()).toBeNull(); // we don't have a token at this stage yet
          expect(result.getResponse().error).toEqual(tokenErrorResponse);
          expect(result.getMessages()).toEqual([]);
          expect(result.getErrors()).toEqual([tokenErrorResponse.error_description]);
          expect(result.getRedirect()).toEqual(null);
          done();
        });

       httpMock.expectOne(
        req => req.url === 'http://example.com/token'
          && req.body['grant_type'] === NbOAuth2GrantType.PASSWORD
          && req.body['email'] === credentials.email
          && req.body['password'] === credentials.password,
      ).flush(tokenErrorResponse, {status: 401, statusText: 'unauthorized'});
    });
  });
});
