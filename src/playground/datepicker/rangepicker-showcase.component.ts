/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';


@Component({
  selector: 'nb-rangepicker-showcase',
  template: `
    <div>
      <input nbInput placeholder="Form Picker" [nbDatepicker]="formpicker">
      <nb-rangepicker #formpicker></nb-rangepicker>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-content: center;
      height: 40rem;
    }

    :host input {
      width: 21.875rem;
    }
  `],
})
export class NbRangepickerShowcaseComponent {
}
