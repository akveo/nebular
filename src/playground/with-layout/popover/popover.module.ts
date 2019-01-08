/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbInputModule, NbPopoverModule } from '@nebular/theme';
import { DynamicToAddComponent } from './components/dynamic.component';
import { PopoverRoutingModule } from './popover-routing.module';
import { PopoverCustomComponentComponent } from './popover-custom-component.component';
import { PopoverModesComponent } from './popover-modes.component';
import { PopoverPlacementsComponent } from './popover-placements.component';
import { PopoverShowcaseComponent } from './popover-showcase.component';
import { PopoverTemplateRefComponent } from './popover-template-ref.component';
import { PopoverTestComponent } from './popover-test.component';
import { PopoverNoopComponent } from './popover-noop.component';

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
  ],
  imports: [ NbPopoverModule, NbCardModule, NbButtonModule, NbInputModule, PopoverRoutingModule ],
  entryComponents: [ DynamicToAddComponent ],
})
export class PopoverModule {}
