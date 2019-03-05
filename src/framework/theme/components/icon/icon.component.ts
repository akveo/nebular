/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

import { NbIconLibraryService } from './icon-library.service';

/**
 * Icon component.
 *
 * Basic alert example:
 * @stacked-example(Showcase, alert/alert-showcase.component)
 *
 * Alert configuration:
 *
 * ```html
 * <nb-alert status="success">
 *   You have been successfully authenticated!
 * </nb-alert>
 * ```
 * ### Installation
 *
 * Import `NbButtonModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbAlertModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Alert could additionally have a `close` button when `closable` property is set:
 * ```html
 * <nb-alert status="success" closable (close)="onClose()">
 *   You have been successfully authenticated!
 * </nb-alert>
 * ```
 *
 * Colored alerts could be simply configured by providing a `status` property:
 * @stacked-example(Colored Alert, alert/alert-colors.component)
 *
 * It is also possible to assign an `accent` property for a slight alert highlight
 * as well as combine it with `status`:
 * @stacked-example(Accent Alert, alert/alert-accents.component)
 *
 * And `outline` property:
 * @stacked-example(Outline Alert, alert/alert-outline.component)
 *
 * @additional-example(Multiple Sizes, alert/alert-sizes.component)
 *
 * @styles
 *
 * alert-font-size:
 * alert-line-height:
 * alert-font-weight:
 * alert-fg:
 * alert-outline-fg:
 * alert-bg:
 * alert-active-bg:
 * alert-disabled-bg:
 * alert-disabled-fg:
 * alert-primary-bg:
 * alert-info-bg:
 * alert-success-bg:
 * alert-warning-bg:
 * alert-danger-bg:
 * alert-height-xxsmall:
 * alert-height-xsmall:
 * alert-height-small:
 * alert-height-medium:
 * alert-height-large:
 * alert-height-xlarge:
 * alert-height-xxlarge:
 * alert-shadow:
 * alert-border-radius:
 * alert-padding:
 * alert-closable-padding:
 * alert-button-padding:
 * alert-margin:
 */
@Component({
  selector: 'nb-icon',
  styleUrls: [`./icon.component.scss`],
  template: `
    <ng-template>{{ iconSVG }}</ng-template>
  `,
})
export class NbIconComponent {

  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  @HostBinding('innerHtml')
  iconSVG: SafeHtml;

  @Input()
  set icon(icon: string) {
    // this.iconSVG = this.sanitizer.bypassSecurityTrustHtml(icons[icon].toSvg({
    //   width: '100%',
    //   height: '100%',
    //   fill: 'currentColor',
    // }));

    this.iconSVG = this.sanitizer.bypassSecurityTrustHtml(this.iconLibrary.getSvgIcon(icon));
  }

  /**
   * Icon status (adds specific styles):
   * primary, info, success, warning, danger
   * @param {string} val
   */
  @Input() status: string;

  @HostBinding('class.primary-icon')
  get primary() {
    return this.status === NbIconComponent.STATUS_PRIMARY;
  }

  @HostBinding('class.info-icon')
  get info() {
    return this.status === NbIconComponent.STATUS_INFO;
  }

  @HostBinding('class.success-icon')
  get success() {
    return this.status === NbIconComponent.STATUS_SUCCESS;
  }

  @HostBinding('class.warning-icon')
  get warning() {
    return this.status === NbIconComponent.STATUS_WARNING;
  }

  @HostBinding('class.danger-icon')
  get danger() {
    return this.status === NbIconComponent.STATUS_DANGER;
  }

  /**
   * Icon status (adds specific styles):
   * primary, info, success, warning, danger
   * @param {string} val
   */
  @Input('status')
  private set setStatus(val: string) {
    this.status = val;
  }

  constructor(private sanitizer: DomSanitizer, private iconLibrary: NbIconLibraryService) {
  }
}
