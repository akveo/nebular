/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NbButtonModule, NbCardModule, NbLayoutModule } from '@beast/theme';

import { NbAuthModule, NbDummyAuthStrategy } from '@beast/auth';
import { AppComponent } from './app.component';
import { AppRouting } from './app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    AppRouting,

    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'email',

          alwaysFail: true,
          delay: 1000,
        }),
      ],
    }),
  ],
  declarations: [AppComponent],
})
export class AppModule {}
