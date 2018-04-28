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
  NbCheckboxModule,
} from '@nebular/theme';
import { NgdAppComponent } from './app.component';
import { routes } from './app.routes';

// TODO: check this one
import { NgdExampleRendererComponent } from './components/example/example-renderer.component';

import { structure  } from '../structure';
const docs = require('../output.json');

export const STRUCTURE = new InjectionToken<any>('Docs Structure');
export const DOCS = new InjectionToken<any>('Docs Structure');

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NbThemeModule,
    NbSidebarModule,
    NbCardModule,
    NbLayoutModule,
    NbTabsetModule,
    NbCheckboxModule,
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: '' }),
    NbSidebarModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  declarations: [
    NgdAppComponent,
    NgdExampleRendererComponent,
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
