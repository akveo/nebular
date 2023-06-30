/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { TagShowcaseComponent } from './tag-showcase.component';
import { TagAppearanceComponent } from './tag-appearance.component';
import { TagInputComponent } from './tag-input.component';
import { TagInputWithAutocompleteComponent } from './tag-input-with-autocomplete.component';
import { TagStatusComponent } from './tag-status.component';
import { TagRemovableComponent } from './tag-removable.component';

const routes: Route[] = [
  {
    path: 'tag-showcase.component',
    component: TagShowcaseComponent,
  },
  {
    path: 'tag-appearance.component',
    component: TagAppearanceComponent,
  },
  {
    path: 'tag-input.component',
    component: TagInputComponent,
  },
  {
    path: 'tag-input-with-autocomplete.component',
    component: TagInputWithAutocompleteComponent,
  },
  {
    path: 'tag-status.component',
    component: TagStatusComponent,
  },
  {
    path: 'tag-removable.component',
    component: TagRemovableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagRoutingModule {}
