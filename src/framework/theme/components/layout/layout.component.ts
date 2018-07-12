/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit, Component, ComponentFactoryResolver, ElementRef, HostBinding, HostListener, Input, OnDestroy,
  Renderer2, ViewChild, ViewContainerRef, OnInit, ComponentFactory, Inject, PLATFORM_ID, forwardRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';

import { convertToBoolProperty } from '../helpers';
import { NbThemeService } from '../../services/theme.service';
import { NbSpinnerService } from '../../services/spinner.service';
import { NbLayoutDirectionService } from '../../services/direction.service';
import { NB_WINDOW, NB_DOCUMENT } from '../../theme.options';

/**
 * A container component which determines a content position inside of the layout.
 * The layout could contain unlimited columns (not including the sidebars).
 *
 * By default the columns are ordered from the left to the right,
 * but it's also possible to overwrite this behavior by setting a `left` attribute to the column,
 * moving it to the very first position:
 *
 * @stacked-example(Column Left, layout/layout-column-left.component)
 */
@Component({
  selector: 'nb-layout-column',
  template: `
    <ng-content></ng-content>
  `,
})
export class NbLayoutColumnComponent {

  @HostBinding('class.left') leftValue: boolean;
  @HostBinding('class.start') startValue: boolean;

  /**
   * Move the column to the very left position in the layout.
   * @param {boolean} val
   */
  @Input()
  set left(val: boolean) {
    this.leftValue = convertToBoolProperty(val);
    this.startValue = false;
  }

  /**
   * Make columnt first in the layout.
   * @param {boolean} val
   */
  @Input()
  set start(val: boolean) {
    this.startValue = convertToBoolProperty(val);
    this.leftValue = false;
  }
}

/**
 * Page header component.
 * Located on top of the page above the layout columns and sidebars.
 * Could be made `fixed` by setting the corresponding property. In the fixed mode the header becomes
 * sticky to the top of the nb-layout (to of the page). Here's an example:
 *
 * @stacked-example(Fixed Header, layout/layout-fixed-header.component)
 *
 * In a pair with sidebar it is possible to setup a configuration when header is placed on a side of the sidebar
 * and not on top of it. To achieve this simply put a `subheader` property to the header like this:
 * ```html
 * <nb-layout-header subheader></nb-layout-header>
 * ```
 * @stacked-example(Subheader, layout/layout-sidebar-subheader.component)
 * Note that in such configuration sidebar shadow is removed and header cannot be make `fixed`.
 *
 * Same way you can put both `fixed` and `clipped` headers adding creating a sub-header for your app:
 *
 * @stacked-example(Subheader, layout/layout-subheader.component)
 *
 * @styles
 *
 * header-font-family
 * header-line-height
 * header-fg
 * header-bg
 * header-height
 * header-padding
 * header-shadow
 */
@Component({
  selector: 'nb-layout-header',
  template: `
    <nav [class.fixed]="fixedValue">
      <ng-content></ng-content>
    </nav>
  `,
})
export class NbLayoutHeaderComponent {

  @HostBinding('class.fixed') fixedValue: boolean;
  @HostBinding('class.subheader') subheaderValue: boolean;

  // tslint:disable-next-line
  constructor(@Inject(forwardRef(() => NbLayoutComponent)) private layout: NbLayoutComponent) {
  }

  /**
   * Makes the header sticky to the top of the nb-layout.
   * @param {boolean} val
   */
  @Input()
  set fixed(val: boolean) {
    this.fixedValue = convertToBoolProperty(val);
  }

  /**
   * Places header on a side of the sidebar, and not above.
   * Disables fixed mode for this header and remove a shadow from the sidebar.
   * @param {boolean} val
   */
  @Input()
  set subheader(val: boolean) {
    this.subheaderValue = convertToBoolProperty(val);
    this.fixedValue = false;
    this.layout.withSubheader = this.subheaderValue;
  }
}

/**
 * Page footer.
 * Located under the nb-layout content (specifically, under the columns).
 * Could be made `fixed`, becoming sticky to the bottom of the view port (window).
 *
 * @styles
 *
 * footer-height
 * footer-padding
 * footer-fg
 * footer-bg
 * footer-separator
 * footer-shadow
 */
@Component({
  selector: 'nb-layout-footer',
  template: `
    <nav [class.fixed]="fixedValue">
      <ng-content></ng-content>
    </nav>
  `,
})
export class NbLayoutFooterComponent {

  @HostBinding('class.fixed') fixedValue: boolean;

  /**
   * Makes the footer sticky to the bottom of the window.
   * @param {boolean} val
   */
  @Input()
  set fixed(val: boolean) {
    this.fixedValue = convertToBoolProperty(val);
  }

}

/**
 * Layout container component.
 * When using with Nebular Theme System it is required that all child components should be placed inside.
 *
 * Basic example of two column layout with header:
 *
 * @stacked-example(Showcase, layout/layout-showcase.component)
 *
 * Can contain the following components inside:
 *
 * ```html
 * <nb-layout>
 *  <nb-layout-header></nb-layout-header>
 *  <nb-layout-footer></nb-layout-column>
 *  <nb-layout-column></nb-layout-column>
 *  <nb-sidebar></nb-sidebar>
 * </nb-layout>
 * ```
 *
 * By default the layout fills up the whole view-port.
 * The window scrollbars are disabled on the body and moved inside of the nb-layout, so that the scrollbars
 * won't mess with the fixed nb-header.
 *
 * The child components are projected into a flexible layout structure allowing to adjust the layout behavior
 * based on the settings provided.
 *
 * The layout content (columns) becomes centered when the window width is more than
 * the value specified in the theme variable `layout-content-width`.
 *
 * The layout also contains the area on the very top (the first child of the nb-layout), which could be used
 * to dynamically append some components like modals or spinners/loaders
 * so that they are located on top of the elements hierarchy.
 * More details are under the `ThemeService` section.
 *
 * The layout component is also responsible for changing application themes.
 * It listens to the `themeChange` event and change a theme CSS class appended to body.
 * Based on the class appended a specific CSS-theme is applied to the application.
 * More details of the Theme System could be found here [Enabling Theme System](#/docs/concepts/theme-system)
 *
 * A simple layout with footer:
 *
 * @stacked-example(Layout With Footer, layout/layout-w-footer.component)
 *
 * It is possible to ask the layout to center the columns (notice: we added a `center` attribute
 * to the layout:
 *
 * ```html
 * <nb-layout center>
 *   <nb-layout-header>Awesome Company</nb-layout-header>
 *
 *   <nb-layout-column>
 *     Hello World!
 *   </nb-layout-column>
 *
 *   <nb-layout-footer>Contact us</nb-layout-footer>
 * </nb-layout>
 * ```
 *
 * @styles
 *
 * layout-font-family
 * layout-font-size
 * layout-line-height
 * layout-fg
 * layout-bg
 * layout-min-height
 * layout-content-width
 * layout-window-mode-min-width
 * layout-window-mode-max-width: window mode only, after this value layout turns into floating window
 * layout-window-mode-bg: window mode only, background
 * layout-window-mode-padding-top: window mode only, max padding from top
 * layout-window-shadow: window mode shadow
 * layout-padding
 * layout-medium-padding
 * layout-small-padding
 */
@Component({
  selector: 'nb-layout',
  styleUrls: ['./layout.component.scss'],
  template: `
    <ng-template #layoutTopDynamicArea></ng-template>
    <div (scroll)="onScroll($event)" class="scrollable-container" #scrollableContainer>
      <div class="layout">
        <ng-content select="nb-layout-header:not([subheader])"></ng-content>
        <div class="layout-container">
          <ng-content select="nb-sidebar"></ng-content>
          <div class="content" [class.center]="centerValue">
            <ng-content select="nb-layout-header[subheader]"></ng-content>
            <div class="columns">
              <ng-content select="nb-layout-column"></ng-content>
            </div>
            <ng-content select="nb-layout-footer"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NbLayoutComponent implements AfterViewInit, OnInit, OnDestroy {

  centerValue: boolean = false;

  @HostBinding('class.window-mode') windowModeValue: boolean = false;
  @HostBinding('class.with-scroll') withScrollValue: boolean = false;
  @HostBinding('class.with-subheader') withSubheader: boolean = false;

  /**
   * Defines whether the layout columns will be centered after some width
   * @param {boolean} val
   */
  @Input()
  set center(val: boolean) {
    this.centerValue = convertToBoolProperty(val);
  }

  /**
   * Defines whether the layout enters a 'window' mode, when the layout content (including sidebars and fixed header)
   * becomes centered by width with a margin from the top of the screen, like a floating window.
   * Automatically enables `withScroll` mode, as in the window mode scroll must be inside the layout and cannot be on
   * window. (TODO: check this)
   * @param {boolean} val
   */
  @Input()
  set windowMode(val: boolean) {
    this.windowModeValue = convertToBoolProperty(val);
    this.withScroll = this.windowModeValue;
  }

  /**
   * Defines whether to move the scrollbars to layout or leave it at the body level.
   * Automatically set to true when `windowMode` is enabled.
   * @param {boolean} val
   */
  @Input()
  set withScroll(val: boolean) {
    this.withScrollValue = convertToBoolProperty(val);

    // TODO: is this the best way of doing it? as we don't have access to body from theme styles
    // TODO: add e2e test
    const body = this.document.getElementsByTagName('body')[0];
    if (this.withScrollValue) {
      this.renderer.setStyle(body, 'overflow', 'hidden');
    } else {
      this.renderer.setStyle(body, 'overflow', 'initial');
    }
  }

  @ViewChild('layoutTopDynamicArea', { read: ViewContainerRef }) veryTopRef: ViewContainerRef;
  @ViewChild('scrollableContainer', { read: ElementRef }) scrollableContainerRef: ElementRef;

  protected afterViewInit$ = new BehaviorSubject(null);

  private alive: boolean = true;

  constructor(
    protected themeService: NbThemeService,
    protected spinnerService: NbSpinnerService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    protected router: Router,
    @Inject(NB_WINDOW) protected window,
    @Inject(NB_DOCUMENT) protected document,
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected layoutDirectionService: NbLayoutDirectionService,
  ) {

    this.themeService.onThemeChange()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((theme: any) => {
        const body = this.document.getElementsByTagName('body')[0];
        if (theme.previous) {
          this.renderer.removeClass(body, `nb-theme-${theme.previous}`);
        }
        this.renderer.addClass(body, `nb-theme-${theme.name}`);
      });

    this.themeService.onAppendLayoutClass()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((className: string) => {
        this.renderer.addClass(this.elementRef.nativeElement, className);
      });

    this.themeService.onRemoveLayoutClass()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((className: string) => {
        this.renderer.removeClass(this.elementRef.nativeElement, className);
      });

    this.spinnerService.registerLoader(new Promise((resolve, reject) => {
      this.afterViewInit$
        .pipe(
          takeWhile(() => this.alive),
        )
        .subscribe((_) => resolve());
    }));
    this.spinnerService.load();

    if (isPlatformBrowser(this.platformId)) {
      // trigger first time so that after the change we have the initial value
      this.themeService.changeWindowWidth(this.window.innerWidth);
    }
  }

  ngAfterViewInit() {
    this.themeService.onAppendToTop()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((data: { factory: ComponentFactory<any>, listener: Subject<any> }) => {
        const componentRef = this.veryTopRef.createComponent(data.factory);
        data.listener.next(componentRef);
        data.listener.complete();
      });

    this.themeService.onClearLayoutTop()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((data: { listener: Subject<any> }) => {
        this.veryTopRef.clear();
        data.listener.next(true);
      });

    this.layoutDirectionService.onDirectionChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(direction => {
        this.renderer.setProperty(this.document, 'dir', direction);
      });

    this.afterViewInit$.next(true);
  }

  ngOnInit() {
    this.initScrollTop();
  }

  ngOnDestroy() {
    this.themeService.clearLayoutTop();
    this.alive = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.themeService.changeWindowWidth(event.target.innerWidth);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event) {
    const event = new CustomEvent(
      'nbscroll',
      { detail: { originalEvent: $event, ...this.getScrollInfo() } },
    );
    this.window.dispatchEvent(event);
  }

  private initScrollTop() {
    this.router.events
      .pipe(
        takeWhile(() => this.alive),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.scrollableContainerRef.nativeElement.scrollTo && this.scrollableContainerRef.nativeElement.scrollTo(0, 0);
      });
  }

  private getScrollInfo(): { scrollTop: number, scrollHeight: number, clientHeight: number } {
    let scrollHeight;
    let scrollTop;
    let clientHeight;

    if (this.withScrollValue) {
      const container = this.scrollableContainerRef.nativeElement;
      scrollHeight = container.scrollHeight;
      scrollTop = container.scrollTop;
      clientHeight = container.clientHeight;
    } else {
      const { body, documentElement } = this.document;
      const { innerHeight, pageYOffset } = this.window;
      scrollHeight = Math.max(body.scrollHeight, documentElement.scrollHeight);
      scrollTop = pageYOffset || documentElement.scrollTop || body.scrollTop || 0;
      clientHeight = Math.max(documentElement.clientHeight, innerHeight) || 0;
    }

    return { scrollHeight, scrollTop, clientHeight };
  }
}
