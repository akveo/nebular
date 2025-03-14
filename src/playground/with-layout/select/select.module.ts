/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbRadioModule,
  NbSelectModule,
  NbSelectWithAutocompleteModule,
} from '@nebular/theme';
import { SelectRoutingModule } from './select-routing.module';
import { SelectCleanComponent } from './select-clean.component';
import { SelectDisabledComponent } from './select-disabled.component';
import { SelectFormComponent } from './select-form.component';
import { SelectGroupsComponent } from './select-groups.component';
import { SelectHeroComponent } from './select-hero.component';
import { SelectLabelShowcaseComponent } from './select-label.component';
import { SelectMultipleComponent } from './select-multiple.component';
import { SelectFilledComponent } from './select-filled.component';
import { SelectPlaceholderComponent } from './select-placeholder.component';
import { SelectShapeComponent } from './select-shapes.component';
import { SelectShowcaseComponent } from './select-showcase.component';
import { SelectSizesComponent } from './select-sizes.component';
import { SelectStatusComponent } from './select-status.component';
import { SelectInteractiveComponent } from './select-interactive.component';
import { SelectTestComponent } from './select-test.component';
import { SelectCompareWithComponent } from './select-compare-with.component';
import { SelectIconComponent } from './select-icon.component';
import { SelectAutocompleteShowcaseComponent } from './select-autocomplete-showcase.component';
import { SelectOverlayPositionComponent } from './select-overlay-position.component';

@NgModule({
  declarations: [
    SelectCleanComponent,
    SelectDisabledComponent,
    SelectFormComponent,
    SelectGroupsComponent,
    SelectHeroComponent,
    SelectLabelShowcaseComponent,
    SelectMultipleComponent,
    SelectFilledComponent,
    SelectPlaceholderComponent,
    SelectShapeComponent,
    SelectShowcaseComponent,
    SelectSizesComponent,
    SelectStatusComponent,
    SelectInteractiveComponent,
    SelectTestComponent,
    SelectCompareWithComponent,
    SelectIconComponent,
    SelectAutocompleteShowcaseComponent,
    SelectOverlayPositionComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbSelectWithAutocompleteModule,
    SelectRoutingModule,
    NbCardModule,
    CommonModule,
    NbRadioModule,
    NbButtonModule,
    NbIconModule,
    NbFormFieldModule,
  ],
})
export class SelectModule {}
