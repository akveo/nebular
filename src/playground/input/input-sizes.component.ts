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
        <input type="text" nbInput fullWidth fieldSize="small" placeholder="Small">
        <input type="text" nbInput fullWidth fieldSize="medium" placeholder="Medium">
        <input type="text" nbInput fullWidth fieldSize="large" placeholder="Large">
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./input-component.scss'],
})
export class NbInputSizesComponent {}
