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
 * alert-background-color:
 * alert-border-radius:
 * alert-bottom-margin:
 * alert-padding:
 * alert-scrollbar-color:
 * alert-scrollbar-background-color:
 * alert-scrollbar-width:
 * alert-shadow:
 * alert-text-color:
 * alert-text-font-family:
 * alert-text-font-size:
 * alert-text-font-weight:
 * alert-text-line-height:
 * alert-closable-start-padding:
 * alert-tiny-height:
 * alert-small-height:
 * alert-medium-height:
 * alert-medium-padding:
 * alert-large-height:
 * alert-giant-height:
 * alert-primary-background-color:
 * alert-primary-text-color:
 * alert-success-background-color:
 * alert-success-text-color:
 * alert-info-background-color:
 * alert-info-text-color:
 * alert-warning-background-color:
 * alert-warning-text-color:
 * alert-danger-background-color:
 * alert-danger-text-color:
 * alert-accent-primary-color:
 * alert-accent-info-color:
 * alert-accent-success-color:
 * alert-accent-warning-color:
 * alert-accent-danger-color:
 * alert-outline-primary-color:
 * alert-outline-info-color:
 * alert-outline-success-color:
 * alert-outline-warning-color:
 * alert-outline-danger-color:
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
