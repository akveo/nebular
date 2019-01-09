/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { InfiniteListPlaceholdersComponent } from './infinite-list-placeholders.component';
import { InfiniteListScrollModesComponent } from './infinite-list-scroll-modes.component';
import { InfiniteListShowcaseComponent } from './infinite-list-showcase.component';
import { InfiniteNewsListComponent } from './infinite-news-list.component';

const routes: Route[] = [
  {
    path: 'infinite-list-placeholders.component',
    component: InfiniteListPlaceholdersComponent,
  },
  {
    path: 'infinite-list-scroll-modes.component',
    component: InfiniteListScrollModesComponent,
  },
  {
    path: 'infinite-list-showcase.component',
    component: InfiniteListShowcaseComponent,
  },
  {
    path: 'infinite-news-list.component',
    component: InfiniteNewsListComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class InfiniteListRoutingModule {}
