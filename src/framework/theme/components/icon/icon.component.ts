/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NbIconsLibrary } from './icons-library';

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
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbIconComponent implements OnChanges, OnInit {

  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  private iconDef;
  private prevClasses = [];

  @HostBinding('innerHtml')
  html: SafeHtml;

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

  @Input() icon: string;

  @Input() pack: string;

  @Input() options: { [name: string]: any };

  /**
   * Icon status (adds specific styles):
   * primary, info, success, warning, danger
   * @param {string} val
   */
  @Input() status: string;

  constructor(
    private sanitizer: DomSanitizer,
    private iconLibrary: NbIconsLibrary,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.iconDef = this.renderIcon(this.icon, this.pack, this.options);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.iconDef) {
      this.iconDef = this.renderIcon(this.icon, this.pack, this.options);
    }
  }

  renderIcon(name: string, pack?: string, options?: { [name: string]: any }) {
    const icon = this.iconLibrary.getIcon(name, pack);

    const content = icon.icon.render(options);
    if (content) {
      this.html = this.sanitizer.bypassSecurityTrustHtml(content);
    }

    this.assignClasses(icon.icon.getClasses(options));
    return icon;
  }

  protected assignClasses(classes: string[]) {
    this.prevClasses.forEach((klass: string) => {
      this.renderer.removeClass(this.el.nativeElement, klass);
    });

    classes.forEach((klass: string) => {
      this.renderer.addClass(this.el.nativeElement, klass);
    });

    this.prevClasses = classes;
  }
}
