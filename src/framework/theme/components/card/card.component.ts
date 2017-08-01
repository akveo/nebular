/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding } from '@angular/core';

/**
 * Component intended to be used within  the `<nb-card>` component.
 * It adds styles for a preset header section.
 */
@Component({
  selector: 'nb-card-header',
  template: `<ng-content></ng-content>`,
})
export class NbCardHeaderComponent {
}

/**
 * Component intended to be used within  the `<nb-card>` component.
 * It adds styles for a preset body section.
 */
@Component({
  selector: 'nb-card-body',
  template: `<ng-content></ng-content>`,
})
export class NbCardBodyComponent {
}

/**
 * Component intended to be used within  the `<nb-card>` component.
 * It adds styles for a preset footer section.
 */
@Component({
  selector: 'nb-card-footer',
  template: `<ng-content></ng-content>`,
})
export class NbCardFooterComponent {
}

/**
 * A basic content container component
 *
 * While this component can be used alone, it also provides a number
 * of child components for common card sections, including:
 * - nb-card-header
 * - nb-card-body
 * - nb-card-footer
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

  size: string;
  status: string;

  @HostBinding('class.xxsmall-card')
  private get xxsmall() {
    return this.size === NbCardComponent.SIZE_XXSMALL;
  }

  @HostBinding('class.xsmall-card')
  private get xsmall() {
    return this.size === NbCardComponent.SIZE_XSMALL;
  }

  @HostBinding('class.small-card')
  private get small() {
    return this.size === NbCardComponent.SIZE_SMALL;
  }

  @HostBinding('class.medium-card')
  private get medium() {
    return this.size === NbCardComponent.SIZE_MEDIUM;
  }

  @HostBinding('class.large-card')
  private get large() {
    return this.size === NbCardComponent.SIZE_LARGE;
  }

  @HostBinding('class.xlarge-card')
  private get xlarge() {
    return this.size === NbCardComponent.SIZE_XLARGE;
  }

  @HostBinding('class.xxlarge-card')
  private get xxlarge() {
    return this.size === NbCardComponent.SIZE_XXLARGE;
  }

  @HostBinding('class.active-card')
  private get active() {
    return this.status === NbCardComponent.STATUS_ACTIVE;
  }

  @HostBinding('class.disabled-card')
  private get disabled() {
    return this.status === NbCardComponent.STATUS_DISABLED;
  }

  @HostBinding('class.primary-card')
  private get primary() {
    return this.status === NbCardComponent.STATUS_PRIMARY;
  }

  @HostBinding('class.info-card')
  private get info() {
    return this.status === NbCardComponent.STATUS_INFO;
  }

  @HostBinding('class.success-card')
  private get success() {
    return this.status === NbCardComponent.STATUS_SUCCESS;
  }

  @HostBinding('class.warning-card')
  private get warning() {
    return this.status === NbCardComponent.STATUS_WARNING;
  }

  @HostBinding('class.danger-card')
  private get danger() {
    return this.status === NbCardComponent.STATUS_DANGER;
  }

  @Input('size')
  private set setSize(val: string) {
    this.size = val;
  }

  @Input('status')
  private set setStatus(val: string) {
    this.status = val;
  }
}
