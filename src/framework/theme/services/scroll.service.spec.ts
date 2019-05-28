import { Component, ElementRef, ViewChild } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestBed, ComponentFixture, fakeAsync, tick, async, inject } from '@angular/core/testing';
import { NbLayoutScrollService, NbScrollPosition } from './scroll.service';
import { NbLayoutModule } from '../components/layout/layout.module';
import { NbThemeService } from './theme.service';
import { NbThemeModule } from '../theme.module';
import { NB_WINDOW } from '../theme.options';

let currentWindow;
let fixture: ComponentFixture<ScrollTestComponent>;
let componentInstance: ScrollTestComponent;
let scrollService: NbLayoutScrollService;

@Component({
  template: `
    <nb-layout [withScroll]="localScroll" #layout>
      <nb-layout-column>
        <div #resize></div>
      </nb-layout-column>
    </nb-layout>
  `,
  styles: [`
    ::ng-deep nb-layout.with-scroll .scrollable-container {
      overflow: auto;
      height: 100vh;
    }
  `],
})
class ScrollTestComponent {

  @ViewChild('resize', { read: ElementRef, static: false }) private resizeElement: ElementRef;
  @ViewChild('layout', { read: ElementRef, static: false }) private layout: ElementRef;
  localScroll = false;

  setSize(width: string, height: string) {
    this.resizeElement.nativeElement.style.width = width;
    this.resizeElement.nativeElement.style.height = height;
  }

  useLocalScroll() {
    this.localScroll = true;
  }

  useGlobalScroll() {
    this.localScroll = false;
  }

  getScrollableElement() {
    return this.layout.nativeElement.querySelector('.scrollable-container');
  }
}

describe('NbScrollService', () => {

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([]), NbThemeModule.forRoot(), NbLayoutModule ],
      providers: [ NbLayoutScrollService, NbThemeService, { provide: APP_BASE_HREF, useValue: '/' } ],
      declarations: [ ScrollTestComponent ],
    })
      .createComponent(ScrollTestComponent);

    componentInstance = fixture.componentInstance;

    fixture.detectChanges();
  });

  beforeEach(async(inject(
    [NbLayoutScrollService, NB_WINDOW],
    (_scrollService, _window) => {
      scrollService = _scrollService;
      currentWindow = _window;
    },
  )));

  afterEach(fakeAsync(() => {
    fixture.destroy();
    tick();
    fixture.nativeElement.remove();
  }));

  it('should get initial scroll position', (done) => {
    fixture.detectChanges();
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(0);
        expect(pos.y).toEqual(0);
        done();
      })
  });

  it('should get initial scroll position as nothing to scroll', (done) => {
    currentWindow.scrollTo(10, 10);
    fixture.detectChanges();
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(0);
        expect(pos.y).toEqual(0);
        done();
      })
  });

  it('should get updated scroll position', (done) => {
    componentInstance.setSize('10000px', '10000px');
    fixture.detectChanges();
    currentWindow.scrollTo(10, 10);
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(10);
        expect(pos.y).toEqual(10);
        done();
      })
  });

  it('should get initial scroll position on scrollable', (done) => {
    componentInstance.useLocalScroll();
    fixture.detectChanges();
    const scrollable = componentInstance.getScrollableElement();
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(scrollable.scrollLeft);
        expect(pos.y).toEqual(scrollable.scrollTop);
        done();
      });
  });

  it('should get updated scroll position on scrollable', (done) => {
    componentInstance.useLocalScroll();
    componentInstance.setSize('10000px', '10000px');
    fixture.detectChanges();
    const scrollable = componentInstance.getScrollableElement();
    scrollable.scrollTo(10, 10);
    fixture.detectChanges();
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(10);
        expect(pos.y).toEqual(10);
        done();
      });
  });

  it('should scroll using service', (done) => {
    componentInstance.useLocalScroll();
    componentInstance.setSize('10000px', '10000px');
    fixture.detectChanges();
    scrollService.scrollTo(10, 10);
    fixture.detectChanges();
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(10);
        expect(pos.y).toEqual(10);
        done();
      });
  });

  it('should scroll using service (with default x)', (done) => {
    componentInstance.useLocalScroll();
    componentInstance.setSize('10000px', '10000px');
    fixture.detectChanges();
    scrollService.scrollTo(null, 10);
    fixture.detectChanges();
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(0);
        expect(pos.y).toEqual(10);
        done();
      });
  });

  it('should scroll using service (with default y)', (done) => {
    componentInstance.useLocalScroll();
    componentInstance.setSize('10000px', '10000px');
    fixture.detectChanges();
    scrollService.scrollTo(10, null);
    fixture.detectChanges();
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(10);
        expect(pos.y).toEqual(0);
        done();
      });
  });

  it('should scroll using service (with default x)', (done) => {
    componentInstance.useLocalScroll();
    componentInstance.setSize('10000px', '10000px');
    fixture.detectChanges();
    scrollService.scrollTo(10, 10);
    fixture.detectChanges();

    scrollService.scrollTo(null, 20);
    fixture.detectChanges();
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(10);
        expect(pos.y).toEqual(20);
        done();
      });
  });

  it('should scroll using service (with default y)', (done) => {
    componentInstance.useLocalScroll();
    componentInstance.setSize('10000px', '10000px');
    fixture.detectChanges();
    scrollService.scrollTo(10, 10);
    fixture.detectChanges();

    scrollService.scrollTo(20, null);
    fixture.detectChanges();
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(20);
        expect(pos.y).toEqual(10);
        done();
      });
  });

  it('should scroll using service back to 0,0', (done) => {
    componentInstance.useLocalScroll();
    componentInstance.setSize('10000px', '10000px');
    fixture.detectChanges();
    scrollService.scrollTo(10, 10);
    fixture.detectChanges();

    scrollService.scrollTo(0, 0);
    fixture.detectChanges();
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(0);
        expect(pos.y).toEqual(0);
        done();
      });
  });

  it('should scroll using service back (with default x,y)', (done) => {
    componentInstance.useLocalScroll();
    componentInstance.setSize('10000px', '10000px');
    fixture.detectChanges();
    scrollService.scrollTo(10, 10);
    fixture.detectChanges();

    scrollService.scrollTo();
    fixture.detectChanges();
    scrollService.getPosition()
      .subscribe((pos: NbScrollPosition) => {
        expect(pos.x).toEqual(10);
        expect(pos.y).toEqual(10);
        done();
      });
  });

  it('should listen to scroll', (done) => {
    scrollService.onScroll()
      .subscribe((event: any) => {
        expect(event).not.toBeNull();
        done();
      });

    currentWindow.dispatchEvent(new Event('scroll'));
  });

});
