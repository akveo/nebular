/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'npg-timepicker-dynamic-inputs-showcase',
  templateUrl: './timepicker-dynamic-inputs-showcase.component.html',
  styles: [
    `
      section {
        margin-bottom: 2rem;
      }

      button + button {
        margin-left: 1rem;
      }
    `,
  ],
})
export class TimepickerDynamicInputsShowcaseComponent {
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

  format = null;
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
    this.format = this.format === null ? 'mm:HH' : null;
  }
}
