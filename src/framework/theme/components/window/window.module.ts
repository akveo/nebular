import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NbButtonModule } from '../button/button.module';
import { NbCardModule } from '../card/card.module';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbIconModule } from '../icon/icon.module';
import { NbWindowComponent } from './window.component';
import { NB_WINDOW_CONFIG, NbWindowConfig } from './window.options';
import { NbWindowService } from './window.service';
import { NbWindowsContainerComponent } from './windows-container.component';

@NgModule({
  imports: [CommonModule, NbOverlayModule, NbCardModule, NbIconModule, NbButtonModule],
  declarations: [NbWindowsContainerComponent, NbWindowComponent],
})
export class NbWindowModule {
  static forRoot(defaultConfig?: Partial<NbWindowConfig>): ModuleWithProviders<NbWindowModule> {
    return {
      ngModule: NbWindowModule,
      providers: [NbWindowService, { provide: NB_WINDOW_CONFIG, useValue: defaultConfig }],
    };
  }

  static forChild(defaultConfig?: Partial<NbWindowConfig>): ModuleWithProviders<NbWindowModule> {
    return {
      ngModule: NbWindowModule,
      providers: [NbWindowService, { provide: NB_WINDOW_CONFIG, useValue: defaultConfig }],
    };
  }
}
