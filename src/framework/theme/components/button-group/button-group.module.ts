/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbButtonGroupComponent } from './button-group.component';
import { NbButtonToggleComponent } from './button-toggle.component';

@NgModule({
  exports: [ NbButtonGroupComponent, NbButtonToggleComponent ],
  declarations: [ NbButtonGroupComponent, NbButtonToggleComponent ],
})
export class NbButtonGroupModule { }
