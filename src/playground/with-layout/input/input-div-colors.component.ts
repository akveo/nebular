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
        <div role="textbox" contenteditable="true" aria-label="Reply" nbInput fullWidth status="basic"></div>
        <div role="textbox" contenteditable="true" nbInput fullWidth status="primary"></div>
        <div role="textbox" contenteditable="true" nbInput fullWidth status="info"></div>
        <div role="textbox" contenteditable="true" nbInput fullWidth status="success"></div>
        <div role="textbox" contenteditable="true" nbInput fullWidth status="warning"></div>
        <div role="textbox" contenteditable="true" nbInput fullWidth status="danger"></div>
        <div class="control-status-example">
          <div role="textbox" contenteditable="true" nbInput fullWidth status="control"></div>
        </div>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: [`./input-colors.component.scss`],
})
export class InputDivColorsComponent {}
