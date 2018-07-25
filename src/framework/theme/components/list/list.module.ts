import { NgModule } from '@angular/core';
import { NbListComponent, NbListItemComponent, NbListItemsGroupComponent } from './list.component';
import { NbListPagerDirective } from './list-pager.directive';
import { NbInfiniteListDirective } from './infinite-list.directive';

const components = [
  NbListComponent,
  NbListItemComponent,
  NbListItemsGroupComponent,
  NbListPagerDirective,
  NbInfiniteListDirective,
];

@NgModule({
  declarations: components,
  exports: components,
})
export class NbListModule {}
