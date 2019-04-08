/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { UserShowcaseComponent } from './user-showcase.component';
import { UserSizesComponent } from './user-sizes.component';
import { UserAvatarSettingsComponent } from './user-avatar-settings.component';
import { UserHideCaptionsComponent } from './user-hide-captions.component';
import { NbUserShapeComponent } from './user-shape.component';

const routes: Route[] = [
  {
    path: 'user-showcase.component',
    component: UserShowcaseComponent,
  },
  {
    path: 'user-sizes.component',
    component: UserSizesComponent,
  },
  {
    path: 'user-avatar-settings.component',
    component: UserAvatarSettingsComponent,
  },
  {
    path: 'user-hide-captions.component',
    component: UserHideCaptionsComponent,
  },
  {
    path: 'user-shape.component',
    component: NbUserShapeComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class UserRoutingModule {}
