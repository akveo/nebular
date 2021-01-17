/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbIconModule } from '../icon/icon.module';
import { NbTagComponent } from './tag.component';
import { NbTagListComponent } from './tag-list.component';
import { NbTagInputDirective } from './tag-input.directive';

@NgModule({
  imports: [
    CommonModule,
    NbIconModule,
  ],
  declarations: [
    NbTagComponent,
    NbTagListComponent,
    NbTagInputDirective,
  ],
  exports: [
    NbTagComponent,
    NbTagListComponent,
    NbTagInputDirective,
  ],
})
export class NbTagModule { }
