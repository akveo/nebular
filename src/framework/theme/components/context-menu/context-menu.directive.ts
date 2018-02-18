/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NbPopoverDirective } from '../popover/popover.directive';
import { NbMenuItem } from '../menu/menu.service';
import { NbThemeService } from '../../services/theme.service';
import { NbPopoverAdjustment, NbPopoverPlacement } from '../popover/helpers/model';
import { NbContextMenuComponent } from './context-menu.component';

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
 * @example Context menu has different placements, such as: top, bottom, left and right
 * which can be used as following:
 *
 * ```
 * <button [nbContextMenu]="items" nbContextMenuPlacement="right"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 *
 * @example By default context menu will try to adjust itself to maximally fit viewport
 * and provide the best user experience. It will try to change placement of the context menu.
 * If you wanna disable this behaviour just set it falsy value.
 *
 * ```
 * <button [nbContextMenu]="items" nbContextMenuAdjustment="counterclockwise"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 * */
@Directive({ selector: '[nbContextMenu]' })
export class NbContextMenuDirective implements OnInit, OnDestroy {

  /**
   * Basic menu items, will be passed to the internal NbMenuComponent.
   * */
  @Input('nbContextMenu')
  items: NbMenuItem[];

  /**
   * Position will be calculated relatively host element based on the placement.
   * Can be top, right, bottom and left.
   * */
  @Input('nbContextMenuPlacement')
  placement: NbPopoverPlacement = NbPopoverPlacement.BOTTOM;

  /**
   * Container placement will be changes automatically based on this strategy if container can't fit view port.
   * Set this property to any falsy value if you want to disable automatically adjustment.
   * Available values: clockwise, counterclockwise.
   * */
  @Input('nbContextMenuAdjustment')
  adjustment: NbPopoverAdjustment = NbPopoverAdjustment.CLOCKWISE;

  protected popover: NbPopoverDirective;

  constructor(hostRef: ElementRef, themeService: NbThemeService) {
    /**
     * Initialize popover with all the important inputs.
     * */
    this.popover = new NbPopoverDirective(hostRef, themeService);
    this.popover.content = NbContextMenuComponent;
    this.popover.placement = this.placement;
    this.popover.adjustment = this.adjustment;
  }

  ngOnInit() {
    this.popover.ngOnInit();
    this.validateItems();
    this.patchPopoverContext();
  }

  ngOnDestroy() {
    this.popover.ngOnDestroy();
  }

  /**
   * Show context menu.
   * */
  show() {
    this.popover.show();
  }

  /**
   * Hide context menu.
   * */
  hide() {
    this.popover.hide();
  }

  /**
   * Toggle context menu state.
   * */
  toggle() {
    this.popover.toggle();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.popover.onResize();
  }

  /*
   * NbMenuComponent will crash if don't pass menu items to it.
   * So, we just validating them and throw custom obvious error.
   * */
  private validateItems() {
    if (!this.items || !this.items.length) {
      throw Error(`List of menu items expected, but given: ${this.items}`)
    }
  }

  /*
   * Set internal popover context.
   * */
  private patchPopoverContext() {
    this.popover.context = { items: this.items };
  }
}
