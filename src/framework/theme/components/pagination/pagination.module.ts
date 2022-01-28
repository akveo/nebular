/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule } from '../button/button.module';
import { NbIconModule } from '../icon/icon.module';
import { NbSelectModule } from '../select/select.module';
import { NbSharedModule } from '../shared/shared.module';
import { NbPaginationComponent } from './pagination.component';

@NgModule({
  declarations: [NbPaginationComponent],
  imports: [NbButtonModule, NbIconModule, NbSelectModule, NbSharedModule],
  exports: [NbPaginationComponent],
})
export class NbPaginationModule {}
