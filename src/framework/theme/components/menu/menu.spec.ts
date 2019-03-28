/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';
import { NbMenuModule } from './menu.module';
import { NbMenuBag, NbMenuItem, NbMenuService } from './menu.service';
import { NbThemeModule } from '../../theme.module';
import { getFragmentPartOfUrl, isFragmentEqual, isUrlPathContain, isUrlPathEqual } from './url-matching-helpers';
import { pairwise, take } from 'rxjs/operators';
import { NbMenuComponent } from './menu.component';


@Component({
  template: `<nb-menu [items]="items" [tag]="menuTag"></nb-menu>`,
})
export class SingleMenuTestComponent {
  constructor (public menuPublicService: NbMenuService) {}
  @Input() items: NbMenuItem[];
  @Input() menuTag: string;
  @ViewChild(NbMenuComponent) menuComponent: NbMenuComponent;
}

@Component({
  template: `
    <nb-menu [items]="firstMenuItems" [tag]="firstMenuTag"></nb-menu>
    <nb-menu [items]="secondMenuItems" [tag]="secondMenuTag"></nb-menu>
  `,
})
export class DoubleMenusTestComponent {
  constructor (public menuPublicService: NbMenuService) {}
  @Input() firstMenuItems: NbMenuItem[];
  @Input() secondMenuItems: NbMenuItem[];
  @Input() firstMenuTag: string;
  @Input() secondMenuTag: string;
  @ViewChildren(NbMenuComponent) menuComponent: QueryList<NbMenuComponent>;
}

function createTestBed() {
  TestBed.configureTestingModule({
    imports: [
      NbThemeModule.forRoot(),
      NbMenuModule.forRoot(),
      RouterTestingModule.withRoutes([]),
      NoopAnimationsModule,
    ],
    declarations: [SingleMenuTestComponent, DoubleMenusTestComponent],
    providers: [NbMenuService],
  });
}

function createSingleMenuComponent(menuItems, menuTag = 'menu') {
  createTestBed();
  const fixture = TestBed.createComponent( SingleMenuTestComponent );
  fixture.componentInstance.items = menuItems;
  fixture.componentInstance.menuTag = menuTag;
  const menuService = fixture.componentInstance.menuPublicService;
  fixture.detectChanges();
  return { fixture, menuService };
}

function createDoubleMenuComponent( firstMenuItems, firstMenuTag, secondMenuItems, secondMenuTag ) {
  createTestBed();
  const fixture = TestBed.createComponent( DoubleMenusTestComponent );
  fixture.componentInstance.firstMenuItems = firstMenuItems;
  fixture.componentInstance.secondMenuItems = secondMenuItems;
  fixture.componentInstance.firstMenuTag = firstMenuTag;
  fixture.componentInstance.secondMenuTag = secondMenuTag;
  const menuService = fixture.componentInstance.menuPublicService;
  fixture.detectChanges();
  return { fixture, menuService };
}

describe('NbMenuItem', () => {

  it('should set tag attribute for menu services', () => {
    const { fixture } = createSingleMenuComponent([{ title: 'Home' }], 'menu');
    const nbMenuTag = fixture.componentInstance.menuComponent.tag;
    expect(nbMenuTag).toEqual('menu');
  });

  it('should set icon to menu item', () => {
    const { fixture } = createSingleMenuComponent([{ title: 'Home', icon: 'test-icon' }]);
    const iconWrapper = fixture.nativeElement.querySelector('.menu-icon');
    expect(iconWrapper.classList).toContain('test-icon');
  });

  it('should set title to menu item', () => {
    const { fixture } = createSingleMenuComponent([{ title: 'Test title' }]);
    const titleWrapper = fixture.nativeElement.querySelector('.menu-title').innerHTML;
    expect(titleWrapper).toEqual('Test title');
  });

  it('should set link target to menu item', () => {
    const { fixture } = createSingleMenuComponent([
      { title: 'Link with _blank target', target: '_blank' },
      { title: 'Link with _self target', target: '_self' },
      { title: 'Link with any not valid target', target: 'anyNotValid' },
    ]);
    const menuLinks = fixture.nativeElement.querySelectorAll('a');
    expect(menuLinks[0].getAttribute('target')).toEqual('_blank');
    expect(menuLinks[1].getAttribute('target')).toEqual('_self');
    expect(menuLinks[2].getAttribute('target')).toEqual('anyNotValid');
  });

  it('should have only span, without link on group element', () => {
    const { fixture } = createSingleMenuComponent([{ title: 'Group item', group: true }]);
    const menuItem = fixture.nativeElement.querySelector('.menu-item');
    expect(menuItem.querySelector('a')).toBeNull();
    expect(menuItem.querySelector('span')).not.toBeNull();
  });

  it('should not render hidden element', () => {
    const { fixture } = createSingleMenuComponent([
      { title: 'Visible item' },
      { title: 'Hidden item', hidden: true },
      { title: 'Visible item' },
    ]);
    const menuList = fixture.nativeElement.querySelectorAll('.menu-item');
    expect(menuList.length).toEqual(2);
  });

  it('should set child menu items', () => {
    const { fixture } = createSingleMenuComponent([
      {
        title: 'Parent item',
        expanded: true,
        children: [{ title: 'Child item' }],
      },
    ]);
    const parentItem = fixture.nativeElement.querySelector('.menu-item');
    expect(parentItem.querySelector('ul.menu-items')).not.toBeNull();
  });

  it('should expand child menu items', () => {
    const { fixture } = createSingleMenuComponent([
      { title: 'Parent item', expanded: true, children: [{  title: 'Child item' }] },
    ]);
    const childList = fixture.nativeElement.querySelector('.menu-item > ul.menu-items');
    expect(childList.classList).toContain('expanded');
  });

  it('should set URL', () => {
    const { fixture } = createSingleMenuComponent([{ title: 'Menu Item with link', url: 'https://test.link' }]);
    const menuItem = fixture.nativeElement.querySelector('.menu-item');
    expect(menuItem.querySelector('a').getAttribute('href')).toEqual('https://test.link');
  });

  it('should set selected item', () => {
    const selectedItem = { title: 'Menu item selected', selected: true };
    const { fixture } = createSingleMenuComponent([
      { title: 'Menu item not selected' }, selectedItem,
    ]);
    const activeItem = fixture.nativeElement.querySelector('a.active');
    expect(activeItem.querySelector('span').innerHTML).toEqual(selectedItem.title);
  });

});

describe('menu services', () => {

  it('should operate with menu by tag', () => {
    const { fixture, menuService } = createDoubleMenuComponent(
      [{ title: 'Home'}],
      'menuFirst',
      [{ title: 'Home'}],
      'menuSecond' );
    const itemToAdd = { title: 'Added item' };
    const initialFirstMenuItemsCount = fixture.nativeElement
      .querySelector('nb-menu:first-child')
      .querySelectorAll('.menu-item')
      .length;
    const initialSecondMenuItemsCount = fixture.nativeElement
      .querySelector('nb-menu:last-child')
      .querySelectorAll('.menu-item')
      .length;
    menuService.addItems([itemToAdd], 'menuFirst');
    fixture.detectChanges();
    const afterAddFirstMenuItemsCount = fixture.nativeElement
      .querySelector('nb-menu:first-child')
      .querySelectorAll('.menu-item')
      .length;
    const afterAddSecondMenuItemsCount = fixture.nativeElement
      .querySelector('nb-menu:last-child')
      .querySelectorAll('.menu-item')
      .length;
    expect(afterAddFirstMenuItemsCount).toEqual(initialFirstMenuItemsCount + 1);
    expect(afterAddSecondMenuItemsCount).toEqual(initialSecondMenuItemsCount);
  });

  it('should add new items to DOM', () => {
    const { fixture, menuService } = createSingleMenuComponent([{ title: 'Existing item' }]);
    const itemToAdd = { title: 'Added item' };
    const menuListOnInit = fixture.nativeElement.querySelectorAll('li').length;
    menuService.addItems([itemToAdd], 'menu');
    fixture.detectChanges();
    const menuListItemAdded = fixture.nativeElement.querySelectorAll('li').length;
    expect(menuListItemAdded).toEqual(menuListOnInit + 1);
  });

  it('should get selected menu item', (done) => {
    const selectedItem = { title: 'Menu item selected', selected: true };
    const { menuService } = createSingleMenuComponent([{ title: 'Menu item not selected' }, selectedItem ]);
    menuService.getSelectedItem('menu')
      .pipe(take(1))
      .subscribe((menuBag: NbMenuBag) => {
        expect(menuBag.item.title).toEqual(selectedItem.title);
        done();
      });
  }, 1000);

  it('should hide all expanded menu items', (done) => {
    const { fixture, menuService } = createSingleMenuComponent([
      {
        title: 'Menu item collapsed',
        children: [{ title: 'Menu item inner' }],
      },
      {
        title: 'Menu item expanded 1',
        expanded: true,
        children: [{ title: 'Menu item inner' }],
      },
      {
        title: 'Menu item expanded 2',
        expanded: true,
        children: [{ title: 'Menu item inner' }],
      },
    ]);
    menuService.onSubmenuToggle()
      .pipe(pairwise(), take(1))
      .subscribe(([menuBagFirstCollapsed, menuBagSecondCollapsed]: NbMenuBag[]) => {
        expect(menuBagFirstCollapsed.item.title).toEqual('Menu item expanded 1');
        expect(menuBagSecondCollapsed.item.title).toEqual('Menu item expanded 2');
        done();
      });
    menuService.collapseAll();
    fixture.detectChanges();
  }, 1000);

});

describe('menu URL helpers', () => {

  it('isUrlPathContain should work by url segments', () => {
    expect(isUrlPathContain('/a/ba', '/a/b')).toBeFalsy();
    expect(isUrlPathContain('/a/b/c', '/a/b')).toBeTruthy();
  });

  it('isUrlPathContain should work for url with fragments', () => {
    expect(isUrlPathContain('/a/b#fragment', '/a/b')).toBeTruthy();
  });

  it('isUrlPathContain should work for url with query strings', () => {
    expect(isUrlPathContain('/a/b?a=1;b=2&c=3', '/a/b')).toBeTruthy();
  });

  it('isUrlPathEqual should work for identical paths', () => {
    expect(isUrlPathEqual('/a/b/c', '/a/b')).toBeFalsy();
    expect(isUrlPathEqual('/a/b/c', '/a/b/c')).toBeTruthy();
  });

  it('isUrlPathEqual should work for url with fragments', () => {
    expect(isUrlPathEqual('/a/b/c#fragment', '/a/b/c')).toBeTruthy();
  });

  it('isUrlPathEqual should work for url with query strings', () => {
    expect(isUrlPathEqual('/a/b/c?a=1;b=2&c=3', '/a/b/c')).toBeTruthy();
  });

  it('getFragmentPartOfUrl should return empty string for path without fragment', () => {
    expect(getFragmentPartOfUrl('/a/b')).toBeFalsy();
    expect(getFragmentPartOfUrl('/a/b/c?a=1;b=2&c=3')).toBeFalsy();
  });

  it('getFragmentPartOfUrl should return fragment part when it presented', () => {
    expect(getFragmentPartOfUrl('/a/b#f')).toEqual('f');
    expect(getFragmentPartOfUrl('/a/b/c?a=1;b=2&c=3#fragment')).toEqual('fragment');
  });

  it('isFragmentEqual should return false for path without fragments', () => {
    expect(isFragmentEqual('/a/b', 'fragment')).toBeFalsy();
    expect(isFragmentEqual('/a/b/c?a=1;b=2&c=3', 'fragment')).toBeFalsy();
  });

  it('isFragmentEqual should return false for path with different fragments', () => {
    expect(isFragmentEqual('/a/b#f', 'fragment')).toBeFalsy();
    expect(isFragmentEqual('/a/b/c?a=1;b=2&c=3#f', 'fragment')).toBeFalsy();
  });

  it('isFragmentEqual should return true for path with same fragments', () => {
    expect(isFragmentEqual('/a/b#fragment', 'fragment')).toBeTruthy();
    expect(isFragmentEqual('/a/b/c?a=1;b=2&c=3#fragment', 'fragment')).toBeTruthy();
  });

});
