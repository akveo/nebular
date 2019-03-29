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
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NbIconLibraries } from './icon-libraries';

/**
 * Icon component. Allows to render both `svg` and `font` icons.
 * Starting from Nebular 4.0 uses [Eva Icons](https://akveo.github.io/eva-icons/) pack by default.
 *
 * Basic icon example:
 * @stacked-example(Showcase, icon/icon-showcase.component)
 *
 * Icon configuration:
 *
 * ```html
 * <nb-icon icon="star"></nb-icon>
 * ```
 * ### Installation
 *
 * By default Nebular comes without any pre-installed icon pack.
 * Starting with Nebular 4.0.0 we ship separate package called `@nebular/eva-icons`
 * which integrates SVG [Eva Icons](https://akveo.github.io/eva-icons/) pack to Nebular. To add it to your
 * project run:
 * ```sh
 * npm i @nebular/eva-icons
 * ```
 * This command will install Nebular Eva Icons pack. Then register `NbEvaIconsModule` into your app module or any child
 * module you need to have the icons in:
 * ```ts
 * import { NbEvaIconsModule } form '@nebular/eva-icons';
 *
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbEvaIconsModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * Last thing, import `NbIconModule` to your feature module where you need to show an icon:
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbIconModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Icon can be colored using `status` input:
 * ```html
 * <nb-icon icon="star" status="warning"></nb-icon>
 * ```
 *
 * Colored icons:
 * @stacked-example(Colored Icons, icon/icon-colors.component)
 *
 * In case you need to specify an icon from a specific icon pack, this could be done using `pack` input property:
 * ```html
 * <nb-icon icon="star" pack="font-awesome"></nb-icon>
 * ```
 * Additional icon settings (if available by the icon pack) could be passed using `options` input:
 *
 * ```html
 * <nb-icon icon="star" [options]="{ animation: { type: 'zoom' } }"></nb-icon>
 * ```
 *
 * @styles
 *
 * icon-font-size:
 * icon-width:
 * icon-height:
 * icon-primary-fg:
 * icon-info-fg:
 * icon-success-fg:
 * icon-warning-fg:
 * icon-danger-fg:
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

  /**
   * Icon name
   * @param {string} status
   */
  @Input() icon: string;

  /**
   * Icon pack name
   * @param {string} status
   */
  @Input() pack: string;

  /**
   * Additional icon settings
   * @param {[name: string]: any}
   */
  @Input() options: { [name: string]: any };

  /**
   * Icon status (adds specific styles):
   * primary, info, success, warning, danger
   * @param {string} status
   */
  @Input() status: string;

  constructor(
    private sanitizer: DomSanitizer,
    private iconLibrary: NbIconLibraries,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.iconDef = this.renderIcon(this.icon, this.pack, this.options);
  }

  ngOnChanges() {
    if (this.iconDef) {
      this.iconDef = this.renderIcon(this.icon, this.pack, this.options);
    }
  }

  renderIcon(name: string, pack?: string, options?: { [name: string]: any }) {
    const iconDefinition = this.iconLibrary.getIcon(name, pack);

    const content = iconDefinition.icon.getContent(options);
    if (content) {
      this.html = this.sanitizer.bypassSecurityTrustHtml(content);
    }

    this.assignClasses(iconDefinition.icon.getClasses(options));
    return iconDefinition;
  }

  protected assignClasses(classes: string[]) {
    this.prevClasses.forEach((className: string) => {
      this.renderer.removeClass(this.el.nativeElement, className);
    });

    classes.forEach((className: string) => {
      this.renderer.addClass(this.el.nativeElement, className);
    });

    this.prevClasses = classes;
  }
}
