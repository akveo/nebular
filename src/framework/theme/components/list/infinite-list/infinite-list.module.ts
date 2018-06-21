import { NgModule } from '@angular/core';
import { NbListModule } from '../list.module';
import { NbInfiniteListComponent } from './infinite-list.component';
import { NbScrollThresholdDirective } from './scroll-threshold.directive';

@NgModule({
  imports: [ NbListModule ],
  declarations: [ NbInfiniteListComponent, NbScrollThresholdDirective ],
  exports: [ NbInfiniteListComponent, NbScrollThresholdDirective ],
})
export class NbInifiniteListModule {}
