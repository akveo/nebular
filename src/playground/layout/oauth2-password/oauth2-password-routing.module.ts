/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { NbOAuth2PasswordLoginComponent } from './oauth2-password-login.component';

const routes: Route[] = [
  {
    path: '',
    component: NbOAuth2PasswordLoginComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class NbpOauth2PasswordRoutingModule {}
