/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import {NbAutocompleteModule, NbCardModule} from '@nebular/theme';
import { AutocompleteShowcaseComponent } from './autocomplete-showcase.component';
import { NbSelectModule, NbInputModule } from '../../../framework/theme/public_api';
import { AutocompleteRoutingModule } from './autocomplete-routing.module';
import { NbSharedModule } from '../../../framework/theme/components/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteFormComponent } from './autocomplete-form.component';
import { AutocompleteGroupComponent } from './autocomplete-group.component';

@NgModule({
  declarations: [
    AutocompleteShowcaseComponent,
    AutocompleteFormComponent,
    AutocompleteGroupComponent,
  ],
  exports: [
    AutocompleteShowcaseComponent,
    AutocompleteFormComponent,
    AutocompleteGroupComponent,
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
