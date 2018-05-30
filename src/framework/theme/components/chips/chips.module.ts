/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbChipComponent, NbChipListComponent } from './chips.component';

@NgModule({
  imports: [CommonModule],
  exports: [NbChipComponent, NbChipListComponent],
  declarations: [NbChipComponent, NbChipListComponent],
  providers: [],
})
export class NbChipsModule {}
