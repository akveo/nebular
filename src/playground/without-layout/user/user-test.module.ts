/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbLayoutModule, NbUserModule } from '@nebular/theme';
import { UserTestRoutingModule } from './user-test-routing.module';
import { UserTestComponent } from './user-test.component';

@NgModule({
  declarations: [UserTestComponent],
  imports: [NbUserModule, NbLayoutModule, UserTestRoutingModule],
})
export class UserTestModule {}
