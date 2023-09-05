/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbListModule, NbSpinnerModule } from '@nebular/theme';
import { InfiniteListRoutingModule } from './infinite-list-routing.module';
import { InfiniteListPlaceholdersComponent } from './infinite-list-placeholders.component';
import { InfiniteListScrollModesComponent } from './infinite-list-scroll-modes.component';
import { InfiniteListShowcaseComponent } from './infinite-list-showcase.component';
import { InfiniteNewsListComponent } from './infinite-news-list.component';
import { NewsPostPlaceholderComponent } from './components/news-post-placeholder.component';
import { NewsPostComponent } from './components/news-post.component';

@NgModule({
  declarations: [
    InfiniteListPlaceholdersComponent,
    InfiniteListScrollModesComponent,
    InfiniteListShowcaseComponent,
    InfiniteNewsListComponent,
    NewsPostPlaceholderComponent,
    NewsPostComponent,
  ],
  imports: [CommonModule, NbListModule, NbCardModule, NbSpinnerModule, InfiniteListRoutingModule],
})
export class InfiniteListModule {}
