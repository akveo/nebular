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
  AfterViewInit,
  Inject,
  DoCheck,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { takeWhile, filter, map } from 'rxjs/operators';
import { NbMenuInternalService, NbMenuItem, NbMenuBag, NbMenuService } from './menu.service';
import { convertToBoolProperty } from '../helpers';
import { NB_WINDOW } from '../../theme.options';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NbLayoutDirectionService } from '../../services/direction.service';

export enum NbToggleStates {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
}

@Component({
  selector: '[nbMenuItem]',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('toggle', [
      state(NbToggleStates.Collapsed, style({ height: '0', margin: '0' })),
      state(NbToggleStates.Expanded, style({ height: '*' })),
      transition(`${NbToggleStates.Collapsed} <=> ${NbToggleStates.Expanded}`, animate(300)),
    ]),
  ],
})
export class NbMenuItemComponent implements DoCheck, AfterViewInit, OnDestroy {
  @Input() menuItem = <NbMenuItem>null;

  @Output() hoverItem = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();
  @Output() selectItem = new EventEmitter<any>();
  @Output() itemClick = new EventEmitter<any>();

  protected alive = true;
  toggleState: NbToggleStates;

  constructor(protected menuService: NbMenuService,
              protected directionService: NbLayoutDirectionService) {}

  ngDoCheck() {
    this.toggleState = this.menuItem.expanded ? NbToggleStates.Expanded : NbToggleStates.Collapsed;
  }

  ngAfterViewInit() {
    this.menuService.onSubmenuToggle()
      .pipe(
        takeWhile(() => this.alive),
        filter(({ item }) => item === this.menuItem),
        map(({ item }: NbMenuBag) => item.expanded),
      )
      .subscribe(isExpanded => this.toggleState = isExpanded ? NbToggleStates.Expanded : NbToggleStates.Collapsed);
  }

  ngOnDestroy() {
    this.alive = false;
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

  getExpandStateIcon(): string {
    if (this.menuItem.expanded) {
      return 'chevron-down-outline';
    }

    return this.directionService.isLtr()
      ? 'chevron-left-outline'
      : 'chevron-right-outline';
  }
}

/**
 * Vertical menu component.
 *
 * Accepts a list of menu items and renders them accordingly. Supports multi-level menus.
 *
 * Basic example
 * @stacked-example(Showcase, menu/menu-showcase.component)
 *
 * ```ts
 * // ...
 * items: NbMenuItem[] = [
 *  {
 *    title: home,
 *    link: '/'
 *  },
 *  {
 *    title: dashboard,
 *    link: 'dashboard'
 *  }
 * ];
 * // ...
 * <nb-menu [items]="items"></nb-menu>
 * ```
 * ### Installation
 *
 * Import `NbMenuModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbMenuModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 * and `NbMenuModule` to your feature module where the component should be shown:
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbMenuModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Two-level menu example
 * @stacked-example(Two Levels, menu/menu-children.component)
 *
 *
 * Autocollapse menu example
 * @stacked-example(Autocollapse Menu, menu/menu-autocollapse.component)
 *
 *
 * @styles
 *
 * menu-background-color:
 * menu-text-color:
 * menu-text-font-family:
 * menu-text-font-size:
 * menu-text-font-weight:
 * menu-text-line-height:
 * menu-group-text-color:
 * menu-item-border-radius:
 * menu-item-padding:
 * menu-item-hover-background-color:
 * menu-item-hover-cursor:
 * menu-item-hover-text-color:
 * menu-item-icon-hover-color:
 * menu-item-active-background-color:
 * menu-item-active-text-color:
 * menu-item-icon-active-color:
 * menu-item-icon-color:
 * menu-item-icon-margin:
 * menu-item-icon-width:
 * menu-item-divider-color:
 * menu-item-divider-style:
 * menu-item-divider-width:
 * menu-submenu-background-color:
 * menu-submenu-text-color:
 * menu-submenu-margin:
 * menu-submenu-padding:
 * menu-submenu-item-border-color:
 * menu-submenu-item-border-style:
 * menu-submenu-item-border-width:
 * menu-submenu-item-border-radius:
 * menu-submenu-item-padding:
 * menu-submenu-item-hover-background-color:
 * menu-submenu-item-hover-border-color:
 * menu-submenu-item-hover-text-color:
 * menu-submenu-item-icon-hover-color:
 * menu-submenu-item-active-background-color:
 * menu-submenu-item-active-border-color:
 * menu-submenu-item-active-text-color:
 * menu-submenu-item-icon-active-color:
 * menu-submenu-item-active-hover-background-color:
 * menu-submenu-item-active-hover-border-color:
 * menu-submenu-item-active-hover-text-color:
 * menu-submenu-item-icon-active-hover-color:
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
   * Collapse all opened submenus on the toggle event
   * Default value is "false"
   * @type boolean
   */
  @Input()
  get autoCollapse(): boolean {
    return this._autoCollapse;
  }
  set autoCollapse(value: boolean) {
    this._autoCollapse = convertToBoolProperty(value);
  }
  protected _autoCollapse: boolean = false;

  protected alive: boolean = true;

  constructor(@Inject(NB_WINDOW) protected window,
              @Inject(PLATFORM_ID) protected platformId,
              protected menuInternalService: NbMenuInternalService,
              protected router: Router) {
  }

  ngOnInit() {
    this.menuInternalService.prepareItems(this.items);

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

    this.menuInternalService
      .onCollapseAll()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string }) => this.compareTag(data.tag)),
      )
      .subscribe(() => this.collapseAll());

    this.router.events
      .pipe(
        takeWhile(() => this.alive),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse);
      });
  }

  ngAfterViewInit() {
    setTimeout(() => this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse));
  }

  onAddItem(data: { tag: string; items: NbMenuItem[] }) {
    this.items.push(...data.items);

    this.menuInternalService.prepareItems(this.items);
    this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse);
  }

  onHoverItem(item: NbMenuItem) {
    this.menuInternalService.itemHover(item, this.tag);
  }

  onToggleSubMenu(item: NbMenuItem) {
    if (this.autoCollapse) {
      this.menuInternalService.collapseAll(this.items, this.tag, item);
    }
    item.expanded = !item.expanded;
    this.menuInternalService.submenuToggle(item, this.tag);
  }

  // TODO: is not fired on page reload
  onSelectItem(item: NbMenuItem) {
    this.menuInternalService.selectItem(item, this.items, this.autoCollapse, this.tag);
  }

  onItemClick(item: NbMenuItem) {
    this.menuInternalService.itemClick(item, this.tag);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  protected navigateHome() {
    const homeItem = this.getHomeItem(this.items);

    if (homeItem) {
      if (homeItem.link) {
        this.router.navigate([homeItem.link], { queryParams: homeItem.queryParams, fragment: homeItem.fragment });
      }

      if (homeItem.url && isPlatformBrowser(this.platformId)) {
        this.window.location.href = homeItem.url;
      }
    }
  }

  protected collapseAll() {
    this.menuInternalService.collapseAll(this.items, this.tag);
  }

  protected getHomeItem(items: NbMenuItem[]): NbMenuItem {
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

  protected compareTag(tag: string) {
    return !tag || tag === this.tag;
  }

  protected getSelectedItem(items: NbMenuItem[]): NbMenuItem {
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
