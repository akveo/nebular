/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import { NbCalendarMonthModelService, NbLocaleService } from './services';

import {
  NbCalendarDatePipe,
  NbCalendarDayCellComponent,
  NbCalendarDayPickerComponent,
  NbCalendarDaysNamesComponent,
  NbCalendarHeaderComponent,
  NbCalendarMonthCellComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarNavigationComponent,
  NbCalendarPageableNavigationComponent,
  NbCalendarPickerComponent,
  NbCalendarPickerRowComponent,
  NbCalendarYearCellComponent,
  NbCalendarYearPickerComponent,
} from './components';


const SERVICES = [
  NbLocaleService,
  NbCalendarMonthModelService,
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
  NbCalendarMonthCellComponent,
  NbCalendarYearCellComponent,
  NbCalendarPickerRowComponent,
  NbCalendarPickerComponent,
];

const PIPES = [
  NbCalendarDatePipe,
];

@NgModule({
  imports: [NbSharedModule],
  exports: [...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [...SERVICES],
  entryComponents: [
    NbCalendarDayCellComponent,
    NbCalendarMonthCellComponent,
    NbCalendarYearCellComponent,
  ],
})
export class NbCalendarKitModule {
}
