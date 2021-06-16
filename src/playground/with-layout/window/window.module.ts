/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbInputModule, NbWindowModule } from '@nebular/theme';
import { WindowNamePromptComponent } from './components/name-prompt-window.component';
import { WindowResultComponent } from './window-result.component';
import { WindowRoutingModule } from './window-routing.module';
import { TemplateWindowComponent } from './template-window.component';
import { WindowShowcaseComponent } from './window-showcase.component';
import { WindowsBackdropComponent } from './windows-backdrop.component';
import { FormComponent } from './components/form.component';

@NgModule({
            declarations: [
              TemplateWindowComponent,
              WindowShowcaseComponent,
              WindowsBackdropComponent,
              WindowResultComponent,
              WindowNamePromptComponent,
              FormComponent,
            ],
            imports: [
              CommonModule,
              NbWindowModule.forRoot(),
              NbButtonModule,
              NbInputModule,
              WindowRoutingModule,
            ],
            entryComponents: [ FormComponent ],
          })
export class WindowModule {}
