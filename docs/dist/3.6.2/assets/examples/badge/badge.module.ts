import { NgModule } from '@angular/core';
import { NbBadgeModule, NbCardModule } from '@nebular/theme';
import { BadgeRoutingModule } from './badge-routing.module';
import { BadgeShowcaseComponent } from './badge-showcase.component';

@NgModule({
  declarations: [
    BadgeShowcaseComponent,
  ],
  imports: [ NbBadgeModule, NbCardModule, BadgeRoutingModule ],
})
export class BadgeModule {}
