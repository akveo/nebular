import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NB_SECURITY_OPTIONS_TOKEN, NbAclOptions } from './security.options';
import { NbAclService } from './services/acl.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [],
})
export class NbAclModule {
  static forRoot(nbSecurityOptions?: NbAclOptions): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NbAclModule,
      providers: [
        { provide: NB_SECURITY_OPTIONS_TOKEN, useValue: nbSecurityOptions },
        NbAclService,
      ],
    };
  }
}
