/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { List } from 'immutable';
import 'rxjs/add/operator/publish';

const itemClick$ = new ReplaySubject(1);
const addItems$ = new ReplaySubject(1);
const navigateHome$ = new ReplaySubject(1);
const getSelectedItem$ = new ReplaySubject(1);
const itemSelect$ = new ReplaySubject(1);
const itemHover$ = new ReplaySubject(1);
const submenuToggle$ = new ReplaySubject(1);

export abstract class NbMenuItem {
  title: string;
  link?: string;
  url?: string;
  icon?: string;
  expanded?: boolean;
  children?: List<NbMenuItem>;
  target?: string;
  hidden?: boolean;
  pathMath?: string = 'full'; // TODO: is not set if item is initialized by default, should be set anyway
  home?: boolean;
  group?: boolean;
  parent?: NbMenuItem;
  selected?: boolean;
  data?: any;
  fragment?: string;
}

export interface NbMenuOptions {
  items?: List<NbMenuItem>;
}

export const nbMenuOptionsToken = new InjectionToken<NbMenuOptions>('NB_MENU_OPTIONS');

// TODO: map select events to router change events
@Injectable()
export class NbMenuService {
  addItems(items: List<NbMenuItem>, tag?: string) {
    addItems$.next({ tag, items });
  }

  navigateHome(tag?: string) {
    navigateHome$.next({ tag });
  }

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
  private stack = List<NbMenuItem>();

  private items = List<NbMenuItem>();

  constructor(private router: Router, private location: Location, @Inject(nbMenuOptionsToken) private options: any) {
    if (options && options.items) {
      this.items = List<NbMenuItem>(this.options.items);
    } else {
      this.items = List<NbMenuItem>();
    }
  }

  getItems(): List<NbMenuItem> {
    return List<NbMenuItem>(this.items);
  }

  prepareItems(items: List<NbMenuItem>) {
    items.forEach(i => this.setParent(i));
    items.forEach(i => this.prepareItem(i));

    this.clearStack();
  }

  onAddItem(): Observable<{ tag: string; items: List<NbMenuItem> }> {
    return addItems$.publish().refCount();
  }

  onNavigateHome(): Observable<{ tag: string }> {
    return navigateHome$.publish().refCount();
  }

  onGetSelectedItem(): Observable<{ tag: string; listener: BehaviorSubject<{ tag: string; item: NbMenuItem }> }> {
    return getSelectedItem$.publish().refCount();
  }

  itemHover(item: NbMenuItem, tag?: string) {
    itemHover$.next({
      tag,
      item,
    });
  }

  submenuToggle(item: NbMenuItem, tag?: string) {
    submenuToggle$.next({
      tag,
      item,
    });
  }

  resetItems(items: List<NbMenuItem>) {
    items.forEach(i => this.resetItem(i));

    this.clearStack();
  }

  itemSelect(item: NbMenuItem, tag?: string) {
    itemSelect$.next({
      tag,
      item,
    });
  }

  itemClick(item: NbMenuItem, tag?: string) {
    itemClick$.next({
      tag,
      item,
    });
  }

  collapseAll(items: List<NbMenuItem>, except?: NbMenuItem) {
    items.forEach(i => this.collapseItem(i, except));

    this.clearStack();
  }

  private resetItem(parent: NbMenuItem) {
    parent.selected = false;

    this.stack = this.stack.push(parent);

    if (parent.children && parent.children.size > 0) {
      const firstSelected = parent.children.filter((c: NbMenuItem) => !this.stack.contains(c)).first();

      if (firstSelected) {
        firstSelected.selected = false;

        this.resetItem(firstSelected);
      }
    }

    if (parent.parent) {
      this.resetItem(parent.parent);
    }
  }

  private collapseItem(parent: NbMenuItem, except?: NbMenuItem) {
    if (parent === except) {
      return;
    }

    parent.expanded = false;

    this.stack = this.stack.push(parent);

    if (parent.children && parent.children.size > 0) {
      const firstSelected = parent.children.filter((c: NbMenuItem) => !this.stack.contains(c)).first();

      if (firstSelected) {
        firstSelected.expanded = false;

        this.collapseItem(firstSelected);
      }
    }

    if (parent.parent) {
      this.collapseItem(parent.parent);
    }
  }

  private setParent(parent: NbMenuItem) {
    if (parent.children && parent.children.size > 0) {
      const firstItemWithoutParent = parent.children.filter(c => c.parent === null || c.parent === undefined).first();

      if (firstItemWithoutParent) {
        firstItemWithoutParent.parent = parent;

        this.setParent(firstItemWithoutParent);
      }
    }

    if (parent.parent) {
      this.setParent(parent.parent);
    }
  }

  private prepareItem(parent: NbMenuItem) {
    parent.selected = false;

    this.stack = this.stack.push(parent);

    if (parent.expanded) {
      if (parent.parent) {
        parent.parent.expanded = true;
      }
    }

    const exact: boolean = parent.pathMath === 'full';
    const location: string = this.location.path();

    if ((exact && location === parent.link) || (!exact && location.includes(parent.link))
      || (exact && parent.fragment && location.substr(location.indexOf('#') + 1).includes(parent.fragment))) {

      parent.selected = true;

      if (parent.parent) {
        parent.parent.expanded = true;
      }
    }

    if (parent.children && parent.children.size > 0) {
      const firstUnchecked = parent.children.filter((c: NbMenuItem) => !this.stack.contains(c)).first();

      if (firstUnchecked) {
        this.prepareItem(firstUnchecked);
      }
    }

    if (parent.parent) {
      this.prepareItem(parent.parent);
    }
  }

  private clearStack() {
    this.stack = this.stack.clear();
  }
}
