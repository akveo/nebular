/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <input type="text" nbInput disabled>
    <textarea type="text" nbInput disabled></textarea>
  `,
  styleUrls: ['./input-component.scss'],
})
export class NbInputDisabledComponent {}
