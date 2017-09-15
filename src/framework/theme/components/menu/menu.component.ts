/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/takeWhile';

import { NbMenuInternalService, NbMenuItem } from './menu.service';
import { convertToBoolProperty } from '../helpers';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[nbMenuItem]',
  templateUrl: './menu-item.component.html',
})
export class NbMenuItemComponent {
  @Input() menuItem = <NbMenuItem>null;

  @Output() hoverItem = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();
  @Output() selectItem = new EventEmitter<any>();
  @Output() itemClick = new EventEmitter<any>();

  constructor(private router: Router) { }

  onToggleSubMenu(item: NbMenuItem) {
    this.toggleSubMenu.emit(item);
  }

  onHoverItem(item: NbMenuItem) {
    this.hoverItem.emit(item);
  }

  onSelectItem(item: NbMenuItem) {
    this.selectItem.emit(item);
  }

  onItemClick(item: NbMenuItem) {
    this.itemClick.emit(item);
  }
}

/**
 * Vertical menu component.
 *
 * Accepts a list of menu items and renders them accordingly. Supports multi-level menus.
 *
 * @styles
 *
 * menu-font-family:
 * menu-font-size:
 * menu-font-weight:
 * menu-fg:
 * menu-bg:
 * menu-active-fg:
 * menu-active-bg:
 * menu-active-font-weight:
 * menu-submenu-bg:
 * menu-submenu-fg:
 * menu-submenu-active-fg:
 * menu-submenu-active-bg:
 * menu-submenu-active-border-color:
 * menu-submenu-active-shadow:
 * menu-submenu-hover-fg:
 * menu-submenu-hover-bg:
 * menu-submenu-item-border-width:
 * menu-submenu-item-border-radius:
 * menu-submenu-item-padding:
 * menu-submenu-item-container-padding:
 * menu-submenu-padding:
 * menu-group-font-weight:
 * menu-group-font-size:
 * menu-group-fg:
 * menu-group-padding
 * menu-item-padding:
 * menu-item-separator:
 * menu-icon-font-size:
 * menu-icon-margin:
 * menu-icon-color:
 * menu-icon-active-color:
 */
@Component({
  selector: 'nb-menu',
  styleUrls: ['./menu.component.scss'],
  template: `
    <ul class="menu-items">
      <li nbMenuItem *ngFor="let item of items"
                      [menuItem]="item"
                      [class.menu-group]="item.group"
                      (hoverItem)="onHoverItem($event)"
                      (toggleSubMenu)="onToggleSubMenu($event)"
                      (selectItem)="onSelectItem($event)"
                      (itemClick)="onItemClick($event)"
                      class="menu-item"></li>
    </ul>
  `,
})
export class NbMenuComponent implements OnInit, OnDestroy {
  @HostBinding('class.inverse') inverseValue: boolean;

  /**
   * Tags a menu with some ID, can be later used in the menu service
   * to determine which menu triggered the action, if multiple menus exist on the page.
   *
   * @type {string}
   */
  @Input() tag: string;

  /**
   * List of menu items.
   * @type List<NbMenuItem> | List<any> | any
   */
  @Input() items: NbMenuItem[];

  /**
   * Makes colors inverse based on current theme
   * @type boolean
   */
  @Input()
  set inverse(val: boolean) {
    this.inverseValue = convertToBoolProperty(val);
  }

  /**
   * Collapse all opened submenus on the toggle event
   * Default value is "false"
   * @type boolean
   */
  @Input()
  set autoCollapse(val: boolean) {
    this.autoCollapseValue = convertToBoolProperty(val);
  }

  private alive: boolean = true;
  private autoCollapseValue: boolean = false;

  constructor(private menuInternalService: NbMenuInternalService, private router: Router) { }

  ngOnInit() {
    this.menuInternalService
      .onAddItem()
      .takeWhile(() => this.alive)
      .subscribe((data: { tag: string; items: NbMenuItem[] }) => {
        if (this.compareTag(data.tag)) {
          this.items.push(...data.items);

          this.menuInternalService.prepareItems(this.items);
        }
      });

    this.menuInternalService.onNavigateHome()
      .takeWhile(() => this.alive)
      .subscribe((data: { tag: string }) => {
        if (this.compareTag(data.tag)) {
          this.navigateHome();
        }
      });

    this.menuInternalService
      .onGetSelectedItem()
      .filter(data => !data.tag || data.tag === this.tag)
      .takeWhile(() => this.alive)
      .subscribe((data: { tag: string; listener: BehaviorSubject<{ tag: string; item: NbMenuItem }> }) => {
        data.listener.next({ tag: this.tag, item: this.getSelectedItem(this.items) });
      });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuInternalService.prepareItems(this.items);
      }
    });
    this.items.push(...this.menuInternalService.getItems());

    this.menuInternalService.prepareItems(this.items);
  }

  onHoverItem(item: NbMenuItem) {
    this.menuInternalService.itemHover(item, this.tag);
  }

  onToggleSubMenu(item: NbMenuItem) {
    if (this.autoCollapseValue) {
      this.menuInternalService.collapseAll(this.items, item);
    }
    item.expanded = !item.expanded;
    this.menuInternalService.submenuToggle(item, this.tag);
  }

  // TODO: is not fired on page reload
  onSelectItem(item: NbMenuItem) {
    this.menuInternalService.resetItems(this.items);
    item.selected = true;
    this.menuInternalService.itemSelect(item, this.tag);
  }

  onItemClick(item: NbMenuItem) {
    this.menuInternalService.itemClick(item, this.tag);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private navigateHome() {
    const homeItem = this.getHomeItem(this.items);

    if (homeItem) {
      this.menuInternalService.resetItems(this.items);
      homeItem.selected = true;

      if (homeItem.link) {
        this.router.navigate([homeItem.link]);
      }

      if (homeItem.url) {
        window.location.href = homeItem.url;
      }
    }
  }

  private getHomeItem(items: NbMenuItem[]): NbMenuItem {
    let home = null;
    items.forEach((item: NbMenuItem) => {
      if (item.home) {
        home = item;
      }
      if (item.home && item.children && item.children.length > 0) {
        home = this.getHomeItem(item.children);
      }
    });
    return home;
  }

  private compareTag(tag: string) {
    return !tag || tag === this.tag;
  }

  private getSelectedItem(items: NbMenuItem[]): NbMenuItem {
    let selected = null;
    items.forEach((item: NbMenuItem) => {
      if (item.selected) {
        selected = item;
      }
      if (item.selected && item.children && item.children.length > 0) {
        selected = this.getSelectedItem(item.children);
      }
    });
    return selected;
  }
}
