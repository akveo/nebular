import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbListModule } from '../list.module';
import { NbInfiniteListDirective } from './infinite-list.directive';

const componets = [
  NbInfiniteListDirective,
];

@NgModule({
  imports: [ NbListModule ],
  declarations: componets,
  exports: componets,
})
export class NbInifiniteListModule {}
