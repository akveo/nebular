/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <input type="text" nbInput size="small">
    <input type="text" nbInput size="medium">
    <input type="text" nbInput size="large">
  `,
  styleUrls: ['./input-component.scss'],
})
export class NbInputSizesComponent {}
