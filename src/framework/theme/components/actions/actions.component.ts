/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';

import { convertToBoolProperty } from '../helpers';

/**
 * Action item, display a link with an icon, or any other content provided instead.
 */
@Component({
  selector: 'nb-action',
  template: `
    <ng-container *ngIf="icon; else projectedContent">
      <a class="icon-container"
         [routerLink]="link"
         [title]="title"
         *ngIf="link">
        <nb-icon [icon]="icon"></nb-icon>
      </a>
      <a class="icon-container"
         [href]="href"
         [title]="title"
         *ngIf="href && !link">
        <nb-icon [icon]="icon"></nb-icon>
      </a>
      <a class="icon-container"
         href="#"
         [title]="title"
         *ngIf="!href && !link"
         (click)="$event.preventDefault()">
        <nb-icon [icon]="icon"></nb-icon>
      </a>
    </ng-container>

    <ng-template #projectedContent>
      <ng-content></ng-content>
    </ng-template>

    <nb-badge *ngIf="badgeText"
              [text]="badgeText"
              [status]="badgeStatus"
              [position]="badgePosition">
    </nb-badge>
  `,
})
export class NbActionComponent {
  @HostBinding('class.disabled') disabledValue: boolean = false;

  /**
   * Router link to use
   * @type string
   */
  @Input() link: string;

  /**
   * Regular HREF link
   * @type: string
   */
  @Input() href: string;

  /**
   * Optional title for mouseover
   * @type string
   */
  @Input() title: string = '';

  /**
   * Icon class to display
   * @type string
   */
  @Input() icon: string;

  /**
   * Disables the item (changes item opacity and mouse cursor)
   * @type boolean
   */
  @Input()
  set disabled(val: boolean) {
    this.disabledValue = convertToBoolProperty(val);
  }

  /**
   * Badge text to display
   * @type string
   */
  @Input() badgeText: string;

  /**
   * Badge status (adds specific styles):
   * 'primary', 'info', 'success', 'warning', 'danger'
   * @param {string} val
   */
  @Input() badgeStatus: string;

  /**
   * Badge position.
   * Can be set to any class or to one of predefined positions:
   * 'top left', 'top right', 'bottom left', 'bottom right',
   * 'top start', 'top end', 'bottom start', 'bottom end'
   * @type string
   */
  @Input() badgePosition: string;
}

/**
 * Shows a horizontal list of actions, available in multiple sizes.
 * Aligns items vertically.
 *
 * @stacked-example(Showcase, action/action-showcase.component)
 *
 * Basic actions setup:
 * ```html
 * <nb-actions size="small">
 *   <nb-action icon="nb-search"></nb-action>
 *   <nb-action icon="nb-power-circled"></nb-action>
 *   <nb-action icon="nb-person"></nb-action>
 * </nb-actions>
 * ```
 * ### Installation
 *
 * Import `NbActionsModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbActionsModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Multiple sizes example:
 * @stacked-example(Multiple Sizes, action/action-sizes.component)
 *
 * It is also possible to specify a `badge` value:
 *
 * @stacked-example(Action Badge, action/action-badge.component)
 *
 * and we can set it to full a width of a parent component
 * @stacked-example(Full Width, action/action-width.component)
 *
 * @styles
 *
 * actions-font-size:
 * actions-font-family:
 * actions-line-height:
 * actions-fg:
 * actions-bg:
 * actions-separator:
 * actions-padding:
 * actions-size-small:
 * actions-size-medium:
 * actions-size-large:
 */
@Component({
  selector: 'nb-actions',
  styleUrls: ['./actions.component.scss'],
  template: `
    <ng-content select="nb-action"></ng-content>
  `,
})
export class NbActionsComponent {
  static readonly SIZE_SMALL = 'small';
  static readonly SIZE_MEDIUM = 'medium';
  static readonly SIZE_LARGE = 'large';

  private sizeValue: string;

  @HostBinding('class.small')
  get small() {
    return this.sizeValue === NbActionsComponent.SIZE_SMALL;
  }

  @HostBinding('class.medium')
  get medium() {
    return this.sizeValue === NbActionsComponent.SIZE_MEDIUM;
  }

  @HostBinding('class.large')
  get large() {
    return this.sizeValue === NbActionsComponent.SIZE_LARGE;
  }

  @HostBinding('class.full-width')
  fullWidthValue: boolean = false;

  /**
   * Size of the component, small|medium|large
   * @type string
   */
  @Input()
  set size(val: string) {
    this.sizeValue = val;
  }

  /**
   * Component will fill full width of the container
   * @type boolean
   */
  @Input()
  set fullWidth(val: boolean) {
    this.fullWidthValue = convertToBoolProperty(val);
  }
}
