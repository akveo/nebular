/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbDateService } from '@nebular/theme';


@Component({
  selector: 'nb-datepicker-showcase',
  template: `
    <!--<div>-->
    <!--<input class="form-control" placeholder="Datepicker" [nbDatepicker]="datepicker">-->
    <!--<nb-datepicker #datepicker></nb-datepicker>-->

    <!--<input class="form-control" placeholder="Rangepicker" #rangeInput="ngModel" [(ngModel)]="range"-->
    <!--[nbDatepicker]="rangepicker">-->
    <!--<nb-rangepicker #rangepicker></nb-rangepicker>-->
    <!--{{ rangeInput.valid }}-->

    <input class="form-control" placeholder="Form Picker" #formInput="ngModel" [(ngModel)]="date"
           [nbDatepicker]="formpicker">
    <nb-datepicker [min]="min" [max]="max" #formpicker></nb-datepicker>

    <!--<h1>{{ date | date }}</h1>-->

    <!--<button nbButton hero (click)="english()">Use English Locale</button>-->
    <!--<button nbButton hero (click)="german()">Use German Locale</button>-->
    <!--<button nbButton hero (click)="japanese()">Use Japanese Locale</button>-->
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

  min = new Date(2018, 9, 15);
  max = new Date(2018, 10, 15);

  constructor(protected dateService: NbDateService<Date>) {
  }

  english() {
    this.dateService.setLocale('en');
  }

  german() {
    this.dateService.setLocale('de');
  }

  japanese() {
    this.dateService.setLocale('ja');
  }
}
