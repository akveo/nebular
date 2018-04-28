/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ComponentFactoryResolver, Directive, ElementRef, HostListener, Inject, Input, OnDestroy,
  OnInit, PLATFORM_ID,
} from '@angular/core';
import { NbPopoverDirective } from '../popover/popover.directive';
import { NbMenuItem } from '../menu/menu.service';
import { NbThemeService } from '../../services/theme.service';
import { NbPopoverAdjustment, NbPopoverPlacement } from '../popover/helpers/model';
import { NbContextMenuComponent } from './context-menu.component';
import { NbPositioningHelper } from '../popover/helpers/positioning.helper';
import { NbAdjustmentHelper } from '../popover/helpers/adjustment.helper';
import { NbTriggerHelper } from '../popover/helpers/trigger.helper';
import { NbPlacementHelper } from '../popover/helpers/placement.helper';

/**
 * Full featured context menu directive.
 *
 * ![image](assets/images/components/context-menu.gif)
 *
 * @example Just pass menu items array:
 *
 * ```
 * <button [nbContextMenu]="items"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 *
 * @example If you want to handle context menu clicks you have to pass `nbContextMenuTag`
 * param and subscribe to events using NbMenuService.
 * `NbContextMenu` renders plain `NbMenu` inside, so
 * you have to work with it just like with `NbMenu` component:
 *
 * ```
 * <button [nbContextMenu]="items" nbContextMenuTag="my-context-menu"></button>
 * ...
 * nbMenuService.onItemClick()
 *   .pipe(filter(({ tag }) => tag === 'my-context-menu'))
 *   .subscribe(...handle it somehow)
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
  set items(items: NbMenuItem[]) {
    this.validateItems(items);
    this.popover.context = Object.assign(this.context, { items });
  };

  /**
   * Position will be calculated relatively host element based on the placement.
   * Can be top, right, bottom and left.
   * */
  @Input('nbContextMenuPlacement')
  set placement(placement: NbPopoverPlacement) {
    this.popover.placement = placement;
  };

  /**
   * Container placement will be changes automatically based on this strategy if container can't fit view port.
   * Set this property to any falsy value if you want to disable automatically adjustment.
   * Available values: clockwise, counterclockwise.
   * */
  @Input('nbContextMenuAdjustment')
  set adjustment(adjustment: NbPopoverAdjustment) {
    this.popover.adjustment = adjustment;
  }

  /**
   * Set NbMenu tag, which helps identify menu when working with NbMenuService.
   * */
  @Input('nbContextMenuTag')
  set tag(tag: string) {
    this.popover.context = Object.assign(this.context, { tag });
  }

  protected popover: NbPopoverDirective;
  protected context = {};

  constructor(hostRef: ElementRef,
              themeService: NbThemeService,
              componentFactoryResolver: ComponentFactoryResolver,
              positioningHelper: NbPositioningHelper,
              adjustmentHelper: NbAdjustmentHelper,
              triggerHelper: NbTriggerHelper,
              @Inject(PLATFORM_ID) platformId,
              placementHelper: NbPlacementHelper) {
    /**
     * Initialize popover with all the important inputs.
     * */
    this.popover = new NbPopoverDirective(hostRef,
      themeService,
      componentFactoryResolver,
      positioningHelper,
      adjustmentHelper,
      triggerHelper,
      platformId,
      placementHelper,
    );
    this.popover.content = NbContextMenuComponent;
    this.popover.placement = NbPopoverPlacement.BOTTOM;
  }

  ngOnInit() {
    this.popover.ngOnInit();
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
  private validateItems(items: NbMenuItem[]) {
    if (!items || !items.length) {
      throw Error(`List of menu items expected, but given: ${items}`)
    }
  }
}
