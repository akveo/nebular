/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbTagInputModule, NbToastrModule } from '@nebular/theme';
import { TagInputAutoCompleteComponent } from './tag-input-autocomplete.component';
import { TagInputColorsComponent } from './tag-input-colors.component';
import { TagInputEventsComponent } from './tag-input-events.component';
import { TagInputFormComponent } from './tag-input-form.component';
import { TagInputMaxTagsComponent } from './tag-input-max-tags.component';
import { TagInputRoutingModule } from './tag-input-routing.module';
import { TagInputShapesComponent } from './tag-input-shapes.component';
import { TagInputShowcaseComponent } from './tag-input-showcase.component';
import { TagInputSizesComponent } from './tag-input-sizes.component';
import { TagInputTestComponent } from './tag-input-test.component';
import { TagInputValidatorsComponent } from './tag-input-validators.component';

@NgModule({
  declarations: [
    TagInputTestComponent,
    TagInputColorsComponent,
    TagInputSizesComponent,
    TagInputShapesComponent,
    TagInputMaxTagsComponent,
    TagInputValidatorsComponent,
    TagInputEventsComponent,
    TagInputFormComponent,
    TagInputAutoCompleteComponent,
    TagInputShowcaseComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbTagInputModule,
    NbButtonModule,
    NbToastrModule.forRoot(),
    TagInputRoutingModule,
    ReactiveFormsModule,
  ],
})
export class TagInputModule { }
