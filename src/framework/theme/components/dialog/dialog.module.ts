/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbA11yModule } from '../cdk';
import { NbDialogService } from './dialog.service';


@NgModule({
  imports: [NbSharedModule, NbA11yModule],
  providers: [NbDialogService],
})
export class NbDialogModule {
}
