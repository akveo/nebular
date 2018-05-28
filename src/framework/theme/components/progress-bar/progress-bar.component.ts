/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {Component, Input} from '@angular/core';

/**
 * <nb-progress-bar> is a component for indicating progress.
 *
 * Basic usage:
 *
 * ```html
 * <nb-progress-bar [value]="50"></nb-progress-bar>
 * ```
 *
 * Custom label:
 *
 * ```html
 * <nb-progress-bar [value]="90">Almost Done!</nb-progress-bar>
 * ```
 *
 * @styles
 *
 * progress-bar-height-xlg
 * progress-bar-height-lg
 * progress-bar-height
 * progress-bar-height-sm
 * progress-bar-height-xs
 * progress-bar-font-size-xlg
 * progress-bar-font-size-lg
 * progress-bar-font-size
 * progress-bar-font-size-sm
 * progress-bar-font-size-xs
 * progress-bar-radius
 * progress-bar-bg-color
 * progress-bar-font-color
 * progress-bar-font-weight
 * progress-bar-default-bg-color
 * progress-bar-primary-bg-color,
 * progress-bar-success-bg-color,
 * progress-bar-info-bg-color
 * progress-bar-warning-bg-color,
 * progress-bar-danger-bg-color
 */
@Component({
  selector: 'nb-progress-bar',
  template: `
    <div class="progress-container {{size ? '' + size : ''}}">
      <div class="progress-value {{type ? '' + type : ''}}" [style.width.%]="value">
        <span *ngIf="displayValue">{{value}}%</span>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./progress-bar.component.scss'],
})
export class NbProgressBarComponent {

  /**
   * Progress bar value in percent(0 - 100)
   * @type {number}
   * @private
   */
  @Input() value: number = 0;

  /**
   * Progress bar background (primary, info success, warning, danger)
   * @param {string} val
   */
  @Input() type: string;

  /**
   * Progress bar size (xs, sm, lg, xlg)
   * @param {string} val
   */
  @Input() size: string;

  /**
   * Displays value inside progress bar
   * @param {string} val
   */
  @Input() displayValue: boolean = false;

}
