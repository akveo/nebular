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
        loadChildren: () => import('./context-menu/context-menu.module').then(m => m.ContextMenuModule),
      },
      {
        path: 'layout',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
      },
      {
        path: 'scroll',
        loadChildren: () => import('./scroll/scroll.module').then(m => m.ScrollModule),
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
      },
      {
        path: 'sidebar',
        loadChildren: () => import('./sidebar/sidebar.module').then(m => m.SidebarModule),
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu-test.module').then(m => m.MenuTestModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user-test.module').then(m => m.UserTestModule),
      },
      {
        path: 'azure',
        loadChildren: () => import('./azure/azure.module').then(m => m.AzurePlaygroundModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthPlaygroundModule),
      },
      {
        path: 'smart-home',
        loadChildren: () => import('./smart-home/app.module').then(m => m.AppModule),
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class WithoutLayoutRoutingModule {}
