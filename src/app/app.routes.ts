/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Routes } from '@angular/router';
import { NbActionsTestComponent } from './actions-test/actions-test.component';
import { NbBootstrapTestComponent } from './bootstrap-test/bootstrap-test.component';

import { NbFormsTestComponent } from './forms-test/forms-test.component';
import { NbLayoutFooterTestComponent } from './layout-test/layout-footer-test.component';
import { NbLayoutHeaderTestComponent } from './layout-test/layout-header-test.component';
import { NbLayoutTestComponent } from './layout-test/layout-test.component';
import { NbThemeChangeTestComponent } from './layout-test/theme-change-test.component';
import { NbThemeDynamicTestComponent } from './layout-test/theme-dynamic-test.component';
import { NbThemeBreakpointTestComponent } from './layout-test/theme-breakpoint-test.component';
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
import {
  NbRouteTabsetTestChild1Component,
  NbRouteTabsetTestChild2Component,
  NbRouteTabsetTestComponent,
} from './route-tabset-test/route-tabset-test.component';
import { NbSearchTestComponent } from './search-test/search-test.component';
import { NbSidebarTestOneComponent } from './sidebar-test/sidebar-test-one.component';
import { NbSidebarTestThreeComponent } from './sidebar-test/sidebar-test-three.component';
import { NbSidebarTestTwoComponent } from './sidebar-test/sidebar-test-two.component';
import { NbSidebarTestComponent } from './sidebar-test/sidebar-test.component';
import { NbTabsetTestComponent } from './tabset-test/tabset-test.component';
import { NbUserTestComponent } from './user-test/user-test.component';
import { NbCardTestComponent } from './card-test/card-test.component';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: NbCardTestComponent,
  },
  {
    path: 'layout',
    component: NbLayoutTestComponent,
  },
  {
    path: 'restricted-route',
    canActivate: [AuthGuard],
    component: NbLayoutTestComponent,
  },
  {
    path: 'layout/header',
    component: NbLayoutHeaderTestComponent,
  },
  {
    path: 'layout/footer',
    component: NbLayoutFooterTestComponent,
  },
  {
    path: 'layout/change-theme',
    component: NbThemeChangeTestComponent,
  },
  {
    path: 'layout/dynamic',
    component: NbThemeDynamicTestComponent,
  },
  {
    path: 'layout/breakpoint',
    component: NbThemeBreakpointTestComponent,
  },
  {
    path: 'tabset',
    component: NbTabsetTestComponent,
  },
  {
    path: 'tabset/:tab',
    component: NbTabsetTestComponent,
  },
  {
    path: 'sidebar',
    component: NbSidebarTestComponent,
  },
  {
    path: 'sidebar/one',
    component: NbSidebarTestOneComponent,
  },
  {
    path: 'sidebar/two',
    component: NbSidebarTestTwoComponent,
  },
  {
    path: 'sidebar/three',
    component: NbSidebarTestThreeComponent,
  },
  {
    path: 'route-tabset',
    component: NbRouteTabsetTestComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full',
      },
      {
        path: 'tab1',
        component: NbRouteTabsetTestChild1Component,
      },
      {
        path: 'tab2',
        component: NbRouteTabsetTestChild2Component,
      },
    ],
  },
  {
    path: 'menu',
    component: NbMenuTestComponent,
    children: [
      {
        path: '',
        redirectTo: '1',
        pathMatch: 'full',
      },
      {
        path: '1',
        component: NbMenuItem1Component,
      },
      {
        path: '2',
        component: NbMenuItem2Component,
      },
      {
        path: '3',
        component: NbMenuItem3Component,
        children: [
          {
            path: '',
            redirectTo: '1',
            pathMatch: 'full',
          },
          {
            path: '1',
            component: NbMenuItem31Component,
          },
          {
            path: '2',
            component: NbMenuItem32Component,
          },
          {
            path: '3',
            component: NbMenuItem33Component,
            children: [
              {
                path: '',
                redirectTo: '1',
                pathMatch: 'full',
              },
              {
                path: '1',
                component: NbMenuItem331Component,
              },
              {
                path: '2',
                component: NbMenuItem332Component,
              },
            ],
          },
        ],
      },
      {
        path: '4',
        component: NbMenuItem4Component,
      },
    ],
  },
  {
    path: 'user',
    component: NbUserTestComponent,
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  {
    path: 'search',
    component: NbSearchTestComponent,
  },
  {
    path: 'bootstrap',
    component: NbBootstrapTestComponent,
  },
  {
    path: 'actions',
    component: NbActionsTestComponent,
  },
  {
    path: 'forms',
    component: NbFormsTestComponent,
  },
  {
    path: '**',
    component: NbCardTestComponent,
  },
];
