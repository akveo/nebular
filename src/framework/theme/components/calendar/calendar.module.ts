/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbCalendarComponent } from './calendar.component';
import { NbSharedModule } from '../shared/shared.module';
import { NbCalendarKitModule } from '../calendar-kit';
import { NbCardModule } from '../card/card.module';


@NgModule({
  imports: [NbCalendarKitModule, NbSharedModule, NbCardModule],
  exports: [NbCalendarComponent],
  declarations: [NbCalendarComponent],
})
export class NbCalendarModule {
}
