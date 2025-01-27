/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'npg-datepicker-dynamic-inputs-showcase',
  templateUrl: './datepicker-dynamic-inputs-showcase.component.html',
  styles: [
    `
      section {
        margin-bottom: 2rem;
      }

      section > * + * {
        margin-left: 1rem;
      }
    `,
  ],
  standalone: false,
})
export class DatepickerDynamicInputsShowcaseComponent {
  now = new Date();

  format = 'dd/MM/yyyy HH:mm';
  formatToggleTimer = null;
  firstDayOfWeek: number | undefined = undefined;
  firstDayOfWeekToggleTimer = null;

  toggleFormatSwitching() {
    if (this.formatToggleTimer == null) {
      this.formatToggleTimer = setInterval(() => {
        this.toggleFormat();
      }, 1000);
    } else {
      clearInterval(this.formatToggleTimer);
      this.formatToggleTimer = null;
    }
  }

  toggleFormat() {
    this.format = this.format === 'dd/MM/yyyy HH:mm' ? 'HH:mm dd/MM/yyyy' : 'dd/MM/yyyy HH:mm';
  }

  toggleFirstDayOfWeekSwitching() {
    if (this.firstDayOfWeekToggleTimer == null) {
      this.firstDayOfWeekToggleTimer = setInterval(() => {
        this.toggleFirstDayOfWeek();
      }, 1000);
    } else {
      clearInterval(this.firstDayOfWeekToggleTimer);
      this.firstDayOfWeekToggleTimer = null;
    }
  }

  toggleFirstDayOfWeek() {
    this.firstDayOfWeek ??= 0;
    this.firstDayOfWeek++;
    if (this.firstDayOfWeek > 6) {
      this.firstDayOfWeek = 0;
    }
  }
}
