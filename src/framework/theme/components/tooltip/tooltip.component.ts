/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';

import { NbPosition, NbRenderableContainer } from '../cdk';
import { animate, state, style, transition, trigger } from '@angular/animations';


/**
 * Tooltip container.
 * Renders provided tooltip inside.
 *
 * @styles
 *
 * tooltip-bg
 * tooltip-primary-bg
 * tooltip-info-bg
 * tooltip-success-bg
 * tooltip-warning-bg
 * tooltip-danger-bg
 * tooltip-fg
 * tooltip-shadow
 * tooltip-font-size
 *
 */
@Component({
  selector: 'nb-tooltip',
  styleUrls: ['./tooltip.component.scss'],
  template: `
    <span class="arrow"></span>
    <div class="content">
      <nb-icon *ngIf="context?.icon" [icon]="context.icon"></nb-icon>
      <span *ngIf="content">{{ content }}</span>
    </div>
  `,
  animations: [
    trigger('showTooltip', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(100),
      ]),
      transition('* => void', [
        animate(100, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class NbTooltipComponent implements NbRenderableContainer {

  @Input()
  content: string;

  /**
   * Popover position relatively host element.
   * */
  @Input()
  position: NbPosition = NbPosition.TOP;

  @HostBinding('class')
  get binding() {
    return `${this.position} ${this.statusClass}`;
  }

  @HostBinding('@showTooltip')
  get show() {
    return true;
  }

  @Input()
  context: { icon?: string, status?: string } = {};

  get statusClass() {
    return this.context.status ? `${this.context.status}-tooltip` : '';
  }

  /**
   * The method is empty since we don't need to do anything additionally
   * render is handled by change detection
   */
  renderContent() {}
}
