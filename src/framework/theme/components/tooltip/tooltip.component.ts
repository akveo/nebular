/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { NbComponentStatus } from '../component-status';
import { NbRenderableContainer } from '../cdk/overlay/overlay-container';
import { NbPosition } from '../cdk/overlay/overlay-position';
import { NbIconConfig } from '../icon/icon.component';


/**
 * Tooltip container.
 * Renders provided tooltip inside.
 *
 * @styles
 *
 * tooltip-background-color:
 * tooltip-border-color:
 * tooltip-border-style:
 * tooltip-border-width:
 * tooltip-border-radius:
 * tooltip-padding:
 * tooltip-text-color:
 * tooltip-text-font-family:
 * tooltip-text-font-size:
 * tooltip-text-font-weight:
 * tooltip-text-line-height:
 * tooltip-icon-height:
 * tooltip-icon-width:
 * tooltip-max-width:
 * tooltip-basic-background-color:
 * tooltip-basic-border-color:
 * tooltip-basic-text-color:
 * tooltip-primary-background-color:
 * tooltip-primary-border-color:
 * tooltip-primary-text-color:
 * tooltip-info-background-color:
 * tooltip-info-border-color:
 * tooltip-info-text-color:
 * tooltip-success-background-color:
 * tooltip-success-border-color:
 * tooltip-success-text-color:
 * tooltip-warning-background-color:
 * tooltip-warning-border-color:
 * tooltip-warning-text-color:
 * tooltip-danger-background-color:
 * tooltip-danger-border-color:
 * tooltip-danger-text-color:
 * tooltip-control-background-color:
 * tooltip-control-border-color:
 * tooltip-control-text-color:
 * tooltip-shadow:
 */
@Component({
  selector: 'nb-tooltip',
  styleUrls: ['./tooltip.component.scss'],
  template: `
    <span class="arrow"></span>
    <div class="content">
      <nb-icon *ngIf="context?.icon" [config]="context.icon"></nb-icon>
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
  context: { icon?: string | NbIconConfig, status?: NbComponentStatus } = {};

  get statusClass() {
    if (this.context.status) {
      return `status-${this.context.status}`;
    }

    return '';
  }

  /**
   * The method is empty since we don't need to do anything additionally
   * render is handled by change detection
   */
  renderContent() {}
}
