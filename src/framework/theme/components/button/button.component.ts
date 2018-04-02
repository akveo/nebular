/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding } from '@angular/core';
import { convertToBoolProperty } from '../helpers';

/**
 * Basic button component.
 *
 * @styles
 * TODO: styles
 */
@Component({
  selector: 'button[nbButton],a[nbButton]',
  styleUrls: ['./button.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
})
export class NbButtonComponent {

  static readonly SIZE_XSMALL = 'xsmall';
  static readonly SIZE_SMALL = 'small';
  static readonly SIZE_MEDIUM = 'medium';
  static readonly SIZE_LARGE = 'large';

  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  static readonly SHAPE_RECTANGLE = 'rectangle';
  static readonly SHAPE_ROUND = 'round';
  static readonly SHAPE_SEMI_ROUND = 'semi-round';

  size: string;
  status: string;
  accent: string;
  shape: string;

  @HostBinding('class.btn-xsmall')
  private get xsmall() {
    return this.size === NbButtonComponent.SIZE_XSMALL;
  }

  @HostBinding('class.btn-small')
  private get small() {
    return this.size === NbButtonComponent.SIZE_SMALL;
  }

  @HostBinding('class.btn-medium')
  private get medium() {
    return this.size === NbButtonComponent.SIZE_MEDIUM;
  }

  @HostBinding('class.btn-large')
  private get large() {
    return this.size === NbButtonComponent.SIZE_LARGE;
  }

  @HostBinding('class.btn-primary')
  private get primary() {
    return this.status === NbButtonComponent.STATUS_PRIMARY;
  }

  @HostBinding('class.btn-info')
  private get info() {
    return this.status === NbButtonComponent.STATUS_INFO;
  }

  @HostBinding('class.btn-success')
  private get success() {
    return this.status === NbButtonComponent.STATUS_SUCCESS;
  }

  @HostBinding('class.btn-warning')
  private get warning() {
    return this.status === NbButtonComponent.STATUS_WARNING;
  }

  @HostBinding('class.btn-danger')
  private get danger() {
    return this.status === NbButtonComponent.STATUS_DANGER;
  }

  @HostBinding('class.btn-rectangle')
  private get rectangle() {
    return this.shape === NbButtonComponent.SHAPE_RECTANGLE;
  }

  @HostBinding('class.btn-round')
  private get round() {
    return this.shape === NbButtonComponent.SHAPE_ROUND;
  }

  @HostBinding('class.btn-semi-round')
  private get semiRound() {
    return this.shape === NbButtonComponent.SHAPE_SEMI_ROUND;
  }

  @HostBinding('class.btn-hero') heroValue: boolean;
  @HostBinding('class.btn-outline') outlineValue: boolean;

  /**
   * Card size, available sizes:
   * xxsmall, xsmall, small, medium, large, xlarge, xxlarge
   * @param {string} val
   */
  @Input('size')
  private set setSize(val: string) {
    this.size = val;
  }

  /**
   * Card status (adds specific styles):
   * active, disabled, primary, info, success, warning, danger
   * @param {string} val
   */
  @Input('status')
  private set setStatus(val: string) {
    this.status = val;
  }

  /**
   * Card status (adds specific styles):
   * active, disabled, primary, info, success, warning, danger
   * @param {string} val
   */
  @Input('shape')
  private set setShape(val: string) {
    this.shape = val;
  }

  /**
   * Move the column to the very left position in the layout.
   * @param {boolean} val
   */
  @Input()
  set hero(val: boolean) {
    this.heroValue = convertToBoolProperty(val);
  }

  /**
   * Move the column to the very left position in the layout.
   * @param {boolean} val
   */
  @Input()
  set outline(val: boolean) {
    this.outlineValue = convertToBoolProperty(val);
  }
}
