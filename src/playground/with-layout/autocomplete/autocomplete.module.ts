/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbAutocompleteModule, NbCardModule } from '@nebular/theme';
import { AutocompleteShowcaseComponent } from './autocomplete-showcase.component';
import { NbSelectModule, NbInputModule } from '../../../framework/theme/public_api';
import { AutocompleteRoutingModule } from './autocomplete-routing.module';
import { NbSharedModule } from '../../../framework/theme/components/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteFormComponent } from './autocomplete-form.component';
import { AutocompleteGroupComponent } from './autocomplete-group.component';
import { AutocompleteCustomDisplayComponent } from './autocomplete-custom-display.component';
import { AutocompleteActiveFirstComponent } from './autocomplete-active-first.component';
import { AutocompleteSizesComponent } from './autocomplete-sizes.component';

@NgModule({
  declarations: [
    AutocompleteShowcaseComponent,
    AutocompleteFormComponent,
    AutocompleteGroupComponent,
    AutocompleteCustomDisplayComponent,
    AutocompleteActiveFirstComponent,
    AutocompleteSizesComponent,
  ],
  exports: [
    AutocompleteShowcaseComponent,
    AutocompleteFormComponent,
    AutocompleteGroupComponent,
    AutocompleteCustomDisplayComponent,
    AutocompleteActiveFirstComponent,
    AutocompleteSizesComponent,
  ],
  imports: [
    NbSharedModule,
    ReactiveFormsModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbInputModule,
    AutocompleteRoutingModule,
    NbCardModule,
  ],
})
export class AutocompleteModule {}
