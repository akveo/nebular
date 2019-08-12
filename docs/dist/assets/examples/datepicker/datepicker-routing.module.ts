import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { DatepickerFormsComponent } from './datepicker-forms.component';
import { DatepickerShowcaseComponent } from './datepicker-showcase.component';
import { DatepickerValidationComponent } from './datepicker-validation.component';
import { RangepickerShowcaseComponent } from './rangepicker-showcase.component';

const routes: Route[] = [
  {
    path: 'datepicker-forms.component',
    component: DatepickerFormsComponent,
  },
  {
    path: 'datepicker-showcase.component',
    component: DatepickerShowcaseComponent,
  },
  {
    path: 'datepicker-validation.component',
    component: DatepickerValidationComponent,
  },
  {
    path: 'rangepicker-showcase.component',
    component: RangepickerShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class DatepickerRoutingModule {}
