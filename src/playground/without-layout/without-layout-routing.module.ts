/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { PlaygroundBaseComponent } from './playground-base.component';

const routes: Route[] = [
  {
    path: '',
    component: PlaygroundBaseComponent,
    children: [
      {
        path: 'context-menu',
        loadChildren: './context-menu/context-menu.module#ContextMenuModule',
      },
      {
        path: 'layout',
        loadChildren: './layout/layout.module#LayoutModule',
      },
      {
        path: 'scroll',
        loadChildren: './scroll/scroll.module#ScrollModule',
      },
      {
        path: 'search',
        loadChildren: './search/search.module#SearchModule',
      },
      {
        path: 'sidebar',
        loadChildren: './sidebar/sidebar.module#SidebarModule',
      },
      {
        path: 'menu',
        loadChildren: './menu/menu-test.module#MenuTestModule',
      },
      {
        path: 'user',
        loadChildren: './user/user-test.module#UserTestModule',
      },
      {
        path: 'azure',
        loadChildren: './azure/azure.module#AzurePlaygroundModule',
      },
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthPlaygroundModule',
      },
      {
        path: 'smart-home',
        loadChildren: './smart-home/app.module#AppModule',
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class WithoutLayoutRoutingModule {}
