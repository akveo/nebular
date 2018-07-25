import { NgModule } from '@angular/core';
import { NbListComponent, NbListItemComponent } from './list.component';
import { NbListPagerDirective } from './list-pager.directive';
import { NbInfiniteListDirective } from './infinite-list.directive';

const components = [
  NbListComponent,
  NbListItemComponent,
  NbListPagerDirective,
  NbInfiniteListDirective,
];

@NgModule({
  declarations: components,
  exports: components,
})
export class NbListModule {}
