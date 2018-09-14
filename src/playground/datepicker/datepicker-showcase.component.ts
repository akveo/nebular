/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';


@Component({
  selector: 'nb-datepicker-showcase',
  template: `
    <!--<div>-->
    <!--<input class="form-control" placeholder="Datepicker" [nbDatepicker]="datepicker">-->
    <!--<nb-datepicker #datepicker></nb-datepicker>-->

    <input class="form-control" placeholder="Rangepicker" #rangeInput="ngModel" [(ngModel)]="range"
           [nbDatepicker]="rangepicker">
    <nb-rangepicker #rangepicker></nb-rangepicker>
    {{ rangeInput.valid }}

    <input class="form-control" placeholder="Form Picker" [(ngModel)]="date" [nbDatepicker]="formpicker">
    <nb-datepicker #formpicker></nb-datepicker>

    <h1>{{ date | date }}</h1>

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
  range;
  date;
}
