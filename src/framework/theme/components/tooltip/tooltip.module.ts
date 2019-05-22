/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbIconModule } from '../icon/icon.module';

import { NbTooltipComponent } from './tooltip.component';
import { NbTooltipDirective } from './tooltip.directive';


@NgModule({
  imports: [NbSharedModule, NbOverlayModule, NbIconModule],
  declarations: [NbTooltipComponent, NbTooltipDirective],
  exports: [NbTooltipDirective],
  entryComponents: [NbTooltipComponent],
})
export class NbTooltipModule {
}
