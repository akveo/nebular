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
export class NbContextMenuDirective implements OnInit, OnDestroy {

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

  protected popover: NbPopoverDirective;

  constructor(hostRef: ElementRef, themeService: NbThemeService) {
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
   * Show popover.
   * */
  show() {
    this.popover.show();
  }

  /**
   * Hide popover.
   * */
  hide() {
    this.popover.hide();
  }

  /**
   * Toggle popover state.
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

  private patchPopoverContext() {
    this.popover.context = { items: this.items };
  }
}
