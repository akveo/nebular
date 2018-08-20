/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ComponentType, Overlay } from '@angular/cdk/overlay';

import { filter, takeWhile } from 'rxjs/operators';
import { NbMenuItem, NbMenuService } from '../menu/menu.service';
import {
  NbTrigger,
  NbTriggerBuilderService,
  NbTriggerStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
  NbPositionStrategy,
  NbOverlayConfig,
  NbConnectedOverlayController,
} from '../overlay';
import { NbPopoverComponent } from '../popover/popover.component';
import { NbContextMenuComponent } from './context-menu.component';

/**
 * Full featured context menu directive.
 *
 * @stacked-example(Showcase, context-menu/context-menu-showcase.component)
 *
 * Just pass menu items array:
 *
 * ```html
 * <button [nbContextMenu]="items"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 *
 * If you want to handle context menu clicks you have to pass `nbContextMenuTag`
 * param and subscribe to events using NbMenuService.
 * `NbContextMenu` renders plain `NbMenu` inside, so
 * you have to work with it just like with `NbMenu` component:
 *
 * @stacked-example(Menu item click, context-menu/context-menu-click.component)
 *
 * Context menu has different placements, such as: top, bottom, left and right
 * which can be used as following:
 *
 * ```html
 * <button [nbContextMenu]="items" nbContextMenuPlacement="right"></button>
 * ```
 *
 * ```ts
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 *
 * By default context menu will try to adjust itself to maximally fit viewport
 * and provide the best user experience. It will try to change position of the context menu.
 * If you wanna disable this behaviour just set it falsy value.
 *
 * ```html
 * <button [nbContextMenu]="items" nbContextMenuAdjustment="counterclockwise"></button>
 * ```
 *
 * ```ts
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 * */
@Directive({ selector: '[nbContextMenu]' })
export class NbContextMenuDirective extends NbConnectedOverlayController implements OnInit, OnDestroy {

  /**
   * Basic menu items, will be passed to the internal NbMenuComponent.
   * */
  @Input('nbContextMenu')
  set items(items: NbMenuItem[]) {
    this.validateItems(items);
    Object.assign(this.config.contentContext, { items });
  };

  /**
   * Position will be calculated relatively host element based on the position.
   * Can be top, right, bottom and left.
   * */
  @Input('nbContextMenuPlacement')
  set position(position: NbPosition) {
    this.config.containerContext = position || NbPosition.BOTTOM;
  }

  /**
   * Container position will be changes automatically based on this strategy if container can't fit view port.
   * Set this property to any falsy value if you want to disable automatically adjustment.
   * Available values: clockwise, counterclockwise.
   * */
  @Input('nbContextMenuAdjustment')
  adjustment: NbAdjustment = NbAdjustment.CLOCKWISE;

  /**
   * Set NbMenu tag, which helps identify menu when working with NbMenuService.
   * */
  @Input('nbContextMenuTag')
  set tag(tag: string) {
    this.menuTag = tag;
    Object.assign(this.config.contentContext, { tag });
  }

  protected config: NbOverlayConfig = new NbOverlayConfig({
    container: NbPopoverComponent,
  });

  private menuTag: string;
  private alive: boolean = true;

  constructor(private menuService: NbMenuService,
              private hostRef: ElementRef,
              private triggerFactory: NbTriggerBuilderService,
              private positionBuilder: NbPositionBuilderService,
              cdkOverlay: Overlay) {
    super(cdkOverlay);
  }

  ngOnInit() {
    this.subscribeOnItemClick();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.alive = false;
  }

  show() {
    this.overlay.show();
  }

  hide() {
    this.overlay.hide();
  }

  toggle() {
    this.overlay.toggle();
  }

  protected createPositionStrategy(): NbPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .adjustment(this.adjustment)
      .position(this.position)
      .offset(15)
  }

  protected createTriggerStrategy(overlayElement: HTMLElement): NbTriggerStrategy {
    return this.triggerFactory
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(overlayElement)
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

  private subscribeOnItemClick() {
    this.menuService.onItemClick()
      .pipe(
        takeWhile(() => this.alive),
        filter(({tag}) => tag === this.menuTag),
      )
      .subscribe(() => this.hide());
  }
}
