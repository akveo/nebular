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
    <div>
      <input nbInput placeholder="Form Picker" [nbDatepicker]="formcontrol" [formControl]="formControl">
      <nb-datepicker #formcontrol></nb-datepicker>

      <input nbInput placeholder="Form Picker" [nbDatepicker]="ngmodel" [(ngModel)]="ngModelDate">
      <nb-datepicker #ngmodel></nb-datepicker>
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
export class NbDatepickerFormsComponent {
  formControl = new FormControl(new Date());
  ngModelDate = new Date();
}
