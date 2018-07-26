/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbCalendarComponent } from './calendar.component';
import { NbCalendarKitModule } from '../calendar-kit';
import { NbSharedModule } from '../shared/shared.module';


@NgModule({
  imports: [NbCalendarKitModule, NbSharedModule],
  exports: [NbCalendarComponent],
  declarations: [NbCalendarComponent],
})
export class NbCalendarModule {
}
