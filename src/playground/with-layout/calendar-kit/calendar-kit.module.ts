/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCalendarKitModule, NbCardModule } from '@nebular/theme';
import { CalendarKitRoutingModule } from './calendar-kit-routing.module';
import { CalendarKitFullCalendarShowcaseComponent } from './calendar-kit-full-calendar.component';
import { CalendarKitMonthCellComponent } from './components/calendar-kit-month-cell.component';

@NgModule({
  declarations: [
    CalendarKitFullCalendarShowcaseComponent,
    CalendarKitMonthCellComponent,
  ],
  imports: [ NbCardModule, NbCalendarKitModule, CalendarKitRoutingModule ],
})
export class CalendarKitModule {}
