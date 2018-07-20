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
        <input type="text" nbInput fullWidth status="info" placeholder="Info">
        <input type="text" nbInput fullWidth status="success" placeholder="Success">
        <input type="text" nbInput fullWidth status="warning" placeholder="Warning">
        <input type="text" nbInput fullWidth status="danger" placeholder="Danger">
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./input-component.scss'],
})
export class NbInputColorsComponent {}
