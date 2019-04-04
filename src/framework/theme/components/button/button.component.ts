/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding, HostListener, Renderer2, ElementRef } from '@angular/core';

import { NbComponentStatus } from '../component-status';
import { NbComponentShape } from '../component-shape';
import { NbComponentSize } from '../component-size';
import { convertToBoolProperty } from '../helpers';

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
 * @stacked-example(Button Colors, button/button-hero.component.html)
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
 * @styles
 *
 * btn-fg:
 * btn-font-family:
 * btn-line-height:
 * btn-disabled-opacity:
 * btn-cursor:
 * btn-primary-bg:
 * btn-secondary-bg:
 * btn-info-bg:
 * btn-success-bg:
 * btn-warning-bg:
 * btn-danger-bg:
 * btn-secondary-border:
 * btn-secondary-border-width:
 * btn-padding-y-lg:
 * btn-padding-x-lg:
 * btn-font-size-lg:
 * btn-padding-y-md:
 * btn-padding-x-md:
 * btn-font-size-md:
 * btn-padding-y-sm:
 * btn-padding-x-sm:
 * btn-font-size-sm:
 * btn-padding-y-xs:
 * btn-padding-x-xs:
 * btn-font-size-xs:
 * btn-border-radius:
 * btn-rectangle-border-radius:
 * btn-semi-round-border-radius:
 * btn-round-border-radius:
 * btn-hero-shadow:
 * btn-hero-text-shadow:
 * btn-hero-bevel-size:
 * btn-hero-glow-size:
 * btn-hero-primary-glow-size:
 * btn-hero-success-glow-size:
 * btn-hero-warning-glow-size:
 * btn-hero-info-glow-size:
 * btn-hero-danger-glow-size:
 * btn-hero-secondary-glow-size:
 * btn-hero-degree:
 * btn-hero-primary-degree:
 * btn-hero-success-degree:
 * btn-hero-warning-degree:
 * btn-hero-info-degree:
 * btn-hero-danger-degree:
 * btn-hero-secondary-degree:
 * btn-hero-border-radius:
 * btn-outline-fg:
 * btn-outline-hover-fg:
 * btn-outline-focus-fg:
 */
@Component({
  selector: 'button[nbButton],a[nbButton],input[type="button"][nbButton],input[type="submit"][nbButton]',
  styleUrls: ['./button.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
})
export class NbButtonComponent {

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

  @HostBinding('class.btn-hero') hero: boolean;
  @HostBinding('class.btn-outline') outline: boolean;

  @HostBinding('attr.aria-disabled')
  @HostBinding('class.btn-disabled') disabled: boolean;

  // issue #794
  @HostBinding('attr.tabindex')
  get tabbable(): string {
    return this.disabled ? '-1' : '0';
  }

  @HostBinding('class.icon-start')
  get iconLeft(): boolean {
    const el = this.hostElement.nativeElement;
    const icon = this.iconElement;
    return !!(icon && el.firstChild === icon);
  }

  @HostBinding('class.icon-end')
  get iconRight(): boolean {
    const el = this.hostElement.nativeElement;
    const icon = this.iconElement;
    return !!(icon && el.lastChild === icon);
  }

  @HostBinding('class.btn-full-width')
  fullWidth = false;

  /**
   * Button size, available sizes:
   * `tiny`, `small`, `medium`, `large`, `giant`
   */
  @Input() size: NbComponentSize;

  /**
   * Button status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   */
  @Input() status: NbComponentStatus;

  /**
   * Button shapes: `rectangle`, `round`, `semi-round`
   */
  @Input() shape: NbComponentShape;

  private get iconElement() {
    const el = this.hostElement.nativeElement;
    return el.querySelector('nb-icon');
  }

  /**
   * Adds `hero` styles
   * @param {boolean} val
   */
  @Input('hero')
  set setHero(val: boolean) {
    this.hero = convertToBoolProperty(val);
  }

  /**
   * Disables the button
   * @param {boolean} val
   */
  @Input('disabled')
  set setDisabled(val: boolean) {
    this.disabled = convertToBoolProperty(val);
    this.renderer.setProperty(this.hostElement.nativeElement, 'disabled', this.disabled);
  }

  /**
   * If set element will fill its container
   * @param {boolean}
   */
  @Input('fullWidth')
  set setFullWidth(value) {
    this.fullWidth = convertToBoolProperty(value);
  }

  /**
   * Adds `outline` styles
   * @param {boolean} val
   */
  @Input('outline')
  set setOutline(val: boolean) {
    this.outline = convertToBoolProperty(val);
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
  onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  constructor(
    protected renderer: Renderer2,
    protected hostElement: ElementRef<HTMLElement>,
  ) {}
}
