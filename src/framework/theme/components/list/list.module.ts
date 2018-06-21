import { NgModule } from '@angular/core';
import { NbListComponent, NbListItemComponent, NbListItemsGroupComponent } from './list.component';

const components = [
  NbListComponent,
  NbListItemComponent,
  NbListItemsGroupComponent,
];

@NgModule({
  declarations: components,
  exports: components,
})
export class NbListModule {}
