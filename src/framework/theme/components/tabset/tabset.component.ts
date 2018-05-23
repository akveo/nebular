/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  HostBinding,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { convertToBoolProperty } from '../helpers';

/**
 * Specific tab container.
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

  @Input() tabTitle: string;

  @Input() route: string;

  @HostBinding('class.content-active')
  activeValue: boolean = false;

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
 * Renders `<nb-tab></ng-tab> containers inside.
 *
 * @example Basic tabset example
 *
 * ```
 * <nb-tabset>
 *  <nb-tab tabTitle="Simple Tab #1">
 *    Tab content 1
 *  </nb-tab>
 *  <nb-tab tabTitle="Simple Tab #2">
 *    Tab content 2
 *  </nb-tab>
 * </nb-tabset>
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
 *
 ```
 */
@Component({
  selector: 'nb-tabset',
  styleUrls: ['./tabset.component.scss'],
  template: `
    <ul>
      <li *ngFor="let tab of tabs"
          (click)="selectTab(tab)"
          [class.active]="tab.active">
        <a href (click)="$event.preventDefault()">{{ tab.tabTitle }}</a>
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

  constructor(private route: ActivatedRoute) {
  }

  ngAfterContentInit() {
    this.route.params
      .subscribe((params: any) => {
        const activeTab = this.tabs.find(tab => this.routeParam ? tab.route === params[this.routeParam] : tab.active);
        this.selectTab(activeTab || this.tabs.first);
      });
  }

  // TODO: navigate to routeParam
  selectTab(selectedTab: NbTabComponent) {
    this.tabs.forEach(tab => tab.active = tab === selectedTab);
    this.changeTab.emit(selectedTab);
  }
}
