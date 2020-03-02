import { ModuleWithProviders, NgModule, Injectable } from '@angular/core';

import { NbFocusTrapFactoryService } from './focus-trap';
import { NbFocusKeyManagerFactoryService } from './focus-key-manager';
import { NbActiveDescendantKeyManagerFactoryService } from './descendant-key-manager';
import { FocusMonitor } from '@angular/cdk/a11y';

@Injectable()
export class NbFocusMonitor extends FocusMonitor {}

@NgModule({})
export class NbA11yModule {
  static forRoot(): ModuleWithProviders<NbA11yModule> {
    return {
      ngModule: NbA11yModule,
      providers: [
        NbFocusTrapFactoryService,
        NbFocusKeyManagerFactoryService,
        NbActiveDescendantKeyManagerFactoryService,
        { provide: NbFocusMonitor, useClass: FocusMonitor },
      ],
    };
  }
}
