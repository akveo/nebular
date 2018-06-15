/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  NbCardModule,
  NbLayoutModule,
} from '@nebular/theme';

import {
  NbAuthModule,
  NbOAuth2AuthStrategy,
  NbOAuth2ResponseType,
} from '@nebular/auth';

import { NbOAuth2LoginComponent } from './oauth2-login.component';
import { NbOAuth2CallbackComponent } from './oauth2-callback.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: NbOAuth2LoginComponent,
      },
      {
        path: 'callback',
        component: NbOAuth2CallbackComponent,
      },
    ]),

    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: '806751403568-03376bvlin9n3rhid0cahus6ei3lc69q.apps.googleusercontent.com',
          clientSecret: '',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            redirectUri: 'https://akveo.github.io/nebular/example/oauth2/callback',
          },

          redirect: {
            success: '/example/oauth2',
          },
        }),
      ],
    }),

    NbCardModule,
    NbLayoutModule,
  ],
  declarations: [
    NbOAuth2LoginComponent,
    NbOAuth2CallbackComponent,
  ],
})
export class NbOAuth2PlaygroundModule {
}
