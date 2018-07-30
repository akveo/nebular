/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import { NbCalendarDaysService, NbLocaleService } from './services';

import {
  NbCalendarDayCellComponent,
  NbCalendarDayCellDirective,
  NbCalendarDatePipe,
  NbCalendarDayPickerComponent,
  NbCalendarDaysNamesComponent,
  NbCalendarHeaderComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarNavigationComponent,
  NbCalendarPageableNavigationComponent,
  NbCalendarYearPickerComponent,
} from './components';
import {
  NbCalendarMonthCellDirective,
  NbCalendarYearCellDirective,
} from '@nebular/theme/components/calendar-kit/components/calendar-cell';


const SERVICES = [
  NbLocaleService,
  NbCalendarDaysService,
];

const COMPONENTS = [
  NbCalendarHeaderComponent,
  NbCalendarNavigationComponent,
  NbCalendarPageableNavigationComponent,
  NbCalendarDaysNamesComponent,
  NbCalendarYearPickerComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarDayPickerComponent,
  NbCalendarDayCellComponent,
  NbCalendarDayCellDirective,
  NbCalendarMonthCellDirective,
  NbCalendarYearCellDirective,
];

const PIPES = [
  NbCalendarDatePipe,
];

@NgModule({
  imports: [NbSharedModule],
  exports: [...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [...SERVICES],
})
export class NbCalendarKitModule {

}
