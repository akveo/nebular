/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, ComponentRef, Directive, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { filter, takeWhile } from 'rxjs/operators';

import {
  createContainer,
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbOverlayRef,
  NbOverlayService,
  NbPosition,
  NbPositionBuilderService,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilder,
  patch,
} from '../cdk';
import { NbContextMenuComponent } from './context-menu.component';
import { NbMenuItem, NbMenuService } from '../menu/menu.service';
import { NB_DOCUMENT } from '../../theme.options';

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
 * */
@Directive({ selector: '[nbContextMenu]' })
export class NbContextMenuDirective implements AfterViewInit, OnDestroy {

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
  set setItems(items: NbMenuItem[]) {
    this.validateItems(items);
    this.items = items;
  };

  protected ref: NbOverlayRef;
  protected container: ComponentRef<any>;
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected triggerStrategy: NbTriggerStrategy;
  protected alive: boolean = true;
  private items: NbMenuItem[] = [];

  constructor(@Inject(NB_DOCUMENT) protected document,
              private menuService: NbMenuService,
              private hostRef: ElementRef,
              private positionBuilder: NbPositionBuilderService,
              private overlay: NbOverlayService) {
  }

  ngAfterViewInit() {
    this.positionStrategy = this.createPositionStrategy();
    this.ref = this.overlay.create({
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    this.triggerStrategy = this.createTriggerStrategy();

    this.subscribeOnTriggers();
    this.subscribeOnPositionChange();
    this.subscribeOnItemClick();
  }

  ngOnDestroy() {
    this.alive = false;
    this.hide();
  }

  show() {
    this.container = createContainer(this.ref, NbContextMenuComponent, {
      position: this.position,
      items: this.items,
      tag: this.tag,
    });
  }

  hide() {
    this.ref.detach();
    this.container = null;
  }

  toggle() {
    if (this.ref && this.ref.hasAttached()) {
      this.hide();
    } else {
      this.show();
    }
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .position(this.position)
      .adjustment(this.adjustment);
  }

  protected createTriggerStrategy(): NbTriggerStrategy {
    return new NbTriggerStrategyBuilder()
      .document(this.document)
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(() => this.container)
      .build();
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((position: NbPosition) => patch(this.container, { position }));
  }

  protected subscribeOnTriggers() {
    this.triggerStrategy.show$.pipe(takeWhile(() => this.alive)).subscribe(() => this.show());
    this.triggerStrategy.hide$.pipe(takeWhile(() => this.alive)).subscribe(() => this.hide());
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
