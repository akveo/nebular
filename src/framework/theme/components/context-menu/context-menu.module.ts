/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbContextMenuDirective } from './context-menu.directive';
import { NbContextMenuComponent } from './context-menu.component';
import { NbMenuModule } from '../menu/menu.module';
import { NbArrowedOverlayContainerComponent } from '../overlay/arrowed-overlay-container/arrowed-overlay-container.component';
import { NbPopoverModule } from '../popover/popover.module';
import { NbOverlayModule } from '@nebular/theme/components/overlay';

@NgModule({
  imports: [CommonModule, NbOverlayModule, NbMenuModule],
  exports: [NbContextMenuDirective],
  declarations: [NbContextMenuDirective, NbContextMenuComponent],
  entryComponents: [NbArrowedOverlayContainerComponent, NbContextMenuComponent],
})
export class NbContextMenuModule {
}
