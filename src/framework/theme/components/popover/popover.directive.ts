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
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  createContainer,
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbOverlayContent,
  NbOverlayRef,
  NbOverlayService,
  NbPosition,
  NbPositionBuilderService,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilder,
  patch,
} from '../cdk';
import { NB_DOCUMENT } from '../../theme.options';
import { NbPopoverComponent } from './popover.component';
import { isFirstChange } from '../helpers';


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
export class NbPopoverDirective implements OnChanges, AfterViewInit, OnDestroy {

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
   * Describes when the container will be shown.
   * Available options: click, hover and hint
   * */
  @Input('nbPopoverMode')
  mode: NbTrigger = NbTrigger.CLICK;

  protected ref: NbOverlayRef;
  protected container: ComponentRef<NbPopoverComponent>;
  protected positionStrategy: NbAdjustableConnectedPositionStrategy;
  protected positionStrategyChange$ = new Subject();
  protected triggerStrategyChange$ = new Subject();
  protected alive = true;

  constructor(@Inject(NB_DOCUMENT) protected document,
              private hostRef: ElementRef,
              private positionBuilder: NbPositionBuilderService,
              private overlay: NbOverlayService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  get isAttached(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  ngOnChanges(changes: SimpleChanges) {
    /**
     * Skip ngOnChanges callback if it's first change.
     * Setup popover in the ngAfterViewInit callback.
     * */
    if (isFirstChange(changes)) {
      return;
    }

    if (this.isPositionStrategyUpdateRequired(changes)) {
      this.updatePositionStrategy();
    }

    if (this.isTriggerStrategyUpdateRequired(changes)) {
      this.updateTriggerStrategy();
    }

    if (this.isContainerRerenderRequired(changes)) {
      /**
       * Other updates may require the container update.
       * That's why we're updating container the last operation.
       * */
      this.scheduleContainerUpdate();
    }
  }

  ngAfterViewInit() {
    this.subscribeOnTriggers();
    this.subscribeOnPositionChange();
  }

  ngOnDestroy() {
    this.alive = false;
    this.hide();
    this.ref.dispose();
  }

  show() {
    if (!this.ref) {
      this.createOverlay();
    }

    this.renderContainer();
  }

  hide() {
    if (!this.ref) {
      return;
    }

    this.ref.detach();
    this.container = null;
  }

  toggle() {
    if (this.isAttached) {
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

  protected renderContainer() {
    const containerContext = this.createContainerContext();
    this.container = createContainer(this.ref, NbPopoverComponent, containerContext, this.componentFactoryResolver);
    this.container.instance.renderContent();
  }

  protected scheduleContainerUpdate() {
    /**
     * In case of triggering container update inside the container by clicking somewhere
     * we also triggering hide event in click trigger strategy. This strategy listens click events
     * on the container element, but when we update the container we're removing previous container
     * element from DOM and inserting a new one. But the click event was fired on the previous element
     * and now it's outside of the active container.
     * So, we have to update container after handling click by trigger strategy.
     * */
    setTimeout(() => this.updateContainer());
  }

  protected updateContainer() {
    const containerContext = this.createContainerContext();
    Object.assign(this.container.instance, containerContext);
    this.container.instance.renderContent();
    this.container.changeDetectorRef.detectChanges();

    /**
     * Dimensions of the container may be changed after updating the content, so, we have to update
     * container position.
     * */
    this.ref.updatePosition();
  }

  protected updatePositionStrategy() {
    this.positionStrategyChange$.next();
    this.subscribeOnPositionChange();

    if (this.ref) {
      this.ref.updatePositionStrategy(this.positionStrategy);
    }
  }

  protected updateTriggerStrategy() {
    this.triggerStrategyChange$.next();
    this.subscribeOnTriggers();
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy = this.createPositionStrategy();
    this.positionStrategy.positionChange
      .pipe(
        takeWhile(() => this.alive),
        takeUntil(this.positionStrategyChange$),
      )
      .subscribe((position: NbPosition) => patch(this.container, { position }));
  }

  protected subscribeOnTriggers() {
    const triggerStrategy: NbTriggerStrategy = this.createTriggerStrategy();

    triggerStrategy.show$.pipe(
      takeWhile(() => this.alive),
      takeUntil(this.triggerStrategyChange$),
    )
      .subscribe(() => this.show());

    triggerStrategy.hide$.pipe(
      takeWhile(() => this.alive),
      takeUntil(this.triggerStrategyChange$),
    )
      .subscribe(() => this.hide());
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
      .trigger(this.mode)
      .host(this.hostRef.nativeElement)
      .container(() => this.container)
      .build();
  }

  protected createContainerContext(): Object {
    return {
      position: this.position,
      content: this.content,
      context: this.context,
      cfr: this.componentFactoryResolver,
    };
  }

  protected isContainerRerenderRequired(changes: SimpleChanges) {
    return this.isContentUpdateRequired(changes)
      || this.isContextUpdateRequired(changes)
      || this.isPositionStrategyUpdateRequired(changes);
  }

  protected isContentUpdateRequired(changes: SimpleChanges): boolean {
    /**
     * We're rerendering container each time we're showing it, so we don't need to update content
     * if popover isn't attached.
     * */
    return this.isAttached && !!changes.content;
  }

  /**
   * We're rerendering container each time we're showing it, so we don't need to update context
   * if popover isn't attached.
   * */
  protected isContextUpdateRequired(changes: SimpleChanges): boolean {
    return this.isAttached && !!changes.context;
  }

  protected isPositionStrategyUpdateRequired(changes: SimpleChanges): boolean {
    return !!changes.adjustment || !!changes.position;
  }

  protected isTriggerStrategyUpdateRequired(changes: SimpleChanges): boolean {
    return !!changes.mode;
  }
}
