import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NB_SECURITY_OPTIONS_TOKEN, NbAclOptions } from './security.options';
import { NbAclService } from './services/acl.service';
import { NbAuthorizationChecker } from './services/authorization-checker.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [],
})
export class NbSecurityModule {
  static forRoot(nbSecurityOptions?: NbAclOptions): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NbSecurityModule,
      providers: [
        { provide: NB_SECURITY_OPTIONS_TOKEN, useValue: nbSecurityOptions },
        NbAclService,
        NbAuthorizationChecker,
      ],
    };
  }
}
