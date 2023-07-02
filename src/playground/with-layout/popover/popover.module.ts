/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbTabsetModule,
} from '@nebular/theme';
import { DynamicToAddComponent, PopoverListComponent, PopoverTabsComponent } from './components/dynamic.components';
import { PopoverRoutingModule } from './popover-routing.module';
import { PopoverCustomComponentComponent } from './popover-custom-component.component';
import { PopoverModesComponent } from './popover-modes.component';
import { PopoverPlacementsComponent } from './popover-placements.component';
import { PopoverShowcaseComponent } from './popover-showcase.component';
import { PopoverTemplateRefComponent } from './popover-template-ref.component';
import { PopoverTestComponent } from './popover-test.component';
import { PopoverNoopComponent } from './popover-noop.component';
import { PopoverDynamicComponent } from './popover-dynamic.component';
import { PopoverDynamicCodeComponent } from './popover-dynamic-code.component';

@NgModule({
  declarations: [
    DynamicToAddComponent,
    PopoverCustomComponentComponent,
    PopoverModesComponent,
    PopoverPlacementsComponent,
    PopoverShowcaseComponent,
    PopoverTemplateRefComponent,
    PopoverTestComponent,
    PopoverNoopComponent,
    PopoverListComponent,
    PopoverTabsComponent,
    PopoverDynamicComponent,
    PopoverDynamicCodeComponent,
  ],
  imports: [
    CommonModule,
    NbPopoverModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbListModule,
    NbTabsetModule,
    PopoverRoutingModule,
  ],
})
export class PopoverModule {}
