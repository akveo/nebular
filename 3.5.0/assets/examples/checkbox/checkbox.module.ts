import { NgModule } from '@angular/core';
import { NbCheckboxModule } from '@nebular/theme';
import { CheckboxRoutingModule } from './checkbox-routing.module';
import { CheckboxDisabledComponent } from './checkbox-disabled.component';
import { CheckboxShowcaseComponent } from './checkbox-showcase.component';
import { CheckboxStatusComponent } from './checkbox-status.component';
import { CheckboxTestComponent } from './checkbox-test.component';

@NgModule({
  declarations: [
    CheckboxDisabledComponent,
    CheckboxShowcaseComponent,
    CheckboxStatusComponent,
    CheckboxTestComponent,
  ],
  imports: [ NbCheckboxModule, CheckboxRoutingModule ],
})
export class CheckboxModule {}
