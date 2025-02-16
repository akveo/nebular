import { Component, DebugElement, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Subject } from 'rxjs';
import { pairwise, startWith } from 'rxjs/operators';
import {
  NbSidebarComponent,
  NbMenuModule,
  NbMenuItem,
  NbSidebarModule,
  NbMenuComponent,
  NbThemeModule,
  NbMenuItemComponent,
  NbIconComponent,
  NbSidebarService,
  NbSidebarState,
  NbMediaBreakpoint,
  NbThemeService,
  NbMediaBreakpointsService,
  NbSidebarResponsiveState,
} from '@nebular/theme';

@Component({
    template: `
    <nb-sidebar [responsive]="responsive" [state]="state">
      <button id="button-outside-menu"></button>
      <nb-menu [items]="menuItems"></nb-menu>
    </nb-sidebar>
  `,
    standalone: false
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

  responsive = false;
  state: NbSidebarState = 'expanded';
}

@Injectable()
export class MockThemeService {
  private breakpoint$ = new Subject<NbMediaBreakpoint>();

  constructor(private breakpointsService: NbMediaBreakpointsService) {
  }

  setBreakpointTo(breakpointName: string): void {
    this.breakpoint$.next(this.breakpointsService.getByName(breakpointName));
  }

  onMediaQueryChange(): Observable<NbMediaBreakpoint[]> {
    const breakpoints = this.breakpointsService.getBreakpoints();
    const largestBreakpoint = breakpoints[breakpoints.length - 1];

    return this.breakpoint$
      .pipe(
        startWith({ name: 'unknown', width: undefined }, largestBreakpoint),
        pairwise(),
      );
  }
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
      providers: [
        MockThemeService,
        { provide: NbThemeService, useExisting: MockThemeService },
      ],
      declarations: [ SidebarExpandTestComponent ],
    });
  });

  describe('States (expanded, collapsed, compacted)', () => {
    let fixture: ComponentFixture<SidebarExpandTestComponent>;
    let sidebarComponent: NbSidebarComponent;
    let themeService: MockThemeService;

    beforeEach(() => {
      fixture = TestBed.createComponent(SidebarExpandTestComponent);
      fixture.detectChanges();

      sidebarComponent = fixture.debugElement.query(By.directive(NbSidebarComponent)).componentInstance;
      themeService = TestBed.inject(MockThemeService);
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
      const sidebarService: NbSidebarService = TestBed.inject(NbSidebarService);

      expect(sidebarComponent.compacted).toEqual(false);

      sidebarService.compact();
      fixture.detectChanges();

      expect(sidebarComponent.compacted).toEqual(true);
    });

    it('should expand when responsive is set to false', () => {
      sidebarComponent.responsive = true;
      sidebarComponent.collapse();

      expect(sidebarComponent.state).toEqual('collapsed');

      sidebarComponent.responsive = false;

      expect(sidebarComponent.state).toEqual('expanded');
    });

    it('should update state according to the current breakpoint when responsive turns on (update to compacted)', () => {
      const compactedBreakpoints = sidebarComponent.compactedBreakpoints;
      const largestCompactedBreakpointName = compactedBreakpoints[compactedBreakpoints.length - 1];
      themeService.setBreakpointTo(largestCompactedBreakpointName);

      expect(sidebarComponent.state).toEqual('expanded');

      sidebarComponent.responsive = true;

      expect(sidebarComponent.state).toEqual('compacted');
    });

    it('should update state according to the current breakpoint when responsive turns on (update to collapsed)', () => {
      themeService.setBreakpointTo(sidebarComponent.collapsedBreakpoints[0]);

      expect(sidebarComponent.state).toEqual('expanded');

      sidebarComponent.responsive = true;

      expect(sidebarComponent.state).toEqual('collapsed');
    });

    it('should expand when responsive and initial state is in different breakpoint', () => {
      fixture = TestBed.createComponent(SidebarExpandTestComponent);
      fixture.componentInstance.responsive = true;
      fixture.componentInstance.state = 'compacted';
      fixture.detectChanges();
      sidebarComponent = fixture.debugElement.query(By.directive(NbSidebarComponent)).componentInstance;

      expect(sidebarComponent.state).toEqual('expanded');
    });

    it('Should return default sidebar state', (done: DoneFn) => {
      const sidebarService: NbSidebarService = TestBed.inject(NbSidebarService);
      fixture.detectChanges();
      sidebarService.getSidebarState().subscribe((state: NbSidebarState) => {
        expect(state).toBe('expanded');
        done();
      });
    });

    it('Should return changed sidebar state', (done: DoneFn) => {
      const sidebarService: NbSidebarService = TestBed.inject(NbSidebarService);
      sidebarComponent.collapse();
      fixture.detectChanges();
      sidebarService.getSidebarState().subscribe((state: NbSidebarState) => {
        expect(state).toBe('collapsed');
        done();
      });
    });

    it('Should return default sidebar responsive state', (done: DoneFn) => {
      const sidebarService: NbSidebarService = TestBed.inject(NbSidebarService);
      fixture.detectChanges();
      sidebarService.getSidebarResponsiveState().subscribe((state: NbSidebarResponsiveState) => {
        expect(state).toBe('pc');
        done();
      });
    });

    it('Should return changed sidebar responsive state', (done: DoneFn) => {
      const sidebarService: NbSidebarService = TestBed.inject(NbSidebarService);
      themeService.setBreakpointTo('md');
      sidebarComponent.responsive = true;
      fixture.detectChanges();
      sidebarService.getSidebarResponsiveState().subscribe((state: NbSidebarResponsiveState) => {
        expect(state).toBe('tablet');
        done();
      });
    });
  });
});
