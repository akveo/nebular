/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { convertToBoolProperty } from '../helpers';


/**
 * Alert component.
 *
 * Basic alert example:
 * @stacked-example(Showcase, alert/alert-showcase.component)
 *
 * Alert configuration:
 *
 * ```html
 * <nb-alert status="success">
 *   You have been successfully authenticated!
 * </nb-alert>
 * ```
 * ### Installation
 *
 * Import `NbButtonModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbAlertModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Alert could additionally have a `close` button when `closable` property is set:
 * ```html
 * <nb-alert status="success" closable (close)="onClose()">
 *   You have been successfully authenticated!
 * </nb-alert>
 * ```
 *
 * Colored alerts could be simply configured by providing a `status` property:
 * @stacked-example(Colored Alert, alert/alert-colors.component)
 *
 * It is also possible to assign an `accent` property for a slight alert highlight
 * as well as combine it with `status`:
 * @stacked-example(Accent Alert, alert/alert-accents.component)
 *
 * And `outline` property:
 * @stacked-example(Outline Alert, alert/alert-outline.component)
 *
 * @additional-example(Multiple Sizes, alert/alert-sizes.component)
 *
 * @styles
 *
 * alert-font-size:
 * alert-line-height:
 * alert-font-weight:
 * alert-fg:
 * alert-outline-fg:
 * alert-bg:
 * alert-active-bg:
 * alert-disabled-bg:
 * alert-disabled-fg:
 * alert-primary-bg:
 * alert-info-bg:
 * alert-success-bg:
 * alert-warning-bg:
 * alert-danger-bg:
 * alert-height-xxsmall:
 * alert-height-xsmall:
 * alert-height-small:
 * alert-height-medium:
 * alert-height-large:
 * alert-height-xlarge:
 * alert-height-xxlarge:
 * alert-shadow:
 * alert-border-radius:
 * alert-padding:
 * alert-closable-padding:
 * alert-button-padding:
 * alert-margin:
 */
@Component({
  selector: 'nb-alert',
  styleUrls: ['./alert.component.scss'],
  template: `
    <button *ngIf="closable" type="button" class="close" aria-label="Close" (click)="onClose()">
      <span aria-hidden="true">&times;</span>
    </button>
    <ng-content></ng-content>
  `,
})
export class NbAlertComponent {

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

  static readonly OUTLINE_ACTIVE = 'active';
  static readonly OUTLINE_DISABLED = 'disabled';
  static readonly OUTLINE_PRIMARY = 'primary';
  static readonly OUTLINE_INFO = 'info';
  static readonly OUTLINE_SUCCESS = 'success';
  static readonly OUTLINE_WARNING = 'warning';
  static readonly OUTLINE_DANGER = 'danger';

  /**
   * Alert size, available sizes:
   * xxsmall, xsmall, small, medium, large, xlarge, xxlarge
   * @param {string} val
   */
  @Input() size: string;

  /**
   * Alert status (adds specific styles):
   * active, disabled, primary, info, success, warning, danger
   * @param {string} value
   */
  @Input() status: string;

  /**
   * Alert accent (color of the top border):
   * active, disabled, primary, info, success, warning, danger
   * @param {string} val
   */
  @Input() accent: string;

  /**
   * Alert outline (color of the border):
   * active, disabled, primary, info, success, warning, danger
   * @param {string} value
   */
  @Input() outline: string;

  /**
   * Shows `close` icon
   */
  @Input()
  @HostBinding('class.closable')
  get closable(): boolean {
    return this._closable;
  }
  set closable(value: boolean) {
    this._closable = convertToBoolProperty(value);
  }
  protected _closable: boolean = false;

  /**
   * Emits when chip is removed
   * @type EventEmitter<any>
   */
  @Output() close = new EventEmitter();

  /**
   * Emits the removed chip event
   */
  onClose() {
    this.close.emit();
  }

  @HostBinding('class.disabled-alert')
  get disabled() {
    return this.status === NbAlertComponent.STATUS_DISABLED;
  }

  @HostBinding('class.accent')
  get hasAccent() {
    return this.accent;
  }

  @HostBinding('class.status')
  get hasStatus() {
    return this.status;
  }

  @HostBinding('class.outline')
  get hasOutline() {
    return this.outline;
  }

  @HostBinding('class.xxsmall-alert')
  get xxsmall() {
    return this.size === NbAlertComponent.SIZE_XXSMALL;
  }

  @HostBinding('class.xsmall-alert')
  get xsmall() {
    return this.size === NbAlertComponent.SIZE_XSMALL;
  }

  @HostBinding('class.small-alert')
  get small() {
    return this.size === NbAlertComponent.SIZE_SMALL;
  }

  @HostBinding('class.medium-alert')
  get medium() {
    return this.size === NbAlertComponent.SIZE_MEDIUM;
  }

  @HostBinding('class.large-alert')
  get large() {
    return this.size === NbAlertComponent.SIZE_LARGE;
  }

  @HostBinding('class.xlarge-alert')
  get xlarge() {
    return this.size === NbAlertComponent.SIZE_XLARGE;
  }

  @HostBinding('class.xxlarge-alert')
  get xxlarge() {
    return this.size === NbAlertComponent.SIZE_XXLARGE;
  }

  @HostBinding('class.active-alert')
  get active() {
    return this.status === NbAlertComponent.STATUS_ACTIVE;
  }

  @HostBinding('class.primary-alert')
  get primary() {
    return this.status === NbAlertComponent.STATUS_PRIMARY;
  }

  @HostBinding('class.info-alert')
  get info() {
    return this.status === NbAlertComponent.STATUS_INFO;
  }

  @HostBinding('class.success-alert')
  get success() {
    return this.status === NbAlertComponent.STATUS_SUCCESS;
  }

  @HostBinding('class.warning-alert')
  get warning() {
    return this.status === NbAlertComponent.STATUS_WARNING;
  }

  @HostBinding('class.danger-alert')
  get danger() {
    return this.status === NbAlertComponent.STATUS_DANGER;
  }

  @HostBinding('class.accent-primary')
  get primaryAccent() {
    return this.accent === NbAlertComponent.ACCENT_PRIMARY;
  }

  @HostBinding('class.accent-info')
  get infoAccent() {
    return this.accent === NbAlertComponent.ACCENT_INFO;
  }

  @HostBinding('class.accent-success')
  get successAccent() {
    return this.accent === NbAlertComponent.ACCENT_SUCCESS;
  }

  @HostBinding('class.accent-warning')
  get warningAccent() {
    return this.accent === NbAlertComponent.ACCENT_WARNING;
  }

  @HostBinding('class.accent-danger')
  get dangerAccent() {
    return this.accent === NbAlertComponent.ACCENT_DANGER;
  }

  @HostBinding('class.accent-active')
  get activeAccent() {
    return this.accent === NbAlertComponent.ACCENT_ACTIVE;
  }

  @HostBinding('class.accent-disabled')
  get disabledAccent() {
    return this.accent === NbAlertComponent.ACCENT_DISABLED;
  }

  @HostBinding('class.outline-primary')
  get primaryOutline() {
    return this.outline === NbAlertComponent.OUTLINE_PRIMARY;
  }

  @HostBinding('class.outline-info')
  get infoOutline() {
    return this.outline === NbAlertComponent.OUTLINE_INFO;
  }

  @HostBinding('class.outline-success')
  get successOutline() {
    return this.outline === NbAlertComponent.OUTLINE_SUCCESS;
  }

  @HostBinding('class.outline-warning')
  get warningOutline() {
    return this.outline === NbAlertComponent.OUTLINE_WARNING;
  }

  @HostBinding('class.outline-danger')
  get dangerOutline() {
    return this.outline === NbAlertComponent.OUTLINE_DANGER;
  }

  @HostBinding('class.outline-active')
  get activeOutline() {
    return this.outline === NbAlertComponent.OUTLINE_ACTIVE;
  }

  @HostBinding('class.outline-disabled')
  get disabledOutline() {
    return this.outline === NbAlertComponent.OUTLINE_DISABLED;
  }
}
