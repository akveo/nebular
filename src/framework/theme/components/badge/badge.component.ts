/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';

import { NbComponentStatus } from '../component-status';

export type NbBadgePhysicalPosition = 'top left' | 'top right' | 'bottom left' | 'bottom right';
export type NbBadgeLogicalPosition = 'top start' | 'top end' | 'bottom start' | 'bottom end';
export type NbBadgePosition = NbBadgePhysicalPosition | NbBadgeLogicalPosition;


/**
 * Badge is a simple labeling component.
 * It can be used to add additional information to any content or highlight unread items.
 *
 * Element is absolute positioned, so parent should be
 * [positioned element](https://developer.mozilla.org/en-US/docs/Web/CSS/position).
 * It means parent `position` should be set to anything except `static`, e.g. `relative`,
 * `absolute`, `fixed`, or `sticky`.
 *
 * ### Installation
 *
 * Import `NbBadgeModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbBadgeModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Badge with default position and status(color):
 *
 * ```html
 * <nb-badge text="badgeText"></nb-badge>
 * ```
 *
 * For example, badge can be placed into nb-card header:
 * @stacked-example(Showcase, badge/badge-showcase.component)
 *
 * Badge located on the bottom right with warning status:
 *
 * ```html
 * <nb-badge text="badgeText" status="warning" position="bottom right">
 * </nb-badge>
 * ```
 *
 * @styles
 *
 * badge-fg-text:
 * badge-primary-bg-color:
 * badge-success-bg-color:
 * badge-info-bg-color:
 * badge-warning-bg-color:
 * badge-danger-bg-color:
 */
@Component({
  selector: 'nb-badge',
  styleUrls: ['./badge.component.scss'],
  template: `{{text}}`,
})
export class NbBadgeComponent {

  /**
   * Text to display
   * @type string
   */
  @Input() text: string = '';

  /**
   * Badge position
   *
   * Can be set to any class or to one of predefined positions:
   * 'top left', 'top right', 'bottom left', 'bottom right',
   * 'top start', 'top end', 'bottom start', 'bottom end'
   * @type string
   */
  @Input() position: NbBadgePosition = 'top right';

  /**
   * Badge status (adds specific styles):
   * 'primary', 'info', 'success', 'warning', 'danger'
   */
  @Input() status: NbComponentStatus = 'primary';

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

  @HostBinding('class.position-top')
  get topLeft(): boolean {
    return this.position.includes('top');
  }

  @HostBinding('class.position-right')
  get topRight(): boolean {
    return this.position.includes('right');
  }

  @HostBinding('class.position-bottom')
  get bottomRight(): boolean {
    return this.position.includes('bottom');
  }

  @HostBinding('class.position-left')
  get bottomLeft(): boolean {
    return this.position.includes('left');
  }

  @HostBinding('class.position-start')
  get bottomStart(): boolean {
    return this.position.includes('start');
  }

  @HostBinding('class.position-end')
  get bottomEnd(): boolean {
    return this.position.includes('end');
  }
}
