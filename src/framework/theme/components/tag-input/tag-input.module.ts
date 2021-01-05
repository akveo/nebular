/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbSharedModule } from '../shared/shared.module';
import { NbIconModule } from '../icon/icon.module';
import { NbTagInputComponent } from './tag-input.component';
import { NbTagInputTagComponent } from './tag-input-tag.component';
import { NbTagInputInputComponent } from './tag-input-input.component';
import { NbAutocompleteModule } from '../autocomplete/autocomplete.module';

@NgModule({
  imports: [
    NbSharedModule,
    NbIconModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
  ],
  declarations: [NbTagInputComponent, NbTagInputTagComponent, NbTagInputInputComponent],
  exports: [NbTagInputComponent],
})
export class NbTagInputModule { }
