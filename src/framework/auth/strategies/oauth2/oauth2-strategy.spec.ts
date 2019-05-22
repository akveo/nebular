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
import { NbOAuth2ClientAuthMethod, NbOAuth2GrantType, NbOAuth2ResponseType } from './oauth2-strategy.options';
import { NbAuthResult } from '../../services/auth-result';
import { nbAuthCreateToken, NbAuthOAuth2Token } from '../../services/token/token';
function createURL(params: any) {
  return Object.keys(params).map((k) => {
    return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
  }).join('&');
}

function parseQueryParams(params: string): { [key: string]: string } {
  return params ? params.split('&').reduce((acc: any, part: string) => {
    const item = part.split('=');
    acc[item[0]] = decodeURIComponent(item[1]);
    return acc;
  }, {}) : {};
}

describe('oauth2-auth-strategy', () => {

  let strategy: NbOAuth2AuthStrategy;
  let httpMock: HttpTestingController;
  let routeMock: any;
  let windowMock: any;

  const successMessages = ['You have been successfully authenticated.'];
  const errorMessages = ['Something went wrong, please try again.'];
  const authHeader = 'Basic Y2xpZW50SWQ6Y2xpZW50U2VjcmV0';

  const tokenSuccessResponse = {
    access_token: '2YotnFZFEjr1zCsicMWpAA',
    expires_in: 3600,
    refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
    example_parameter: 'example_value',
  };

  const tokenWithoutRefreshTokenResponse = {
    access_token: '8uoloUIg765fHGF9jknjksdn9',
    expires_in: 3600,
    example_parameter: 'example_refresh_value',
  }

  const refreshedTokenPayload =  {
    access_token: '8uoloUIg765fHGF9jknjksdn9',
    expires_in: 3600,
    refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
    example_parameter: 'example_refresh_value',
  }

  const refreshedTokenResponse =  {
    access_token: '8uoloUIg765fHGF9jknjksdn9',
    expires_in: 3600,
    refresh_token: 'dfsjkgkdh989JHJHJDSHJns',
    example_parameter: 'example_refresh_value',
  }

  const tokenErrorResponse = {
    error: 'unauthorized_client',
    error_description: 'unauthorized',
    error_uri: 'some',
  };

  const successToken = nbAuthCreateToken(NbAuthOAuth2Token, tokenSuccessResponse,
    'strategy') as NbAuthOAuth2Token;
  const refreshedToken = nbAuthCreateToken(NbAuthOAuth2Token, refreshedTokenPayload,
    'strategy') as NbAuthOAuth2Token;
  const refreshedTokenWithRefreshToken = nbAuthCreateToken(NbAuthOAuth2Token, refreshedTokenResponse,
    'strategy') as NbAuthOAuth2Token;

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

    const basicOptions = {
      name: 'strategy',
      baseEndpoint: 'http://example.com/',
      clientId: 'clientId',
    }

    beforeEach(() => {
      strategy.setOptions(basicOptions);
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
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/token'
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.AUTHORIZATION_CODE
            && decodeURIComponent(params['code']) === 'code'
            && decodeURIComponent(params['client_id']) === 'clientId'
            && !params['redirect_uri'])
        },
      )
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

        httpMock.expectOne(
          req => {
            return (req.url === 'http://example.com/token'
              && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            )
          },
        )
        .flush(tokenErrorResponse, { status: 400, statusText: 'Bad Request' });
    });

    it('handle refresh token with basic client auth', (done: DoneFn) => {
      strategy.setOptions({
        ... basicOptions,
        clientSecret: 'clientSecret',
        clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
      });
      strategy.refreshToken(successToken)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/token'
            && req.headers.get('Authorization') === authHeader
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.REFRESH_TOKEN
            && decodeURIComponent(params['refresh_token']) === successToken.getRefreshToken()
            && !params['scope'])
        },
      )
      .flush(tokenSuccessResponse);
    });

    it('handle refresh token with requestBody client auth', (done: DoneFn) => {
      strategy.setOptions({
        ... basicOptions,
        clientSecret: 'clientSecret',
        clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
      });
      strategy.refreshToken(successToken)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/token'
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.REFRESH_TOKEN
            && decodeURIComponent(params['refresh_token']) === successToken.getRefreshToken()
            && decodeURIComponent(params['client_id']) === strategy.getOption('clientId')
            && decodeURIComponent(params['client_secret']) === strategy.getOption('clientSecret')
            && !params['scope'])
        },
      )
      .flush(tokenSuccessResponse);
    });

    it('handle refresh token with NO client auth', (done: DoneFn) => {
      strategy.setOptions(basicOptions);
      strategy.refreshToken(successToken)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/token'
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.REFRESH_TOKEN
            && decodeURIComponent(params['refresh_token']) === successToken.getRefreshToken()
            && !params['scope'])
        },
      )
      .flush(tokenSuccessResponse);
    });

    it('handle refresh token and inserts existing refresh_token if needed', (done: DoneFn) => {
      strategy.setOptions(basicOptions);
      strategy.refreshToken(successToken)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(refreshedToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(refreshedToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/token'
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.REFRESH_TOKEN
            && decodeURIComponent(params['refresh_token']) === successToken.getRefreshToken()
            && !params['scope'])
        },
      )
      .flush(tokenWithoutRefreshTokenResponse);
    });

    it('Handle refresh-token and leaves refresh_token unchanged if present', (done: DoneFn) => {
      strategy.setOptions(basicOptions);
      strategy.refreshToken(successToken)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(refreshedTokenWithRefreshToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).
                 toEqual(refreshedTokenWithRefreshToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/token'
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.REFRESH_TOKEN
            && decodeURIComponent(params['refresh_token']) === successToken.getRefreshToken()
            && !params['scope'])
        },
      )
      .flush(refreshedTokenResponse);
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

      httpMock.expectOne(
          req => {
            return (req.url === 'http://example.com/token'
              && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            )
          },
        )
        .flush(tokenErrorResponse, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('configured: type TOKEN', () => {

    const basicOptions = {
      name: 'strategy',
      baseEndpoint: 'http://example.com/',
      clientId: 'clientId',
      authorize: {
        responseType: NbOAuth2ResponseType.TOKEN,
      },
    }

    beforeEach(() => {
      strategy.setOptions(basicOptions);
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
          // tslint:disable-next-line
          expect(result.getToken().getValue()).toEqual(nbAuthCreateToken(NbAuthOAuth2Token, token, 'strategy').getValue());
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

    const basicOptions = {
      name: 'strategy',
      baseEndpoint: 'http://example.com/',
      clientId: 'clientId',
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
    }

    beforeEach(() => {
      strategy.setOptions(basicOptions);
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

    it('handle success redirect and sends correct token request with NO client Auth', (done: DoneFn) => {
      routeMock.snapshot.queryParams = { code: 'code' };

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/success');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/custom'
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.AUTHORIZATION_CODE
            && decodeURIComponent(params['code']) === 'code'
            && decodeURIComponent(params['client_id']) === 'clientId'
            && decodeURIComponent(params['redirect_uri']) === 'http://localhost:4200/callback')
        },
      )
      .flush(tokenSuccessResponse);
    });

    it('handle success redirect and sends correct token request with BASIC client Auth', (done: DoneFn) => {
      routeMock.snapshot.queryParams = { code: 'code' };
      strategy.setOptions({
        ... basicOptions,
        clientSecret: 'clientSecret',
        clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
      })

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/success');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/custom'
          && req.headers.get('Authorization') === authHeader
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.AUTHORIZATION_CODE
            && decodeURIComponent(params['code']) === 'code'
            && decodeURIComponent(params['client_id']) === 'clientId'
            && decodeURIComponent(params['redirect_uri']) === 'http://localhost:4200/callback')
        },
      )
      .flush(tokenSuccessResponse);
    });

    it('handle success redirect and sends correct token request with REQUEST_BODY client Auth', (done: DoneFn) => {
      routeMock.snapshot.queryParams = { code: 'code' };
      strategy.setOptions({
        ... basicOptions,
        clientSecret: 'clientSecret',
        clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
      })

      strategy.authenticate()
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/success');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/custom'
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.AUTHORIZATION_CODE
            && decodeURIComponent(params['code']) === 'code'
            && decodeURIComponent(params['client_id']) === strategy.getOption('clientId')
            && decodeURIComponent(params['client_secret']) === strategy.getOption('clientSecret')
            && decodeURIComponent(params['redirect_uri']) === 'http://localhost:4200/callback')
        },
      )
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
    it('handle refresh token with NO client auth', (done: DoneFn) => {
      strategy.setOptions(basicOptions);

      strategy.refreshToken(successToken)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/success');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/custom'
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.REFRESH_TOKEN
            && decodeURIComponent(params['refresh_token']) === successToken.getRefreshToken()
            && decodeURIComponent(params['scope']) === 'read')
        },
      )
      .flush(tokenSuccessResponse);
    });

    it('handle refresh token with BASIC client auth', (done: DoneFn) => {
      strategy.setOptions({
        ... basicOptions,
        clientSecret: 'clientSecret',
        clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
      });

      strategy.refreshToken(successToken)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/success');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/custom'
            && req.headers.get('Authorization') === authHeader
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.REFRESH_TOKEN
            && decodeURIComponent(params['refresh_token']) === successToken.getRefreshToken()
            && decodeURIComponent(params['scope']) === 'read')
        },
      )
      .flush(tokenSuccessResponse);
    });

    it('handle refresh token with REQUEST_BODY client auth', (done: DoneFn) => {
      strategy.setOptions({
        ... basicOptions,
        clientSecret: 'clientSecret',
        clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
      });

      strategy.refreshToken(successToken)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/success');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/custom'
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.REFRESH_TOKEN
            && decodeURIComponent(params['refresh_token']) === successToken.getRefreshToken()
            && decodeURIComponent(params['client_id']) === strategy.getOption('clientId')
            && decodeURIComponent(params['client_secret']) === strategy.getOption('clientSecret')
            && decodeURIComponent(params['scope']) === 'read')
        },
      )
      .flush(tokenSuccessResponse);
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

      httpMock.expectOne(
          req => {
            return (req.url === 'http://example.com/custom'
              && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            )
          },
        )
        .flush(tokenErrorResponse, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('configured: additionnal param: token, grant_type:password', () => {

    const scope = 'theScope';
    const basicOptions = {
      name: 'strategy',
      baseEndpoint: 'http://example.com/',
      clientId: 'clientId',
      token: {
        grantType: NbOAuth2GrantType.PASSWORD,
        endpoint: 'token',
        scope: scope,
      },
    };

    beforeEach(() => {
      strategy.setOptions(basicOptions);
    });

    it('handle success login with NO client auth', (done: DoneFn) => {
      const credentials = { email: 'example@akveo.com', password: '123456' };
      strategy.authenticate(credentials)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/token'
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.PASSWORD
            && decodeURIComponent(params['username']) === credentials.email
            && decodeURIComponent(params['password']) === credentials.password
            && decodeURIComponent(params['scope']) === scope)
        },
      )
        .flush(tokenSuccessResponse);
    });

    it('handle success login with BASIC client auth', (done: DoneFn) => {
      const credentials = { email: 'example@akveo.com', password: '123456' };
      strategy.setOptions({
        ... basicOptions,
        clientSecret: 'clientSecret',
        clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
      })

      strategy.authenticate(credentials)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/token'
            && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
            && req.headers.get('Authorization') === authHeader
            && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.PASSWORD
            && decodeURIComponent(params['username']) === credentials.email
            && decodeURIComponent(params['password']) === credentials.password
            && decodeURIComponent(params['scope']) === scope)
        },
      ).flush(tokenSuccessResponse);
    });

    it('handle success login with REQUEST_BODY client auth', (done: DoneFn) => {
      const credentials = { email: 'example@akveo.com', password: '123456' };
      strategy.setOptions({
        ... basicOptions,
        clientSecret: 'clientSecret',
        clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
      })

      strategy.authenticate(credentials)
        .subscribe((result: NbAuthResult) => {
          expect(result).toBeTruthy();
          expect(result.isSuccess()).toBe(true);
          expect(result.isFailure()).toBe(false);
          expect(result.getToken().getValue()).toEqual(successToken.getValue());
          expect(result.getToken().getOwnerStrategyName()).toEqual(successToken.getOwnerStrategyName());
          expect(result.getMessages()).toEqual(successMessages);
          expect(result.getErrors()).toEqual([]); // no error message, response is success
          expect(result.getRedirect()).toEqual('/');
          done();
        });

      httpMock.expectOne(
        req => {
          const params = parseQueryParams(req.body);
          return (req.url === 'http://example.com/token'
          && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
          && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.PASSWORD
          && decodeURIComponent(params['username']) === credentials.email
          && decodeURIComponent(params['password']) === credentials.password
          && decodeURIComponent(params['scope']) === scope
          && decodeURIComponent(params['client_id']) === strategy.getOption('clientId')
          && decodeURIComponent(params['client_secret']) === strategy.getOption('clientSecret'))
        },
      ).flush(tokenSuccessResponse);
    });

    it('handle error login', (done: DoneFn) => {
      strategy.setOptions(basicOptions);
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
         req => {
           const params = parseQueryParams(req.body);
           return (req.url === 'http://example.com/token'
             && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
             && decodeURIComponent(params['grant_type']) === NbOAuth2GrantType.PASSWORD
             && decodeURIComponent(params['username']) === credentials.email
             && decodeURIComponent(params['password']) === credentials.password
             && decodeURIComponent(params['scope']) === scope)
         },
       ).flush(tokenErrorResponse, {status: 401, statusText: 'unauthorized'});
    });
  });
});
