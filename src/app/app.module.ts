/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { List } from 'immutable';

import { NbThemeModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbLayoutModule } from '@nebular/theme';
import { NbMenuModule } from '@nebular/theme';
import { NbRouteTabsetModule } from '@nebular/theme';
import { NbSidebarModule } from '@nebular/theme';
import { NbTabsetModule } from '@nebular/theme';
import { NbUserModule } from '@nebular/theme';
import { NbAuthModule, NbDummyAuthProvider, NbEmailPassAuthProvider } from '@nebular/auth';
import { NbActionsModule } from '@nebular/theme';
import { NbSearchModule } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';

import { NbAppComponent } from './app.component';
import { NbLayoutTestComponent } from './layout-test/layout-test.component';
import { NbLayoutHeaderTestComponent } from './layout-test/layout-header-test.component';
import { NbLayoutFooterTestComponent } from './layout-test/layout-footer-test.component';
import { NbThemeChangeTestComponent } from './layout-test/theme-change-test.component';
import { NbThemeBreakpointTestComponent } from './layout-test/theme-breakpoint-test.component';
import { NbTabsetTestComponent } from './tabset-test/tabset-test.component';
import {
  NbRouteTabsetTestComponent,
  NbRouteTabsetTestChild1Component,
  NbRouteTabsetTestChild2Component,
} from './route-tabset-test/route-tabset-test.component';

import { NbSidebarTestComponent } from './sidebar-test/sidebar-test.component';
import { NbSidebarTestOneComponent } from './sidebar-test/sidebar-test-one.component';
import { NbSidebarTestTwoComponent } from './sidebar-test/sidebar-test-two.component';
import { NbSidebarTestThreeComponent } from './sidebar-test/sidebar-test-three.component';
import {
  NbMenuTestComponent,
  NbMenuItem1Component,
  NbMenuItem2Component,
  NbMenuItem31Component,
  NbMenuItem3Component,
  NbMenuItem32Component,
  NbMenuItem33Component,
  NbMenuItem331Component,
  NbMenuItem332Component,
  NbMenuItem4Component,
} from './menu-test/menu-test.component';
import { NbUserTestComponent } from './user-test/user-test.component';
import { NbThemeDynamicTestComponent, NbDynamicToAddComponent } from './layout-test/theme-dynamic-test.component';
import { NbActionsTestComponent } from './actions-test/actions-test.component';
import { NbBootstrapTestComponent } from './bootstrap-test/bootstrap-test.component';

import { routes } from './app.routes';

import { NbSearchTestComponent } from './search-test/search-test.component';
import { NbFormsTestComponent } from './forms-test/forms-test.component';

import { NbCardTestComponent } from './card-test/card-test.component';

const NB_TEST_COMPONENTS = [
  NbAppComponent,
  NbCardTestComponent,
  NbLayoutTestComponent,
  NbLayoutHeaderTestComponent,
  NbLayoutFooterTestComponent,
  NbTabsetTestComponent,
  NbSidebarTestComponent,
  NbSidebarTestOneComponent,
  NbSidebarTestTwoComponent,
  NbSidebarTestThreeComponent,
  NbRouteTabsetTestComponent,
  NbRouteTabsetTestChild1Component,
  NbRouteTabsetTestChild2Component,
  NbMenuTestComponent,
  NbMenuItem1Component,
  NbMenuItem2Component,
  NbMenuItem3Component,
  NbMenuItem31Component,
  NbMenuItem32Component,
  NbMenuItem33Component,
  NbMenuItem331Component,
  NbMenuItem332Component,
  NbMenuItem4Component,
  NbUserTestComponent,
  NbThemeChangeTestComponent,
  NbSearchTestComponent,
  NbBootstrapTestComponent,
  NbDynamicToAddComponent,
  NbThemeDynamicTestComponent,
  NbThemeBreakpointTestComponent,
  NbActionsTestComponent,
  NbFormsTestComponent,
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NbThemeModule.forRoot({ name: 'default' }),
    NbCardModule,
    NbLayoutModule,
    NbMenuModule.forRoot({
      items: List<NbMenuItem>([{
        title: 'Menu #4',
        link: '/menu/4',
      }, {
        title: 'Menu #5',
      }]),
    }),
    NbRouteTabsetModule,
    NbSidebarModule.forRoot(),
    NbTabsetModule,
    NbUserModule,
    NbSearchModule,
    NbActionsModule,
    NbAuthModule.forRoot({
      providers: {
        //
        // email: {
        //   service: NbDummyAuthProvider,
        //   config: {
        //     alwaysFail: true,
        //     delay: 1000,
        //   },
        // },
        email: {
          service: NbEmailPassAuthProvider,
          config: {
            login: {
              endpoint: 'http://localhost:4400/api/auth/login',
            },
            register: {
              endpoint: 'http://localhost:4400/api/auth/register',
            },
            logout: {
              endpoint: 'http://localhost:4400/api/auth/logout',
              redirect: {
                success: '/auth/login',
                failure: '/auth/login',
              },
            },
            requestPass: {
              endpoint: 'http://localhost:4400/api/auth/request-pass',
              redirect: {
                success: '/auth/reset-password',
              },
            },
            resetPass: {
              endpoint: 'http://localhost:4400/api/auth/reset-pass',
              redirect: {
                success: '/auth/login',
              },
            },
          },
        },
      },
    }),
  ],
  declarations: [
    ...NB_TEST_COMPONENTS,
  ],
  entryComponents: [
    NbDynamicToAddComponent,
  ],
  providers: [],
  bootstrap: [NbAppComponent],
})
export class NbAppModule {
}
