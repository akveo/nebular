/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbAccordionModule, NbButtonModule, NbCardModule } from '@nebular/theme';
import { AccordionRoutingModule } from './accordion-routing.module';
import { AccordionMultiComponent } from './accordion-multi.component';
import { AccordionShowcaseComponent } from './accordion-showcase.component';
import { AccordionTestComponent } from './accordion-test.component';
import { AccordionToggleComponent } from './accordion-toggle.component';

@NgModule({
  declarations: [
    AccordionMultiComponent,
    AccordionShowcaseComponent,
    AccordionTestComponent,
    AccordionToggleComponent,
  ],
  imports: [
    NbAccordionModule,
    NbCardModule,
    NbButtonModule,
    AccordionRoutingModule,
  ],
})
export class AccordionModule {}
