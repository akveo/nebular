/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { convertToBoolProperty } from '../helpers';

/**
 * Route tabset components.
 * Renders tabs inside of a router-outlet.
 *
 * ```ts
 *  tabs = [
 *  {
 *    title: 'Route tab #1',
 *    route: '/pages/description',
 *    icon: 'nb-home',
 *    responsive: true, // hide title before `route-tabs-icon-only-max-width` value
 *  },
 *  {
 *    title: 'Route tab #2',
 *    route: '/pages/images',
 *    }
 *  ];
 *
 *  <nb-route-tabset [tabs]="tabs"></nb-route-tabset>
 * ```
 * ### Installation
 *
 * Import `NbRouteTabsetModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbRouteTabsetModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * @stacked-example(Route Tabset, tabset/route-tabset-showcase.component)
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
 * route-tabs-icon-only-max-width:
 */
@Component({
  selector: 'nb-route-tabset',
  styleUrls: ['./route-tabset.component.scss'],
  template: `
    <ul class="route-tabset">
      <ng-container *ngFor="let tab of tabs">
        <li *ngIf="tab.disabled; else enabled"
            [class.responsive]="tab.responsive"
            class="route-tab disabled"
            tabindex="-1">
          <a tabindex="-1">
            <i *ngIf="tab.icon" [class]="tab.icon"></i>
            <span *ngIf="tab.title">{{ tab.title }}</span>
          </a>
        </li>

        <ng-template #enabled>
          <li (click)="$event.preventDefault(); selectTab(tab)"
              [routerLink]="tab.route"
              routerLinkActive="active"
              [routerLinkActiveOptions]="activeLinkOptions"
              [class.responsive]="tab.responsive"
              tabindex="0"
              class="route-tab">
            <a tabindex="-1">
              <i *ngIf="tab.icon" [class]="tab.icon"></i>
              <span *ngIf="tab.title">{{ tab.title }}</span>
            </a>
          </li>
        </ng-template>
      </ng-container>
    </ul>
    <router-outlet></router-outlet>
  `,
})
export class NbRouteTabsetComponent {

  @HostBinding('class.full-width') fullWidthValue: boolean = false;

  /**
   * Tabs configuration
   * @param Object{route: string, title: string, tag?: string, responsive?: boolean, disabled?: boolean}
   */
  @Input() tabs: any[];

  /**
   * Options passed to `routerLinkActiveOptions` directive which set on tab links.
   * `{ exact: true }` by default.
   */
  @Input() activeLinkOptions = { exact: true };

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

  selectTab(tab: any) {
    this.changeTab.emit(tab);
  }
}
