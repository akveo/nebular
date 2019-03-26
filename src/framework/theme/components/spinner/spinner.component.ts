/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';

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

  static readonly SIZE_XXSMALL = 'xxsmall';
  static readonly SIZE_XSMALL = 'xsmall';
  static readonly SIZE_SMALL = 'small';
  static readonly SIZE_MEDIUM = 'medium';
  static readonly SIZE_LARGE = 'large';
  static readonly SIZE_XLARGE = 'xlarge';
  static readonly SIZE_XXLARGE = 'xxlarge';

  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  size: string = NbSpinnerComponent.SIZE_MEDIUM;
  status: string = NbSpinnerComponent.STATUS_PRIMARY;

  /**
   * Loading text that is shown near the icon
   * @type string
   */
  @Input() message: string = 'Loading...';

  /**
   * Spiiner size, available sizes:
   * xxsmall, xsmall, small, medium, large, xlarge, xxlarge
   * @param {string} val
   */
  @Input('size')
  private set setSize(val: string) {
    this.size = val;
  }

  /**
   * Spiiner status (adds specific styles):
   * primary, info, success, warning, danger
   * @param {string} val
   */
  @Input('status')
  private set setStatus(val: string) {
    this.status = val;
  }

  @HostBinding('class.xxsmall-spinner')
  get xxsmall() {
    return this.size === NbSpinnerComponent.SIZE_XXSMALL;
  }

  @HostBinding('class.xsmall-spinner')
  get xsmall() {
    return this.size === NbSpinnerComponent.SIZE_XSMALL;
  }

  @HostBinding('class.small-spinner')
  get small() {
    return this.size === NbSpinnerComponent.SIZE_SMALL;
  }

  @HostBinding('class.medium-spinner')
  get medium() {
    return this.size === NbSpinnerComponent.SIZE_MEDIUM;
  }

  @HostBinding('class.large-spinner')
  get large() {
    return this.size === NbSpinnerComponent.SIZE_LARGE;
  }

  @HostBinding('class.xlarge-spinner')
  get xlarge() {
    return this.size === NbSpinnerComponent.SIZE_XLARGE;
  }

  @HostBinding('class.xxlarge-spinner')
  get xxlarge() {
    return this.size === NbSpinnerComponent.SIZE_XXLARGE;
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
    return this.status === NbSpinnerComponent.STATUS_PRIMARY;
  }

  @HostBinding('class.info-spinner')
  get info() {
    return this.status === NbSpinnerComponent.STATUS_INFO;
  }

  @HostBinding('class.success-spinner')
  get success() {
    return this.status === NbSpinnerComponent.STATUS_SUCCESS;
  }

  @HostBinding('class.warning-spinner')
  get warning() {
    return this.status === NbSpinnerComponent.STATUS_WARNING;
  }

  @HostBinding('class.danger-spinner')
  get danger() {
    return this.status === NbSpinnerComponent.STATUS_DANGER;
  }
}
