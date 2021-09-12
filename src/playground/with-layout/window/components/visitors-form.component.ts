/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbWindowRef } from '../../../../framework/theme/components/window/window-ref';

@Component({
  selector: 'nb-visitors-form',
  template: `
    <form class="form">
      <label for="name">Enter your name:</label>
      <input nbInput #name id="name" type="text">
    </form>

    <button nbButton status="success" (click)="submit(name.value)">Submit</button>
  `,
})
export class VisitorsFormComponent {
  constructor(public windowRef: NbWindowRef) {}

  submit(name) {
    this.windowRef.close(name);
  }

  close() {
    this.windowRef.close();
  }
}
