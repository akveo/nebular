/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
} from '@nebular/theme';

import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NgxAppComponent } from './app.component';
import { NgxAppRouting } from './app-routing.module';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NgxAppRouting,

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
  declarations: [
    NgxAppComponent,
  ],
})
export class NgxAppModule {
}
