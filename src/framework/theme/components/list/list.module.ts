import { NgModule } from '@angular/core';
import { NbListComponent, NbListItemComponent, NbListItemsGroupComponent } from './list.component';
import { NbListPagerDirective } from './list-pager.directive';

const components = [
  NbListComponent,
  NbListItemComponent,
  NbListItemsGroupComponent,
  NbListPagerDirective,
];

@NgModule({
  declarations: components,
  exports: components,
})
export class NbListModule {}
