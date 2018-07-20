/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <input type="text" nbInput fullWidth size="small" placeholder="Small">
        <input type="text" nbInput fullWidth size="medium" placeholder="Medium">
        <input type="text" nbInput fullWidth size="large" placeholder="Large">
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./input-component.scss'],
})
export class NbInputSizesComponent {}
