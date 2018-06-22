/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbCheckboxModule } from '../checkbox/checkbox.module';
import { NbCalendarRangeComponent } from './calendar-range.component';
import { NbCalendarSharedModule } from './calendar-shared.module';
import { NbCalendarModelFactoryService } from './models/factory/calendar-model-factory.service';
import { NbCalendarRangeModelFactoryService } from './models/factory/calendar-range-model-factory.service';

const COMPONENTS = [
  NbCalendarRangeComponent,
];

const NB_CALENDAR_PROVIDERS = [
  { provide: NbCalendarModelFactoryService, useClass: NbCalendarRangeModelFactoryService },
];

@NgModule({
  imports: [ NbSharedModule, NbCheckboxModule, NbCalendarSharedModule ],
  exports: [ ...COMPONENTS ],
  declarations: [ ...COMPONENTS ],
  providers: [ ...NB_CALENDAR_PROVIDERS ],
})
export class NbCalendarRangeModule {

}
