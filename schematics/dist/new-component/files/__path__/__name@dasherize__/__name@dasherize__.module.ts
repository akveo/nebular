/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, NgModule } from '@angular/core';
import { <%= classify(className) %>Component } from './<%= dasherize(name) %>.component';

@NgModule({
  exports: [ <%= classify(className) %>Component ],
  declarations: [ <%= classify(className) %>Component ],
})
export class <%= classify(className) %>Module { }
