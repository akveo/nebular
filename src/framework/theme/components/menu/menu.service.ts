/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Params } from '@angular/router';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { isUrlPathContain, isUrlPathEqual } from './url-matching-helpers';
export interface NbMenuBag { tag: string; item: NbMenuItem }

const itemClick$ = new ReplaySubject<NbMenuBag>(1);
const addItems$ = new ReplaySubject<{ tag: string; items: NbMenuItem[] }>(1);
const navigateHome$ = new ReplaySubject<{ tag: string }>(1);
const getSelectedItem$
  = new ReplaySubject<{ tag: string; listener: BehaviorSubject<NbMenuBag> }>(1);
const itemSelect$ = new ReplaySubject<NbMenuBag>(1);
const itemHover$ = new ReplaySubject<NbMenuBag>(1);
const submenuToggle$ = new ReplaySubject<NbMenuBag>(1);

// TODO: check if we need both URL and LINK
/**
 * Menu Item options
 */
export class NbMenuItem {
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
   * Children items height
   * @type {number}
   */
  subMenuHeight?: number = 0;
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
  pathMatch?: string = 'full';
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
  /** Map of query parameters
   *@type {Params}
   */
  queryParams?: Params;
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
  getSelectedItem(tag?: string): Observable<NbMenuBag> {
    const listener = new BehaviorSubject<NbMenuBag>(null);

    getSelectedItem$.next({ tag, listener });

    return listener.asObservable();
  }

  onItemClick(): Observable<NbMenuBag> {
    return itemClick$.pipe(share());
  }

  onItemSelect(): Observable<NbMenuBag> {
    return itemSelect$.pipe(share());
  }

  onItemHover(): Observable<NbMenuBag> {
    return itemHover$.pipe(share());
  }

  onSubmenuToggle(): Observable<NbMenuBag> {
    return submenuToggle$.pipe(share());
  }
}

@Injectable()
export class NbMenuInternalService {
  private items: NbMenuItem[] = [];

  constructor(private location: Location) {
    this.items = [];
  }

  getItems(): NbMenuItem[] {
    return this.items;
  }

  prepareItems(items: NbMenuItem[]) {
    const defaultItem = new NbMenuItem();
    items.forEach(i => {
      this.applyDefaults(i, defaultItem);
      this.setParent(i);
    });
  }

  updateSelection(items: NbMenuItem[], tag: string, collapseOther: boolean = false) {
    if (collapseOther) {
      this.collapseAll(items, tag);
    }
    items.forEach(item => this.selectItemByUrl(item, tag));
  }

  resetItems(items: NbMenuItem[]) {
    items.forEach(i => this.resetItem(i));
  }

  collapseAll(items: NbMenuItem[], tag: string, except?: NbMenuItem) {
    items.forEach(i => this.collapseItem(i, tag, except));
  }

  onAddItem(): Observable<{ tag: string; items: NbMenuItem[] }> {
    return addItems$.pipe(share());
  }

  onNavigateHome(): Observable<{ tag: string }> {
    return navigateHome$.pipe(share());
  }

  onGetSelectedItem(): Observable<{ tag: string; listener: BehaviorSubject<NbMenuBag> }> {
    return getSelectedItem$.pipe(share());
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

  private isParent(parent, child) {
    return child.parent
      ? child.parent === parent || this.isParent(parent, child.parent)
      : false;
  }

  private collapseItem(item: NbMenuItem, tag: string, except?: NbMenuItem) {
    if (except && (item === except || this.isParent(item, except))) {
      return;
    }

    const wasExpanded = item.expanded;
    item.expanded = false;
    if (wasExpanded) {
      this.submenuToggle(item);
    }

    item.children && item.children.forEach(child => this.collapseItem(child, tag));
  }

  private applyDefaults(item, defaultItem) {
    const menuItem = {...item};
    Object.assign(item, defaultItem, menuItem);
    item.children && item.children.forEach(child => {
      this.applyDefaults(child, defaultItem);
    })
  }

  private setParent(item: NbMenuItem) {
    item.children && item.children.forEach(child => {
      child.parent = item;
      this.setParent(child);
    });
  }

  selectItem(item: NbMenuItem, tag: string) {
    item.selected = true;
    this.itemSelect(item, tag);
    this.selectParent(item, tag);
  }

  private selectParent({ parent: item }: NbMenuItem, tag: string) {
    if (!item) {
      return;
    }

    if (!item.expanded) {
      item.expanded = true;
      this.submenuToggle(item, tag);
    }

    item.selected = true;
    this.selectParent(item, tag);
  }

  private selectItemByUrl(item: NbMenuItem, tag: string) {
    const wasSelected = item.selected;
    const isSelected = this.selectedInUrl(item);
    if (!wasSelected && isSelected) {
      this.selectItem(item, tag);
    }
    if (item.children) {
      this.updateSelection(item.children, tag);
    }
  }

  private selectedInUrl(item: NbMenuItem): boolean {
    const exact: boolean = item.pathMatch === 'full';
    return exact
      ? isUrlPathEqual(this.location.path(), item.link)
      : isUrlPathContain(this.location.path(), item.link);
  }
}
