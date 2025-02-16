/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
    selector: 'npg-date-timepicker-dynamic-inputs-showcase',
    templateUrl: './date-timepicker-dynamic-inputs-showcase.component.html',
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
    standalone: false
})
export class DateTimepickerDynamicInputsShowcaseComponent {
  now = new Date();

  withSeconds = true;
  secondsToggleTimer = null;

  toggleSecondsSwitching() {
    if (this.secondsToggleTimer == null) {
      this.secondsToggleTimer = setInterval(() => {
        this.toggleWithSeconds();
      }, 1000);
    } else {
      clearInterval(this.secondsToggleTimer);
      this.secondsToggleTimer = null;
    }
  }

  toggleWithSeconds() {
    this.withSeconds = !this.withSeconds;
  }

  singleColumn = false;
  singleColumnToggleTimer = null;

  toggleSingleColumnSwitching() {
    if (this.singleColumnToggleTimer == null) {
      this.singleColumnToggleTimer = setInterval(() => {
        this.toggleSingleColumn();
      }, 1000);
    } else {
      clearInterval(this.singleColumnToggleTimer);
      this.singleColumnToggleTimer = null;
    }
  }

  toggleSingleColumn() {
    this.singleColumn = !this.singleColumn;
  }

  step = 45;
  stepToggleTimer = null;

  toggleStepSwitching() {
    if (this.stepToggleTimer == null) {
      this.stepToggleTimer = setInterval(() => {
        this.toggleStep();
      }, 1000);
    } else {
      clearInterval(this.stepToggleTimer);
      this.stepToggleTimer = null;
    }
  }

  toggleStep() {
    this.step = this.step === 45 ? 15 : 45;
  }

  twelveHoursFormat = true;
  twelveHoursFormatToggleTimer = null;

  toggleTwelveHoursFormatSwitching() {
    if (this.twelveHoursFormatToggleTimer == null) {
      this.twelveHoursFormatToggleTimer = setInterval(() => {
        this.toggleTwelveHoursFormat();
      }, 1000);
    } else {
      clearInterval(this.twelveHoursFormatToggleTimer);
      this.twelveHoursFormatToggleTimer = null;
    }
  }

  toggleTwelveHoursFormat() {
    this.twelveHoursFormat = !this.twelveHoursFormat;
  }

  format = 'dd/MM/yyyy HH:mm';
  formatToggleTimer = null;

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

  firstDayOfWeek: number | undefined = undefined;
  firstDayOfWeekToggleTimer = null;

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
