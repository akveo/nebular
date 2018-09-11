/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbDatepickerDirective } from './datepicker.directive';
import { NbOverlayModule } from '../cdk';
import { NbCalendarModule } from '../calendar/calendar.module';
import { NbCalendarComponent } from '../calendar/calendar.component';


@NgModule({
  imports: [NbOverlayModule, NbCalendarModule],
  exports: [NbDatepickerDirective],
  declarations: [NbDatepickerDirective],
  entryComponents: [NbCalendarComponent],
})
export class NbDatepickerModule {
}


