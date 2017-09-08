/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/publish';

const itemClick$ = new ReplaySubject(1);
const addItems$ = new ReplaySubject(1);
const navigateHome$ = new ReplaySubject(1);
const getSelectedItem$ = new ReplaySubject(1);
const itemSelect$ = new ReplaySubject(1);
const itemHover$ = new ReplaySubject(1);
const submenuToggle$ = new ReplaySubject(1);

/**
 * Menu Item options
 * TODO: check if we need both URL and LINK
 */
export abstract class NbMenuItem {
  /**
   * Item Title
   * @type {string}
   */
  title: string;
  /**
   * Item relative link (for routerLink)
   * @type {string}
   */
  link?: string;
  /**
   * Item URL (absolute)
   * @type {string}
   */
  url?: string;
  /**
   * Icon class name
   * @type {string}
   */
  icon?: string;
  /**
   * Expanded by defaul
   * @type {boolean}
   */
  expanded?: boolean;
  /**
   * Children items
   * @type {List<NbMenuItem>}
   */
  children?: NbMenuItem[];
  /**
   * HTML Link target
   * @type {string}
   */
  target?: string;
  /**
   * Hidden Item
   * @type {boolean}
   */
  hidden?: boolean;
  /**
   * Item is selected when partly or fully equal to the current url
   * @type {string}
   */
  pathMatch?: string = 'full'; // TODO: is not set if item is initialized by default, should be set anyway
  /**
   * Where this is a home item
   * @type {boolean}
   */
  home?: boolean;
  /**
   * Whether the item is just a group (non-clickable)
   * @type {boolean}
   */
  group?: boolean;
  parent?: NbMenuItem;
  selected?: boolean;
  data?: any;
  fragment?: string;
}

// TODO: map select events to router change events
// TODO: review the interface
/**
 * Menu Service. Allows you to listen to menu events, or to interact with a menu.
 */
@Injectable()
export class NbMenuService {

  /**
   * Add items to the end of the menu items list
   * @param {List<NbMenuItem>} items
   * @param {string} tag
   */
  addItems(items: NbMenuItem[], tag?: string) {
    addItems$.next({ tag, items });
  }

  /**
   * Navigate to the home menu item
   * @param {string} tag
   */
  navigateHome(tag?: string) {
    navigateHome$.next({ tag });
  }

  /**
   * Returns currently selected item. Won't subscribe to the future events.
   * @param {string} tag
   * @returns {Observable<{tag: string; item: NbMenuItem}>}
   */
  getSelectedItem(tag?: string): Observable<{ tag: string; item: NbMenuItem }> {
    const listener = new BehaviorSubject<{ tag: string; item: NbMenuItem }>(null);

    getSelectedItem$.next({ tag, listener });

    return listener.asObservable();
  }

  onItemClick(): Observable<{ tag: string; item: NbMenuItem }> {
    return itemClick$.publish().refCount();
  }

  onItemSelect(): Observable<{ tag: string; item: NbMenuItem }> {
    return itemSelect$.publish().refCount();
  }

  onItemHover(): Observable<{ tag: string; item: NbMenuItem }> {
    return itemHover$.publish().refCount();
  }

  onSubmenuToggle(): Observable<{ tag: string; item: NbMenuItem }> {
    return submenuToggle$.publish().refCount();
  }
}

@Injectable()
export class NbMenuInternalService {
  private items: NbMenuItem[] = [];

  constructor(private router: Router, private location: Location) {
    this.items = [];
  }

  getItems(): NbMenuItem[] {
    return this.items;
  }

  prepareItems(items: NbMenuItem[]) {
    items.forEach(i => this.setParent(i));
    items.forEach(i => this.prepareItem(i));
  }

  resetItems(items: NbMenuItem[]) {
    items.forEach(i => this.resetItem(i));
  }

  collapseAll(items: NbMenuItem[], except?: NbMenuItem) {
    items.forEach(i => this.collapseItem(i, except));
  }

  onAddItem(): Observable<{ tag: string; items: NbMenuItem[] }> {
    return addItems$.publish().refCount();
  }

  onNavigateHome(): Observable<{ tag: string }> {
    return navigateHome$.publish().refCount();
  }

  onGetSelectedItem(): Observable<{ tag: string; listener: BehaviorSubject<{ tag: string; item: NbMenuItem }> }> {
    return getSelectedItem$.publish().refCount();
  }

  itemHover(item: NbMenuItem, tag?: string) {
    itemHover$.next({tag, item});
  }

  submenuToggle(item: NbMenuItem, tag?: string) {
    submenuToggle$.next({tag, item});
  }

  itemSelect(item: NbMenuItem, tag?: string) {
    itemSelect$.next({tag, item});
  }

  itemClick(item: NbMenuItem, tag?: string) {
    itemClick$.next({tag, item});
  }

  private resetItem(item: NbMenuItem) {
    item.selected = false;

    item.children && item.children.forEach(child => {
      this.resetItem(child);
    });
  }

  private collapseItem(item: NbMenuItem, except?: NbMenuItem) {
    if (except && item === except) {
      return;
    }
    item.expanded = false;

    item.children && item.children.forEach(child => {
      this.collapseItem(child);
    });
  }

  private setParent(item: NbMenuItem) {
    item.children && item.children.forEach(child => {
      child.parent = item;
      this.setParent(child);
    });
  }

  private prepareItem(item: NbMenuItem) {
    item.selected = false;

    const exact: boolean = item.pathMatch === 'full';
    const location: string = this.location.path();

    if ((exact && location === item.link) || (!exact && location.includes(item.link))
      || (exact && item.fragment && location.substr(location.indexOf('#') + 1).includes(item.fragment))) {

      item.selected = true;
      this.selectParent(item);
    }

    item.children && item.children.forEach(child => {
      this.prepareItem(child);
    });
  }

  private selectParent(item: NbMenuItem) {
    const parent = item.parent;
    if (parent) {
      parent.selected = true;
      parent.expanded = true;
      this.selectParent(parent);
    }
  }
}
