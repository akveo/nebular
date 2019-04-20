/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';

import { NbComponentSize } from '../component-size';
import { NbComponentStatus } from '../component-status';
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

  /**
   * Alert size, available sizes:
   * `tiny`, `small`, `medium`, `large`, `giant`
   * Unset by default.
   */
  @Input() size: '' | NbComponentSize = '';

  /**
   * Alert status (adds specific styles):
   * `primary`, `success`, `info`, `warning`, `danger`.
   * Unset by default.
   */
  @Input() status: '' | NbComponentStatus = '';

  /**
   * Alert accent (color of the top border):
   * `primary`, `success`, `info`, `warning`, `danger`.
   * Unset by default.
   */
  @Input() accent: '' | NbComponentStatus = '';

  /**
   * Alert outline (color of the border):
   * `primary`, `success`, `info`, `warning`, `danger`.
   * Unset by default.
   */
  @Input() outline: '' | NbComponentStatus = '';

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

  @Input()
  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = convertToBoolProperty(value);
  }
  protected _disabled: boolean = false;

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

  @HostBinding('class.size-tiny')
  get tiny() {
    return this.size === 'tiny';
  }

  @HostBinding('class.size-small')
  get small() {
    return this.size === 'small';
  }

  @HostBinding('class.size-medium')
  get medium() {
    return this.size === 'medium';
  }

  @HostBinding('class.size-large')
  get large() {
    return this.size === 'large';
  }

  @HostBinding('class.size-giant')
  get giant() {
    return this.size === 'giant';
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === 'primary';
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === 'success';
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === 'info';
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger';
  }

  @HostBinding('class.accent-primary')
  get primaryAccent() {
    return this.accent === 'primary';
  }

  @HostBinding('class.accent-success')
  get successAccent() {
    return this.accent === 'success';
  }

  @HostBinding('class.accent-info')
  get infoAccent() {
    return this.accent === 'info';
  }

  @HostBinding('class.accent-warning')
  get warningAccent() {
    return this.accent === 'warning';
  }

  @HostBinding('class.accent-danger')
  get dangerAccent() {
    return this.accent === 'danger';
  }

  @HostBinding('class.outline-primary')
  get primaryOutline() {
    return this.outline === 'primary';
  }

  @HostBinding('class.outline-success')
  get successOutline() {
    return this.outline === 'success';
  }

  @HostBinding('class.outline-info')
  get infoOutline() {
    return this.outline === 'info';
  }

  @HostBinding('class.outline-warning')
  get warningOutline() {
    return this.outline === 'warning';
  }

  @HostBinding('class.outline-danger')
  get dangerOutline() {
    return this.outline === 'danger';
  }
}
