/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding } from "@angular/core";

/**
 * Badge component
 */
@Component({
  selector: 'nb-badge',
  styleUrls: ['./badge.component.scss'],
  template: `
    <span class="nb-badge {{positionClass}} nb-badge-{{colorClass}}">{{text}}</span>
  `
})
export default class Badge {
  static readonly TOP_LEFT = 'top left';
  static readonly TOP_RIGHT = 'top right';
  static readonly BOTTOM_LEFT = 'bottom left';
  static readonly BOTTOM_RIGHT = 'bottom right';

  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  positionClass: string = Badge.TOP_RIGHT;
  colorClass: string = Badge.STATUS_PRIMARY;

  @Input() text: string = '';

  @Input() set position(value) {
    if (value) {
      this.positionClass = value;
    }
  }

  /**
   * Badge status (adds specific styles):
   * primary, info, success, warning, danger
   * @param {string} val
   */
  @Input() set status(value) {
    if (value) {
      this.colorClass = value;
    }
  }
}
