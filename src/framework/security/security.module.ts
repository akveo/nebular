import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NB_SECURITY_OPTIONS_TOKEN, NbAclOptions } from './security.options';
import { NbAclService } from './services/acl.service';
import { NbAccessChecker } from './services/access-checker.service';
import { NbIsGrantedDirective } from './directives/is-granted.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NbIsGrantedDirective,
  ],
  exports: [
    NbIsGrantedDirective,
  ],
})
export class NbSecurityModule {
  static forRoot(nbSecurityOptions?: NbAclOptions): ModuleWithProviders<NbSecurityModule> {
    return {
      ngModule: NbSecurityModule,
      providers: [
        { provide: NB_SECURITY_OPTIONS_TOKEN, useValue: nbSecurityOptions },
        NbAclService,
        NbAccessChecker,
      ],
    };
  }
}
