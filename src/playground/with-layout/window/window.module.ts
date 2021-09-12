/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbWindowModule } from '@nebular/theme';

import { WindowRoutingModule } from './window-routing.module';
import { TemplateWindowComponent } from './template-window.component';
import { WindowShowcaseComponent } from './window-showcase.component';
import { WindowsBackdropComponent } from './windows-backdrop.component';
import { FormComponent } from './components/form.component';
import { WindowControlsComponent } from './window-controls.component';
import { WindowResultComponent } from './window-result.component';
import { VisitorsFormComponent } from './components/visitors-form.component';

@NgModule({
  declarations: [
    TemplateWindowComponent,
    WindowShowcaseComponent,
    WindowsBackdropComponent,
    FormComponent,
    WindowControlsComponent,
    WindowResultComponent,
    VisitorsFormComponent,
  ],
  imports: [
    CommonModule,
    NbWindowModule.forRoot(),
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbCardModule,
    WindowRoutingModule,
  ],
  entryComponents: [ FormComponent ],
})
export class WindowModule {}
