/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpRequest } from '@angular/common/http';

import {
  NbCardModule,
  NbLayoutModule,
  NbListModule,
} from '@nebular/theme';
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbDummyAuthStrategy,
  NbAuthJWTInterceptor,
  NbOAuth2GrantType,
  NbOAuth2AuthStrategy,
  NbAuthOAuth2Token,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

import { AuthPlaygroundComponent } from './auth.component';
import { AuthPlaygroundRoutingModule } from './auth-routing.module';
import { CustomRoleProvider } from './role.provider';
import { AclTestComponent } from './acl/acl-test.component';
import { AuthGuard } from './auth-guard.service';
import { PlaygroundApiCallsComponent } from './api-calls/api-calls.component';

export function filterInterceptorRequest(req: HttpRequest<any>) {
  return ['http://localhost:4400/api/auth/',
          'http://other.url/with/no/token/injected/',
         ]
    .some(url => req.url.includes(url));
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthPlaygroundRoutingModule,

    NbCardModule,
    NbLayoutModule,
    NbListModule,

    NbAuthModule.forRoot({
      forms: {
        login: {
          strategy: 'password',
          redirectDelay: 1000,
          socialLinks: [
            {
              url: 'https://github.com/akveo',
              target: '_blank',
              title: 'GitHub',
            },
            {
              url: 'https://www.facebook.com/akveo',
              target: '_blank',
              icon: 'home-outline',
            },
            {
              url: 'https://www.facebook.com/akveo',
              target: '_blank',
              title: 'Twitter',
            },
          ],
        },
      },
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'dummy',

          alwaysFail: true,
          delay: 1000,
        }),

        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
          },
          login: {
            requireValidToken: false,
          },
          baseEndpoint: 'http://localhost:4400/api/auth/',
          logout: {
            redirect: {
              success: '/auth/login',
              failure: '/auth/login',
            },
          },
          requestPass: {
            redirect: {
              success: '/auth/reset-password',
            },
          },
          resetPass: {
            redirect: {
              success: '/auth/login',
            },
          },
          errors: {
            key: 'data.errors',
          },
        }),
        NbOAuth2AuthStrategy.setup({
          name: 'password',
          clientId: 'test',
          clientSecret: 'secret',
          baseEndpoint: 'http://localhost:4400/api/auth/',
          token: {
            endpoint: 'token',
            grantType: NbOAuth2GrantType.PASSWORD,
            class: NbAuthOAuth2Token,
          },
          refresh: {
            endpoint: 'refresh-token',
            grantType: NbOAuth2GrantType.REFRESH_TOKEN,
          },
        }),
      ],
    }),
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['news', 'comments'],
        },
        user: {
          parent: 'guest',
          create: 'comments',
        },
        moderator: {
          parent: 'user',
          create: 'news',
          remove: '*',
        },
      },
    }),
  ],
  declarations: [
    AuthPlaygroundComponent,
    AclTestComponent,
    PlaygroundApiCallsComponent,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
    { provide: NbRoleProvider, useClass: CustomRoleProvider },
  ],
})
export class AuthPlaygroundModule {
}
