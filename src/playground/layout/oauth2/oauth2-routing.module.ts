/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { NbOAuth2CallbackComponent } from './oauth2-callback.component';
import { NbOAuth2LoginComponent } from './oauth2-login.component';

const routes: Route[] = [
  {
    path: '',
    component: NbOAuth2LoginComponent,
  },
  {
    path: 'callback',
    component: NbOAuth2CallbackComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class NbpOauth2RoutingModule {}
