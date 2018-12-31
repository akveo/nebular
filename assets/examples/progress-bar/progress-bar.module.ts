import { NgModule } from '@angular/core';
import { NbActionsModule, NbCardModule, NbProgressBarModule } from '@nebular/theme';
import { ProgressBarRoutingModule } from './progress-bar-routing.module';
import { ProgressBarInteractiveComponent } from './progress-bar-interactive.component';
import { ProgressBarShowcaseComponent } from './progress-bar-showcase.component';
import { ProgressBarSizeComponent } from './progress-bar-size.component';
import { ProgressBarStatusComponent } from './progress-bar-status.component';
import { ProgressBarValueComponent } from './progress-bar-value.component';

@NgModule({
  declarations: [
    ProgressBarInteractiveComponent,
    ProgressBarShowcaseComponent,
    ProgressBarSizeComponent,
    ProgressBarStatusComponent,
    ProgressBarValueComponent,
  ],
  imports: [
    NbProgressBarModule,
    NbActionsModule,
    NbCardModule,
    ProgressBarRoutingModule,
  ],
})
export class ProgressBarModule {}
