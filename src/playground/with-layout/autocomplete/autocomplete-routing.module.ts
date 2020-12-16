/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { AutocompleteShowcaseComponent } from './autocomplete-showcase.component';
import { AutocompleteFormComponent } from './autocomplete-form.component';
import { AutocompleteGroupComponent } from './autocomplete-group.component';
import { AutocompleteCustomDisplayComponent } from './autocomplete-custom-display.component';
import { AutocompleteActiveFirstComponent } from './autocomplete-active-first.component';
import { AutocompleteDisabledComponent } from './autocomplete-disabled.component';

const routes: Route[] = [
  {
    path: 'autocomplete-showcase.component',
    component: AutocompleteShowcaseComponent,
  },
  {
    path: 'autocomplete-form.component',
    component: AutocompleteFormComponent,
  },
  {
    path: 'autocomplete-group.component',
    component: AutocompleteGroupComponent,
  },
  {
    path: 'autocomplete-custom-display.component',
    component: AutocompleteCustomDisplayComponent,
  },
  {
    path: 'autocomplete-active-first.component',
    component: AutocompleteActiveFirstComponent,
  },
  {
    path: 'autocomplete-disabled.component',
    component: AutocompleteDisabledComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AutocompleteRoutingModule {}
