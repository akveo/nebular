/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <input type="text" nbInput fullWidth status="basic" placeholder="Default">
        <input type="text" nbInput fullWidth status="primary" placeholder="Primary">
        <input type="text" nbInput fullWidth status="info" placeholder="Info">
        <input type="text" nbInput fullWidth status="success" placeholder="Success">
        <input type="text" nbInput fullWidth status="warning" placeholder="Warning">
        <input type="text" nbInput fullWidth status="danger" placeholder="Danger">
        <div class="control-status-example">
          <input type="text" nbInput fullWidth status="control" placeholder="Control">
        </div>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: [`./input-colors.component.scss`],
})
export class InputColorsComponent {}
