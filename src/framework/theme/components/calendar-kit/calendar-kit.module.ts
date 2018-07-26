/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import { NbLocaleService } from './services';

import {
  NbCalendarCellComponent,
  NbCalendarDatePipe,
  NbCalendarDaysNamesComponent,
  NbCalendarHeaderComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarMonthViewComponent,
  NbCalendarNavigationComponent,
  NbCalendarPageableNavigationComponent,
  NbCalendarYearPickerComponent,
} from './components';


const SERVICES = [
  NbLocaleService,
];

const COMPONENTS = [
  NbCalendarHeaderComponent,
  NbCalendarNavigationComponent,
  NbCalendarPageableNavigationComponent,
  NbCalendarDaysNamesComponent,
  NbCalendarYearPickerComponent,
  NbCalendarMonthPickerComponent,
  NbCalendarMonthViewComponent,
  NbCalendarCellComponent,
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
