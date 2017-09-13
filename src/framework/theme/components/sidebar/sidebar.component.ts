/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { convertToBoolProperty } from '../helpers';
import { NbThemeService } from '../../services/theme.service';
import { NbMediaBreakpoint } from '../../services/breakpoints.service';
import { NbSidebarService } from './sidebar.service';


/**
 * Sidebar header container.
 *
 * Placeholder which contains a sidebar header content,
 * placed at the very top of the sidebar outside of the scroll area.
 */
@Component({
  selector: 'nb-sidebar-header',
  template: `
    <ng-content></ng-content>
  `,
})
export class NbSidebarHeaderComponent {
}

/**
 * Sidebar footer container.
 *
 * Placeholder which contains a sidebar footer content,
 * placed at the very bottom of the sidebar outside of the scroll area.
 */
@Component({
  selector: 'nb-sidebar-footer',
  template: `
    <ng-content></ng-content>
  `,
})
export class NbSidebarFooterComponent {
}

/**
 * Layout sidebar component.
 *
 * Sidebar can be place on the left or the right side of the layout, can be fixed (shown above the content)
 * or can push the layout when opened.
 *
 * There are three states - `expanded`, `collapsed`, `compacted`.
 * By default sidebar content is fixed and saves its position while the page is being scrolled.
 *
 * Sidebar also supports a `responsive` behavior, listening to window size change and changing its size respectably.
 *
 * @example Minimal sidebar example
 * ```
 * <nb-sidebar>
 *   Sidebar content.
 * </nb-sidebar>
 * ```
 *
 * @example Example of fixed sidebar located on the left side, initially collapsed.
 *
 * ```
 * <nb-sidebar left fixed state="collapsed">
 *  <nb-sidebar-header>Header</nb-sidebar-header>
 *  <nb-sidebar-content>
 *    Menu or another component here
 *  </nb-sidebar-content>
 *  <nb-sidebar-footer>
 *    Footer components here
 *  </nb-sidebar-footer>
 * </nb-sidebar>
 * ```
 *
 * @styles
 *
 * sidebar-font-size: Sidebar content font size
 * sidebar-line-height: Sidebar content line height
 * sidebar-fg: Foreground color
 * sidebar-bg: Background color
 * sidebar-height: Content height
 * sidebar-width: Expanded width
 * sidebar-width-compact: Compacted width
 * sidebar-padding: Sidebar content padding
 * sidebar-header-height: Sidebar header height
 * sidebar-footer-height: Sidebar footer height
 * sidebar-shadow: Sidebar container shadow
 *
 */
@Component({
  selector: 'nb-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  template: `
    <div class="main-container">
      <ng-content select="nb-sidebar-header"></ng-content>
      <div class="scrollable" (click)="onClick($event)">
        <ng-content></ng-content>
      </div>
      <ng-content select="nb-sidebar-footer"></ng-content>
    </div>
  `,
})
export class NbSidebarComponent implements OnInit, OnDestroy {

  static readonly STATE_EXPANDED: string = 'expanded';
  static readonly STATE_COLLAPSED: string = 'collapsed';
  static readonly STATE_COMPACTED: string = 'compacted';

  static readonly RESPONSIVE_STATE_MOBILE: string = 'mobile';
  static readonly RESPONSIVE_STATE_TABLET: string = 'tablet';
  static readonly RESPONSIVE_STATE_PC: string = 'pc';

  protected stateValue: string;
  protected responsiveValue: boolean = false;

  @HostBinding('class.fixed') fixedValue: boolean = false;
  @HostBinding('class.right') rightValue: boolean = false;
  @HostBinding('class.left') leftValue: boolean = true;

  // TODO: rename stateValue to state (take a look to the card component)
  @HostBinding('class.expanded')
  get expanded() {
    return this.stateValue === NbSidebarComponent.STATE_EXPANDED;
  }
  @HostBinding('class.collapsed')
  get collapsed() {
    return this.stateValue === NbSidebarComponent.STATE_COLLAPSED;
  }
  @HostBinding('class.compacted')
  get compacted() {
    return this.stateValue === NbSidebarComponent.STATE_COMPACTED;
  }

  /**
   * Places sidebar on the left side
   * @type {boolean}
   */
  @Input()
  set right(val: boolean) {
    this.rightValue = convertToBoolProperty(val);
    this.leftValue = !this.rightValue;
  }

  /**
   * Places sidebar on the right side
   * @type {boolean}
   */
  @Input()
  set left(val: boolean) {
    this.leftValue = convertToBoolProperty(val);
    this.rightValue = !this.leftValue;
  }

  /**
   * Makes sidebar fixed (shown above the layout content)
   * @type {boolean}
   */
  @Input()
  set fixed(val: boolean) {
    this.fixedValue = convertToBoolProperty(val);
  }

  /**
   * Initial sidebar state, `expanded`|`collapsed`|`compacted`
   * @type {string}
   */
  @Input()
  set state(val: string) {
    this.stateValue = val;
  }

  /**
   * Makes sidebar listen to media query events and change its behaviour
   * @type {boolean}
   */
  @Input()
  set responsive(val: boolean) {
    this.responsiveValue = convertToBoolProperty(val);
    this.toggleResponsive(this.responsiveValue);
  }

  /**
   * Tags a sidebar with some ID, can be later used in the sidebar service
   * to determine which sidebar triggered the action, if multiple sidebars exist on the page.
   *
   * @type {string}
   */
  @Input() tag: string;

  private toggleSubscription: Subscription;
  private expandSubscription: Subscription;
  private collapseSubscription: Subscription;
  private mediaQuerySubscription: Subscription;
  private responsiveState = NbSidebarComponent.RESPONSIVE_STATE_PC;

  constructor(private sidebarService: NbSidebarService,
              private themeService: NbThemeService,
              private element: ElementRef) {
  }

  toggleResponsive(enabled: boolean) {
    if (enabled) {
      this.mediaQuerySubscription = this.onMediaQueryChanges();
    } else if (this.mediaQuerySubscription) {
      this.mediaQuerySubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.toggleSubscription = this.sidebarService.onToggle()
      .subscribe((data: { compact: boolean, tag: string }) => {
        if (!this.tag || this.tag === data.tag) {
          this.toggle(data.compact);
        }
      });

    this.expandSubscription = this.sidebarService.onExpand()
      .subscribe((data: { tag: string }) => {
        if (!this.tag || this.tag === data.tag) {
          this.expand();
        }
      });

    this.collapseSubscription = this.sidebarService.onCollapse()
      .subscribe((data: { tag: string }) => {
        if (!this.tag || this.tag === data.tag) {
          this.collapse();
        }
      });
  }

  ngOnDestroy() {
    this.toggleSubscription.unsubscribe();
    this.expandSubscription.unsubscribe();
    this.collapseSubscription.unsubscribe();
    if (this.mediaQuerySubscription) {
      this.mediaQuerySubscription.unsubscribe();
    }
  }

  onClick(event): void {
    const menu = this.element.nativeElement.querySelector('nb-menu');
    if (menu && menu.contains(event.target)) {
      this.expand();
    }
  }

  /**
   * Collapses the sidebar
   */
  collapse() {
    this.state = NbSidebarComponent.STATE_COLLAPSED;
  }

  /**
   * Expands the sidebar
   */
  expand() {
    this.state = NbSidebarComponent.STATE_EXPANDED;
  }

  /**
   * Compacts the sidebar (minimizes)
   */
  compact() {
    this.state = NbSidebarComponent.STATE_COMPACTED;
  }

  /**
   * Toggles sidebar state (expanded|collapsed|compacted)
   * @param {boolean} compact If true, then sidebar state will be changed between expanded & compacted,
   * otherwise - between expanded & collapsed. False by default.
   *
   * @example Toggle sidebar state
   *
   * ```
   * this.sidebar.toggle(true);
   * ```
   */
  toggle(compact: boolean = false) {
    if (this.responsiveEnabled()) {
      if (this.responsiveState === NbSidebarComponent.RESPONSIVE_STATE_MOBILE) {
        compact = false;
      }
    }

    const closedStates = [NbSidebarComponent.STATE_COMPACTED, NbSidebarComponent.STATE_COLLAPSED];
    if (compact) {
      this.state = closedStates.indexOf(this.stateValue) >= 0 ?
        NbSidebarComponent.STATE_EXPANDED : NbSidebarComponent.STATE_COMPACTED;
    } else {
      this.state = closedStates.indexOf(this.stateValue) >= 0 ?
        NbSidebarComponent.STATE_EXPANDED : NbSidebarComponent.STATE_COLLAPSED;
    }
  }

  protected onMediaQueryChanges(): Subscription {
    return this.themeService.onMediaQueryChange()
      .subscribe(([prev, current]: [NbMediaBreakpoint, NbMediaBreakpoint]) => {

        // TODO: get width by the key and define only max width for the tablets and mobiles
        const tablet = ['xs', 'is', 'sm', 'md', 'lg'];
        const mobile = ['xs', 'is'];

        if (tablet.indexOf(current.name) !== -1) {
          this.fixed = true;
          this.compact();
          this.responsiveState = NbSidebarComponent.RESPONSIVE_STATE_TABLET;
        }
        if (mobile.indexOf(current.name) !== -1) {
          this.collapse();
          this.responsiveState = NbSidebarComponent.RESPONSIVE_STATE_MOBILE;
        }
        if (tablet.indexOf(current.name) === -1  && prev.width < current.width) {
          this.expand();
          this.fixed = false;
          this.responsiveState = NbSidebarComponent.RESPONSIVE_STATE_PC;
        }
      });
  }

  protected responsiveEnabled(): boolean {
    return this.responsiveValue;
  }
}
