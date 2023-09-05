/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AccordionMultiComponent } from './accordion-multi.component';
import { AccordionShowcaseComponent } from './accordion-showcase.component';
import { AccordionTestComponent } from './accordion-test.component';
import { AccordionToggleComponent } from './accordion-toggle.component';

const routes: Route[] = [
  {
    path: 'accordion-multi.component',
    component: AccordionMultiComponent,
  },
  {
    path: 'accordion-showcase.component',
    component: AccordionShowcaseComponent,
  },
  {
    path: 'accordion-test.component',
    component: AccordionTestComponent,
  },
  {
    path: 'accordion-toggle.component',
    component: AccordionToggleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccordionRoutingModule {}
