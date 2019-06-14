import { NgModule } from '@angular/core';
import { NbAccordionModule, NbCardModule } from '@nebular/theme';
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
  imports: [ NbAccordionModule, NbCardModule, AccordionRoutingModule ],
})
export class AccordionModule {}
