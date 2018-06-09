import { NgModule } from '@angular/core';

import { NbCollapsableComponent } from './collapsable.component';
import { NbCollapsableService } from './collapsable.service';
import { NbCollapsableDirective } from './collapsable.directive';
import { NbPortalModule } from '../portal/portal.module';
import { NbSharedModule } from '../shared/shared.module';
import { NbCardModule } from '../card/card.module';

@NgModule({
  imports: [NbSharedModule, NbPortalModule, NbCardModule],
  exports: [NbCollapsableDirective],
  declarations: [NbCollapsableComponent, NbCollapsableDirective],
  providers: [NbCollapsableService],
  entryComponents: [NbCollapsableComponent]
})
export class NbCollapsableModule {
}
