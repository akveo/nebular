/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, TemplateRef, Type } from '@angular/core';
import { NbPlacement, NbPositioningHelper } from './positioning.helper';
import { NbPopoverComponent } from './popover.component';
import { NbThemeService } from '../../services/theme.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { NbPosition, NbAdjustmentHelper, NbAdjustment } from './adjustment.helper';

/**
 * Popover can be one of the following types:
 * template, component or plain js string.
 * So NbPopoverContent provides types alias for this purposes.
 * */
export type NbPopoverContent = string | TemplateRef<any> | Type<any>;

/**
 * Powerful popover directive.
 *
 * @example popover can accept different content {@link NbPopoverContent}
 * and render it in the {@link NbPopoverComponent} such as:
 * TemplateRef
 * ```
 * <button [nbPopover]="templateRef"></button>
 * <ng-template #templateRef>
 *   <span>Hello, Popover!</span>
 * </ng-template>
 * ```
 *
 * Any components
 * ```
 * <button [nbPopover]="NbCardComponent"></button>
 * ```
 *
 * Just strings
 * ```
 * <button [nbPopover]="'Hello, Popover!'"></button>
 * ```
 *
 * @example moreover popover has different placements, such as: top, bottom, left and right
 * which can be used as following:
 * ```
 * <button [nbPopover]="'Hello, Popover!'" [nbPopoverPlacement]="'left'"></button>
 * ```
 * */
@Directive({ selector: '[nbPopover]' })
export class NbPopoverDirective implements OnDestroy {

  /**
   * Popover content which will be rendered in {@link NbPopoverComponent}.
   * */
  @Input('nbPopover')
  content: NbPopoverContent;

  /**
   * Position will be calculated relatively host element based on the placement.
   * */
  @Input('nbPopoverPlacement')
  placement: NbPlacement = NbPlacement.TOP;

  /**
   * TODO
   * add documentation.
   * */
  @Input('nbPopoverAdjust')
  adjustment: NbAdjustment = NbAdjustment.CLOCKWISE;

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

  private alive: boolean = true;

  private containerRef: ComponentRef<NbPopoverComponent>;

  private get container(): NbPopoverComponent {
    return this.containerRef.instance;
  }

  private get containerElement(): any {
    return this.containerRef.location.nativeElement;
  }

  constructor(private element: ElementRef, private themeService: NbThemeService) {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Show popover if it isn't shown.
   * */
  show() {
    if (this.isHidden) {
      this.renderPopover();
    }
  }

  /**
   * Hide popover if it's shown.
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

  /**
   * Toggle popover on host element click.
   *
   * TODO
   * Fix tslint to add capability make HostListener private
   * */
  @HostListener('click')
  onClick() {
    this.toggle();
  }

  /**
   * Hide popover on document click.
   * */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.isShown && !this.eventOnContainer(event) && !this.eventOnHost(event)) {
      this.hide();
    }
  }

  /**
   * Adjust popover position on window resize.
   * Window resize may change host element position, so popover relocation required.
   * */
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.isShown) {
      this.relocate();
    }
  }

  /**
   * Checks that event was fired on popover container.
   * */
  private eventOnContainer(event: Event) {
    return this.containerElement.contains(event.target);
  }

  /**
   * Checks that event was fired on host element.
   * */
  private eventOnHost(event: Event) {
    return this.element.nativeElement.contains(event.target);
  }

  /**
   * Renders popover putting {@link NbPopoverComponent} in the top of {@link NbLayoutComponent}
   * and positioning container based on {@link NbPopoverDirective#placement}.
   * */
  private renderPopover() {
    this.themeService.appendToLayoutTop(NbPopoverComponent)
      .pipe(takeWhile(() => this.alive))
      .subscribe((ref: ComponentRef<NbPopoverComponent>) => {
        this.containerRef = ref;
        this.patchPopoverContent(this.content);
        /**
         * Have to call detectChanges because on this phase {@link NbPopoverComponent} isn't inserted in the DOM
         * and haven't got calculated size.
         * But we should have size on this step to calculate popover position correctly.
         *
         * TODO
         * I don't think we have to call detectChanges each time we're using {@link NbThemeService#appendToLayoutTop}.
         * Investigate, maybe we can create method in the NbThemeService
         * which will call appendToLayoutTop and 'do' detectChanges instead of service client.
         * */
        this.containerRef.changeDetectorRef.detectChanges();
        this.relocate();
      });
  }

  /**
   * Destroys the {@link NbPopoverComponent} and nullify its reference;
   * */
  private destroyPopover() {
    this.containerRef.destroy();
    this.containerRef = null;
  }

  /**
   * Locates {@link NbPopoverComponent} relatively host component based on the {@link NbPopoverDirective#placement}.
   * */
  private relocate() {
    const hostRect = this.element.nativeElement.getBoundingClientRect();
    const containerRect = this.containerElement.getBoundingClientRect();

    const { placement, position } = this.adjust(containerRect, hostRect);

    this.patchPopoverPlacement(placement);
    this.patchPopoverPosition(position);
  }

  /**
   * Set container content.
   * */
  private patchPopoverContent(content: NbPopoverContent) {
    this.container.content = content;
  }

  /**
   * Set container placement.
   * */
  private patchPopoverPlacement(placement: NbPlacement) {
    this.container.placement = placement;
  }

  /**
   * Set container position.
   * */
  private patchPopoverPosition({ top: top, left: left }) {
    this.container.positionTop = top;
    this.container.positionLeft = left;
  }

  /**
   * Checks if {@link NbPopoverDirective#adjustment} can be performed and runs it.
   * If not, just calculates element position.
   * */
  private adjust(placed: ClientRect, host: ClientRect): NbPosition {
    if (this.adjustment) {
      return NbAdjustmentHelper.adjust(placed, host, this.placement, this.adjustment);
    }

    return {
      position: NbPositioningHelper.calcPosition(placed, host, this.placement),
      placement: this.placement,
    };
  }
}
