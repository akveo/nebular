/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule, NbRadioModule, NbToastrModule, NbCardModule } from '@nebular/theme';
import { ToastrRoutingModule } from './toastr-routing.module';
import { ToastrDestroyByClickComponent } from './toastr-destroy-by-click.component';
import { ToastrDurationComponent } from './toastr-duration.component';
import { ToastrIconComponent } from './toastr-icon.component';
import { ToastrPositionsComponent } from './toastr-positions.component';
import { ToastrPreventDuplicatesComponent } from './toastr-prevent-duplicates.component';
import { ToastrShowcaseComponent } from './toastr-showcase.component';
import { ToastrStatusesComponent } from './toastr-statuses.component';
import { ToastrLimitComponent } from './toastr-limit.component';
import { ToastrPreventDuplicatesBehaviourComponent } from './toastr-prevent-duplicates-behaviour.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ToastrDestroyByClickComponent,
    ToastrDurationComponent,
    ToastrIconComponent,
    ToastrPositionsComponent,
    ToastrPreventDuplicatesComponent,
    ToastrPreventDuplicatesBehaviourComponent,
    ToastrShowcaseComponent,
    ToastrStatusesComponent,
    ToastrLimitComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbToastrModule.forRoot(),
    NbButtonModule,
    NbRadioModule,
    NbCardModule,
    ToastrRoutingModule,
  ],
})
export class ToastrModule {}
