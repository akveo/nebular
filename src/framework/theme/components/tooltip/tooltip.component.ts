/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { NbPosition, NbRenderableContainer } from '../cdk';
import { NbTooltipStatus } from './tooltip-status';


/**
 * Tooltip container.
 * Renders provided tooltip inside.
 *
 * @styles
 *
 * tooltip-background-color:
 * tooltip-border-color:
 * tooltip-border-width:
 * tooltip-border-radius:
 * tooltip-padding:
 * tooltip-text-color:
 * tooltip-text-font-family:
 * tooltip-text-font-size:
 * tooltip-text-font-weight:
 * tooltip-text-line-height:
 * tooltip-max-width:
 * tooltip-primary-background-color:
 * tooltip-primary-text-color:
 * tooltip-info-background-color:
 * tooltip-info-text-color:
 * tooltip-success-background-color:
 * tooltip-success-text-color:
 * tooltip-warning-background-color:
 * tooltip-warning-text-color:
 * tooltip-danger-background-color:
 * tooltip-danger-text-color:
 * tooltip-shadow:
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
  context: { icon?: string, status?: NbTooltipStatus } = {};

  get statusClass() {
    return this.context.status ? `status-${this.context.status}` : '';
  }

  /**
   * The method is empty since we don't need to do anything additionally
   * render is handled by change detection
   */
  renderContent() {}
}
