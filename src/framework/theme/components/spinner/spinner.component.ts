/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';

import { NbSpinnerStatus } from './spinner-status';
import { NbSpinnerSize } from './spinner-size';

/**
 * Styled spinner component
 */
@Component({
  selector: 'nb-spinner',
  template: `
    <span class="spin-circle"></span>
    <span class="message" *ngIf="message">{{ message }}</span>
  `,
  styleUrls: ['./spinner.component.scss'],
})
export class NbSpinnerComponent {

  size: NbSpinnerSize = NbSpinnerSize.MEDIUM;
  status: NbSpinnerStatus;

  /**
   * Loading text that is shown near the icon
   * @type string
   */
  @Input() message: string = 'Loading...';

  /**
   * Spinner size, available sizes:
   * xxsmall, xsmall, small, medium, large, xlarge, xxlarge
   * @param {string} value
   */
  @Input('size')
  private set setSize(value: NbSpinnerSize) {
    this.size = value;
  }

  /**
   * Spinner status (adds specific styles):
   * primary, info, success, warning, danger, white
   * @param {string} value
   */
  @Input('status')
  private set setStatus(value: NbSpinnerStatus) {
    this.status = value;
  }

  @HostBinding('class.xxsmall-spinner')
  get xxsmall() {
    return this.size === NbSpinnerSize.XXSMALL;
  }

  @HostBinding('class.xsmall-spinner')
  get xsmall() {
    return this.size === NbSpinnerSize.XSMALL;
  }

  @HostBinding('class.small-spinner')
  get small() {
    return this.size === NbSpinnerSize.SMALL;
  }

  @HostBinding('class.medium-spinner')
  get medium() {
    return this.size === NbSpinnerSize.MEDIUM;
  }

  @HostBinding('class.large-spinner')
  get large() {
    return this.size === NbSpinnerSize.LARGE;
  }

  @HostBinding('class.xlarge-spinner')
  get xlarge() {
    return this.size === NbSpinnerSize.XLARGE;
  }

  @HostBinding('class.xxlarge-spinner')
  get xxlarge() {
    return this.size === NbSpinnerSize.XXLARGE;
  }

  @HostBinding('class.active-spinner')
  get active() {
    return this.status === NbSpinnerComponent.STATUS_ACTIVE;
  }

  @HostBinding('class.disabled-spinner')
  get disabled() {
    return this.status === NbSpinnerComponent.STATUS_DISABLED;
  }

  @HostBinding('class.primary-spinner')
  get primary() {
    return this.status === NbSpinnerStatus.PRIMARY;
  }

  @HostBinding('class.info-spinner')
  get info() {
    return this.status === NbSpinnerStatus.INFO;
  }

  @HostBinding('class.success-spinner')
  get success() {
    return this.status === NbSpinnerStatus.SUCCESS;
  }

  @HostBinding('class.warning-spinner')
  get warning() {
    return this.status === NbSpinnerStatus.WARNING;
  }

  @HostBinding('class.danger-spinner')
  get danger() {
    return this.status === NbSpinnerStatus.DANGER;
  }

  @HostBinding('class.status-white')
  get white() {
    return this.status === NbSpinnerStatus.WHITE;
  }
}
