/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbAutocompleteModule, NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { AutocompleteShowcaseComponent } from './autocomplete-showcase.component';
import { AutocompleteRoutingModule } from './autocomplete-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteFormComponent } from './autocomplete-form.component';
import { AutocompleteGroupComponent } from './autocomplete-group.component';
import { AutocompleteCustomDisplayComponent } from './autocomplete-custom-display.component';
import { AutocompleteActiveFirstComponent } from './autocomplete-active-first.component';
import { AutocompleteDisabledComponent } from './autocomplete-disabled.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AutocompleteShowcaseComponent,
    AutocompleteFormComponent,
    AutocompleteGroupComponent,
    AutocompleteCustomDisplayComponent,
    AutocompleteActiveFirstComponent,
    AutocompleteDisabledComponent,
  ],
  exports: [
    AutocompleteShowcaseComponent,
    AutocompleteFormComponent,
    AutocompleteGroupComponent,
    AutocompleteCustomDisplayComponent,
    AutocompleteActiveFirstComponent,
    AutocompleteDisabledComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbAutocompleteModule,
    NbInputModule,
    AutocompleteRoutingModule,
    NbCardModule,
    NbButtonModule,
  ],
})
export class AutocompleteModule {}
