import { Injector } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs';

import {
  NB_AUTH_OPTIONS, NB_AUTH_STRATEGIES,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NB_AUTH_TOKENS,
  NB_AUTH_USER_OPTIONS,
} from '@nebular/auth/auth.options';
import { NbAuthJWTInterceptor, NbAuthService } from '@nebular/auth';
import { NbTokenService } from '@nebular/auth/services/token/token.service';
import { NbTokenLocalStorage, NbTokenStorage } from '@nebular/auth/services/token/token-storage';
import { NB_AUTH_FALLBACK_TOKEN, NbAuthTokenParceler } from '@nebular/auth/services/token/token-parceler';
import { NbDummyAuthStrategy } from '@nebular/auth';
import { nbOptionsFactory, nbStrategiesFactory } from '@nebular/auth/auth.module';
import { NbAuthJWTToken, NbAuthSimpleToken} from '@nebular/auth/services/token/token';


describe('jwt-interceptor', () => {

  // tslint:disable
  const validJWTValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsImV4cCI6MjUzMjM1MDgwMCwic3ViIjoiQWxhaW4gQ0hBUkxFUyIsImFkbWluIjp0cnVlfQ.Rgkgb4KvxY2wp2niXIyLJNJeapFp9z3tCF-zK6Omc8c';
  const validJWTToken = new NbAuthJWTToken(validJWTValue, 'dummy');
  const expiredJWTToken = new NbAuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773','dummy');
  const authHeader = 'Bearer ' + validJWTValue;

  let authService: NbAuthService;
  let tokenService: NbTokenService;
  let dummyAuthStrategy: NbDummyAuthStrategy;

  let http: HttpClient;
  let httpMock: HttpTestingController;

  function filterInterceptorRequest(req: HttpRequest<any>): boolean {
    return ['/filtered/url']
      .some(url => req.url.includes(url));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
         { provide: NB_AUTH_FALLBACK_TOKEN, useValue: NbAuthSimpleToken },
         { provide: NB_AUTH_TOKENS, useValue: [NbAuthJWTToken] },
        NbAuthTokenParceler,
         {
          provide: NB_AUTH_USER_OPTIONS, useValue: {
            strategies: [
              NbDummyAuthStrategy.setup({
                alwaysFail: false,
                name: 'dummy',
              }),
            ],
          },
        },
        { provide: NB_AUTH_OPTIONS, useFactory: nbOptionsFactory, deps: [NB_AUTH_USER_OPTIONS] },
        { provide: NB_AUTH_STRATEGIES, useFactory: nbStrategiesFactory, deps: [NB_AUTH_OPTIONS, Injector] },
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
        { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
        NbTokenService,
        NbAuthService,
        NbDummyAuthStrategy,
      ],
    });
    authService = TestBed.get(NbAuthService);
    tokenService = TestBed.get(NbTokenService);
    dummyAuthStrategy = TestBed.get(NbDummyAuthStrategy);
  });

    beforeEach(async(
      inject([HttpClient, HttpTestingController], (_httpClient, _httpMock) => {
        http = _httpClient;
        httpMock = _httpMock;
      }),
    ));

    it ('Url filtered, isAuthenticatedOrRefresh not called, token not added', () => {
      const spy = spyOn(authService, 'isAuthenticatedOrRefresh');
      http.get('/filtered/url/').subscribe(res => {
        expect(spy).not.toHaveBeenCalled();
      });
      httpMock.expectOne(
        req => req.url === '/filtered/url/'
          && ! req.headers.get('Authorization'),
      ).flush({});
    });

    it ('Url not filtered, isAuthenticatedOrRefresh called, authenticated, token added', () => {
      const spy = spyOn(authService, 'isAuthenticatedOrRefresh')
        .and.
        returnValue(observableOf(true));
      spyOn(authService, 'getToken')
        .and
        .returnValue(observableOf(validJWTToken));
      http.get('/notfiltered/url/').subscribe(res => {
        expect(spy).toHaveBeenCalled();
      });
      httpMock.expectOne(
        req => req.url === '/notfiltered/url/'
          && req.headers.get('Authorization') === authHeader,
      ).flush({});
    });

    it ('Url not filtered, isAuthenticatedOrRefresh called, not authenticated, token not added', () => {
      const spy = spyOn(authService, 'isAuthenticatedOrRefresh')
        .and.
        returnValue(observableOf(false));
      spyOn(authService, 'getToken')
        .and
        .returnValue(observableOf(expiredJWTToken));
      http.get('/notfiltered/url/').subscribe(res => {
        expect(spy).toHaveBeenCalled();
      });
      httpMock.expectOne(
        req => req.url === '/notfiltered/url/'
          && ! req.headers.get('Authorization'),
      ).flush({});
    });

  },
);
