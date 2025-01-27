/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil, filter, map, startWith } from 'rxjs/operators';

import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbThemeService } from '../../services/theme.service';
import { NbMediaBreakpoint } from '../../services/breakpoints.service';
import { NbSidebarService, getSidebarState$, getSidebarResponsiveState$ } from './sidebar.service';

export type NbSidebarState = 'expanded' | 'collapsed' | 'compacted';
export type NbSidebarResponsiveState = 'mobile' | 'tablet' | 'pc';

/**
 * Sidebar header container.
 *
 * Placeholder which contains a sidebar header content,
 * placed at the very top of the sidebar outside of the scroll area.
 */
@Component({
  selector: 'nb-sidebar-header',
  template: ` <ng-content></ng-content> `,
  standalone: false,
})
export class NbSidebarHeaderComponent {}

/**
 * Sidebar footer container.
 *
 * Placeholder which contains a sidebar footer content,
 * placed at the very bottom of the sidebar outside of the scroll area.
 */
@Component({
  selector: 'nb-sidebar-footer',
  template: ` <ng-content></ng-content> `,
  standalone: false,
})
export class NbSidebarFooterComponent {}

/**
 * Layout sidebar component.
 *
 * @stacked-example(Showcase, sidebar/sidebar-showcase.component)
 *
 * ### Installation
 *
 * Import `NbSidebarModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSidebarModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 * and `NbSidebarModule` to your feature module where the component should be shown:
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSidebarModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Sidebar can be placed on the left or the right side of the layout,
 * or on start/end position of layout (depends on document direction, left to right or right to left)
 * It can be fixed (shown above the content) or can push the layout when opened.
 *
 * There are three states - `expanded`, `collapsed`, `compacted`.
 * By default sidebar content is fixed and saves its position while the page is being scrolled.
 *
 * Compacted sidebar example:
 * @stacked-example(Compacted Sidebar, sidebar/sidebar-compacted.component)
 *
 * Sidebar also supports a `responsive` behavior, listening to window size change and changing its size respectably.
 *
 * In a pair with header it is possible to setup a configuration when header is placed on a side of the sidebar
 * and not on top of it. To achieve this simply put a `subheader` property to the header like this:
 * ```html
 * <nb-layout-header subheader></nb-layout-header>
 * ```
 * @stacked-example(Subheader, layout/layout-sidebar-subheader.component)
 * Note that in such configuration sidebar shadow is removed and header cannot be make `fixed`.
 *
 * @additional-example(Right Sidebar, sidebar/sidebar-right.component)
 * @additional-example(Fixed Sidebar, sidebar/sidebar-fixed.component)
 *
 * @styles
 *
 * sidebar-background-color:
 * sidebar-text-color:
 * sidebar-text-font-family:
 * sidebar-text-font-size:
 * sidebar-text-font-weight:
 * sidebar-text-line-height:
 * sidebar-height:
 * sidebar-width:
 * sidebar-width-compact:
 * sidebar-padding:
 * sidebar-header-height:
 * sidebar-footer-height:
 * sidebar-shadow:
 * sidebar-menu-item-highlight-color:
 * sidebar-scrollbar-background-color:
 * sidebar-scrollbar-color:
 * sidebar-scrollbar-width:
 */
@Component({
  selector: 'nb-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  template: `
    <div class="main-container" [class.main-container-fixed]="containerFixedValue">
      <ng-content select="nb-sidebar-header"></ng-content>
      <div class="scrollable" (click)="onClick($event)">
        <ng-content></ng-content>
      </div>
      <ng-content select="nb-sidebar-footer"></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NbSidebarComponent implements OnInit, OnDestroy {
  protected readonly responsiveValueChange$: Subject<boolean> = new Subject<boolean>();
  protected responsiveState: NbSidebarResponsiveState = 'pc';

  protected destroy$ = new Subject<void>();

  containerFixedValue: boolean = true;

  @HostBinding('class.fixed') fixedValue: boolean = false;
  @HostBinding('class.right') rightValue: boolean = false;
  @HostBinding('class.left') leftValue: boolean = true;
  @HostBinding('class.start') startValue: boolean = false;
  @HostBinding('class.end') endValue: boolean = false;

  @HostBinding('class.expanded')
  get expanded() {
    return this.state === 'expanded';
  }
  @HostBinding('class.collapsed')
  get collapsed() {
    return this.state === 'collapsed';
  }
  @HostBinding('class.compacted')
  get compacted() {
    return this.state === 'compacted';
  }

  /**
   * Places sidebar on the right side
   * @type {boolean}
   */
  @Input()
  set right(val: boolean) {
    this.rightValue = convertToBoolProperty(val);
    this.leftValue = !this.rightValue;
    this.startValue = false;
    this.endValue = false;
  }
  static ngAcceptInputType_right: NbBooleanInput;

  /**
   * Places sidebar on the left side
   * @type {boolean}
   */
  @Input()
  set left(val: boolean) {
    this.leftValue = convertToBoolProperty(val);
    this.rightValue = !this.leftValue;
    this.startValue = false;
    this.endValue = false;
  }
  static ngAcceptInputType_left: NbBooleanInput;

  /**
   * Places sidebar on the start edge of layout
   * @type {boolean}
   */
  @Input()
  set start(val: boolean) {
    this.startValue = convertToBoolProperty(val);
    this.endValue = !this.startValue;
    this.leftValue = false;
    this.rightValue = false;
  }
  static ngAcceptInputType_start: NbBooleanInput;

  /**
   * Places sidebar on the end edge of layout
   * @type {boolean}
   */
  @Input()
  set end(val: boolean) {
    this.endValue = convertToBoolProperty(val);
    this.startValue = !this.endValue;
    this.leftValue = false;
    this.rightValue = false;
  }
  static ngAcceptInputType_end: NbBooleanInput;

  /**
   * Makes sidebar fixed (shown above the layout content)
   * @type {boolean}
   */
  @Input()
  set fixed(val: boolean) {
    this.fixedValue = convertToBoolProperty(val);
  }
  static ngAcceptInputType_fixed: NbBooleanInput;

  /**
   * Makes sidebar container fixed
   * @type {boolean}
   */
  @Input()
  set containerFixed(val: boolean) {
    this.containerFixedValue = convertToBoolProperty(val);
  }
  static ngAcceptInputType_containerFixed: NbBooleanInput;

  /**
   * Initial sidebar state, `expanded`|`collapsed`|`compacted`
   * @type {string}
   */
  @Input()
  get state(): NbSidebarState {
    return this._state;
  }
  set state(value: NbSidebarState) {
    this._state = value;
  }
  protected _state: NbSidebarState = 'expanded';

  /**
   * Makes sidebar listen to media query events and change its behaviour
   * @type {boolean}
   */
  @Input()
  get responsive(): boolean {
    return this._responsive;
  }
  set responsive(value: boolean) {
    if (this.responsive !== convertToBoolProperty(value)) {
      this._responsive = !this.responsive;
      this.responsiveValueChange$.next(this.responsive);
    }
  }
  protected _responsive: boolean = false;
  static ngAcceptInputType_responsive: NbBooleanInput;

  /**
   * Tags a sidebar with some ID, can be later used in the sidebar service
   * to determine which sidebar triggered the action, if multiple sidebars exist on the page.
   *
   * @type {string}
   */
  @Input() tag: string;

  // TODO: get width by the key and define only max width for the tablets and mobiles
  /**
   * Controls on which screen sizes sidebar should be switched to compacted state.
   * Works only when responsive mode is on.
   * Default values are `['xs', 'is', 'sm', 'md', 'lg']`.
   *
   * @type string[]
   */
  @Input() compactedBreakpoints: string[] = ['xs', 'is', 'sm', 'md', 'lg'];

  /**
   * Controls on which screen sizes sidebar should be switched to collapsed state.
   * Works only when responsive mode is on.
   * Default values are `['xs', 'is']`.
   *
   * @type string[]
   */
  @Input() collapsedBreakpoints: string[] = ['xs', 'is'];

  /**
   * Emits whenever sidebar state change.
   */
  @Output() readonly stateChange = new EventEmitter<NbSidebarState>();

  /**
   * Emits whenever sidebar responsive state change.
   */
  @Output() readonly responsiveStateChange = new EventEmitter<NbSidebarResponsiveState>();

  constructor(
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private element: ElementRef,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.sidebarService
      .onToggle()
      .pipe(
        filter(({ tag }) => !this.tag || this.tag === tag),
        takeUntil(this.destroy$),
      )
      .subscribe(({ compact }) => this.toggle(compact));

    this.sidebarService
      .onExpand()
      .pipe(
        filter(({ tag }) => !this.tag || this.tag === tag),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.expand());

    this.sidebarService
      .onCollapse()
      .pipe(
        filter(({ tag }) => !this.tag || this.tag === tag),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.collapse());

    this.sidebarService
      .onCompact()
      .pipe(
        filter(({ tag }) => !this.tag || this.tag === tag),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.compact());

    getSidebarState$
      .pipe(
        filter(({ tag }) => !this.tag || this.tag === tag),
        takeUntil(this.destroy$),
      )
      .subscribe(({ observer }) => observer.next(this.state));

    getSidebarResponsiveState$
      .pipe(
        filter(({ tag }) => !this.tag || this.tag === tag),
        takeUntil(this.destroy$),
      )
      .subscribe(({ observer }) => observer.next(this.responsiveState));

    this.responsiveValueChange$
      .pipe(
        filter((responsive: boolean) => !responsive),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.expand());

    this.subscribeToMediaQueryChange();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // TODO: this is more of a workaround, should be a better way to make components communicate to each other
  onClick(event): void {
    const menu = this.element.nativeElement.querySelector('nb-menu');

    if (menu && menu.contains(event.target)) {
      const link = this.getMenuLink(event.target);

      if (link && link.nextElementSibling && link.nextElementSibling.classList.contains('menu-items')) {
        this.sidebarService.expand(this.tag);
      }
    }
  }

  /**
   * Collapses the sidebar
   */
  collapse() {
    this.updateState('collapsed');
  }

  /**
   * Expands the sidebar
   */
  expand() {
    this.updateState('expanded');
  }

  /**
   * Compacts the sidebar (minimizes)
   */
  compact() {
    this.updateState('compacted');
  }

  /**
   * Toggles sidebar state (expanded|collapsed|compacted)
   * @param {boolean} compact If true, then sidebar state will be changed between expanded & compacted,
   * otherwise - between expanded & collapsed. False by default.
   *
   * Toggle sidebar state
   *
   * ```ts
   * this.sidebar.toggle(true);
   * ```
   */
  toggle(compact: boolean = false) {
    if (this.responsive) {
      if (this.responsiveState === 'mobile') {
        compact = false;
      }
    }

    if (this.state === 'compacted' || this.state === 'collapsed') {
      this.updateState('expanded');
    } else {
      this.updateState(compact ? 'compacted' : 'collapsed');
    }
  }

  protected subscribeToMediaQueryChange() {
    combineLatest([
      this.responsiveValueChange$.pipe(startWith(this.responsive)),
      this.themeService.onMediaQueryChange() as Observable<[NbMediaBreakpoint, NbMediaBreakpoint]>,
    ])
      .pipe(
        filter(([responsive]) => responsive),
        map(([, breakpoints]) => breakpoints),
        takeUntil(this.destroy$),
      )
      .subscribe(([prev, current]: [NbMediaBreakpoint, NbMediaBreakpoint]) => {
        const isCollapsed = this.collapsedBreakpoints.includes(current.name);
        const isCompacted = this.compactedBreakpoints.includes(current.name);

        let newResponsiveState;

        if (isCompacted) {
          this.fixed = this.containerFixedValue;
          this.compact();
          newResponsiveState = 'tablet';
        }
        if (isCollapsed) {
          this.fixed = true;
          this.collapse();
          newResponsiveState = 'mobile';
        }
        if (!isCollapsed && !isCompacted && (!prev.width || prev.width < current.width)) {
          this.expand();
          this.fixed = false;
          newResponsiveState = 'pc';
        }

        if (newResponsiveState && newResponsiveState !== this.responsiveState) {
          this.responsiveState = newResponsiveState;
          this.responsiveStateChange.emit(this.responsiveState);
          this.cd.markForCheck();
        }
      });
  }

  protected getMenuLink(element: HTMLElement): HTMLElement | undefined {
    if (!element || element.tagName.toLowerCase() === 'nb-menu') {
      return undefined;
    }

    if (element.tagName.toLowerCase() === 'a') {
      return element;
    }

    return this.getMenuLink(element.parentElement);
  }

  protected updateState(state: NbSidebarState): void {
    if (this.state !== state) {
      this.state = state;
      this.stateChange.emit(this.state);
      this.cd.markForCheck();
    }
  }
}
