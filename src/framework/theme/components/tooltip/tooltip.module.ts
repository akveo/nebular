/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbTooltipComponent } from './tooltip.component';
import { NbSharedModule } from '../shared/shared.module';
import { NbTooltipDirective } from './tooltip.directive';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';



@NgModule({
  imports: [NbSharedModule, NbOverlayModule],
  declarations: [NbTooltipComponent, NbTooltipDirective],
  exports: [NbTooltipDirective],
  entryComponents: [NbTooltipComponent],
})
export class NbTooltipModule {
}
