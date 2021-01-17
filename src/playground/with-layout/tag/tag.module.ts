/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAutocompleteModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbTagModule,
} from '@nebular/theme';

import { TagRoutingModule } from './tag-routing.module';
import { TagShowcaseComponent } from './tag-showcase.component';
import { TagAppearanceComponent } from './tag-appearance.component';
import { TagInputComponent } from './tag-input.component';
import { TagInputWithAutocompleteComponent } from './tag-input-with-autocomplete.component';
import { TagStatusComponent } from './tag-status.component';
import { TagRemovableComponent } from './tag-removable.component';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbTagModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbAutocompleteModule,
    TagRoutingModule,
  ],
  declarations: [
    TagShowcaseComponent,
    TagAppearanceComponent,
    TagInputComponent,
    TagInputWithAutocompleteComponent,
    TagStatusComponent,
    TagRemovableComponent,
  ],
})
export class TagModule { }
