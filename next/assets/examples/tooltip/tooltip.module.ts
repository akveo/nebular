import { NgModule } from '@angular/core';
import { NbButtonModule, NbTooltipModule } from '@nebular/theme';
import { TooltipRoutingModule } from './tooltip-routing.module';
import { TooltipColorsComponent } from './tooltip-colors.component';
import { TooltipPlacementsComponent } from './tooltip-placements.component';
import { TooltipShowcaseComponent } from './tooltip-showcase.component';
import { TooltipWithIconComponent } from './tooltip-with-icon.component';

@NgModule({
  declarations: [
    TooltipColorsComponent,
    TooltipPlacementsComponent,
    TooltipShowcaseComponent,
    TooltipWithIconComponent,
  ],
  imports: [ NbButtonModule, NbTooltipModule, TooltipRoutingModule ],
})
export class TooltipModule {}
