import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbA11yModule } from '../cdk';
import { NbOverlayModule } from '../cdk/overlay';
import { NbCardModule } from '../card/card.module';
import { NbWindowService } from './window.service';
import { NbWindowsContainerComponent } from './windows-container.component';
import { NbWindowComponent } from './window.component';
import { NB_DEFAULT_WINDOWS_CONFIG, NbWindowConfig } from './window-types';
import {
  NbWindowCloseIconComponent, NbWindowCollapseIconComponent, NbWindowExpandIconComponent, NbWindowMinimizeIconComponent,
} from './window-icon.component';

@NgModule({
  imports: [ CommonModule, NbOverlayModule, NbCardModule, NbA11yModule ],
  declarations: [
    NbWindowsContainerComponent,
    NbWindowComponent,
    NbWindowCloseIconComponent,
    NbWindowCollapseIconComponent,
    NbWindowExpandIconComponent,
    NbWindowMinimizeIconComponent,
  ],
  entryComponents: [ NbWindowsContainerComponent, NbWindowComponent ],
})
export class NbWindowModule {
  static forRoot(defaultConfig?: Partial<NbWindowConfig>) {
    return <ModuleWithProviders>{
      ngModule: NbWindowModule,
      providers: [
        NbWindowService,
        { provide: NB_DEFAULT_WINDOWS_CONFIG, useValue: new NbWindowConfig(defaultConfig) },
      ],
    };
  }
}
