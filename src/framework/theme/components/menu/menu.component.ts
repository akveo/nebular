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
  OnInit,
  OnDestroy,
  HostBinding,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';

import { NbMenuInternalService, NbMenuItem, NbMenuService, NbMenuBag } from './menu.service';
import { convertToBoolProperty, getElementHeight } from '../helpers';
import { NB_WINDOW } from '../../theme.options';

function sumSubmenuHeight(item: NbMenuItem) {
  return item.expanded
    ? (item.subMenuHeight || 0) + item.children.filter(c => c.children).reduce((acc, c) => acc + sumSubmenuHeight(c), 0)
    : 0;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[nbMenuItem]',
  templateUrl: './menu-item.component.html',
})
export class NbMenuItemComponent implements AfterViewInit, OnDestroy {
  @Input() menuItem = <NbMenuItem>null;

  @Output() hoverItem = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();
  @Output() selectItem = new EventEmitter<any>();
  @Output() itemClick = new EventEmitter<any>();

  private alive: boolean = true;

  @ViewChildren(NbMenuItemComponent, { read: ElementRef }) subMenu: QueryList<ElementRef>;
  maxHeight: number = 0;

  constructor(
    private menuService: NbMenuService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetection: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    this.subMenu.changes
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.updateSubmenuHeight();
        this.updateMaxHeight();
      });

    this.menuService.onSubmenuToggle()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.updateMaxHeight());

    this.updateSubmenuHeight();
    this.updateMaxHeight();
    this.changeDetection.detectChanges();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  updateSubmenuHeight() {
    if (isPlatformBrowser(this.platformId)) {
      this.menuItem.subMenuHeight = this.subMenu.reduce(
        (acc, c) => acc + getElementHeight(c.nativeElement),
        0,
      );
    }
  }

  updateMaxHeight() {
    this.maxHeight = sumSubmenuHeight(this.menuItem);
  }

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
 * @example Basic usage
 *
 * ```
 * // ...
 * menuItems: NbMenuItem[] = [{ title: home, link: '/' }, { title: dashboard, link: 'dashboard' }];
 * // ...
 * <nb-menu [items]="menuItems"></nb-menu>
 * ```
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
      <ng-container *ngFor="let item of items">
        <li nbMenuItem *ngIf="!item.hidden"
            [menuItem]="item"
            [class.menu-group]="item.group"
            (hoverItem)="onHoverItem($event)"
            (toggleSubMenu)="onToggleSubMenu($event)"
            (selectItem)="onSelectItem($event)"
            (itemClick)="onItemClick($event)"
            class="menu-item">
        </li>
      </ng-container>
    </ul>
  `,
})
export class NbMenuComponent implements OnInit, AfterViewInit, OnDestroy {
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

  constructor(@Inject(NB_WINDOW) private window,
              private menuInternalService: NbMenuInternalService,
              private router: Router) {
  }

  ngOnInit() {
    this.menuInternalService
      .onAddItem()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string; items: NbMenuItem[] }) => this.compareTag(data.tag)),
      )
      .subscribe(data => this.onAddItem(data));

    this.menuInternalService
      .onNavigateHome()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string; items: NbMenuItem[] }) => this.compareTag(data.tag)),
      )
      .subscribe(() => this.navigateHome());

    this.menuInternalService
      .onGetSelectedItem()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string; listener: BehaviorSubject<NbMenuBag> }) => this.compareTag(data.tag)),
      )
      .subscribe((data: { tag: string; listener: BehaviorSubject<NbMenuBag> }) => {
        data.listener.next({ tag: this.tag, item: this.getSelectedItem(this.items) });
      });

    this.router.events
      .pipe(
        takeWhile(() => this.alive),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.menuInternalService.resetItems(this.items);
        this.menuInternalService.updateSelection(this.items, this.tag, this.autoCollapseValue)
      });

    // TODO: this probably won't work if you pass items dynamically into items input
    this.menuInternalService.prepareItems(this.items);
    this.items.push(...this.menuInternalService.getItems());
  }

  ngAfterViewInit() {
    setTimeout(() => this.menuInternalService.updateSelection(this.items, this.tag));
  }

  onAddItem(data: { tag: string; items: NbMenuItem[] }) {
    this.items.push(...data.items);

    this.menuInternalService.prepareItems(this.items);
    this.menuInternalService.updateSelection(this.items, this.tag, this.autoCollapseValue);
  }

  onHoverItem(item: NbMenuItem) {
    this.menuInternalService.itemHover(item, this.tag);
  }

  onToggleSubMenu(item: NbMenuItem) {
    if (this.autoCollapseValue) {
      this.menuInternalService.collapseAll(this.items, this.tag, item);
    }
    item.expanded = !item.expanded;
    this.menuInternalService.submenuToggle(item, this.tag);
  }

  // TODO: is not fired on page reload
  onSelectItem(item: NbMenuItem) {
    this.menuInternalService.resetItems(this.items);
    this.menuInternalService.selectItem(item, this.tag);
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
      if (homeItem.link) {
        this.router.navigate([homeItem.link], { queryParams: homeItem.queryParams, fragment: homeItem.fragment });
      }

      if (homeItem.url) {
        this.window.location.href = homeItem.url;
      }
    }
  }

  private getHomeItem(items: NbMenuItem[]): NbMenuItem {
    for (const item of items) {
      if (item.home) {
        return item;
      }

      const homeItem = item.children && this.getHomeItem(item.children);
      if (homeItem) {
        return homeItem;
      }
    }
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
