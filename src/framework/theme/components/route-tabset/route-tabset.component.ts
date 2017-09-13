/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { convertToBoolProperty } from '../helpers';

/**
 * Route tabset components.
 * Renders tabs inside of a router-outlet.
 *
 * @example basic usage example
 *
 * ```
 *  tabs = [
 *  {
 *    title: 'Route tab #1',
 *    route: '/pages/description',
 *  },
 *  {
 *    title: 'Route tab #2',
 *    route: '/pages/images',
 *    }
 *  ];
 *
 *  <nb-route-tabset [tabs]="tabs"></nb-route-tabset>
 * ```
 *
 * @styles
 *
 * route-tabs-font-family:
 * route-tabs-font-size:
 * route-tabs-active-bg:
 * route-tabs-active-font-weight:
 * route-tabs-padding:
 * route-tabs-header-bg:
 * route-tabs-separator:
 * route-tabs-fg:
 * route-tabs-fg-heading:
 * route-tabs-bg:
 * route-tabs-selected:
 */
@Component({
  selector: 'nb-route-tabset',
  styleUrls: ['./route-tabset.component.scss'],
  template: `
    <ul>
      <li *ngFor="let tab of tabs"
          (click)="$event.preventDefault(); selectTab(tab)"
          routerLink="{{tab.route}}"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }">
        <a href>{{tab.title}}</a>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
})
export class NbRouteTabsetComponent {

  @HostBinding('class.full-width') fullWidthValue: boolean = false;

  /**
   * Tabs configuration
   * @param Object{route: string, title: string, tag?: string}
   */
  @Input() tabs: any[];

  /**
   * Take full width of a parent
   * @param {boolean} val
   */
  @Input()
  set fullWidth(val: boolean) {
    this.fullWidthValue = convertToBoolProperty(val);
  }

  /**
   * Emits when tab is selected
   * @type {EventEmitter<any>}
   */
  @Output() changeTab = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  selectTab(tab: any) {
    this.changeTab.emit(tab);

    this.router.navigate([tab.route]);
  }
}
