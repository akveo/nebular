import { Component } from '@angular/core';
import { TestBed, ComponentFixture, flush, fakeAsync } from '@angular/core/testing';
import {
  NbLayoutComponent,
  NbLayoutScrollService,
  NbLayoutModule,
  NbThemeModule,
  NbLayoutDirectionService,
  NbLayoutDirection,
} from '@nebular/theme';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: `
    <nb-layout withScroll>
      <nb-layout-column>
        <div [style.height]="contentHeight" style="background: lightcoral;"></div>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class LayoutWithScrollModeComponent {
  contentHeight: string = '200vh';
}

describe('NbLayoutComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), NbThemeModule.forRoot(), NbLayoutModule ],
      declarations: [ LayoutWithScrollModeComponent ],
    });
  });

  describe('withScroll mode - scroll block', () => {
    let fixture: ComponentFixture<LayoutWithScrollModeComponent>;
    let layoutComponent: NbLayoutComponent;
    let scrollService: NbLayoutScrollService;

    beforeEach(() => {
      fixture  = TestBed.createComponent(LayoutWithScrollModeComponent);
      fixture.detectChanges();

      layoutComponent = fixture.debugElement.query(By.directive(NbLayoutComponent)).componentInstance;
      scrollService = TestBed.get(NbLayoutScrollService);
    });

    it('should hide overflow when scroll blocked', fakeAsync(() => {
      scrollService.scrollable(false);
      flush();
      fixture.detectChanges();

      expect(layoutComponent.scrollableContainerRef.nativeElement.style.overflow).toEqual('hidden');
    }));


    // Comment this specs until global (theme) styles included into unit test build.
    // Currently scrollable container and layout has same width so no padding added and specs fail.
    // it('should add right padding to layout container in LTR mode when blocking scroll', fakeAsync(() => {
    //   scrollService.scrollable(false);
    //   flush();
    //   fixture.detectChanges();
    //
    //   expect(layoutComponent.layoutContainerRef.nativeElement.style.paddingRight).not.toEqual('');
    // }));
    //
    // it('should add left padding to layout container in RTL mode when blocking scroll', fakeAsync(() => {
    //   const layoutDirectionService: NbLayoutDirectionService = TestBed.get(NbLayoutDirectionService);
    //   layoutDirectionService.setDirection(NbLayoutDirection.RTL);
    //   flush();
    //   fixture.detectChanges();
    //
    //   scrollService.scrollable(false);
    //   flush();
    //   fixture.detectChanges();
    //
    //   expect(layoutComponent.layoutContainerRef.nativeElement.style.paddingLeft).not.toEqual('');
    // }));
    // it('should not change layout padding if content is not scrollable', fakeAsync(() => {
    //   fixture.componentInstance.contentHeight = '1px';
    //   fixture.detectChanges();
    //
    //   layoutComponent.layoutContainerRef.nativeElement.style.paddingLeft = '1px';
    //
    //   scrollService.scrollable(false);
    //   flush();
    //   fixture.detectChanges();
    //
    //   expect(layoutComponent.layoutContainerRef.nativeElement.style.paddingLeft).toEqual('1px');
    // }));

    it('should restore previous overflow value when enabling scroll', fakeAsync(() => {
      layoutComponent.scrollableContainerRef.nativeElement.style.overflow = 'auto';

      scrollService.scrollable(false);
      flush();
      fixture.detectChanges();
      scrollService.scrollable(true);
      flush();
      fixture.detectChanges();

      expect(layoutComponent.scrollableContainerRef.nativeElement.style.overflow).toEqual('auto');
    }));

    it('should restore previous padding left value when enabling scroll in LTR mode', fakeAsync(() => {
      layoutComponent.layoutContainerRef.nativeElement.style.paddingLeft = '1px';

      scrollService.scrollable(false);
      flush();
      fixture.detectChanges();
      scrollService.scrollable(true);
      flush();
      fixture.detectChanges();

      expect(layoutComponent.layoutContainerRef.nativeElement.style.paddingLeft).toEqual('1px');
    }));

    it('should restore previous padding right value when enabling scroll in RTL mode', fakeAsync(() => {
      const layoutDirectionService: NbLayoutDirectionService = TestBed.get(NbLayoutDirectionService);
      layoutDirectionService.setDirection(NbLayoutDirection.RTL);
      flush();
      fixture.detectChanges();
      layoutComponent.layoutContainerRef.nativeElement.style.paddingRight = '1px';

      scrollService.scrollable(false);
      flush();
      fixture.detectChanges();
      scrollService.scrollable(true);
      flush();
      fixture.detectChanges();

      expect(layoutComponent.layoutContainerRef.nativeElement.style.paddingRight).toEqual('1px');
    }));
  });
});
