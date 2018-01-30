import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NB_ACL_USER_OPTIONS_TOKEN, NbAclOptions } from './acl.options';
import { NbAclService } from './services/acl.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [],
})
export class NbAclModule {
  static forRoot(nbAclOptions?: NbAclOptions): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NbAclModule,
      providers: [
        { provide: NB_ACL_USER_OPTIONS_TOKEN, useValue: nbAclOptions },
        NbAclService,
      ],
    };
  }
}
