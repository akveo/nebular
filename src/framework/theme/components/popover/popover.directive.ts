/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

import { NbDynamicOverlay, NbDynamicOverlayController } from '../cdk/overlay/dynamic/dynamic-overlay';
import { NbDynamicOverlayHandler } from '../cdk/overlay/dynamic/dynamic-overlay-handler';
import { NbAdjustment, NbPosition } from '../cdk/overlay/overlay-position';
import { NbOverlayContent } from '../cdk/overlay/overlay-service';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { NbPopoverComponent } from './popover.component';
import { takeUntil, skip } from 'rxjs/operators';
import { Subject } from 'rxjs';


/**
 * Powerful popover directive, which provides the best UX for your users.
 *
 * @stacked-example(Showcase, popover/popover-showcase.component)
 *
 * Popover can accept different content such as:
 * TemplateRef
 *
 * ```html
 * <button [nbPopover]="templateRef"></button>
 * <ng-template #templateRef>
 *   <span>Hello, Popover!</span>
 * </ng-template>
 * ```
 * ### Installation
 *
 * Import `NbPopoverModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbPopoverModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Custom components
 *
 * ```html
 * <button [nbPopover]="MyPopoverComponent"></button>
 * ```
 *
 * Both custom components and templateRef popovers can receive *contentContext* property
 * that will be passed to the content props.
 *
 * Primitive types
 *
 * ```html
 * <button nbPopover="Hello, Popover!"></button>
 * ```
 *
 * Popover has different placements, such as: top, bottom, left, right, start and end
 * which can be used as following:
 *
 * @stacked-example(Placements, popover/popover-placements.component)
 *
 * By default popover will try to adjust itself to maximally fit viewport
 * and provide the best user experience. It will try to change position of the popover container.
 * If you want to disable this behaviour set it `noop`.
 *
 * ```html
 * <button nbPopover="Hello, Popover!" nbPopoverAdjustment="noop"></button>
 * ```
 *
 * Popover has a number of triggers which provides an ability to show and hide the component in different ways:
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
 * @stacked-example(Available Triggers, popover/popover-modes.component.html)
 *
 * Noop mode is especially useful when you need to control Popover programmatically, for example show/hide
 * as a result of some third-party action, like HTTP request or validation check:
 *
 * @stacked-example(Manual Control, popover/popover-noop.component)
 *
 * Below are examples for manual popover settings control, both via template binding and code.
 * @stacked-example(Popover Settings, popover/popover-dynamic.component)
 *
 * Please note, while manipulating Popover setting via code, you need to call `rebuild()` method to apply the settings
 * changed.
 * @stacked-example(Popover Settings Code, popover/popover-dynamic-code.component)
 *
 * @additional-example(Template Ref, popover/popover-template-ref.component)
 * @additional-example(Custom Component, popover/popover-custom-component.component)
 * */
@Directive({
  selector: '[nbPopover]',
  exportAs: 'nbPopover',
  providers: [NbDynamicOverlayHandler, NbDynamicOverlay],
})
export class NbPopoverDirective implements NbDynamicOverlayController, OnChanges, AfterViewInit, OnDestroy, OnInit {

  protected popoverComponent = NbPopoverComponent;
  protected dynamicOverlay: NbDynamicOverlay;
  protected destroy$ = new Subject<void>();

  /**
   * Popover content which will be rendered in NbArrowedOverlayContainerComponent.
   * Available content: template ref, component and any primitive.
   * */
  @Input('nbPopover')
  content: NbOverlayContent;

  /**
   * Container content context. Will be applied to the rendered component.
   * */
  @Input('nbPopoverContext')
  context: Object = {};

  /**
   * Position will be calculated relatively host element based on the position.
   * Can be top, right, bottom, left, start or end.
   * */
  @Input('nbPopoverPlacement')
  position: NbPosition = NbPosition.TOP;

  /**
   * Container position will be changes automatically based on this strategy if container can't fit view port.
   * Set this property to `noop` value if you want to disable automatically adjustment.
   * Available values: `clockwise` (default), `counterclockwise`, `vertical`, `horizontal`, `noop`.
   * */
  @Input('nbPopoverAdjustment')
  get adjustment(): NbAdjustment {
    return this._adjustment;
  }
  set adjustment(value: NbAdjustment) {
    if (!value) {
      // @breaking-change Remove @5.0.0
      console.warn(`Falsy values for 'nbPopoverAdjustment' are deprecated and will be removed in Nebular 5.
 Use 'noop' instead.`);
      value = NbAdjustment.NOOP;
    }
    this._adjustment = value;
  }
  protected _adjustment: NbAdjustment = NbAdjustment.CLOCKWISE;

  /**
   * Describes when the container will be shown.
   * Available options: `click`, `hover`, `hint`, `focus` and `noop`
   * */
  @Input('nbPopoverTrigger')
  trigger: NbTrigger = NbTrigger.CLICK;

  /**
   * Sets popover offset
   * */
  @Input('nbPopoverOffset')
  offset = 15;

  @Input('nbPopoverClass')
  popoverClass: string = '';

  @Output()
  nbPopoverShowStateChange = new EventEmitter<{ isShown: boolean }>();

  get isShown(): boolean {
    return !!(this.dynamicOverlay && this.dynamicOverlay.isAttached);
  }

  constructor(protected hostRef: ElementRef,
              protected dynamicOverlayHandler: NbDynamicOverlayHandler) {
  }

  ngOnInit() {
    this.dynamicOverlayHandler
      .host(this.hostRef)
      .componentType(this.popoverComponent);
  }

  ngOnChanges() {
    this.rebuild();
  }

  ngAfterViewInit() {
    this.dynamicOverlay = this.configureDynamicOverlay()
      .build();

    this.dynamicOverlay.isShown
      .pipe(
        skip(1),
        takeUntil(this.destroy$),
      )
      .subscribe((isShown: boolean) => this.nbPopoverShowStateChange.emit({ isShown }));
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
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected configureDynamicOverlay() {
    return this.dynamicOverlayHandler
      .position(this.position)
      .trigger(this.trigger)
      .offset(this.offset)
      .adjustment(this.adjustment)
      .content(this.content)
      .context(this.context)
      .overlayConfig({ panelClass: this.popoverClass });
  }
}
