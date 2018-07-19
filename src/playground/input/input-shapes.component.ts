/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <input type="text" nbInput shape="rectangle">
    <input type="text" nbInput shape="semi-round">
    <input type="text" nbInput shape="round">
  `,
  styleUrls: ['./input-component.scss'],
})
export class NbInputShapesComponent {}
