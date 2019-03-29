/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { map, delay } from 'rxjs/operators';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  HostBinding,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { convertToBoolProperty } from '../helpers';

/**
 * Specific tab container.
 *
 * ```ts
 * <nb-tab tabTitle="Users"
 *   badgeText="99+"
 *   badgeStatus="danger">
 *   <p>List of <strong>users</strong>.</p>
 * </nb-tab>
 ```
 */
@Component({
  selector: 'nb-tab',
  template: `
    <ng-container *ngIf="init">
      <ng-content></ng-content>
    </ng-container>
  `,
})
export class NbTabComponent {

  /**
   * Tab title
   * @type {string}
   */
  @Input() tabTitle: string;

  /**
   * Tab icon
   * @type {string}
   */
  @Input() tabIcon: string;

  /**
   * Item is disabled and cannot be opened.
   * @type {boolean}
   */
  @Input('disabled')
  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.disabledValue;
  }
  set disabled(val: boolean) {
    this.disabledValue = convertToBoolProperty(val);
  }

  /**
   * Show only icons when width is smaller than `tabs-icon-only-max-width`
   * @type {boolean}
   */
  @Input()
  set responsive(val: boolean) {
    this.responsiveValue = convertToBoolProperty(val);
  }

  get responsive() {
    return this.responsiveValue;
  }

  @Input() route: string;

  @HostBinding('class.content-active')
  activeValue: boolean = false;

  responsiveValue: boolean = false;
  disabledValue = false;

  /**
   * Specifies active tab
   * @returns {boolean}
   */
  @Input()
  get active() {
    return this.activeValue;
  }
  set active(val: boolean) {
    this.activeValue = convertToBoolProperty(val);
    if (this.activeValue) {
      this.init = true;
    }
  }

  /**
   * Lazy load content before tab selection
   * TODO: rename, as lazy is by default, and this is more `instant load`
   * @param {boolean} val
   */
  @Input()
  set lazyLoad(val: boolean) {
    this.init = convertToBoolProperty(val);
  }

  /**
   * Badge text to display
   * @type string
   */
  @Input() badgeText: string;

  /**
   * Badge status (adds specific styles):
   * 'primary', 'info', 'success', 'warning', 'danger'
   * @param {string} val
   */
  @Input() badgeStatus: string;

  /**
   * Badge position.
   * Can be set to any class or to one of predefined positions:
   * 'top left', 'top right', 'bottom left', 'bottom right',
   * 'top start', 'top end', 'bottom start', 'bottom end'
   * @type string
   */
  @Input() badgePosition: string;

  init: boolean = false;
}

// TODO: Combine tabset with route-tabset, so that we can:
// - have similar interface
// - easy to migrate from one to another
// - can mix them both (route/content tab)
/**
 *
 * Dynamic tabset component.
 * @stacked-example(Showcase, tabset/tabset-showcase.component)
 *
 * Basic tabset example
 *
 * ```html
 * <nb-tabset>
 *  <nb-tab tabTitle="Simple Tab #1">
 *    Tab content 1
 *  </nb-tab>
 *  <nb-tab tabTitle="Simple Tab #2">
 *    Tab content 2
 *  </nb-tab>
 * </nb-tabset>
 * ```
 *
 * ### Installation
 *
 * Import `NbTabsetModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbTabsetModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * It is also possible to set a badge to a particular tab:
 * @stacked-example(Tab With Badge, tabset/tabset-badge.component)
 *
 * and we can set it to full a width of a parent component
 * @stacked-example(Full Width, tabset/tabset-width.component)
 *
 * `tabIcon` should be used to add an icon to the tab. Icon can also be combined with title.
 * `responsive` tab property if set allows you to hide the title on smaller screens
 * (`tabs-icon-only-max-width` property) for better responsive behaviour. You can open the following example and make
 * your screen smaller - titles will be hidden in the last tabset in the list:
 *
 * @stacked-example(Icon, tabset/tabset-icon.component)
 *
 * It is also possible to disable a tab using `disabled` property:
 * @stacked-example(Disabled Tab, tabset/tabset-disabled.component)
 *
 * @styles
 *
 * tabs-font-family:
 * tabs-font-size:
 * tabs-content-font-family:
 * tabs-content-font-size:
 * tabs-active-bg:
 * tabs-active-font-weight:
 * tabs-padding:
 * tabs-content-padding:
 * tabs-header-bg:
 * tabs-separator:
 * tabs-fg:
 * tabs-fg-text:
 * tabs-fg-heading:
 * tabs-bg:
 * tabs-selected:
 * tabs-icon-only-max-width
 *
 */
@Component({
  selector: 'nb-tabset',
  styleUrls: ['./tabset.component.scss'],
  template: `
    <ul class="tabset">
      <li *ngFor="let tab of tabs"
          (click)="selectTab(tab)"
          [class.responsive]="tab.responsive"
          [class.active]="tab.active"
          [class.disabled]="tab.disabled"
          [attr.tabindex]="tab.disabled ? -1 : 0"
          class="tab">
        <a href (click)="$event.preventDefault()" tabindex="-1">
          <nb-icon *ngIf="tab.tabIcon" [icon]="tab.tabIcon"></nb-icon>
          <span *ngIf="tab.tabTitle">{{ tab.tabTitle }}</span>
        </a>
        <nb-badge *ngIf="tab.badgeText"
          [text]="tab.badgeText"
          [status]="tab.badgeStatus"
          [position]="tab.badgePosition">
        </nb-badge>
      </li>
    </ul>
    <ng-content select="nb-tab"></ng-content>
  `,
})
export class NbTabsetComponent implements AfterContentInit {

  @ContentChildren(NbTabComponent) tabs: QueryList<NbTabComponent>;

  @HostBinding('class.full-width')
  fullWidthValue: boolean = false;

  /**
   * Take full width of a parent
   * @param {boolean} val
   */
  @Input()
  set fullWidth(val: boolean) {
    this.fullWidthValue = convertToBoolProperty(val);
  }

  /**
   * If specified - tabset listens to this parameter and selects corresponding tab.
   * @type {string}
   */
  @Input() routeParam: string;

  /**
   * Emits when tab is selected
   * @type EventEmitter<any>
   */
  @Output() changeTab = new EventEmitter<any>();

  constructor(private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  // TODO: refactoring this component, avoid change detection loop
  ngAfterContentInit() {
    this.route.params
      .pipe(
        map(
          (params: any) =>
            this.tabs.find((tab) => this.routeParam ? tab.route === params[this.routeParam] : tab.active),
        ),
        delay(0),
      )
      .subscribe((activeTab) => {
        this.selectTab(activeTab || this.tabs.first);
        this.changeDetectorRef.markForCheck();
    });
  }

  // TODO: navigate to routeParam
  selectTab(selectedTab: NbTabComponent) {
    if (!selectedTab.disabled) {
      this.tabs.forEach(tab => tab.active = tab === selectedTab);
      this.changeTab.emit(selectedTab);
    }
  }
}
