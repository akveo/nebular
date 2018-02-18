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
import { NbPopoverComponent } from '../popover/popover.component';
import { NbPopoverModule } from '../popover/popover.module';

@NgModule({
  imports: [CommonModule, NbPopoverModule, NbMenuModule],
  exports: [NbContextMenuDirective],
  declarations: [NbContextMenuDirective, NbContextMenuComponent],
  entryComponents: [NbPopoverComponent, NbContextMenuComponent],
})
export class NbContextMenuModule {
}
