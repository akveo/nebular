/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';
import { NbComponentSize, NbComponentStatus } from '@nebular/theme';

/**
 * Progress Bar is a component for indicating progress.
 *
 * Simple usage:
 *
 * ```html
 * <nb-progress-bar [value]="50"></nb-progress-bar>
 * ```
 * ### Installation
 *
 * Import `NbProgressBarModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbProgressBarModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Progress bar accepts property `value` in range 0-100
 * @stacked-example(Progress bar, progress-bar/progress-bar-showcase.component)
 *
 * Progress bar background could be configured by providing a `status` property:
 * @stacked-example(Progress bar status, progress-bar/progress-bar-status.component)
 *
 * Progress bar size (height and font-size) could be configured by providing a `size` property:
 * @stacked-example(Progress bar size, progress-bar/progress-bar-size.component)
 *
 * `displayValue` property shows current value inside progress bar. It's also possible to add custom text inside:
 * @stacked-example(Progress bar value, progress-bar/progress-bar-value.component)
 *
 * Progress bar supports `width` and `background-color` transition:
 * @stacked-example(Progress bar interactive, progress-bar/progress-bar-interactive.component)
 *
 * @styles
 *
 * progress-bar-height-xlg:
 * progress-bar-height-lg:
 * progress-bar-height:
 * progress-bar-height-sm:
 * progress-bar-height-xs:
 * progress-bar-font-size-xlg:
 * progress-bar-font-size-lg:
 * progress-bar-font-size:
 * progress-bar-font-size-sm:
 * progress-bar-font-size-xs:
 * progress-bar-radius:
 * progress-bar-bg-color:
 * progress-bar-font-color:
 * progress-bar-font-weight:
 * progress-bar-default-bg-color:
 * progress-bar-primary-bg-color:
 * progress-bar-success-bg-color:
 * progress-bar-info-bg-color:
 * progress-bar-warning-bg-color:
 * progress-bar-danger-bg-color:
 */
@Component({
  selector: 'nb-progress-bar',
  styleUrls: ['./progress-bar.component.scss'],
  template: `
    <div class="progress-container">
      <div class="progress-value" [style.width.%]="value">
        <span *ngIf="displayValue">{{ value }}%</span>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class NbProgressBarComponent {

  /**
   * Progress bar value in percent (0 - 100)
   */
  @Input() value: number = 0;

  /**
   * Progress bar background (`primary` (default), `info`, `success`, `warning`, `danger`)
   */
  @Input() status: NbComponentStatus = 'primary';

  /**
   * Progress bar size (`tiny`, `small`, `medium` (default), `large`, `giant`)
   */
  @Input() size: NbComponentSize = 'medium';

  /**
   * Displays value inside progress bar
   */
  @Input() displayValue: boolean = false;

  @HostBinding('class.size-tiny')
  get tiny(): boolean {
    return this.size === 'tiny';
  }

  @HostBinding('class.size-small')
  get small(): boolean {
    return this.size === 'small';
  }

  @HostBinding('class.size-medium')
  get medium(): boolean {
    return this.size === 'medium';
  }

  @HostBinding('class.size-large')
  get large(): boolean {
    return this.size === 'large';
  }

  @HostBinding('class.size-giant')
  get giant(): boolean {
    return this.size === 'giant';
  }

  @HostBinding('class.status-primary')
  get primary(): boolean {
    return this.status === 'primary';
  }

  @HostBinding('class.status-success')
  get success(): boolean {
    return this.status === 'success';
  }

  @HostBinding('class.status-info')
  get info(): boolean {
    return this.status === 'info';
  }

  @HostBinding('class.status-warning')
  get warning(): boolean {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger(): boolean {
    return this.status === 'danger';
  }
}
