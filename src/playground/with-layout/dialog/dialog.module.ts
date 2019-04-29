/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule } from '@nebular/theme';
import { DialogRoutingModule } from './dialog-routing.module';
import { DialogAutoFocusComponent } from './dialog-auto-focus.component';
import { DialogBackdropClickComponent } from './dialog-backdrop-click.component';
import { DialogEscComponent } from './dialog-esc.component';
import { DialogHasBackdropComponent } from './dialog-has-backdrop.component';
import { DialogResultComponent } from './dialog-result.component';
import { DialogScrollComponent } from './dialog-scroll.component';
import { DialogShowcaseComponent } from './dialog-showcase.component';
import { DialogTemplateComponent } from './dialog-template.component';
import { AutoFocusDialogComponent } from './components/auto-focus-dialog.component';
import { BackdropClickDialogComponent } from './components/backdrop-click-dialog.component';
import { EscDialogComponent } from './components/esc-dialog.component';
import { HasBackdropDialogComponent } from './components/has-backdrop-dialog.component';
import { DialogNamePromptComponent } from './components/name-prompt-dialog.component';
import { ScrollDialogComponent } from './components/scroll-dialog.component';
import { ShowcaseDialogComponent } from './components/showcase-dialog.component';

@NgModule({
  declarations: [
    DialogAutoFocusComponent,
    DialogBackdropClickComponent,
    DialogEscComponent,
    DialogHasBackdropComponent,
    DialogResultComponent,
    DialogScrollComponent,
    DialogShowcaseComponent,
    DialogTemplateComponent,
    AutoFocusDialogComponent,
    BackdropClickDialogComponent,
    EscDialogComponent,
    HasBackdropDialogComponent,
    DialogNamePromptComponent,
    ScrollDialogComponent,
    ShowcaseDialogComponent,
  ],
  imports: [
    CommonModule,
    NbDialogModule.forRoot(),
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    DialogRoutingModule,
  ],
  entryComponents: [
    AutoFocusDialogComponent,
    BackdropClickDialogComponent,
    EscDialogComponent,
    HasBackdropDialogComponent,
    DialogNamePromptComponent,
    ScrollDialogComponent,
    ShowcaseDialogComponent,
  ],
})
export class DialogModule {}
