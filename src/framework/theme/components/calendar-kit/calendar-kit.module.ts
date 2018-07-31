/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import { NbCalendarDaysService, NbLocaleService } from './services';

import {
  NbCalendarDatePipe,
  NbCalendarDayCellComponent,
  NbCalendarDayCellDirective,
  NbCalendarDayPickerComponent,
  NbCalendarDaysNamesComponent,
  NbCalendarHeaderComponent,
  NbCalendarMonthCellComponent,
  NbCalendarMonthCellDirective,
  NbCalendarMonthPickerComponent,
  NbCalendarNavigationComponent,
  NbCalendarPageableNavigationComponent,
  NbCalendarYearCellComponent,
  NbCalendarYearCellDirective,
  NbCalendarYearPickerComponent,
} from './components';


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
  NbCalendarMonthCellComponent,
  NbCalendarYearCellComponent,
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
