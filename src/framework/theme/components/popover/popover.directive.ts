/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy,
  OnInit, PLATFORM_ID, Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeWhile } from 'rxjs/operators';

import { NbPositioningHelper } from './helpers/positioning.helper';
import { NbPopoverComponent, NbPopoverContent } from './popover.component';
import { NbThemeService } from '../../services/theme.service';
import { NbAdjustmentHelper } from './helpers/adjustment.helper';
import { NbTriggerHelper } from './helpers/trigger.helper';
import {
  NbPopoverAdjustment,
  NbPopoverMode,
  NbPopoverPlacement,
  NbPopoverPosition,
  NbPopoverLogicalPlacement,
} from './helpers/model';
import { NbPlacementHelper } from './helpers/placement.helper';

/**
 * Powerful popover directive, which provides the best UX for your users.
 *
 * ![image](assets/images/components/popover.gif)
 *
 * @example Popover can accept different content such as:
 * TemplateRef
 *
 * ```
 * <button [nbPopover]="templateRef"></button>
 * <ng-template #templateRef>
 *   <span>Hello, Popover!</span>
 * </ng-template>
 * ```
 *
 * @example Custom components
 *
 * ```
 * <button [nbPopover]="NbCardComponent"></button>
 * ```
 *
 * @example Primitive types
 *
 * ```
 * <button nbPopover="Hello, Popover!"></button>
 * ```
 *
 * @example Popover has different placements, such as: top, bottom, left and right
 * which can be used as following:
 *
 * ```
 * <button nbPopover="Hello, Popover!" nbPopoverPlacement="left"></button>
 * ```
 *
 * @example By default popover will try to adjust itself to maximally fit viewport
 * and provide the best user experience. It will try to change placement of the popover container.
 * If you wanna disable this behaviour just set it falsy value.
 *
 * ```
 * <button nbPopover="Hello, Popover!" [nbPopoverAdjust]="false"></button>
 * ```
 *
 * */
/*
*
* TODO
* Rendering strategy have to be refactored.
* For now directive creates and deletes popover container each time.
* I think we can handle this slightly smarter and show/hide in any situations.
*/
@Directive({ selector: '[nbPopover]' })
export class NbPopoverDirective implements OnInit, OnDestroy {

  /**
   * Popover content which will be rendered in NbPopoverComponent.
   * Available content: template ref, component and any primitive.
   * */
  @Input('nbPopover')
  content: NbPopoverContent;

  /**
   * Container content context. Will be applied to the rendered component.
   * */
  @Input('nbPopoverContext')
  context: Object;

  /**
   * Position will be calculated relatively host element based on the placement.
   * Can be top, right, bottom, left, start or end.
   * */
  @Input('nbPopoverPlacement')
  placement: NbPopoverPlacement | NbPopoverLogicalPlacement = NbPopoverPlacement.TOP;

  /**
   * Container placement will be changes automatically based on this strategy if container can't fit view port.
   * Set this property to any falsy value if you want to disable automatically adjustment.
   * Available values: clockwise, counterclockwise.
   * */
  @Input('nbPopoverAdjustment')
  adjustment: NbPopoverAdjustment = NbPopoverAdjustment.CLOCKWISE;

  /**
   * Describes when the container will be shown.
   * Available options: click, hover and hint
   * */
  @Input('nbPopoverMode')
  mode: NbPopoverMode = NbPopoverMode.CLICK;

  /**
   * Returns true if popover already shown.
   * @return boolean
   * */
  get isShown(): boolean {
    return !!this.containerRef;
  }

  /**
   * Returns true if popover hidden.
   * @return boolean
   * */
  get isHidden(): boolean {
    return !this.containerRef;
  }

  /*
   * Is used for unsubscribe all subscriptions after component destructuring.
   * */
  private alive: boolean = true;

  private containerRef: ComponentRef<NbPopoverComponent>;

  private get container(): NbPopoverComponent {
    return this.containerRef.instance;
  }

  private get containerElement(): HTMLElement {
    return this.containerRef.location.nativeElement;
  }

  private get hostElement(): HTMLElement {
    return this.hostRef.nativeElement;
  }

  constructor(
    private hostRef: ElementRef,
    private themeService: NbThemeService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private positioningHelper: NbPositioningHelper,
    private adjustmentHelper: NbAdjustmentHelper,
    private triggerHelper: NbTriggerHelper,
    @Inject(PLATFORM_ID) private platformId,
    private placementHelper: NbPlacementHelper,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.registerTriggers();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Show popover.
   * */
  show() {
    if (this.isHidden) {
      this.renderPopover();
    }
  }

  /**
   * Hide popover.
   * */
  hide() {
    if (this.isShown) {
      this.destroyPopover();
    }
  }

  /**
   * Toggle popover state.
   * */
  toggle() {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  /*
   * Adjust popover position on window resize.
   * Window resize may change host element position, so popover relocation required.
   *
   * TODO
   * Fix tslint to add capability make HostListener private.
   * */
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.isShown) {
      this.place();
    }
  }

  /*
   * Subscribe to the popover triggers created from the {@link NbPopoverDirective#mode}.
   * see {@link NbTriggerHelper}
   * */
  private registerTriggers() {
    const { open, close, toggle } = this.triggerHelper
      .createTrigger(this.hostElement, () => this.containerRef, this.mode);

    open.pipe(takeWhile(() => this.alive))
      .subscribe(() => this.show());

    close.pipe(takeWhile(() => this.alive))
      .subscribe(() => this.hide());

    toggle.pipe(takeWhile(() => this.alive))
      .subscribe(() => this.toggle());
  }

  /*
   * Renders popover putting {@link NbPopoverComponent} in the top of {@link NbLayoutComponent}
   * and positioning container based on {@link NbPopoverDirective#placement}
   * and {@link NbPopoverDirective#adjustment}.
   * */
  private renderPopover() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(NbPopoverComponent);
    this.themeService.appendToLayoutTop(factory)
      .pipe(takeWhile(() => this.alive))
      .subscribe((containerRef: ComponentRef<NbPopoverComponent>) => {
        this.containerRef = containerRef;
        this.patchPopover(this.content, this.context);
        /*
         * Have to call detectChanges because on this phase {@link NbPopoverComponent} isn't inserted in the DOM
         * and haven't got calculated size.
         * But we should have size on this step to calculate popover position correctly.
         *
         * TODO
         * I don't think we have to call detectChanges each time we're using {@link NbThemeService#appendToLayoutTop}.
         * Investigate, maybe we can create method in the {@link NbThemeService}
         * which will call {@link NbThemeService#appendToLayoutTop} and 'do' detectChanges,
         * instead of performing this call by service client.
         * */
        this.containerRef.changeDetectorRef.markForCheck();
        this.containerRef.changeDetectorRef.detectChanges();
        this.place();
      });
  }

  /*
   * Destroys the {@link NbPopoverComponent} and nullify its reference;
   * */
  private destroyPopover() {
    this.containerRef.destroy();
    this.containerRef = null;
  }

  /*
   * Moves {@link NbPopoverComponent} relatively host component based on the {@link NbPopoverDirective#placement}.
   * */
  private place() {
    const hostRect = this.hostElement.getBoundingClientRect();
    const containerRect = this.containerElement.getBoundingClientRect();

    this.adjust(containerRect, hostRect);
  }

  /*
   * Set container content and context.
   * */
  private patchPopover(content: NbPopoverContent, context: Object) {
    this.container.content = content;
    this.container.context = context;
  }

  /*
   * Set container placement.
   * */
  private patchPopoverPlacement(placement: NbPopoverPlacement) {
    this.container.placement = placement;
  }

  /*
   * Set container position.
   * */
  private patchPopoverPosition({ top, left }) {
    this.container.positionTop = top;
    this.container.positionLeft = left;
  }

  /*
   * Calculates container adjustment and sets container position and placement.
   * */
  private adjust(containerRect: ClientRect, hostRect: ClientRect) {
    const { placement, position } = this.performAdjustment(containerRect, hostRect);

    this.patchPopoverPlacement(placement);
    this.patchPopoverPosition(position);
  }

  /*
   * Checks if {@link NbPopoverDirective#adjustment} can be performed and runs it.
   * If not, just calculates element position.
   * */
  private performAdjustment(placed: ClientRect, host: ClientRect): NbPopoverPosition {
    if (this.adjustment) {
      return this.calcAdjustment(placed, host);
    }

    return this.calcPosition(placed, host);
  }

  /*
   * Calculate adjustment.
   * see {@link NbAdjustmentHelper}.
   * */
  private calcAdjustment(placed: ClientRect, host: ClientRect): NbPopoverPosition {
    const placement = this.placementHelper.toPhysicalPlacement(this.placement);
    return this.adjustmentHelper.adjust(placed, host, placement, this.adjustment);
  }

  /*
   * Calculate position.
   * see {@link NbPositioningHelper}
   * */
  private calcPosition(placed: ClientRect, host: ClientRect): NbPopoverPosition {
    const placement = this.placementHelper.toPhysicalPlacement(this.placement);
    return {
      position: this.positioningHelper.calcPosition(placed, host, placement),
      placement,
    };
  }
}
