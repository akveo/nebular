/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';


@Component({
  selector: 'nb-datepicker-showcase',
  template: `
    <input class="form-control" placeholder="Datepicker" [nbDatepicker]="datepicker">
    <nb-datepicker #datepicker></nb-datepicker>

    <input class="form-control" placeholder="Rangepicker" [nbDatepicker]="rangepicker">
    <nb-rangepicker #rangepicker></nb-rangepicker>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-content: center;
    }
  `],
})
export class NbDatepickerShowcaseComponent {
  date = new Date();
}
