/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

import { NbComponentStatus } from '../component-status';
import { NbComponentShape } from '../component-shape';
import { NbComponentSize } from '../component-size';
import { convertToBoolProperty, firstChildNotComment, lastChildNotComment } from '../helpers';

export type NbButtonAppearance = 'filled' | 'outline' | 'ghost' | 'hero';

/**
 * Basic button component.
 *
 * Default button size is `medium` and status color is `primary`:
 * @stacked-example(Button Showcase, button/button-showcase.component)
 *
 * ```html
 * <button nbButton></button>
 * ```
 * ### Installation
 *
 * Import `NbButtonModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbButtonModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Buttons are available in multiple colors using `status` property:
 * @stacked-example(Button Colors, button/button-colors.component.html)
 *
 * There are three button sizes:
 *
 * @stacked-example(Button Sizes, button/button-sizes.component.html)
 *
 * And two additional style types - `outline`:
 *
 * @stacked-example(Outline Buttons, button/button-outline.component.html)
 *
 * and `hero`:
 *
 * @stacked-example(Button Hero, button/button-hero.component.html)
 *
 * Buttons available in different shapes, which could be combined with the other properties:
 * @stacked-example(Button Shapes, button/button-shapes.component)
 *
 * `nbButton` could be applied to the following selectors - `button`, `input[type="button"]`, `input[type="submit"]`
 * and `a`:
 * @stacked-example(Button Elements, button/button-types.component.html)
 *
 * Button can be made `fullWidth`:
 * @stacked-example(Full Width Button, button/button-full-width.component.html)
 *
 * Icon can be placed inside of a button as a child element:
 * @stacked-example(Icon Button, button/button-icon.component.html)
 *
 * @additional-example(Interactive example, button/button-interactive.component)
 *
 * @styles
 *
 * button-cursor:
 * button-outline-width:
 * button-outline-color:
 * button-text-font-family:
 * button-text-font-weight:
 * button-disabled-cursor:
 * button-tiny-text-font-size:
 * button-tiny-text-line-height:
 * button-small-text-font-size:
 * button-small-text-line-height:
 * button-medium-text-font-size:
 * button-medium-text-line-height:
 * button-large-text-font-size:
 * button-large-text-line-height:
 * button-giant-text-font-size:
 * button-giant-text-line-height:
 * button-rectangle-border-radius:
 * button-semi-round-border-radius:
 * button-round-border-radius:
 * button-filled-border-style:
 * button-filled-border-width:
 * button-filled-text-transform:
 * button-filled-tiny-padding:
 * button-filled-small-padding:
 * button-filled-medium-padding:
 * button-filled-large-padding:
 * button-filled-giant-padding:
 * button-filled-basic-background-color:
 * button-filled-basic-border-color:
 * button-filled-basic-text-color:
 * button-filled-basic-focus-background-color:
 * button-filled-basic-focus-border-color:
 * button-filled-basic-hover-background-color:
 * button-filled-basic-hover-border-color:
 * button-filled-basic-active-background-color:
 * button-filled-basic-active-border-color:
 * button-filled-basic-disabled-background-color:
 * button-filled-basic-disabled-border-color:
 * button-filled-basic-disabled-text-color:
 * button-filled-primary-background-color:
 * button-filled-primary-border-color:
 * button-filled-primary-text-color:
 * button-filled-primary-focus-background-color:
 * button-filled-primary-focus-border-color:
 * button-filled-primary-hover-background-color:
 * button-filled-primary-hover-border-color:
 * button-filled-primary-active-background-color:
 * button-filled-primary-active-border-color:
 * button-filled-primary-disabled-background-color:
 * button-filled-primary-disabled-border-color:
 * button-filled-primary-disabled-text-color:
 * button-filled-success-background-color:
 * button-filled-success-border-color:
 * button-filled-success-text-color:
 * button-filled-success-focus-background-color:
 * button-filled-success-focus-border-color:
 * button-filled-success-hover-background-color:
 * button-filled-success-hover-border-color:
 * button-filled-success-active-background-color:
 * button-filled-success-active-border-color:
 * button-filled-success-disabled-background-color:
 * button-filled-success-disabled-border-color:
 * button-filled-success-disabled-text-color:
 * button-filled-info-background-color:
 * button-filled-info-border-color:
 * button-filled-info-text-color:
 * button-filled-info-focus-background-color:
 * button-filled-info-focus-border-color:
 * button-filled-info-hover-background-color:
 * button-filled-info-hover-border-color:
 * button-filled-info-active-background-color:
 * button-filled-info-active-border-color:
 * button-filled-info-disabled-background-color:
 * button-filled-info-disabled-border-color:
 * button-filled-info-disabled-text-color:
 * button-filled-warning-background-color:
 * button-filled-warning-border-color:
 * button-filled-warning-text-color:
 * button-filled-warning-focus-background-color:
 * button-filled-warning-focus-border-color:
 * button-filled-warning-hover-background-color:
 * button-filled-warning-hover-border-color:
 * button-filled-warning-active-background-color:
 * button-filled-warning-active-border-color:
 * button-filled-warning-disabled-background-color:
 * button-filled-warning-disabled-border-color:
 * button-filled-warning-disabled-text-color:
 * button-filled-danger-background-color:
 * button-filled-danger-border-color:
 * button-filled-danger-text-color:
 * button-filled-danger-focus-background-color:
 * button-filled-danger-focus-border-color:
 * button-filled-danger-hover-background-color:
 * button-filled-danger-hover-border-color:
 * button-filled-danger-active-background-color:
 * button-filled-danger-active-border-color:
 * button-filled-danger-disabled-background-color:
 * button-filled-danger-disabled-border-color:
 * button-filled-danger-disabled-text-color:
 * button-filled-control-background-color:
 * button-filled-control-border-color:
 * button-filled-control-text-color:
 * button-filled-control-focus-background-color:
 * button-filled-control-focus-border-color:
 * button-filled-control-hover-background-color:
 * button-filled-control-hover-border-color:
 * button-filled-control-active-background-color:
 * button-filled-control-active-border-color:
 * button-filled-control-disabled-background-color:
 * button-filled-control-disabled-border-color:
 * button-filled-control-disabled-text-color:
 * button-outline-border-style:
 * button-outline-border-width:
 * button-outline-text-transform:
 * button-outline-tiny-padding:
 * button-outline-small-padding:
 * button-outline-medium-padding:
 * button-outline-large-padding:
 * button-outline-giant-padding:
 * button-outline-basic-background-color:
 * button-outline-basic-border-color:
 * button-outline-basic-text-color:
 * button-outline-basic-focus-background-color:
 * button-outline-basic-focus-border-color:
 * button-outline-basic-focus-text-color:
 * button-outline-basic-hover-background-color:
 * button-outline-basic-hover-border-color:
 * button-outline-basic-hover-text-color:
 * button-outline-basic-active-background-color:
 * button-outline-basic-active-border-color:
 * button-outline-basic-active-text-color:
 * button-outline-basic-disabled-background-color:
 * button-outline-basic-disabled-border-color:
 * button-outline-basic-disabled-text-color:
 * button-outline-primary-background-color:
 * button-outline-primary-border-color:
 * button-outline-primary-text-color:
 * button-outline-primary-focus-background-color:
 * button-outline-primary-focus-border-color:
 * button-outline-primary-focus-text-color:
 * button-outline-primary-hover-background-color:
 * button-outline-primary-hover-border-color:
 * button-outline-primary-hover-text-color:
 * button-outline-primary-active-background-color:
 * button-outline-primary-active-border-color:
 * button-outline-primary-active-text-color:
 * button-outline-primary-disabled-background-color:
 * button-outline-primary-disabled-border-color:
 * button-outline-primary-disabled-text-color:
 * button-outline-success-background-color:
 * button-outline-success-border-color:
 * button-outline-success-text-color:
 * button-outline-success-focus-background-color:
 * button-outline-success-focus-border-color:
 * button-outline-success-focus-text-color:
 * button-outline-success-hover-background-color:
 * button-outline-success-hover-border-color:
 * button-outline-success-hover-text-color:
 * button-outline-success-active-background-color:
 * button-outline-success-active-border-color:
 * button-outline-success-active-text-color:
 * button-outline-success-disabled-background-color:
 * button-outline-success-disabled-border-color:
 * button-outline-success-disabled-text-color:
 * button-outline-info-background-color:
 * button-outline-info-border-color:
 * button-outline-info-text-color:
 * button-outline-info-focus-background-color:
 * button-outline-info-focus-border-color:
 * button-outline-info-focus-text-color:
 * button-outline-info-hover-background-color:
 * button-outline-info-hover-border-color:
 * button-outline-info-hover-text-color:
 * button-outline-info-active-background-color:
 * button-outline-info-active-border-color:
 * button-outline-info-active-text-color:
 * button-outline-info-disabled-background-color:
 * button-outline-info-disabled-border-color:
 * button-outline-info-disabled-text-color:
 * button-outline-warning-background-color:
 * button-outline-warning-border-color:
 * button-outline-warning-text-color:
 * button-outline-warning-focus-background-color:
 * button-outline-warning-focus-border-color:
 * button-outline-warning-focus-text-color:
 * button-outline-warning-hover-background-color:
 * button-outline-warning-hover-border-color:
 * button-outline-warning-hover-text-color:
 * button-outline-warning-active-background-color:
 * button-outline-warning-active-border-color:
 * button-outline-warning-active-text-color:
 * button-outline-warning-disabled-background-color:
 * button-outline-warning-disabled-border-color:
 * button-outline-warning-disabled-text-color:
 * button-outline-danger-background-color:
 * button-outline-danger-border-color:
 * button-outline-danger-text-color:
 * button-outline-danger-focus-background-color:
 * button-outline-danger-focus-border-color:
 * button-outline-danger-focus-text-color:
 * button-outline-danger-hover-background-color:
 * button-outline-danger-hover-border-color:
 * button-outline-danger-hover-text-color:
 * button-outline-danger-active-background-color:
 * button-outline-danger-active-border-color:
 * button-outline-danger-active-text-color:
 * button-outline-danger-disabled-background-color:
 * button-outline-danger-disabled-border-color:
 * button-outline-danger-disabled-text-color:
 * button-outline-control-background-color:
 * button-outline-control-border-color:
 * button-outline-control-text-color:
 * button-outline-control-focus-background-color:
 * button-outline-control-focus-border-color:
 * button-outline-control-focus-text-color:
 * button-outline-control-hover-background-color:
 * button-outline-control-hover-border-color:
 * button-outline-control-hover-text-color:
 * button-outline-control-active-background-color:
 * button-outline-control-active-border-color:
 * button-outline-control-active-text-color:
 * button-outline-control-disabled-background-color:
 * button-outline-control-disabled-border-color:
 * button-outline-control-disabled-text-color:
 * button-ghost-background-color:
 * button-ghost-border-color:
 * button-ghost-border-style:
 * button-ghost-border-width:
 * button-ghost-text-transform:
 * button-ghost-tiny-padding:
 * button-ghost-small-padding:
 * button-ghost-medium-padding:
 * button-ghost-large-padding:
 * button-ghost-giant-padding:
 * button-ghost-basic-text-color:
 * button-ghost-basic-focus-background-color:
 * button-ghost-basic-focus-border-color:
 * button-ghost-basic-focus-text-color:
 * button-ghost-basic-hover-background-color:
 * button-ghost-basic-hover-border-color:
 * button-ghost-basic-hover-text-color:
 * button-ghost-basic-active-background-color:
 * button-ghost-basic-active-border-color:
 * button-ghost-basic-active-text-color:
 * button-ghost-basic-disabled-background-color:
 * button-ghost-basic-disabled-border-color:
 * button-ghost-basic-disabled-text-color:
 * button-ghost-primary-text-color:
 * button-ghost-primary-focus-background-color:
 * button-ghost-primary-focus-border-color:
 * button-ghost-primary-focus-text-color:
 * button-ghost-primary-hover-background-color:
 * button-ghost-primary-hover-border-color:
 * button-ghost-primary-hover-text-color:
 * button-ghost-primary-active-background-color:
 * button-ghost-primary-active-border-color:
 * button-ghost-primary-active-text-color:
 * button-ghost-primary-disabled-background-color:
 * button-ghost-primary-disabled-border-color:
 * button-ghost-primary-disabled-text-color:
 * button-ghost-success-text-color:
 * button-ghost-success-focus-background-color:
 * button-ghost-success-focus-border-color:
 * button-ghost-success-focus-text-color:
 * button-ghost-success-hover-background-color:
 * button-ghost-success-hover-border-color:
 * button-ghost-success-hover-text-color:
 * button-ghost-success-active-background-color:
 * button-ghost-success-active-border-color:
 * button-ghost-success-active-text-color:
 * button-ghost-success-disabled-background-color:
 * button-ghost-success-disabled-border-color:
 * button-ghost-success-disabled-text-color:
 * button-ghost-info-text-color:
 * button-ghost-info-focus-background-color:
 * button-ghost-info-focus-border-color:
 * button-ghost-info-focus-text-color:
 * button-ghost-info-hover-background-color:
 * button-ghost-info-hover-border-color:
 * button-ghost-info-hover-text-color:
 * button-ghost-info-active-background-color:
 * button-ghost-info-active-border-color:
 * button-ghost-info-active-text-color:
 * button-ghost-info-disabled-background-color:
 * button-ghost-info-disabled-border-color:
 * button-ghost-info-disabled-text-color:
 * button-ghost-warning-text-color:
 * button-ghost-warning-focus-background-color:
 * button-ghost-warning-focus-border-color:
 * button-ghost-warning-focus-text-color:
 * button-ghost-warning-hover-background-color:
 * button-ghost-warning-hover-border-color:
 * button-ghost-warning-hover-text-color:
 * button-ghost-warning-active-background-color:
 * button-ghost-warning-active-border-color:
 * button-ghost-warning-active-text-color:
 * button-ghost-warning-disabled-background-color:
 * button-ghost-warning-disabled-border-color:
 * button-ghost-warning-disabled-text-color:
 * button-ghost-danger-text-color:
 * button-ghost-danger-focus-background-color:
 * button-ghost-danger-focus-border-color:
 * button-ghost-danger-focus-text-color:
 * button-ghost-danger-hover-background-color:
 * button-ghost-danger-hover-border-color:
 * button-ghost-danger-hover-text-color:
 * button-ghost-danger-active-background-color:
 * button-ghost-danger-active-border-color:
 * button-ghost-danger-active-text-color:
 * button-ghost-danger-disabled-background-color:
 * button-ghost-danger-disabled-border-color:
 * button-ghost-danger-disabled-text-color:
 * button-ghost-control-text-color:
 * button-ghost-control-focus-background-color:
 * button-ghost-control-focus-border-color:
 * button-ghost-control-focus-text-color:
 * button-ghost-control-hover-background-color:
 * button-ghost-control-hover-border-color:
 * button-ghost-control-hover-text-color:
 * button-ghost-control-active-background-color:
 * button-ghost-control-active-border-color:
 * button-ghost-control-active-text-color:
 * button-ghost-control-disabled-background-color:
 * button-ghost-control-disabled-border-color:
 * button-ghost-control-disabled-text-color:
 * button-hero-border-color:
 * button-hero-border-style:
 * button-hero-border-width:
 * button-hero-text-transform:
 * button-hero-tiny-padding:
 * button-hero-small-padding:
 * button-hero-medium-padding:
 * button-hero-large-padding:
 * button-hero-giant-padding:
 * button-hero-shadow:
 * button-hero-text-shadow:
 * button-hero-bevel-size:
 * button-hero-glow-size:
 * button-hero-outline-color:
 * button-hero-outline-width:
 * button-hero-basic-text-color:
 * button-hero-basic-bevel-color:
 * button-hero-basic-glow-color:
 * button-hero-basic-left-background-color:
 * button-hero-basic-right-background-color:
 * button-hero-basic-focus-left-background-color:
 * button-hero-basic-focus-right-background-color:
 * button-hero-basic-hover-left-background-color:
 * button-hero-basic-hover-right-background-color:
 * button-hero-basic-active-left-background-color:
 * button-hero-basic-active-right-background-color:
 * button-hero-basic-disabled-background-color:
 * button-hero-basic-disabled-text-color:
 * button-hero-primary-text-color:
 * button-hero-primary-bevel-color:
 * button-hero-primary-glow-color:
 * button-hero-primary-left-background-color:
 * button-hero-primary-right-background-color:
 * button-hero-primary-focus-left-background-color:
 * button-hero-primary-focus-right-background-color:
 * button-hero-primary-hover-left-background-color:
 * button-hero-primary-hover-right-background-color:
 * button-hero-primary-active-left-background-color:
 * button-hero-primary-active-right-background-color:
 * button-hero-primary-disabled-background-color:
 * button-hero-primary-disabled-text-color:
 * button-hero-success-text-color:
 * button-hero-success-bevel-color:
 * button-hero-success-glow-color:
 * button-hero-success-left-background-color:
 * button-hero-success-right-background-color:
 * button-hero-success-focus-left-background-color:
 * button-hero-success-focus-right-background-color:
 * button-hero-success-hover-left-background-color:
 * button-hero-success-hover-right-background-color:
 * button-hero-success-active-left-background-color:
 * button-hero-success-active-right-background-color:
 * button-hero-success-disabled-background-color:
 * button-hero-success-disabled-text-color:
 * button-hero-info-text-color:
 * button-hero-info-bevel-color:
 * button-hero-info-glow-color:
 * button-hero-info-left-background-color:
 * button-hero-info-right-background-color:
 * button-hero-info-focus-left-background-color:
 * button-hero-info-focus-right-background-color:
 * button-hero-info-hover-left-background-color:
 * button-hero-info-hover-right-background-color:
 * button-hero-info-active-left-background-color:
 * button-hero-info-active-right-background-color:
 * button-hero-info-disabled-background-color:
 * button-hero-info-disabled-text-color:
 * button-hero-warning-text-color:
 * button-hero-warning-bevel-color:
 * button-hero-warning-glow-color:
 * button-hero-warning-left-background-color:
 * button-hero-warning-right-background-color:
 * button-hero-warning-focus-left-background-color:
 * button-hero-warning-focus-right-background-color:
 * button-hero-warning-hover-left-background-color:
 * button-hero-warning-hover-right-background-color:
 * button-hero-warning-active-left-background-color:
 * button-hero-warning-active-right-background-color:
 * button-hero-warning-disabled-background-color:
 * button-hero-warning-disabled-text-color:
 * button-hero-danger-text-color:
 * button-hero-danger-bevel-color:
 * button-hero-danger-glow-color:
 * button-hero-danger-left-background-color:
 * button-hero-danger-right-background-color:
 * button-hero-danger-focus-left-background-color:
 * button-hero-danger-focus-right-background-color:
 * button-hero-danger-hover-left-background-color:
 * button-hero-danger-hover-right-background-color:
 * button-hero-danger-active-left-background-color:
 * button-hero-danger-active-right-background-color:
 * button-hero-danger-disabled-background-color:
 * button-hero-danger-disabled-text-color:
 * button-hero-control-text-color:
 * button-hero-control-bevel-color:
 * button-hero-control-glow-color:
 * button-hero-control-left-background-color:
 * button-hero-control-right-background-color:
 * button-hero-control-focus-left-background-color:
 * button-hero-control-focus-right-background-color:
 * button-hero-control-hover-left-background-color:
 * button-hero-control-hover-right-background-color:
 * button-hero-control-active-left-background-color:
 * button-hero-control-active-right-background-color:
 * button-hero-control-disabled-background-color:
 * button-hero-control-disabled-text-color:
 */
@Component({
  selector: 'button[nbButton],a[nbButton],input[type="button"][nbButton],input[type="submit"][nbButton]',
  styleUrls: ['./button.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbButtonComponent implements AfterViewInit {

  protected isInitialized: boolean = false;

  /**
   * Button size, available sizes:
   * `tiny`, `small`, `medium`, `large`, `giant`
   */
  @Input() size: NbComponentSize = 'medium';

  /**
   * Button status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`.
   */
  @Input() status: NbComponentStatus = 'primary';

  /**
   * Button shapes: `rectangle`, `round`, `semi-round`
   */
  @Input() shape: NbComponentShape = 'rectangle';

  /**
   * Button appearance: `filled`, `outline`, `ghost`, `hero`
   */
  @Input() appearance: NbButtonAppearance = 'filled';

  /**
   * Sets `filled` appearance
   */
  @Input()
  @HostBinding('class.appearance-filled')
  get filled(): boolean {
    return this.appearance === 'filled';
  }
  set filled(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'filled';
    }
  }

  /**
   * Sets `outline` appearance
   */
  @Input()
  @HostBinding('class.appearance-outline')
  get outline(): boolean {
    return this.appearance === 'outline';
  }
  set outline(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'outline';
    }
  }

  /**
   * Sets `ghost` appearance
   */
  @Input()
  @HostBinding('class.appearance-ghost')
  get ghost(): boolean {
    return this.appearance === 'ghost';
  }
  set ghost(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'ghost';
    }
  }

  /**
   * Sets `hero` appearance
   */
  @Input()
  @HostBinding('class.appearance-hero')
  get hero(): boolean {
    return this.appearance === 'hero';
  }
  set hero(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'hero';
    }
  }

  /**
   * If set element will fill its container
   */
  @Input()
  @HostBinding('class.full-width')
  get fullWidth(): boolean {
    return this._fullWidth;
  }
  set fullWidth(value: boolean) {
    this._fullWidth = convertToBoolProperty(value);
  }
  private _fullWidth = false;

  /**
   * Disables the button
   */
  @Input()
  @HostBinding('attr.aria-disabled')
  @HostBinding('class.btn-disabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = convertToBoolProperty(value);
    this.renderer.setProperty(this.hostElement.nativeElement, 'disabled', this.disabled);
  }
  private _disabled: boolean = false;

  // issue #794
  @HostBinding('attr.tabindex')
  get tabbable(): string {
    return this.disabled ? '-1' : '0';
  }

  @HostBinding('class.size-tiny')
  get tiny() {
    return this.size === 'tiny';
  }

  @HostBinding('class.size-small')
  get small() {
    return this.size === 'small';
  }

  @HostBinding('class.size-medium')
  get medium() {
    return this.size === 'medium';
  }

  @HostBinding('class.size-large')
  get large() {
    return this.size === 'large';
  }

  @HostBinding('class.size-giant')
  get giant() {
    return this.size === 'giant';
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === 'primary';
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === 'info';
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === 'success';
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger';
  }

  @HostBinding('class.status-basic')
  get basic() {
    return this.status === 'basic';
  }

  @HostBinding('class.status-control')
  get control() {
    return this.status === 'control';
  }

  @HostBinding('class.shape-rectangle')
  get rectangle() {
    return this.shape === 'rectangle';
  }

  @HostBinding('class.shape-round')
  get round() {
    return this.shape === 'round';
  }

  @HostBinding('class.shape-semi-round')
  get semiRound() {
    return this.shape === 'semi-round';
  }

  @HostBinding('class.icon-start')
  get iconLeft(): boolean {
    const el = this.hostElement.nativeElement;
    const icon = this.iconElement;
    return !!(icon && firstChildNotComment(el) === icon);
  }

  @HostBinding('class.icon-end')
  get iconRight(): boolean {
    const el = this.hostElement.nativeElement;
    const icon = this.iconElement;
    return !!(icon && lastChildNotComment(el) === icon);
  }

  @HostBinding('class.transitions')
  get transitions(): boolean {
    return this.isInitialized;
  }

  /**
   * @private
   * Keep this handler to partially support anchor disabling.
   * Unlike button, anchor doesn't have 'disabled' DOM property,
   * so handler will be called anyway. We preventing navigation and bubbling.
   * Disabling is partial due to click handlers precedence. Consider example:
   * <a nbButton [disabled]="true" (click)="clickHandler()">...</a>
   * 'clickHandler' will be called before our host listener below. We can't prevent
   * such handlers call.
   */
  @HostListener('click', ['$event'])
  onClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  constructor(
    protected renderer: Renderer2,
    protected hostElement: ElementRef<HTMLElement>,
    protected cd: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.isInitialized = true;
      this.cd.markForCheck();
    });
  }

  protected get iconElement() {
    const el = this.hostElement.nativeElement;
    return el.querySelector('nb-icon');
  }
}
