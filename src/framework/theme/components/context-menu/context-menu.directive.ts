/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { filter, takeWhile } from 'rxjs/operators';

import { NbDynamicOverlay, NbDynamicOverlayController } from '../cdk/overlay/dynamic/dynamic-overlay';
import { NbDynamicOverlayHandler } from '../cdk/overlay/dynamic/dynamic-overlay-handler';
import { NbOverlayRef } from '../cdk/overlay/mapping';
import { NbAdjustableConnectedPositionStrategy, NbAdjustment, NbPosition } from '../cdk/overlay/overlay-position';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { NbContextMenuComponent } from './context-menu.component';
import { NbMenuItem, NbMenuService } from '../menu/menu.service';

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
 * ### Installation
 *
 * Import `NbContextMenuModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbContextMenuModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * Also make sure `NbMenuModule` is imported to your `app.module`.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbMenuModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * ### Usage
 *
 * If you want to handle context menu clicks you have to pass `nbContextMenuTag`
 * param and register to events using NbMenuService.
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
 * Context menu has a number of triggers which provides an ability to show and hide the component in different ways:
 *
 * - Click mode shows the component when a user clicks on the host element and hides when the user clicks
 * somewhere on the document outside the component.
 * - Hint provides capability to show the component when the user hovers over the host element
 * and hide when the user hovers out of the host.
 * - Hover works like hint mode with one exception - when the user moves mouse from host element to
 * the container element the component remains open, so that it is possible to interact with it content.
 * - Focus mode is applied when user focuses the element.
 * - Noop mode - the component won't react to the user interaction.
 *
 * @stacked-example(Available Triggers, context-menu/context-menu-modes.component.html)
 *
 * Noop mode is especially useful when you need to control Popover programmatically, for example show/hide
 * as a result of some third-party action, like HTTP request or validation check:
 *
 * @stacked-example(Manual Control, context-menu/context-menu-noop.component)
 *
 * @stacked-example(Manual Control, context-menu/context-menu-right-click.component)
 * */
@Directive({
  selector: '[nbContextMenu]',
  providers: [NbDynamicOverlayHandler, NbDynamicOverlay],
})
export class NbContextMenuDirective implements NbDynamicOverlayController, OnChanges, AfterViewInit, OnDestroy, OnInit {

  @HostBinding('class.context-menu-host')
  contextMenuHost = true;

  /**
   * Position will be calculated relatively host element based on the position.
   * Can be top, right, bottom and left.
   * */
  @Input('nbContextMenuPlacement')
  position: NbPosition = NbPosition.BOTTOM;

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
  tag: string;

  /**
   * Basic menu items, will be passed to the internal NbMenuComponent.
   * */
  @Input('nbContextMenu')
  set items(items: NbMenuItem[]) {
    this.validateItems(items);
    this._items = items;
  };

  /**
   * Describes when the container will be shown.
   * Available options: `click`, `hover`, `hint`, `focus` and `noop`
   * */
  @Input('nbContextMenuTrigger')
  trigger: NbTrigger = NbTrigger.CLICK;

  @Input('nbContextMenuClass')
  contextMenuClass: string = '';

  protected ref: NbOverlayRef;
  protected container: ComponentRef<any>;
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected alive: boolean = true;
  private _items: NbMenuItem[] = [];

  private dynamicOverlay: NbDynamicOverlay;

  constructor(private hostRef: ElementRef,
              private menuService: NbMenuService,
              private dynamicOverlayHandler: NbDynamicOverlayHandler) {
  }

  ngOnInit() {
    this.dynamicOverlayHandler
      .host(this.hostRef)
      .componentType(NbContextMenuComponent);
  }

  ngOnChanges() {
    this.rebuild();
  }

  ngAfterViewInit() {
    this.dynamicOverlay = this.configureDynamicOverlay()
      .build();
    this.subscribeOnItemClick();
  }

  rebuild() {
    this.dynamicOverlay = this.configureDynamicOverlay()
      .rebuild();
  }

  show() {
    this.dynamicOverlay.show();
  }

  hide() {
    this.dynamicOverlay.hide();
  }

  toggle() {
    this.dynamicOverlay.toggle();
  }

  ngOnDestroy() {
    this.dynamicOverlayHandler.destroy();
  }

  protected configureDynamicOverlay() {
    return this.dynamicOverlayHandler
      .position(this.position)
      .trigger(this.trigger)
      .adjustment(this.adjustment)
      .context({
        position: this.position,
        items: this._items,
        tag: this.tag,
      })
      .overlayConfig({panelClass: this.contextMenuClass});
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
        filter(({ tag }) => tag === this.tag),
      )
      .subscribe(() => this.hide());
  }
}
