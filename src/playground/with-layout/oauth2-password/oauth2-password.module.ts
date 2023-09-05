/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NbAlertModule, NbCardModule, NbInputModule, NbLayoutModule } from '@nebular/theme';

import {
  NbAuthModule,
  NbAuthOAuth2JWTToken,
  NbOAuth2AuthStrategy,
  NbOAuth2ClientAuthMethod,
  NbOAuth2GrantType,
} from '@nebular/auth';

import { OAuth2PasswordLoginComponent } from './oauth2-password-login.component';
import { Oauth2PasswordRoutingModule } from './oauth2-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    NbAuthModule.forRoot({
      forms: {
        login: {
          redirectDelay: 3000,
          showMessages: {
            error: true,
            success: false,
          },
          strategy: 'password',
        },
      },
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'password',
          clientId: 'Aladdin',
          clientSecret: 'open sesame',
          clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
          baseEndpoint: 'http://localhost:4400/api/auth/',
          token: {
            endpoint: 'token',
            grantType: NbOAuth2GrantType.PASSWORD,
            class: NbAuthOAuth2JWTToken,
            requireValidToken: true,
          },
          redirect: {
            success: '/oauth2-password',
          },
        }),
      ],
    }),

    NbCardModule,
    NbLayoutModule,
    NbAlertModule,
    NbInputModule,
    Oauth2PasswordRoutingModule,
  ],
  declarations: [OAuth2PasswordLoginComponent],
})
export class OAuth2PasswordPlaygroundModule {}
