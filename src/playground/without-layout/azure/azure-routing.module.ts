/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { NbAzureCallbackComponent } from './azure-callback.component';
import { NbAzureLoginComponent } from './azure-login.component';

const routes: Route[] = [
  {
    path: '',
    component: NbAzureLoginComponent,
  },
  {
    path: 'callback',
    component: NbAzureCallbackComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AzureRoutingModule {}
