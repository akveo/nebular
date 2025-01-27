/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NbCardModule, NbLayoutModule } from '@nebular/theme';

import { NbAuthModule } from '@nebular/auth';

import { AzureLoginComponent } from './azure-login.component';
import { AzureCallbackComponent } from './azure-callback.component';
import { AuthAzureToken, AzureADB2CAuthStrategy } from './azure-adb2c-auth-strategy';
import { AzureRoutingModule } from './azure-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NbAuthModule.forRoot({
      strategies: [
        AzureADB2CAuthStrategy.setup({
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
            class: AuthAzureToken,
          },
          redirect: {
            success: '/example/azure',
          },
        }),
      ],
    }),

    NbCardModule,
    NbLayoutModule,
    AzureRoutingModule,
  ],
  declarations: [AzureLoginComponent, AzureCallbackComponent],
  providers: [AzureADB2CAuthStrategy],
})
export class AzurePlaygroundModule {}
