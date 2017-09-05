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

  @Input() tag: string;
  @Input() items: NbMenuItem[];

  /**
   * Makes colors inverse based on current theme
   * @type boolean
   */
  @Input()
  set inverse(val: boolean) {
    this.inverseValue = convertToBoolProperty(val);
  }

  private stack: NbMenuItem[] = [];
  private alive: boolean = true;

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
        let selectedItem: NbMenuItem;
        this.items.forEach(i => {
          const result = this.getSelectedItem(i);

          if (result) {
            selectedItem = result;
            return;
          }
        });

        this.clearStack();

        data.listener.next({ tag: this.tag, item: selectedItem });
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
    // TODO: make this optional
    this.menuInternalService.collapseAll(this.items, item);
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
    let homeItem: NbMenuItem;
    this.items.forEach(i => {
      const result = this.getHomeItem(i);

      if (result) {
        homeItem = result;
      }
    });
    this.clearStack();

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

  private getHomeItem(parent: NbMenuItem): NbMenuItem {
    this.stack.push(parent);

    if (parent.home) {
      return parent;
    }

    if (parent.children && parent.children.length > 0) {
      const first = parent.children.filter(c => !this.stack.includes(c))[0];

      if (first) {
        return this.getHomeItem(first);
      }
    }

    if (parent.parent) {
      return this.getHomeItem(parent.parent);
    }
  }

  private clearStack() {
    this.stack = [];
  }

  private compareTag(tag: string) {
    return !tag || tag === this.tag;
  }

  private getSelectedItem(parent: NbMenuItem): NbMenuItem {
    this.stack.push(parent);

    if (parent.selected) {
      return parent;
    }

    if (parent.children && parent.children.length > 0) {
      const first = parent.children.filter(c => !this.stack.includes(c))[0];

      if (first) {
        return this.getSelectedItem(first);
      }
    }

    if (parent.parent) {
      return this.getSelectedItem(parent.parent);
    }
  }
}
