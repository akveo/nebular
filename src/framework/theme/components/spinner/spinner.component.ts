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

  @HostBinding('class.size-xxsmall')
  get xxsmall() {
    return this.size === NbSpinnerSize.XXSMALL;
  }

  @HostBinding('class.size-xsmall')
  get xsmall() {
    return this.size === NbSpinnerSize.XSMALL;
  }

  @HostBinding('class.size-small')
  get small() {
    return this.size === NbSpinnerSize.SMALL;
  }

  @HostBinding('class.size-medium')
  get medium() {
    return this.size === NbSpinnerSize.MEDIUM;
  }

  @HostBinding('class.size-large')
  get large() {
    return this.size === NbSpinnerSize.LARGE;
  }

  @HostBinding('class.size-xlarge')
  get xlarge() {
    return this.size === NbSpinnerSize.XLARGE;
  }

  @HostBinding('class.size-xxlarge')
  get xxlarge() {
    return this.size === NbSpinnerSize.XXLARGE;
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === NbSpinnerStatus.PRIMARY;
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === NbSpinnerStatus.INFO;
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === NbSpinnerStatus.SUCCESS;
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === NbSpinnerStatus.WARNING;
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === NbSpinnerStatus.DANGER;
  }

  @HostBinding('class.status-white')
  get white() {
    return this.status === NbSpinnerStatus.WHITE;
  }
}
