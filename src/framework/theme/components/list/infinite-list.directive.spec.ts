import { Component, ViewChild, ElementRef } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { NbThemeModule } from '../../theme.module';
import { NbLayoutModule } from '../layout/layout.module';
import { NbLayoutComponent } from '../layout/layout.component';
import { NbLayoutScrollService } from '../../services/scroll.service';
import { NbListModule } from './list.module';
import { NbListComponent } from './list.component';
import { NbInfiniteListDirective } from './infinite-list.directive';

const CONTENT_PADDING = 20;
const CONTENT_HEIGHT = 10000 + CONTENT_PADDING;
const ELEMENT_HEIGHT = 500;
const THRESHOLD = 200;

let fixture: ComponentFixture<ScrollTestComponent>;
let testComponent: ScrollTestComponent;
let scrollingElementRef: ElementRef;
let scrollDirective: NbInfiniteListDirective;

@Component({
  template: `
    <nb-layout [withScroll]="withScroll">
      <nb-layout-column>
        <nb-list
          #scrollingElement
          class="scroller"
          [class.element-scroll]="!listenWindowScroll"
          nbInfiniteList
          [threshold]="threshold"
          [listenWindowScroll]="listenWindowScroll"
          (bottomThreshold)="bottomThreshold()"
          (topThreshold)="topThreshold()">
          <nb-list-item class="inner"></nb-list-item>
        </nb-list>
      </nb-layout-column>
    </nb-layout>
  `,
  styles: [`
    ::ng-deep nb-layout.with-scroll .scrollable-container {
      overflow: auto;
      height: 100vh;
    }
    .scroller {
      background: lightgray;
      padding: ${CONTENT_PADDING}px;
    }
    .element-scroll {
      height: ${ELEMENT_HEIGHT}px;
      overflow-y: auto;
    }
    .inner {
      background: lightgoldenrodyellow;
      height: ${CONTENT_HEIGHT}px;
    }
  `],
})
class ScrollTestComponent {
  @ViewChild(NbListComponent, { read: ElementRef }) listElementRef: ElementRef;
  @ViewChild(NbInfiniteListDirective) infiniteListDirective: NbInfiniteListDirective;
  @ViewChild(NbLayoutComponent) layoutComponent: NbLayoutComponent;

  listenWindowScroll = false;
  threshold = THRESHOLD;
  withScroll = false;

  bottomThreshold() {}
  topThreshold() {}
}

describe('Directive: NbScrollDirective', () => {

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
        imports: [
          RouterModule.forRoot([]),
          NbThemeModule.forRoot(),
          NbLayoutModule,
          NbListModule,
        ],
        providers: [ NbLayoutScrollService, { provide: APP_BASE_HREF, useValue: '/' } ],
        declarations: [ ScrollTestComponent ],
      })
      .createComponent(ScrollTestComponent);

    testComponent = fixture.componentInstance;
    scrollingElementRef = testComponent.listElementRef;
    scrollDirective = testComponent.infiniteListDirective;

    fixture.detectChanges();
  });

  afterEach(fakeAsync(() => {
    fixture.destroy();
    tick();
    fixture.nativeElement.remove();
  }));

  it('should listen to window scroll', () => {
    const checkPositionSpy = spyOn(scrollDirective, 'checkPosition');
    testComponent.listenWindowScroll = true;
    fixture.detectChanges();

    window.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(1);
  });

  it('should listen to layout scroll', () => {
    const checkPositionSpy = spyOn(scrollDirective, 'checkPosition');
    testComponent.listenWindowScroll = true;
    testComponent.withScroll = true;
    fixture.detectChanges();

    testComponent.layoutComponent.scrollableContainerRef.nativeElement.dispatchEvent(new Event('scroll'));

    expect(checkPositionSpy).toHaveBeenCalledTimes(1);
  });

  it('should listen to element scroll', () => {
    const elementScrollHandlerSpy = spyOn(scrollDirective, 'onElementScroll');
    scrollingElementRef.nativeElement.dispatchEvent(new Event('scroll'));
    expect(elementScrollHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it('should ignore window and layout scroll when listening to element scroll', () => {
    const checkPositionSpy = spyOn(scrollDirective, 'checkPosition');

    window.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(0);

    const layoutScrollContainer = testComponent.layoutComponent.scrollableContainerRef.nativeElement;
    layoutScrollContainer.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(0);

    scrollingElementRef.nativeElement.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(1);
  });

  it('should ignore element scroll when listening to window or layout scroll', () => {
    testComponent.listenWindowScroll = true;
    fixture.detectChanges();

    const checkPositionSpy = spyOn(scrollDirective, 'checkPosition');

    scrollingElementRef.nativeElement.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(0);

    window.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(1);

    testComponent.withScroll = true;
    fixture.detectChanges();

    scrollingElementRef.nativeElement.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(1);

    const layoutScrollContainer = testComponent.layoutComponent.scrollableContainerRef.nativeElement;
    layoutScrollContainer.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(2);
  });

  it('should trigger bottomThreshold only when treshold reached (element scroll)', fakeAsync(() => {
    const scrollingNativeElement = scrollingElementRef.nativeElement;
    const tresholdSpy = spyOn(testComponent, 'bottomThreshold');

    const positionUnderThreshold = CONTENT_HEIGHT - THRESHOLD - ELEMENT_HEIGHT - 1;
    scrollingNativeElement.scrollTop = positionUnderThreshold;
    scrollingNativeElement.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(0);

    const positionBelowThreshold = CONTENT_HEIGHT - (THRESHOLD / 2);
    scrollingNativeElement.scrollTop = positionBelowThreshold;
    scrollingNativeElement.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger bottomThreshold only when treshold reached (window scroll)', fakeAsync(() => {
    const { documentElement } = document;

    testComponent.listenWindowScroll = true;
    fixture.detectChanges();

    const tresholdSpy = spyOn(testComponent, 'bottomThreshold');

    const reporterHeight = 1000;
    const positionUnderThreshold = CONTENT_HEIGHT - THRESHOLD - reporterHeight;
    documentElement.scrollTop = positionUnderThreshold;
    window.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(0);

    const positionBelowThreshold = CONTENT_HEIGHT - (THRESHOLD / 2);
    documentElement.scrollTop = positionBelowThreshold;
    window.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger bottomThreshold only when treshold reached (layout scroll)', fakeAsync(() => {
    const scroller: Element = testComponent.layoutComponent.scrollableContainerRef.nativeElement;

    testComponent.listenWindowScroll = true;
    testComponent.withScroll = true;
    fixture.detectChanges();

    const tresholdSpy = spyOn(testComponent, 'bottomThreshold');

    const positionUnderThreshold = CONTENT_HEIGHT - THRESHOLD - scroller.clientHeight - 1;
    scroller.scrollTop = positionUnderThreshold;
    scroller.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(0);

    const positionBelowThreshold = CONTENT_HEIGHT - THRESHOLD / 2;
    scroller.scrollTop = positionBelowThreshold;
    scroller.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger topThreshold when treshold reached (element)', fakeAsync(() => {
    const scrollingElement = scrollingElementRef.nativeElement;
    const tresholdSpy = spyOn(testComponent, 'topThreshold');

    scrollingElement.scrollTop = THRESHOLD + 1;
    scrollingElement.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(0);

    scrollingElement.scrollTop = THRESHOLD - 1;
    scrollingElement.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger topThreshold when treshold reached (window)', fakeAsync(() => {
    testComponent.listenWindowScroll = true;
    fixture.detectChanges();

    const { documentElement } = document;
    const tresholdSpy = spyOn(testComponent, 'topThreshold');

    documentElement.scrollTop = THRESHOLD + 1;
    window.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(0);

    documentElement.scrollTop = THRESHOLD - 1;
    window.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger topThreshold when treshold reached (layout scroll)', fakeAsync(() => {
    testComponent.listenWindowScroll = true;
    testComponent.withScroll = true;
    fixture.detectChanges();

    const layoutElement = testComponent.layoutComponent.scrollableContainerRef.nativeElement;
    const tresholdSpy = spyOn(testComponent, 'topThreshold');

    layoutElement.scrollTop = THRESHOLD + 1;
    layoutElement.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(0);

    layoutElement.scrollTop = THRESHOLD - 1;
    layoutElement.dispatchEvent(new Event('scroll'));
    tick();
    expect(tresholdSpy).toHaveBeenCalledTimes(1);
  }));
});
