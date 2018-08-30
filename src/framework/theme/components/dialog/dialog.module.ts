/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbA11yModule, NbOverlayModule } from '../cdk';
import { NbDialogService } from './dialog.service';
import { NbDialogContainerComponent } from './dialog-container';


@NgModule({
  imports: [NbSharedModule, NbA11yModule, NbOverlayModule],
  providers: [NbDialogService],
  declarations: [NbDialogContainerComponent],
  entryComponents: [NbDialogContainerComponent],
})
export class NbDialogModule {
}
