/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbInputModule, NbWindowModule } from '@nebular/theme';
import { WindowRoutingModule } from './window-routing.module';
import { TemplateWindowComponent } from './template-window.component';
import { WindowShowcaseComponent } from './window-showcase.component';
import { WindowsBackdropComponent } from './windows-backdrop.component';
import { FormComponent } from './components/form.component';
import { WindowControlsComponent } from './window-controls.component';

@NgModule({
  declarations: [
    TemplateWindowComponent,
    WindowShowcaseComponent,
    WindowsBackdropComponent,
    FormComponent,
    WindowControlsComponent,
  ],
  imports: [
    NbWindowModule.forRoot(),
    NbButtonModule,
    NbInputModule,
    WindowRoutingModule,
    FormsModule,
  ],
  entryComponents: [ FormComponent ],
})
export class WindowModule {}
