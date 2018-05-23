/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';
import { NbLayoutDirectionService } from '../../services/direction.service';

/**
 * Badge is a simple labeling component.
 * It can be used to add additional information to any content or highlight unread items.
 *
 * Element is absolute positioned, so parent should be
 * [positioned element](https://developer.mozilla.org/en-US/docs/Web/CSS/position).
 * It means parent `position` should be set to anything except `static`, e.g. `relative`,
 * `absolute`, `fixed`, or `sticky`.
 *
 *
 * @example Badge with default position and status(color):
 *
 * ```
 * <nb-badge text="badgeText"></nb-badge>
 * ```
 *
 * @example Badge located on the bottom right with warning status:
 *
 * ```
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
    <span class="nb-badge {{positionClass}} nb-badge-{{colorClass}}">{{text}}</span>
  `,
})
export class NbBadgeComponent {
  static readonly TOP_LEFT = 'top left';
  static readonly TOP_RIGHT = 'top right';
  static readonly BOTTOM_LEFT = 'bottom left';
  static readonly BOTTOM_RIGHT = 'bottom right';

  static readonly TOP_START = 'top start';
  static readonly TOP_END = 'top end';
  static readonly BOTTOM_START = 'bottom start';
  static readonly BOTTOM_END = 'bottom end';

  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  colorClass: string = NbBadgeComponent.STATUS_PRIMARY;

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
  @Input() position: string;

  /**
   * Badge status (adds specific styles):
   * 'primary', 'info', 'success', 'warning', 'danger'
   * @param {string} val
   * @type string
   */
  @Input() set status(value) {
    if (value) {
      this.colorClass = value;
    }
  }

  get positionClass() {
    if (!this.position) {
      return NbBadgeComponent.TOP_RIGHT;
    }

    const isLtr = this.layoutDirectionService.isLtr();
    const startValue = isLtr ? 'left' : 'right';
    const endValue = isLtr ? 'right' : 'left';
    return this.position
      .replace(/\bstart\b/, startValue)
      .replace(/\bend\b/, endValue);
  }

  constructor(private layoutDirectionService: NbLayoutDirectionService) {}
}
