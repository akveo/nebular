/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbMenuModule } from '../menu/menu.module';
import { NbContextMenuComponent } from './context-menu.component';
import { NbContextMenuDirective } from './context-menu.directive';

@NgModule({
  imports: [CommonModule, NbOverlayModule, NbMenuModule],
  exports: [NbContextMenuDirective],
  declarations: [NbContextMenuDirective, NbContextMenuComponent],
})
export class NbContextMenuModule {}
