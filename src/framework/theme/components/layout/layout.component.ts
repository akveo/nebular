/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnDestroy,
  Renderer2, ViewChild, ViewContainerRef, Inject, PLATFORM_ID, forwardRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';

import { convertToBoolProperty } from '../helpers';
import { NbThemeService } from '../../services/theme.service';
import { NbSpinnerService } from '../../services/spinner.service';
import { NbLayoutDirectionService } from '../../services/direction.service';
import { NbRestoreScrollTopHelper } from './restore-scroll-top.service';
import { NbScrollPosition, NbLayoutScrollService } from '../../services/scroll.service';
import { NbLayoutDimensions, NbLayoutRulerService } from '../../services/ruler.service';
import { NB_WINDOW, NB_DOCUMENT } from '../../theme.options';
import { NbOverlayContainerAdapter } from '../cdk/adapter/overlay-container-adapter';

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
 *  <nb-layout-footer></nb-layout-footer>
 *  <nb-layout-column></nb-layout-column>
 *  <nb-sidebar></nb-sidebar>
 * </nb-layout>
 * ```
 * ### Installation
 *
 * Import `NbLayoutModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbLayoutModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 * and `NbLayoutModule` to your feature module where the component should be shown:
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbLayoutModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
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
 * Based on the class appended, specific CSS-theme is applied to the application.
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
 * layout-window-mode-max-width: window mode only, after this value layout turns into a floating window
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
    <div class="scrollable-container" #scrollableContainer (scroll)="onScroll($event)">
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
export class NbLayoutComponent implements AfterViewInit, OnDestroy {

  centerValue: boolean = false;
  restoreScrollTopValue: boolean = true;

  @HostBinding('class.window-mode') windowModeValue: boolean = false;
  @HostBinding('class.with-scroll') withScrollValue: boolean = false;
  @HostBinding('class.with-subheader') withSubheader: boolean = false;
  @HostBinding('class.overlay-scroll-block') overlayScrollBlock: boolean = false;

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

  /**
   * Restores scroll to the top of the page after navigation
   * @param {boolean} val
   */
  @Input()
  set restoreScrollTop(val: boolean) {
    this.restoreScrollTopValue = convertToBoolProperty(val);
  }

  @ViewChild('layoutTopDynamicArea', { read: ViewContainerRef }) veryTopRef: ViewContainerRef;
  @ViewChild('scrollableContainer', { read: ElementRef }) scrollableContainerRef: ElementRef;

  protected afterViewInit$ = new BehaviorSubject(null);

  private alive: boolean = true;

  constructor(
    protected themeService: NbThemeService,
    protected spinnerService: NbSpinnerService,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    @Inject(NB_WINDOW) protected window,
    @Inject(NB_DOCUMENT) protected document,
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected layoutDirectionService: NbLayoutDirectionService,
    protected scrollService: NbLayoutScrollService,
    protected rulerService: NbLayoutRulerService,
    protected scrollTop: NbRestoreScrollTopHelper,
    protected overlayContainer: NbOverlayContainerAdapter,
  ) {
    this.registerAsOverlayContainer();

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

    this.rulerService.onGetDimensions()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(({ listener }) => {
        listener.next(this.getDimensions());
        listener.complete();
      });

    this.scrollService.onGetPosition()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(({ listener }) => {
        listener.next(this.getScrollPosition());
        listener.complete();
      });

    this.scrollTop
      .shouldRestore()
      .pipe(
        filter(() => this.restoreScrollTopValue),
        takeWhile(() => this.alive),
      )
      .subscribe(() => {
        this.scroll(0, 0);
      });

    this.scrollService
      .onScrollableChange()
      .pipe(
        filter(() => this.withScrollValue),
      )
      .subscribe((scrollable: boolean) => {
        this.overlayScrollBlock = !scrollable;
      });

    if (isPlatformBrowser(this.platformId)) {
      // trigger first time so that after the change we have the initial value
      this.themeService.changeWindowWidth(this.window.innerWidth);
    }
  }

  ngAfterViewInit() {
    this.layoutDirectionService.onDirectionChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(direction => this.document.dir = direction);

    this.scrollService.onManualScroll()
      .pipe(takeWhile(() => this.alive))
      .subscribe(({ x, y }: NbScrollPosition) => this.scroll(x, y));

    this.afterViewInit$.next(true);
  }

  ngOnDestroy() {
    this.alive = false;
    this.unregisterAsOverlayContainer();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event) {
    this.scrollService.fireScrollChange($event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.themeService.changeWindowWidth(event.target.innerWidth);
  }

  /**
   * Returns scroll and client height/width
   *
   * Depending on the current scroll mode (`withScroll=true`) returns sizes from the body element
   * or from the `.scrollable-container`
   * @returns {NbLayoutDimensions}
   */
  getDimensions(): NbLayoutDimensions {
    let clientWidth, clientHeight, scrollWidth, scrollHeight = 0;
    if (this.withScrollValue) {
      const container = this.scrollableContainerRef.nativeElement;
      clientWidth = container.clientWidth;
      clientHeight = container.clientHeight;
      scrollWidth = container.scrollWidth;
      scrollHeight = container.scrollHeight;
    } else {
      const { documentElement, body } = this.document;
      clientWidth = documentElement.clientWidth || body.clientWidth;
      clientHeight = documentElement.clientHeight || body.clientHeight;
      scrollWidth = documentElement.scrollWidth || body.scrollWidth;
      scrollHeight = documentElement.scrollHeight || body.scrollHeight;
    }

    return {
      clientWidth,
      clientHeight,
      scrollWidth,
      scrollHeight,
    };
  }

  /**
   * Returns scroll position of current scroll container.
   *
   * If `withScroll` = true, returns scroll position of the `.scrollable-container` element,
   * otherwise - of the scrollable element of the window (which may be different depending of a browser)
   *
   * @returns {NbScrollPosition}
   */
  getScrollPosition(): NbScrollPosition {
    if (!isPlatformBrowser(this.platformId)) {
      return { x: 0, y: 0 };
    }

    if (this.withScrollValue) {
      const container = this.scrollableContainerRef.nativeElement;
      return { x: container.scrollLeft, y: container.scrollTop };
    }

    const documentRect = this.document.documentElement.getBoundingClientRect();

    const x = -documentRect.left || this.document.body.scrollLeft || this.window.scrollX ||
      this.document.documentElement.scrollLeft || 0;

    const y = -documentRect.top || this.document.body.scrollTop || this.window.scrollY ||
      this.document.documentElement.scrollTop || 0;


    return { x, y };
  }

  protected registerAsOverlayContainer() {
    if (this.overlayContainer.setContainer) {
      this.overlayContainer.setContainer(this.elementRef.nativeElement);
    }
  }

  protected unregisterAsOverlayContainer() {
    if (this.overlayContainer.clearContainer) {
      this.overlayContainer.clearContainer();
    }
  }

  private scroll(x: number = null, y: number = null) {
    const { x: currentX, y: currentY } = this.getScrollPosition();
    x = x == null ? currentX : x;
    y = y == null ? currentY : y;

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (this.withScrollValue) {
      const scrollable = this.scrollableContainerRef.nativeElement;
      if (scrollable.scrollTo) {
        scrollable.scrollTo(x, y);
      } else {
        scrollable.scrollLeft = x;
        scrollable.scrollTop = y;
      }
    } else {
      this.window.scrollTo(x, y);
    }
  }
}
