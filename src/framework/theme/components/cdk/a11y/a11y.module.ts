import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbFocusTrapFactoryService } from './focus-trap';
import { NbFocusKeyManagerFactoryService } from './focus-key-manager';

@NgModule({})
export class NbA11yModule {
  static forRoot() {
    return <ModuleWithProviders>{
      ngModule: NbA11yModule,
      providers: [
        NbFocusTrapFactoryService,
        NbFocusKeyManagerFactoryService,
      ],
    };
  }
}
