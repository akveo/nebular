import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbSidebarComponent,
  NbMenuModule,
  NbMenuItem,
  NbSidebarModule,
  NbMenuComponent,
  NbThemeModule,
  NbMenuItemComponent,
  NbIconComponent, NbSidebarService,
} from '@nebular/theme';

@Component({
  template: `
    <nb-sidebar>
      <button id="button-outside-menu"></button>
      <nb-menu [items]="menuItems"></nb-menu>
    </nb-sidebar>
  `,
})
export class SidebarExpandTestComponent {
  menuItems: NbMenuItem[] = [
    {
      title: 'no children',
    },
    {
      title: 'parent',
      children: [ { title: 'child' } ],
    },
    {
      title: 'group',
      group: true,
    },
  ];
}

describe('NbSidebarComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule,
        NbThemeModule.forRoot(),
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
      ],
      declarations: [ SidebarExpandTestComponent ],
    });
  });

  describe('States (expanded, collapsed, compacted)', () => {
    let fixture: ComponentFixture<SidebarExpandTestComponent>;
    let sidebarComponent: NbSidebarComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(SidebarExpandTestComponent);
      fixture.detectChanges();

      sidebarComponent = fixture.debugElement.query(By.directive(NbSidebarComponent)).componentInstance;
    });

    it(`should collapse when collapse method called`, () => {
      sidebarComponent.collapse();
      fixture.detectChanges();

      expect(sidebarComponent.expanded).toEqual(false);
    });

    it('should become compacted when compact method called', () => {
      sidebarComponent.compact();
      fixture.detectChanges();

      expect(sidebarComponent.compacted).toEqual(true);
    });

    it('should not expand when clicked outside menu', () => {
      const buttonOutsideMenu: DebugElement = fixture.debugElement.query(By.css('#button-outside-menu'));
      sidebarComponent.compact();
      fixture.detectChanges();

      buttonOutsideMenu.nativeElement.click();
      fixture.detectChanges();

      expect(sidebarComponent.compacted).toEqual(true);
    });

    it('should not expand when clicked on menu item without children', () => {
      sidebarComponent.compact();
      fixture.detectChanges();

      const menuItemWithNoChildren: DebugElement = fixture.debugElement.query(By.directive(NbMenuComponent));
      menuItemWithNoChildren.nativeElement.click();
      fixture.detectChanges();

      expect(sidebarComponent.compacted).toEqual(true);
    });

    it('should not expand when clicked on menu group', () => {
      sidebarComponent.compact();
      fixture.detectChanges();

      const menuGroup: DebugElement = fixture.debugElement.queryAll(By.directive(NbMenuItemComponent))[3];
      menuGroup.query(By.css('span')).nativeElement.click();
      fixture.detectChanges();

      expect(sidebarComponent.compacted).toEqual(true);
    });

    it('should expand when icon of menu item with child items clicked', () => {
      sidebarComponent.compact();
      fixture.detectChanges();

      const menuItemWithChildren: DebugElement = fixture.debugElement.queryAll(By.directive(NbMenuItemComponent))[1];
      menuItemWithChildren.query(By.directive(NbIconComponent)).nativeElement.click();
      fixture.detectChanges();

      expect(sidebarComponent.expanded).toEqual(true);
    });

    it('should expand when link of menu item with child items clicked', () => {
      sidebarComponent.compact();
      fixture.detectChanges();

      const menuItemWithChildren: DebugElement = fixture.debugElement.queryAll(By.directive(NbMenuItemComponent))[1];
      menuItemWithChildren.query(By.css('a')).nativeElement.click();
      fixture.detectChanges();

      expect(sidebarComponent.expanded).toEqual(true);
    });

    it('should compact when sidebar service compact method called', () => {
      const sidebarService: NbSidebarService = TestBed.get(NbSidebarService);

      expect(sidebarComponent.compacted).toEqual(false);

      sidebarService.compact();
      fixture.detectChanges();

      expect(sidebarComponent.compacted).toEqual(true);
    });
  });
});
