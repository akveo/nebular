/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { NbComponentStatus } from '../component-status';
import { NbAdjustment, NbPosition } from '../cdk/overlay/overlay-position';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { NbDynamicOverlay } from '../cdk/overlay/dynamic/dynamic-overlay';
import { NbDynamicOverlayHandler } from '../cdk/overlay/dynamic/dynamic-overlay-handler';
import { NbTooltipComponent } from './tooltip.component';

/**
 *
 * Tooltip directive for small text/icon hints.
 *
 * ### Installation
 *
 * Import `NbTooltipModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTooltipModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * @stacked-example(Showcase, tooltip/tooltip-showcase.component)
 *
 * Tooltip can accept a hint text and/or an icon:
 * @stacked-example(With Icon, tooltip/tooltip-with-icon.component)
 *
 * Same way as Popover, tooltip can accept placement position with `nbTooltipPlacement` property:
 * @stacked-example(Placements, tooltip/tooltip-placements.component)
 *
 * It is also possible to specify tooltip color using `nbTooltipStatus` property:
 * @stacked-example(Colored Tooltips, tooltip/tooltip-colors.component)
 *
 * Tooltip has a number of triggers which provides an ability to show and hide the component in different ways:
 *
 * - Click mode shows the component when a user clicks on the host element and hides when the user clicks
 * somewhere on the document outside the component.
 * - Hint provides capability to show the component when the user hovers over the host element
 * and hide when the user hovers out of the host.
 * - Hover works like hint mode with one exception - when the user moves mouse from host element to
 * the container element the component remains open, so that it is possible to interact with it content.
 * - Focus mode is applied when user focuses the element.
 * - Noop mode - the component won't react to the user interaction.
 */
@Directive({
  selector: '[nbTooltip]',
  providers: [NbDynamicOverlayHandler, NbDynamicOverlay],
})
export class NbTooltipDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  context: Object = {};

  /**
   * Tooltip message
   */
  @Input('nbTooltip')
  content: string;
  /**
   * Position will be calculated relatively host element based on the position.
   * Can be top, right, bottom, left, start or end.
   */
  @Input('nbTooltipPlacement')
  position: NbPosition = NbPosition.TOP;
  /**
   * Container position will change automatically based on this strategy if container can't fit view port.
   * Set this property to `noop` value if you want to disable automatic adjustment.
   * Available values: `clockwise` (default), `counterclockwise`, `vertical`, `horizontal`, `noop`.
   */
  @Input('nbTooltipAdjustment')
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
   *
   * @param {string} icon
   */
  @Input('nbTooltipIcon')
  set icon(icon: string) {
    this.context = Object.assign(this.context, {icon});
  }

  /**
   *
   * @param {string} status
   */
  @Input('nbTooltipStatus')
  set status(status: '' | NbComponentStatus) {
    this.context = Object.assign(this.context, {status});
  }

  /**
   * Describes when the container will be shown.
   * Available options: `click`, `hover`, `hint`, `focus` and `noop`
   * */
  @Input('nbTooltipTrigger')
  trigger: NbTrigger = NbTrigger.HINT;

  private dynamicOverlay: NbDynamicOverlay;

  constructor(private hostRef: ElementRef,
              private dynamicOverlayHandler: NbDynamicOverlayHandler) {
  }

  ngOnInit() {
    this.dynamicOverlayHandler
      .host(this.hostRef)
      .componentType(NbTooltipComponent)
      .offset(8);
  }

  ngOnChanges() {
    this.rebuild();
  }

  ngAfterViewInit() {
    this.dynamicOverlay = this.configureDynamicOverlay()
      .build();
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
      .content(this.content)
      .context(this.context);
  }
}
