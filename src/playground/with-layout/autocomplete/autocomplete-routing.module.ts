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

const routes: Route[] = [
  {
    path: 'autocomplete.component',
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
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AutocompleteRoutingModule {}
