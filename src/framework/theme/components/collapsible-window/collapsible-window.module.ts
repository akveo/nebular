import { NgModule } from '@angular/core';

import { NbCollapsibleWindowComponent } from './collapsible-window.component';
import { NbCollapsibleWindowService } from './collapsible-window.service';
import { NbCollapsibleWindowDirective } from './collapsible-window.directive';
import { NbPortalModule } from '../portal/portal.module';
import { NbSharedModule } from '../shared/shared.module';
import { NbCardModule } from '../card/card.module';

@NgModule({
  imports: [NbSharedModule, NbPortalModule, NbCardModule],
  exports: [NbCollapsibleWindowDirective],
  declarations: [NbCollapsibleWindowComponent, NbCollapsibleWindowDirective],
  providers: [NbCollapsibleWindowService],
  entryComponents: [NbCollapsibleWindowComponent],
})
export class NbCollapsibleWindowModule {
}
