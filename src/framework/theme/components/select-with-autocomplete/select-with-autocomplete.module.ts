import { NgModule } from '@angular/core';

import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbSharedModule } from '../shared/shared.module';
import { NbInputModule } from '../input/input.module';
import { NbCardModule } from '../card/card.module';
import { NbButtonModule } from '../button/button.module';
import { NbSelectWithAutocompleteComponent } from './select-with-autocomplete.component';
import { NbOptionModule } from '../option/option-list.module';
import { NbSelectModule } from '../select/select.module';
import { NbIconModule } from '../icon/icon.module';
import { NbFormFieldModule } from '../form-field/form-field.module';

const NB_SELECT_COMPONENTS = [NbSelectWithAutocompleteComponent];

@NgModule({
  imports: [
    NbSharedModule,
    NbOverlayModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbOptionModule,
    NbFormFieldModule,
    NbSelectModule,
  ],
  exports: [...NB_SELECT_COMPONENTS, NbOptionModule, NbSelectModule],
  declarations: [...NB_SELECT_COMPONENTS],
})
export class NbSelectWithAutocompleteModule {}
