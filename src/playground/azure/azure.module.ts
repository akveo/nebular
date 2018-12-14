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

import { NbAuthModule } from '@nebular/auth';

import { NbAzureLoginComponent } from './azure-login.component';
import { NbAzureCallbackComponent } from './azure-callback.component';
import { NbAuthAzureToken, NbAzureADB2CAuthStrategy } from './azure-adb2c-auth-strategy';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: NbAzureLoginComponent,
      },
      {
        path: 'callback',
        component: NbAzureCallbackComponent,
      },
    ]),

    NbAuthModule.forRoot({
      strategies: [
        NbAzureADB2CAuthStrategy.setup({
          name: 'azure',
          clientId: 'bde728e2-2809-4ff1-bc9c-7fcb23800ebe',
          clientSecret: '',
          authorize: {
            endpoint: 'https://login.microsoftonline.com/01513fd2-16a0-453b-9fa0-c9089bfa023e/oauth2/authorize',
            responseType: 'id_token',
            scope: 'openid',
            redirectUri: 'https://akveo.github.io/nebular/example/azure/callback',
            params: {
              p: 'b2c_1_nebular',
            },
          },
          token: {
            class: NbAuthAzureToken,
          },
          redirect: {
            success: '/example/azure',
          },
        }),
      ],
    }),

    NbCardModule,
    NbLayoutModule,
  ],
  declarations: [
    NbAzureLoginComponent,
    NbAzureCallbackComponent,
  ],
  providers: [
    NbAzureADB2CAuthStrategy,
  ],
})
export class NbAzurePlaygroundModule {
}
