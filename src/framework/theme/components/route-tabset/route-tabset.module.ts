/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import { NbRouteTabsetComponent } from './route-tabset.component';
import { MergeConfigsPipe } from './merge-configs.pipe';
import { NbIconModule } from '../icon/icon.module';

@NgModule({
  imports: [NbSharedModule, NbIconModule],
  declarations: [NbRouteTabsetComponent, MergeConfigsPipe],
  exports: [NbRouteTabsetComponent],
})
export class NbRouteTabsetModule {}
