/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import {  NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {
  NbCardModule,
  NbLayoutModule,
} from '@nebular/theme';

import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbDummyAuthStrategy, NbAuthJWTInterceptor, NbOAuth2GrantType, NbOAuth2AuthStrategy, NbAuthOAuth2Token,
} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

import { NbAuthPlaygroundComponent } from './auth.component';
import { NbAuthPlaygroundRoutingModule } from './auth-routing.module';
import { NbCustomRoleProvider } from './role.provider';
import { NbAclTestComponent } from './acl/acl-test.component';
import { NbAuthGuard } from './auth-guard.service';
import { NbPlaygroundCallApiComponent } from './call-api.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NbAuthPlaygroundRoutingModule,

    NbCardModule,
    NbLayoutModule,

    NbAuthModule.forRoot({
      forms: {
        login: {
          redirectDelay: 1000,
          // redirect: {
          //   success: '/auth/auth-guard.service',
          // },
          strategy: 'password',
          socialLinks: [
            {
              url: 'https://github.com/akveo',
              target: '_blank',
              title: 'GitHub',
            },
            {
              url: 'https://www.facebook.com/akveo',
              target: '_blank',
              icon: 'nb-home',
            },
            {
              url: 'https://www.facebook.com/akveo',
              target: '_blank',
              title: 'Twitter',
            },
          ],
        },
        logout: {
          redirectDelay: 500,
          strategy: 'password',
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

          login: {
            // redirect: {
            //   success: '/auth/auth-guard.service',
            // },
          },

          token: {
            class: NbAuthJWTToken,
            key: 'access_token',
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
          // redirect: {
          //   success: '/auth/auth-guard.service',
          // },
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
    NbAuthPlaygroundComponent,
    NbAclTestComponent,
    NbPlaygroundCallApiComponent,
  ],
  providers: [
    NbAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    { provide: NbRoleProvider, useClass: NbCustomRoleProvider },
  ],
})

export class NbAuthPlaygroundModule {
}
