/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {
  NbActionsModule,
  NbCardModule,
  NbCheckboxModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbPopoverModule,
} from '@nebular/theme';

import {
  NB_AUTH_TOKEN_WRAPPER_TOKEN,
  NbAuthJWTToken,
  NbAuthModule,
  NbEmailPassAuthProvider,
  NbAuthJWTInterceptor,
} from '@nebular/auth';

import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

import { NbAppComponent } from './app.component';
import { NbLayoutTestComponent } from './layout-test/layout-test.component';
import { NbLayoutHeaderTestComponent } from './layout-test/layout-header-test.component';
import { NbLayoutFooterTestComponent } from './layout-test/layout-footer-test.component';
import { NbThemeChangeTestComponent } from './layout-test/theme-change-test.component';
import { NbThemeBreakpointTestComponent } from './layout-test/theme-breakpoint-test.component';
import { NbTabsetTestComponent } from './tabset-test/tabset-test.component';
import {
  NbRouteTabsetTestChild1Component,
  NbRouteTabsetTestChild2Component,
  NbRouteTabsetTestComponent,
} from './route-tabset-test/route-tabset-test.component';

import { NbSidebarTestComponent } from './sidebar-test/sidebar-test.component';
import { NbSidebarTestOneComponent } from './sidebar-test/sidebar-test-one.component';
import { NbSidebarTestTwoComponent } from './sidebar-test/sidebar-test-two.component';
import { NbSidebarTestThreeComponent } from './sidebar-test/sidebar-test-three.component';
import {
  NbMenuItem1Component,
  NbMenuItem2Component,
  NbMenuItem31Component,
  NbMenuItem32Component,
  NbMenuItem331Component,
  NbMenuItem332Component,
  NbMenuItem33Component,
  NbMenuItem3Component,
  NbMenuItem4Component,
  NbMenuTestComponent,
} from './menu-test/menu-test.component';
import { NbUserTestComponent } from './user-test/user-test.component';
import { NbDynamicToAddComponent, NbThemeDynamicTestComponent } from './layout-test/theme-dynamic-test.component';
import { NbActionsTestComponent } from './actions-test/actions-test.component';
import { NbBootstrapTestComponent } from './bootstrap-test/bootstrap-test.component';
import { NbPopoverTestComponent } from './popover-test/popover-test.component';

import { routes } from './app.routes';

import { NbCheckboxTestComponent } from './checkbox-test/checkbox-test.component';
import { NbSearchTestComponent } from './search-test/search-test.component';
import { NbSearchTestCustomizedComponent } from './search-test/search-test-customized.component';
import { NbFormsTestComponent } from './forms-test/forms-test.component';

import { NbCardTestComponent } from './card-test/card-test.component';
import { NbAclTestComponent } from './acl-test/acl-test.component';
import { AuthGuard } from './auth-guard.service';
import { RoleProvider } from './role.provider';

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
  NbSearchTestCustomizedComponent,
  NbBootstrapTestComponent,
  NbDynamicToAddComponent,
  NbThemeDynamicTestComponent,
  NbThemeBreakpointTestComponent,
  NbActionsTestComponent,
  NbFormsTestComponent,
  NbPopoverTestComponent,
  NbCheckboxTestComponent,
  NbAclTestComponent,
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NbThemeModule.forRoot({ name: 'default' }),
    NbCardModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbRouteTabsetModule,
    NbSidebarModule.forRoot(),
    NbTabsetModule,
    NbUserModule,
    NbSearchModule,
    NbActionsModule,
    NbPopoverModule,
    NbCheckboxModule,
    NbAuthModule.forRoot({
      forms: {
        login: {
          redirectDelay: 3000,
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
      },
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
    ...NB_TEST_COMPONENTS,
  ],
  entryComponents: [
    NbDynamicToAddComponent,
  ],
  providers: [
    AuthGuard,
    { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthJWTToken },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    { provide: NbRoleProvider, useClass: RoleProvider },
  ],
  bootstrap: [NbAppComponent],
})
export class NbAppModule {
}
