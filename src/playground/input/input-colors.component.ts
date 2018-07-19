/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <input type="text" nbInput status="info">
    <input type="text" nbInput status="success">
    <input type="text" nbInput status="warning">
    <input type="text" nbInput status="danger">
  `,
  styleUrls: ['./input-component.scss'],
})
export class NbInputColorsComponent {}
