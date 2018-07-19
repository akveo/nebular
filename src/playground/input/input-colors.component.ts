/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <input type="text" nbInput nbInputStatus="info">
    <input type="text" nbInput nbInputStatus="success">
    <input type="text" nbInput nbInputStatus="warning">
    <input type="text" nbInput nbInputStatus="danger">
  `,
  styleUrls: ['./input-component.scss'],
})
export class NbInputColorsComponent {}
