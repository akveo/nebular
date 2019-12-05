import { NgModule } from '@angular/core';

import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbSharedModule } from '../shared/shared.module';
import { NbInputModule } from '../input/input.module';
import { NbCardModule } from '../card/card.module';
import { NbButtonModule } from '../button/button.module';
import { NbSelectComponent, NbSelectLabelComponent } from './select.component';
import { NbOptionListModule } from '../option-list/option-list.module';
import { NbIconModule } from '../icon/icon.module';

const NB_SELECT_COMPONENTS = [
  NbSelectComponent,
  NbSelectLabelComponent,
];

@NgModule({
  imports: [
    NbSharedModule,
    NbOverlayModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbOptionListModule,
  ],
  exports: [
    ...NB_SELECT_COMPONENTS,
    NbOptionListModule,
  ],
  declarations: [...NB_SELECT_COMPONENTS],
})
export class NbSelectModule {
}
