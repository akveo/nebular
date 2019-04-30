/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule, NbUserModule } from '@nebular/theme';
import { UserRoutingModule } from './user-routing.module';
import { UserShowcaseComponent } from './user-showcase.component';
import { UserSizesComponent } from './user-sizes.component';
import { UserAvatarSettingsComponent } from './user-avatar-settings.component';
import { UserHideCaptionsComponent } from './user-hide-captions.component';
import { NbUserShapeComponent } from './user-shape.component';

@NgModule({
  declarations: [
    UserShowcaseComponent,
    UserSizesComponent,
    UserAvatarSettingsComponent,
    UserHideCaptionsComponent,
    NbUserShapeComponent,
  ],
  imports: [ NbUserModule, NbCardModule, UserRoutingModule ],
})
export class UserModule {}
