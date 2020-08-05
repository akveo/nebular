/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbButtonGroupComponent } from './button-group.component';
import { NbButtonToggleDirective } from './button-toggle.directive';

@NgModule({
  exports: [ NbButtonGroupComponent, NbButtonToggleDirective ],
  declarations: [ NbButtonGroupComponent, NbButtonToggleDirective ],
})
export class NbButtonGroupModule { }
