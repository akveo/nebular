/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbCalendarComponent } from './calendar.component';
import { NbCheckboxModule } from '../checkbox/checkbox.module';
import { NbCalendarSharedModule } from './calendar-shared.module';

const COMPONENTS = [
  NbCalendarComponent,
];

@NgModule({
  imports: [ NbSharedModule, NbCheckboxModule, NbCalendarSharedModule ],
  exports: [ ...COMPONENTS ],
  declarations: [ ...COMPONENTS ],
})
export class NbCalendarModule {

}
