/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbProgressBarComponent } from './progress-bar.component';

@NgModule({
  imports: [NbSharedModule],
  declarations: [NbProgressBarComponent],
  exports: [NbProgressBarComponent],
})
export class NbProgressBarModule {}
