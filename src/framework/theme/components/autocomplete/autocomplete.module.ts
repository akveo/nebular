/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbCardModule } from '../card/card.module';
import { NbAutocompleteComponent } from './autocomplete.component';
import { NbAutocompleteDirective } from './autocomplete.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbOptionListModule } from '../option-list/option-list.module';

const NB_AUTOCOMPLETE_COMPONENTS = [
   NbAutocompleteComponent,
   NbAutocompleteDirective,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbOverlayModule,
    NbCardModule,
    NbOptionListModule,
  ],
   exports: [...NB_AUTOCOMPLETE_COMPONENTS],
   declarations: [...NB_AUTOCOMPLETE_COMPONENTS],
})
export class NbAutocompleteModule {
}
