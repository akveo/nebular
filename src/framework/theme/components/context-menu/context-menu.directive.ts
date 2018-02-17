/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NbPopoverDirective } from '../popover/popover.directive';
import { NbMenuItem } from '../menu/menu.service';
import { NbThemeService } from '../../services/theme.service';
import { NbContextMenuComponent } from './context-menu.component';
import { NbPopoverAdjustment, NbPopoverPlacement } from '../popover/helpers/model';

/**
 * Full featured context menu directive.
 *
 * ![image](assets/images/components/context-menu.gif)
 *
 * @example Juts pass basic menu items:
 *
 * ```
 * <button [nbContextMenu]="items"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 *
 * @example Also supports placement:
 *
 * ```
 * <button [nbContextMenu]="items" nbContextMenuPlacement="right"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 *
 * @example And adjustment:
 *
 * ```
 * <button [nbContextMenu]="items" nbContextMenuAdjustment="counterclockwise"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 * */
@Directive({ selector: '[nbContextMenu]' })
export class NbContextMenuDirective extends NbPopoverDirective implements OnInit {

  /**
   * Basic menu items, will be passed to the NbMenuComponent.
   * */
  @Input('nbContextMenu')
  items: NbMenuItem[];

  /**
   * Placement which will be passed to the popover.
   * */
  @Input('nbContextMenuPlacement')
  placement: NbPopoverPlacement = NbPopoverPlacement.BOTTOM;

  /**
   * Adjustment which will be passed to the popover.
   * */
  @Input('nbContextMenuAdjustment')
  adjustment: NbPopoverAdjustment = NbPopoverAdjustment.CLOCKWISE;

  constructor(hostRef: ElementRef, themeService: NbThemeService) {
    super(hostRef, themeService);

    this.content = NbContextMenuComponent;
  }

  ngOnInit() {
    super.ngOnInit();
    this.validateItems();
    this.context = { items: this.items };
  }

  /**
   * NbMenuComponent will crash if don't pass menu items to it.
   * So, we just validating them and throw custom obvious error.
   * */
  private validateItems() {
    if (!this.items || !this.items.length) {
      throw Error(`List of menu items expected, but given: ${this.items}`)
    }
  }
}
