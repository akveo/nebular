/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { TagInputAutoCompleteComponent } from './tag-input-autocomplete.component';
import { TagInputColorsComponent } from './tag-input-colors.component';
import { TagInputEventsComponent } from './tag-input-events.component';
import { TagInputFormComponent } from './tag-input-form.component';
import { TagInputMaxTagsComponent } from './tag-input-max-tags.component';
import { TagInputShapesComponent } from './tag-input-shapes.component';
import { TagInputSizesComponent } from './tag-input-sizes.component';
import { TagInputTestComponent } from './tag-input-test.component';
import { TagInputValidatorsComponent } from './tag-input-validators.component';

const routes: Route[] = [
  {
    path: 'tag-input-test.component',
    component: TagInputTestComponent,
  },
  {
    path: 'tag-input-colors.component',
    component: TagInputColorsComponent,
  },
  {
    path: 'tag-input-sizes.component',
    component: TagInputSizesComponent,
  },
  {
    path: 'tag-input-shapes.component',
    component: TagInputShapesComponent,
  },
  {
    path: 'tag-input-max-tags.component',
    component: TagInputMaxTagsComponent,
  },
  {
    path: 'tag-input-validators.component',
    component: TagInputValidatorsComponent,
  },
  {
    path: 'tag-input-events.component',
    component: TagInputEventsComponent,
  },
  {
    path: 'tag-input-form.component',
    component: TagInputFormComponent,
  },
  {
    path: 'tag-input-autocomplete.component',
    component: TagInputAutoCompleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagInputRoutingModule { }
