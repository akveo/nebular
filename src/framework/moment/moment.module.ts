/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbDateService } from '@nebular/theme';
import { NbMomentDateService } from './services/moment-date.service';

@NgModule({
  providers: [{ provide: NbDateService, useClass: NbMomentDateService }],
})
export class NbMomentDateModule {}
