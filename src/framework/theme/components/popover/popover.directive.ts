/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbOverlayContent,
  NbOverlayRef,
  NbOverlayService,
  NbPosition,
  NbPositionBuilderService,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilderService,
  patch,
  createContainer,
} from '../cdk';
import { NB_DOCUMENT } from '../../theme.options';
import { NbPopoverComponent } from './popover.component';


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
 *   	// ...
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
 * If you wanna disable this behaviour just set it falsy value.
 *
 * ```html
 * <button nbPopover="Hello, Popover!" [nbPopoverAdjust]="false"></button>
 * ```
 *
 * Also popover has some different modes which provides capability show$ and hide$ popover in different ways:
 *
 * - Click mode popover shows when a user clicking on the host element and hides when the user clicks
 * somewhere on the document except popover.
 * - Hint mode provides capability show$ popover when the user hovers on the host element
 * and hide$ popover when user hovers out of the host.
 * - Hover mode works like hint mode with one exception - when the user moves mouse from host element to
 * the container element popover will not be hidden.
 *
 * @stacked-example(Available Modes, popover/popover-modes.component.html)
 *
 * @additional-example(Template Ref, popover/popover-template-ref.component)
 * @additional-example(Custom Component, popover/popover-custom-component.component)
 * */
@Directive({ selector: '[nbPopover]' })
export class NbPopoverDirective implements AfterViewInit, OnDestroy {

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
   * Set this property to any falsy value if you want to disable automatically adjustment.
   * Available values: clockwise, counterclockwise.
   * */
  @Input('nbPopoverAdjustment')
  adjustment: NbAdjustment = NbAdjustment.CLOCKWISE;

  /**
   * Deprecated, use `trigger`
   * @deprecated
   * @breaking-change 4.0.0
   * */
  @Input('nbPopoverMode')
  set mode(mode) {
    console.warn(`Popover 'nbPopoverMode' input is deprecated and will be removed as of 4.0.0.
      Use 'nbPopoverTrigger' instead.`);
    this.trigger = mode;
  }

  get mode() {
    return this.trigger;
  }

  /**
   * Describes when the container will be shown.
   * Available options: click, hover and hint
   * */
  @Input('nbPopoverTrigger')
  trigger: NbTrigger = NbTrigger.CLICK;

  protected ref: NbOverlayRef;
  protected container: ComponentRef<any>;
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected alive: boolean = true;

  constructor(@Inject(NB_DOCUMENT) protected document,
              private hostRef: ElementRef,
              private positionBuilder: NbPositionBuilderService,
              private triggerStrategyBuilder: NbTriggerStrategyBuilderService,
              private overlay: NbOverlayService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
    this.subscribeOnTriggers();
    this.subscribeOnPositionChange();
  }

  ngOnDestroy() {
    this.alive = false;
    this.hide();
    if (this.ref) {
      this.ref.dispose();
    }
  }

  show() {
    if (!this.ref) {
      this.createOverlay();
    }

    this.openPopover();
  }

  hide() {
    if (this.ref) {
      this.ref.detach();
    }

    this.container = null;
  }

  toggle() {
    if (this.ref && this.ref.hasAttached()) {
      this.hide();
    } else {
      this.show();
    }
  }

  protected createOverlay() {
    this.ref = this.overlay.create({
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
  }

  protected openPopover() {
    this.container = createContainer(this.ref, NbPopoverComponent, {
      position: this.position,
      content: this.content,
      context: this.context,
      cfr: this.componentFactoryResolver,
    }, this.componentFactoryResolver);
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .position(this.position)
      .adjustment(this.adjustment);
  }

  protected createTriggerStrategy(): NbTriggerStrategy {
    return this.triggerStrategyBuilder
      .trigger(this.trigger)
      .host(this.hostRef.nativeElement)
      .container(() => this.container)
      .build();
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy = this.createPositionStrategy();
    this.positionStrategy.positionChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((position: NbPosition) => patch(this.container, { position }));
  }

  protected subscribeOnTriggers() {
    const triggerStrategy: NbTriggerStrategy = this.createTriggerStrategy();
    triggerStrategy.show$.pipe(takeWhile(() => this.alive)).subscribe(() => this.show());
    triggerStrategy.hide$.pipe(takeWhile(() => this.alive)).subscribe(() => this.hide());
  }
}
