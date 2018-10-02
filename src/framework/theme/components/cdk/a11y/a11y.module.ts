import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbFocusTrapFactoryService } from './focus-trap';


@NgModule({})
export class NbA11yModule {
  static forRoot() {
    return <ModuleWithProviders>{
      ngModule: NbA11yModule,
      providers: [NbFocusTrapFactoryService],
    };
  }
}
