/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'nb-datepicker-forms',
  template: `
    <nb-card size="large">
      <nb-card-body class="two-inputs">
        <input nbInput placeholder="Pick Date" [nbDatepicker]="formcontrol" [formControl]="formControl">
        <nb-datepicker #formcontrol></nb-datepicker>

        <input nbInput placeholder="Form Picker" [nbDatepicker]="ngmodel" [(ngModel)]="ngModelDate">
        <nb-datepicker #ngmodel></nb-datepicker>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./datepicker-example.scss'],
})
export class DatepickerFormsComponent {
  formControl = new FormControl(new Date());
  ngModelDate = new Date();
}
