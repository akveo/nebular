/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <input type="text" nbInput nbInputShape="rectangle">
    <input type="text" nbInput nbInputShape="semi-round">
    <input type="text" nbInput nbInputShape="round">
  `,
  styleUrls: ['./input-component.scss'],
})
export class NbInputShapesComponent {}
