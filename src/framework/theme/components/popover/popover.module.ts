/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbPopoverDirective } from './popover.directive';
import { NbOverlayModule } from '../overlay/overlay.module';


@NgModule({
  imports: [NbOverlayModule],
  declarations: [NbPopoverDirective],
  exports: [NbPopoverDirective],
})
export class NbPopoverModule {
}
