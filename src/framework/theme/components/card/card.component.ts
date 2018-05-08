/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding } from '@angular/core';

/**
 * Component intended to be used within  the `<nb-card>` component.
 * It adds styles for a preset header section.
 *
 * @styles
 *
 * card-header-font-family:
 * card-header-font-size:
 * card-header-font-weight:
 * card-header-fg:
 * card-header-fg-heading:
 * card-header-active-bg:
 * card-header-active-fg:
 * card-header-disabled-bg:
 * card-header-primary-bg:
 * card-header-info-bg:
 * card-header-success-bg:
 * card-header-warning-bg:
 * card-header-danger-bg:
 */
@Component({
  selector: 'nb-card-header',
  template: `<ng-content></ng-content>`,
})
export class NbCardHeaderComponent {
}

/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset body section.
 */
@Component({
  selector: 'nb-card-body',
  template: `<ng-content></ng-content>`,
})
export class NbCardBodyComponent {
}

/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset footer section.
 */
@Component({
  selector: 'nb-card-footer',
  template: `<ng-content></ng-content>`,
})
export class NbCardFooterComponent {
}

/**
 * Basic content container component.
 *
 * @example While this component can be used alone, it also provides a number
 * of child components for common card sections:
 *
 * ```
 * <nb-card-header></nb-card-header>
 * <nb-card-body></nb-card-body>
 * <nb-card-footer></nb-card-footer>
 * ```
 *
 * @styles
 *
 * card-line-height:
 * card-font-weight:
 * card-fg-text:
 * card-bg:
 * card-height-xxsmall:
 * card-height-xsmall:
 * card-height-small:
 * card-height-medium:
 * card-height-large:
 * card-height-xlarge:
 * card-height-xxlarge:
 * card-shadow:
 * card-border-radius:
 * card-padding:
 * card-margin:
 * card-separator:
 *
 */
@Component({
  selector: 'nb-card',
  styleUrls: ['./card.component.scss'],
  template: `
    <ng-content></ng-content>
    <ng-content select="nb-card-header"></ng-content>
    <ng-content select="nb-card-body"></ng-content>
    <ng-content select="nb-card-footer"></ng-content>
  `,
})
export class NbCardComponent {

  static readonly SIZE_XXSMALL = 'xxsmall';
  static readonly SIZE_XSMALL = 'xsmall';
  static readonly SIZE_SMALL = 'small';
  static readonly SIZE_MEDIUM = 'medium';
  static readonly SIZE_LARGE = 'large';
  static readonly SIZE_XLARGE = 'xlarge';
  static readonly SIZE_XXLARGE = 'xxlarge';

  static readonly STATUS_ACTIVE = 'active';
  static readonly STATUS_DISABLED = 'disabled';
  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  static readonly ACCENT_ACTIVE = 'active';
  static readonly ACCENT_DISABLED = 'disabled';
  static readonly ACCENT_PRIMARY = 'primary';
  static readonly ACCENT_INFO = 'info';
  static readonly ACCENT_SUCCESS = 'success';
  static readonly ACCENT_WARNING = 'warning';
  static readonly ACCENT_DANGER = 'danger';

  size: string;
  status: string;
  accent: string;

  @HostBinding('class.xxsmall-card')
  get xxsmall() {
    return this.size === NbCardComponent.SIZE_XXSMALL;
  }

  @HostBinding('class.xsmall-card')
  get xsmall() {
    return this.size === NbCardComponent.SIZE_XSMALL;
  }

  @HostBinding('class.small-card')
  get small() {
    return this.size === NbCardComponent.SIZE_SMALL;
  }

  @HostBinding('class.medium-card')
  get medium() {
    return this.size === NbCardComponent.SIZE_MEDIUM;
  }

  @HostBinding('class.large-card')
  get large() {
    return this.size === NbCardComponent.SIZE_LARGE;
  }

  @HostBinding('class.xlarge-card')
  get xlarge() {
    return this.size === NbCardComponent.SIZE_XLARGE;
  }

  @HostBinding('class.xxlarge-card')
  get xxlarge() {
    return this.size === NbCardComponent.SIZE_XXLARGE;
  }

  @HostBinding('class.active-card')
  get active() {
    return this.status === NbCardComponent.STATUS_ACTIVE;
  }

  @HostBinding('class.disabled-card')
  get disabled() {
    return this.status === NbCardComponent.STATUS_DISABLED;
  }

  @HostBinding('class.primary-card')
  get primary() {
    return this.status === NbCardComponent.STATUS_PRIMARY;
  }

  @HostBinding('class.info-card')
  get info() {
    return this.status === NbCardComponent.STATUS_INFO;
  }

  @HostBinding('class.success-card')
  get success() {
    return this.status === NbCardComponent.STATUS_SUCCESS;
  }

  @HostBinding('class.warning-card')
  get warning() {
    return this.status === NbCardComponent.STATUS_WARNING;
  }

  @HostBinding('class.danger-card')
  get danger() {
    return this.status === NbCardComponent.STATUS_DANGER;
  }

  @HostBinding('class.accent')
  get hasAccent() {
    return this.accent;
  }

  @HostBinding('class.accent-primary')
  get primaryAccent() {
    return this.accent === NbCardComponent.ACCENT_PRIMARY;
  }

  @HostBinding('class.accent-info')
  get infoAccent() {
    return this.accent === NbCardComponent.ACCENT_INFO;
  }

  @HostBinding('class.accent-success')
  get successAccent() {
    return this.accent === NbCardComponent.ACCENT_SUCCESS;
  }

  @HostBinding('class.accent-warning')
  get warningAccent() {
    return this.accent === NbCardComponent.ACCENT_WARNING;
  }

  @HostBinding('class.accent-danger')
  get dangerAccent() {
    return this.accent === NbCardComponent.ACCENT_DANGER;
  }

  @HostBinding('class.accent-active')
  get activeAccent() {
    return this.accent === NbCardComponent.ACCENT_ACTIVE;
  }

  @HostBinding('class.accent-disabled')
  get disabledAccent() {
    return this.accent === NbCardComponent.ACCENT_DISABLED;
  }

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
   * Card accent (color of the top border):
   * active, disabled, primary, info, success, warning, danger
   * @param {string} val
   */
  @Input('accent')
  private set setAccent(val: string) {
    this.accent = val;
  }

}
