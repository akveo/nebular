import { NgModule } from '@angular/core';

import { NbOverlayModule } from '../cdk';
import { NbSharedModule } from '../shared/shared.module';
import { NbInputModule } from '../input/input.module';
import { NbCardModule } from '../card/card.module';
import { NbCheckboxModule } from '../checkbox/checkbox.module';
import { NbButtonModule } from '../button/button.module';
import { NbSelectComponent, NbSelectLabelComponent } from './select.component';
import { NbOptionComponent } from './option.component';
import { NbOptionGroupComponent } from './option-group.component';


const NB_SELECT_COMPONENTS = [
  NbSelectComponent,
  NbOptionComponent,
  NbOptionGroupComponent,
  NbSelectLabelComponent,
];

@NgModule({
  imports: [NbSharedModule, NbOverlayModule, NbButtonModule, NbInputModule, NbCardModule, NbCheckboxModule],
  exports: [...NB_SELECT_COMPONENTS],
  declarations: [...NB_SELECT_COMPONENTS],
})
export class NbSelectModule {
}
