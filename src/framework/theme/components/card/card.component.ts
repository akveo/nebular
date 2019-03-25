/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding } from '@angular/core';

import { NbCardAccent } from './card-accent';
import { NbCardSize } from './card-size';
import { NbCardStatus } from './card-status';
import { convertToBoolProperty } from '../helpers';

/**
 * Component intended to be used within the `<nb-card>` component.
 * It adds styles for a preset header section.
 *
 * @styles
 *
 * card-header-font-family:
 * card-header-font-size:
 * card-header-font-weight:
 * card-header-fg:
 * card-header-fg-heading:
 * card-header-active-bg:
 * card-header-active-fg:
 * card-header-disabled-bg:
 * card-header-primary-bg:
 * card-header-info-bg:
 * card-header-success-bg:
 * card-header-warning-bg:
 * card-header-danger-bg:
 *
 */
@Component({
  selector: 'nb-card-header',
  template: `<ng-content></ng-content>`,
})
export class NbCardHeaderComponent {
}

/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset body section.
 */
@Component({
  selector: 'nb-card-body',
  template: `<ng-content></ng-content>`,
})
export class NbCardBodyComponent {
}

/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset footer section.
 */
@Component({
  selector: 'nb-card-footer',
  template: `<ng-content></ng-content>`,
})
export class NbCardFooterComponent {
}

/**
 * Basic content container component.
 *
 * Basic card example:
 * @stacked-example(Showcase, card/card-showcase.component)
 *
 * Basic card configuration:
 *
 * ```html
 * <nb-card>
 *   <nb-card-body>
 *     Card
 *   </nb-card-body>
 * </nb-card>
 * ```
 *
 * ### Installation
 *
 * Import `NbCardModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbCardModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Card with header and footer:
 * @stacked-example(With Header & Footer, card/card-full.component)
 *
 * Most of the time main card content goes to `nb-card-body`,
 * so it is styled and aligned in accordance with the header and footer.
 * In case you need a higher level of control, you can pass contend directly to `nb-card`,
 * so `nb-card-body` styling will not be applied.
 *
 * Consider an example with `nb-list` component:
 * @stacked-example(Showcase, card/card-without-body.component)
 *
 * Colored cards could be simply configured by providing a `status` property:
 * @stacked-example(Colored Card, card/card-colors.component)
 *
 * It is also possible to assign an `accent` property for a slight card highlight
 * as well as combine it with `status`:
 * @stacked-example(Accent Card, card/card-accents.component)
 *
 * @additional-example(Multiple Sizes, card/card-sizes.component)
 *
 * @styles
 *
 * card-line-height:
 * card-font-weight:
 * card-fg-text:
 * card-bg:
 * card-height-xxsmall:
 * card-height-xsmall:
 * card-height-small:
 * card-height-medium:
 * card-height-large:
 * card-height-xlarge:
 * card-height-xxlarge:
 * card-shadow:
 * card-border-radius:
 * card-padding:
 * card-margin:
 * card-separator:
 *
 */
@Component({
  selector: 'nb-card',
  styleUrls: ['./card.component.scss'],
  template: `
    <ng-content select="nb-card-header"></ng-content>
    <ng-content select="nb-card-body"></ng-content>
    <ng-content></ng-content>
    <ng-content select="nb-card-footer"></ng-content>
  `,
})
export class NbCardComponent {

  size: string;
  status: string;
  accent: string;

  @HostBinding('attr.disabled')
  disabled: string | null = null;

  @HostBinding('class.size-xxsmall')
  get xxsmall() {
    return this.size === NbCardSize.XXSMALL;
  }

  @HostBinding('class.size-xsmall')
  get xsmall() {
    return this.size === NbCardSize.XSMALL;
  }

  @HostBinding('class.size-small')
  get small() {
    return this.size === NbCardSize.SMALL;
  }

  @HostBinding('class.size-medium')
  get medium() {
    return this.size === NbCardSize.MEDIUM;
  }

  @HostBinding('class.size-large')
  get large() {
    return this.size === NbCardSize.LARGE;
  }

  @HostBinding('class.size-xlarge')
  get xlarge() {
    return this.size === NbCardSize.XLARGE;
  }

  @HostBinding('class.size-xxlarge')
  get xxlarge() {
    return this.size === NbCardSize.XXLARGE;
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === NbCardStatus.PRIMARY;
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === NbCardStatus.INFO;
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === NbCardStatus.SUCCESS;
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === NbCardStatus.WARNING;
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === NbCardStatus.DANGER;
  }

  @HostBinding('class.status-white')
  get active() {
    return this.status === NbCardStatus.WHITE;
  }

  @HostBinding('class.accent')
  get hasAccent() {
    return this.accent;
  }

  @HostBinding('class.accent-primary')
  get primaryAccent() {
    return this.accent === NbCardAccent.PRIMARY;
  }

  @HostBinding('class.accent-info')
  get infoAccent() {
    return this.accent === NbCardAccent.INFO;
  }

  @HostBinding('class.accent-success')
  get successAccent() {
    return this.accent === NbCardAccent.SUCCESS;
  }

  @HostBinding('class.accent-warning')
  get warningAccent() {
    return this.accent === NbCardAccent.WARNING;
  }

  @HostBinding('class.accent-danger')
  get dangerAccent() {
    return this.accent === NbCardAccent.DANGER;
  }

  @HostBinding('class.accent-white')
  get activeAccent() {
    return this.accent === NbCardAccent.WHITE;
  }

  /**
   * Card size, available sizes:
   * xxsmall, xsmall, small, medium, large, xlarge, xxlarge
   * @param {string} val
   */
  @Input('size')
  private set setSize(val: string) {
    this.size = val;
  }

  /**
   * Card status:
   * primary, info, success, warning, danger, white
   * @param {string} val
   */
  @Input('status')
  private set setStatus(val: string) {
    this.status = val;
  }

  /**
   * Card accent (color of the top border):
   * primary, info, success, warning, danger, white
   * @param {string} val
   */
  @Input('accent')
  private set setAccent(val: string) {
    this.accent = val;
  }

  @Input('disabled')
  private set setDisabled(value: any) {
    this.disabled = convertToBoolProperty(value) ? '' : null;
  }
}
