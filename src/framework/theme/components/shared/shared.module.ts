/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [
    CommonModule,
    // TODO: probably we don't need FormsModule in SharedModule
    FormsModule,
    RouterModule,
  ],
})
export class NbSharedModule { }
