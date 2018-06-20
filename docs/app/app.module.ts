/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule, Title } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  NbThemeModule,
  NbSidebarModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbTabsetModule,
  NbProgressBarModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { NgdThemeModule } from './@theme/theme.module';
import { NgdAppComponent } from './app.component';
import { routes } from './app.routes';

import { structure  } from '../structure';
import { DOCS, STRUCTURE } from './app.options';
const docs = require('../output.json');

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NbSidebarModule,
    NbCardModule,
    NbLayoutModule,
    NbTabsetModule,
    NbCheckboxModule,
    NbProgressBarModule,
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: '' }),
    NgdThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: false }),
  ],
  declarations: [
    NgdAppComponent,
  ],
  providers: [
    Title,
    { provide: STRUCTURE, useValue: structure },
    { provide: DOCS, useValue: docs },
  ],
  entryComponents: [
  ],
  bootstrap: [NgdAppComponent],
})
export class AppModule {
}
