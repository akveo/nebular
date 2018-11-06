/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { <%= classify(moduleName) %>RoutingModule } from './<%= dasherize(moduleName) %>-routing.module'

@NgModule({
  declarations: [],
  imports: [ <%= classify(moduleName) %>RoutingModule ],
})
export class <%= classify(moduleName) %>Module {}
