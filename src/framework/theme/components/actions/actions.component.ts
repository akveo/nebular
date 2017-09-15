/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';

import { convertToBoolProperty } from '../helpers';

/**
 * Action item, display a link with an icon, or any other content provided instead.
 */
@Component({
  selector: 'nb-action',
  template: `
    <a class="icon-container" href="#" *ngIf="icon; else showContent" (click)="$event.preventDefault()">
      <i class="control-icon {{ icon }}"></i>
    </a>
    <ng-template #showContent>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class NbActionComponent {

  @HostBinding('class.disabled') disabledValue: boolean = false;

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
}

/**
 * Shows a horizontal list of actions, available in multiple sizes
 * Aligns items vertically.
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

  @HostBinding('class.inverse') inverseValue: boolean;

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
  private fullWidthValue: boolean = false;

  /**
   * Size of the component, small|medium|large
   * @type string
   */
  @Input()
  set size(val: string) {
    this.sizeValue = val;
  }

  /**
   * Makes colors inverse based on current theme
   * @type boolean
   */
  @Input()
  set inverse(val: boolean) {
    this.inverseValue = convertToBoolProperty(val);
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
