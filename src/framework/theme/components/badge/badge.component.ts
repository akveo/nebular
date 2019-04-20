/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

import { NbLayoutDirectionService } from '../../services/direction.service';
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
  template: `
    <span class="nb-badge {{positionClass}} status-{{status}}">{{text}}</span>
  `,
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

  get positionClass() {
    const isLtr = this.layoutDirectionService.isLtr();
    const startValue = isLtr ? 'left' : 'right';
    const endValue = isLtr ? 'right' : 'left';
    return this.position
      .replace(/\bstart\b/, startValue)
      .replace(/\bend\b/, endValue);
  }

  constructor(private layoutDirectionService: NbLayoutDirectionService) {}
}
