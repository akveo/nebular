/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbCalendarKitModule } from '../calendar-kit/calendar-kit.module';
import { NbCardModule } from '../card/card.module';
import { NbBaseCalendarComponent } from './base-calendar.component';


@NgModule({
  imports: [NbCalendarKitModule, NbSharedModule, NbCardModule],
  exports: [NbBaseCalendarComponent],
  declarations: [NbBaseCalendarComponent],
})
export class NbBaseCalendarModule {
}
