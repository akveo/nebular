/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbPopoverDirective } from './popover.directive';
import { NbPopoverComponent } from './popover.component';


@NgModule({
  imports: [NbOverlayModule],
  declarations: [NbPopoverDirective, NbPopoverComponent],
  exports: [NbPopoverDirective],
  entryComponents: [NbPopoverComponent],
})
export class NbPopoverModule {
}
