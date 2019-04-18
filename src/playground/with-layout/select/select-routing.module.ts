/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { SelectCleanComponent } from './select-clean.component';
import { SelectDisabledComponent } from './select-disabled.component';
import { SelectFormComponent } from './select-form.component';
import { SelectGroupsComponent } from './select-groups.component';
import { SelectHeroComponent } from './select-hero.component';
import { SelectLabelShowcaseComponent } from './select-label.component';
import { SelectMultipleComponent } from './select-multiple.component';
import { SelectOutlineComponent } from './select-outline.component';
import { SelectPlaceholderComponent } from './select-placeholder.component';
import { SelectShapeComponent } from './select-shapes.component';
import { SelectShowcaseComponent } from './select-showcase.component';
import { SelectSizesComponent } from './select-sizes.component';
import { SelectStatusComponent } from './select-status.component';
import { SelectInteractiveComponent } from './select-interactive.component';

const routes: Route[] = [
  {
    path: 'select-clean.component',
    component: SelectCleanComponent,
  },
  {
    path: 'select-disabled.component',
    component: SelectDisabledComponent,
  },
  {
    path: 'select-form.component',
    component: SelectFormComponent,
  },
  {
    path: 'select-groups.component',
    component: SelectGroupsComponent,
  },
  {
    path: 'select-hero.component',
    component: SelectHeroComponent,
  },
  {
    path: 'select-label.component',
    component: SelectLabelShowcaseComponent,
  },
  {
    path: 'select-multiple.component',
    component: SelectMultipleComponent,
  },
  {
    path: 'select-outline.component',
    component: SelectOutlineComponent,
  },
  {
    path: 'select-placeholder.component',
    component: SelectPlaceholderComponent,
  },
  {
    path: 'select-shapes.component',
    component: SelectShapeComponent,
  },
  {
    path: 'select-showcase.component',
    component: SelectShowcaseComponent,
  },
  {
    path: 'select-sizes.component',
    component: SelectSizesComponent,
  },
  {
    path: 'select-status.component',
    component: SelectStatusComponent,
  },
  {
    path: 'select-interactive.component',
    component: SelectInteractiveComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class SelectRoutingModule {}
