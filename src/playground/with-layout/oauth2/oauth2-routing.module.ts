/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { OAuth2CallbackComponent } from './oauth2-callback.component';
import { OAuth2LoginComponent } from './oauth2-login.component';

const routes: Route[] = [
  {
    path: '',
    component: OAuth2LoginComponent,
  },
  {
    path: 'callback',
    component: OAuth2CallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Oauth2RoutingModule {}
