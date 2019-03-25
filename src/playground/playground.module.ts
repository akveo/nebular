/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { PlaygroundRoutingModule } from './playground-routing.module';

@NgModule({
  imports: [ PlaygroundRoutingModule, NbEvaIconsModule ],
})
export class PlaygroundModule {}
