import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbFocusTrapFactoryService } from './focus-trap';
import { NbFocusKeyManagerFactoryService } from './focus-key-manager';
import { NbActiveDescendantKeyManagerFactoryService } from './descendant-key-manager';

@NgModule({})
export class NbA11yModule {
  static forRoot(): ModuleWithProviders<NbA11yModule> {
    return {
      ngModule: NbA11yModule,
      providers: [
        NbFocusTrapFactoryService,
        NbFocusKeyManagerFactoryService,
        NbActiveDescendantKeyManagerFactoryService,
      ],
    };
  }
}
