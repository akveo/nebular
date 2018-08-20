/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';

import {
  NbAdjustment,
  NbConnectedOverlayController, NbOverlayContent,
  NbOverlayConfig,
  NbPosition,
  NbPositionBuilderService,
  NbPositionStrategy,
  NbTrigger,
  NbTriggerBuilderService,
  NbTriggerStrategy,
} from '../overlay';

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
 * If you wanna disable this behaviour just set it falsy value.
 *
 * ```html
 * <button nbPopover="Hello, Popover!" [nbPopoverAdjust]="false"></button>
 * ```
 *
 * Also popover has some different modes which provides capability show and hide popover in different ways:
 *
 * - Click mode popover shows when a user clicking on the host element and hides when the user clicks
 * somewhere on the document except popover.
 * - Hint mode provides capability show popover when the user hovers on the host element
 * and hide popover when user hovers out of the host.
 * - Hover mode works like hint mode with one exception - when the user moves mouse from host element to
 * the container element popover will not be hidden.
 *
 * @stacked-example(Available Modes, popover/popover-modes.component.html)
 *
 * @additional-example(Template Ref, popover/popover-template-ref.component)
 * @additional-example(Custom Component, popover/popover-custom-component.component)
 * */

/*
* TODO
* We're keeping inputs names for compatibility reasons.
* Rename them before release for breaking changes.
*/
@Directive({ selector: '[nbPopover]' })
export class NbPopoverDirective extends NbConnectedOverlayController {

  /**
   * Popover content which will be rendered in NbArrowedOverlayContainerComponent.
   * Available content: template ref, component and any primitive.
   * */
  @Input('nbPopover')
  set content(content: NbOverlayContent) {
    this.config.content = content;
  }

  /**
   * Container content context. Will be applied to the rendered component.
   * */
  @Input('nbPopoverContext')
  set context(context: Object) {
    this.config.contentContext = context;
  }

  /**
   * Position will be calculated relatively host element based on the position.
   * Can be top, right, bottom, left, start or end.
   * */
  @Input('nbPopoverPlacement')
  set position(position: NbPosition) {
    Object.assign(this.config.containerContext, { position });
  }

  /**
   * Container position will be changes automatically based on this strategy if container can't fit view port.
   * Set this property to any falsy value if you want to disable automatically adjustment.
   * Available values: clockwise, counterclockwise.
   * */
  @Input('nbPopoverAdjustment')
  adjustment: NbAdjustment = NbAdjustment.CLOCKWISE;

  /**
   * Describes when the container will be shown.
   * Available options: click, hover and hint
   * */
  @Input('nbPopoverMode')
  mode: NbTrigger = NbTrigger.CLICK;

  protected config: NbOverlayConfig = new NbOverlayConfig();

  constructor(private hostRef: ElementRef,
              private triggerBuilder: NbTriggerBuilderService,
              private positionBuilder: NbPositionBuilderService,
              cdkOverlay: Overlay) {
    super(cdkOverlay);
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
      .position(this.position);
  }

  protected createTriggerStrategy(overlayElement: HTMLElement): NbTriggerStrategy {
    return this.triggerBuilder
      .trigger(this.mode)
      .host(this.hostRef.nativeElement)
      .container(overlayElement);
  }
}
