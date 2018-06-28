import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbListModule } from '../list.module';
import { NbInfiniteListComponent, NbDisableAutoLoadButtonDirective } from './infinite-list.component';
import { NbScrollThresholdDirective } from './scroll-threshold.directive';

const componets = [
  NbInfiniteListComponent,
  NbScrollThresholdDirective,
  NbDisableAutoLoadButtonDirective,
];

@NgModule({
  imports: [ CommonModule, NbListModule ],
  declarations: componets,
  exports: componets,
})
export class NbInifiniteListModule {}
