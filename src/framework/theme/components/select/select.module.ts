import { NgModule } from '@angular/core';

import { NbOverlayModule } from '../cdk';
import { NbInputModule } from '../input/input.module';
import { NbCardModule } from '../card/card.module';
import { NbSelectComponent } from './select.component';
import { NbOptionComponent } from './option.component';
import { NbOptionGroupComponent } from './option-group.component';


const NB_SELECT_COMPONENTS = [
  NbSelectComponent,
  NbOptionComponent,
  NbOptionGroupComponent,
];

@NgModule({
  imports: [NbOverlayModule, NbInputModule, NbCardModule],
  exports: [...NB_SELECT_COMPONENTS],
  declarations: [...NB_SELECT_COMPONENTS],
})
export class NbSelectModule {
}
