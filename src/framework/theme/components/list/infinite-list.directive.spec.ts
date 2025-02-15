import { Component, DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import {
  NbThemeModule,
  NbLayoutModule,
  NbLayoutComponent,
  NbLayoutScrollService,
  NbListModule,
  NbListComponent,
  NbInfiniteListDirective,
} from '@nebular/theme';

const CONTENT_PADDING = 20;
const CONTENT_HEIGHT = 10000 + CONTENT_PADDING;
const ELEMENT_HEIGHT = 500;
const THRESHOLD = 200;

let fixture: ComponentFixture<ScrollTestComponent>;
let testComponent: ScrollTestComponent;
let listElementRef: DebugElement;
let layoutComponent: NbLayoutComponent;
let infiniteListDirective: NbInfiniteListDirective;

// First change detection run must take place inside a `fakeAsync` zone,
// so rxjs interval scheduled in the `throttle` (by `interval` observable)
// use patched `setInterval`. Then we are able to control this interval via
// `tick`.
function setup() {
  fixture.detectChanges();
  tick();

  listElementRef = fixture.debugElement.query(By.directive(NbListComponent));
  layoutComponent = fixture.debugElement.query(By.directive(NbLayoutComponent)).componentInstance;
  infiniteListDirective = listElementRef.injector.get(NbInfiniteListDirective);
  testComponent = fixture.componentInstance;
}

@Component({
    template: `
    <nb-layout [withScroll]="withScroll">
      <nb-layout-column>
        <nb-list
          #scrollingElement
          class="scroller"
          [class.element-scroll]="!listenWindowScroll"
          nbInfiniteList
          [throttleTime]="throttleTime"
          [threshold]="threshold"
          [listenWindowScroll]="listenWindowScroll"
          (bottomThreshold)="bottomThreshold()"
          (topThreshold)="topThreshold()"
        >
          <nb-list-item class="inner"></nb-list-item>
        </nb-list>
      </nb-layout-column>
    </nb-layout>
  `,
    styles: [
        `
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
    `,
    ],
    standalone: false
})
class ScrollTestComponent {
  listenWindowScroll = false;
  threshold = THRESHOLD;
  withScroll = false;
  throttleTime = 0;

  bottomThreshold() {}
  topThreshold() {}
}

describe('Directive: NbScrollDirective', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), NbThemeModule.forRoot(), NbLayoutModule, NbListModule],
      providers: [NbLayoutScrollService, { provide: APP_BASE_HREF, useValue: '/' }],
      declarations: [ScrollTestComponent],
    }).createComponent(ScrollTestComponent);
  });

  afterEach(fakeAsync(() => {
    fixture.destroy();
    tick();
    fixture.nativeElement.remove();
  }));

  it('should listen to window scroll', fakeAsync(() => {
    setup();
    const checkPositionSpy = spyOn(infiniteListDirective, 'checkPosition');
    testComponent.listenWindowScroll = true;
    fixture.detectChanges();

    window.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(1);
  }));

  it('should listen to layout scroll', fakeAsync(() => {
    setup();
    const checkPositionSpy = spyOn(infiniteListDirective, 'checkPosition');
    testComponent.listenWindowScroll = true;
    testComponent.withScroll = true;
    fixture.detectChanges();

    layoutComponent.scrollableContainerRef.nativeElement.dispatchEvent(new Event('scroll'));

    expect(checkPositionSpy).toHaveBeenCalledTimes(1);
  }));

  it('should listen to element scroll', fakeAsync(() => {
    setup();
    const elementScrollHandlerSpy = spyOn(infiniteListDirective, 'onElementScroll');
    listElementRef.nativeElement.dispatchEvent(new Event('scroll'));
    expect(elementScrollHandlerSpy).toHaveBeenCalledTimes(1);
  }));

  it('should ignore window and layout scroll when listening to element scroll', fakeAsync(() => {
    setup();
    const checkPositionSpy = spyOn(infiniteListDirective, 'checkPosition');

    window.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(0);

    const layoutScrollContainer = layoutComponent.scrollableContainerRef.nativeElement;
    layoutScrollContainer.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(0);

    listElementRef.nativeElement.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(1);
  }));

  it('should ignore element scroll when listening to window or layout scroll', fakeAsync(() => {
    setup();
    testComponent.listenWindowScroll = true;
    fixture.detectChanges();

    const checkPositionSpy = spyOn(infiniteListDirective, 'checkPosition');

    listElementRef.nativeElement.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(checkPositionSpy).toHaveBeenCalledTimes(0);

    window.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(checkPositionSpy).toHaveBeenCalledTimes(1);

    testComponent.withScroll = true;
    fixture.detectChanges();

    listElementRef.nativeElement.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(checkPositionSpy).toHaveBeenCalledTimes(1);

    const layoutScrollContainer = layoutComponent.scrollableContainerRef.nativeElement;
    layoutScrollContainer.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(checkPositionSpy).toHaveBeenCalledTimes(2);
  }));

  it('should trigger bottomThreshold only when threshold reached (element scroll)', fakeAsync(() => {
    setup();
    const scrollingNativeElement = listElementRef.nativeElement;
    const thresholdSpy = spyOn(testComponent, 'bottomThreshold');

    const positionUnderThreshold = CONTENT_HEIGHT - THRESHOLD - ELEMENT_HEIGHT - 1;
    scrollingNativeElement.scrollTop = positionUnderThreshold;
    scrollingNativeElement.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(0);

    const positionBelowThreshold = CONTENT_HEIGHT - THRESHOLD / 2;
    scrollingNativeElement.scrollTop = positionBelowThreshold;
    scrollingNativeElement.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger bottomThreshold only when threshold reached (window scroll)', fakeAsync(() => {
    setup();
    const { documentElement } = document;

    testComponent.listenWindowScroll = true;
    fixture.detectChanges();

    const thresholdSpy = spyOn(testComponent, 'bottomThreshold');

    const reporterHeight = 1000;
    const positionUnderThreshold = CONTENT_HEIGHT - THRESHOLD - reporterHeight;
    documentElement.scrollTop = positionUnderThreshold;
    window.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(0);

    const positionBelowThreshold = CONTENT_HEIGHT - THRESHOLD / 2;
    documentElement.scrollTop = positionBelowThreshold;
    window.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger bottomThreshold only when threshold reached (layout scroll)', fakeAsync(() => {
    setup();
    const scroller: Element = layoutComponent.scrollableContainerRef.nativeElement;

    testComponent.listenWindowScroll = true;
    testComponent.withScroll = true;
    fixture.detectChanges();

    const thresholdSpy = spyOn(testComponent, 'bottomThreshold');

    const positionUnderThreshold = CONTENT_HEIGHT - THRESHOLD - scroller.clientHeight - 1;
    scroller.scrollTop = positionUnderThreshold;
    scroller.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(0);

    const positionBelowThreshold = CONTENT_HEIGHT - THRESHOLD / 2;
    scroller.scrollTop = positionBelowThreshold;
    scroller.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger topThreshold when threshold reached (element)', fakeAsync(() => {
    setup();
    const scrollingElement = listElementRef.nativeElement;
    const thresholdSpy = spyOn(testComponent, 'topThreshold');

    scrollingElement.scrollTop = THRESHOLD + 1;
    scrollingElement.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(0);

    scrollingElement.scrollTop = THRESHOLD - 1;
    scrollingElement.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger topThreshold when threshold reached (window)', fakeAsync(() => {
    setup();
    testComponent.listenWindowScroll = true;
    fixture.detectChanges();

    const { documentElement } = document;
    const thresholdSpy = spyOn(testComponent, 'topThreshold');

    documentElement.scrollTop = THRESHOLD + 1;
    window.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(0);

    documentElement.scrollTop = THRESHOLD - 1;
    window.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger topThreshold when threshold reached (layout scroll)', fakeAsync(() => {
    setup();
    testComponent.listenWindowScroll = true;
    testComponent.withScroll = true;
    fixture.detectChanges();

    const layoutElement = layoutComponent.scrollableContainerRef.nativeElement;
    const thresholdSpy = spyOn(testComponent, 'topThreshold');

    layoutElement.scrollTop = THRESHOLD + 1;
    layoutElement.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(0);

    layoutElement.scrollTop = THRESHOLD - 1;
    layoutElement.dispatchEvent(new Event('scroll'));
    tick(infiniteListDirective.throttleTime);
    expect(thresholdSpy).toHaveBeenCalledTimes(1);
  }));

  it('should prevent subsequent bottomThreshold emissions for throttleTime duration (window scroll)', fakeAsync(() => {
    setup();
    const { documentElement } = document;
    const THROTTLE = 200;

    testComponent.listenWindowScroll = true;
    testComponent.throttleTime = THROTTLE;
    fixture.detectChanges();

    const thresholdSpy = spyOn(testComponent, 'bottomThreshold');

    documentElement.scrollTop = CONTENT_HEIGHT - THRESHOLD / 2;

    window.dispatchEvent(new Event('scroll'));
    tick(THROTTLE / 2); // 100ms passed
    window.dispatchEvent(new Event('scroll'));
    tick(THROTTLE / 2 - 1); // 199ms passed, resent scroll event should be throttled
    expect(thresholdSpy).toHaveBeenCalledTimes(1);
    tick(1); // 200ms passed, throttling has stopped

    window.dispatchEvent(new Event('scroll'));
    tick();
    expect(thresholdSpy).toHaveBeenCalledTimes(2);
    tick(THROTTLE); // waiting for the end of the throttle interval
  }));

  it('should prevent subsequent topThreshold emissions for throttleTime duration (window scroll)', fakeAsync(() => {
    setup();
    const { documentElement } = document;
    const THROTTLE = 200;

    testComponent.listenWindowScroll = true;
    testComponent.throttleTime = THROTTLE;

    fixture.detectChanges();

    documentElement.scrollTop = THRESHOLD + 1;
    window.dispatchEvent(new Event('scroll'));

    const thresholdSpy = spyOn(testComponent, 'topThreshold');

    documentElement.scrollTop -= 1;
    window.dispatchEvent(new Event('scroll'));
    tick(THROTTLE / 2); // 100ms passed
    documentElement.scrollTop -= 1;
    window.dispatchEvent(new Event('scroll'));
    tick(THROTTLE / 2 - 1); // 199ms passed, resent scroll event should be throttled
    expect(thresholdSpy).toHaveBeenCalledTimes(1);
    tick(1); // 200ms passed, throttling has stopped

    documentElement.scrollTop -= 1;
    window.dispatchEvent(new Event('scroll'));
    tick();
    expect(thresholdSpy).toHaveBeenCalledTimes(2);
    tick(THROTTLE); // waiting for the end of the throttle interval
  }));

  it('should prevent subsequent bottomThreshold emissions for throttleTime duration (element scroll)', fakeAsync(() => {
    setup();
    const scrollingNativeElement = listElementRef.nativeElement;
    const THROTTLE = 200;

    testComponent.throttleTime = THROTTLE;
    fixture.detectChanges();

    const thresholdSpy = spyOn(testComponent, 'bottomThreshold');

    scrollingNativeElement.scrollTop = CONTENT_HEIGHT - THRESHOLD / 2;

    scrollingNativeElement.dispatchEvent(new Event('scroll'));
    tick(THROTTLE / 2); // 100ms passed
    scrollingNativeElement.dispatchEvent(new Event('scroll'));
    tick(THROTTLE / 2 - 1); // 199ms passed, resent scroll event should be throttled
    expect(thresholdSpy).toHaveBeenCalledTimes(1);
    tick(1); // 200ms passed, throttling has stopped

    scrollingNativeElement.dispatchEvent(new Event('scroll'));
    tick();
    expect(thresholdSpy).toHaveBeenCalledTimes(2);
    tick(THROTTLE); // waiting for the end of the throttle interval
  }));

  it('should prevent subsequent topThreshold emissions for throttleTime duration (element scroll)', fakeAsync(() => {
    setup();
    const scrollingElement = listElementRef.nativeElement;
    const THROTTLE = 200;

    testComponent.throttleTime = THROTTLE;
    fixture.detectChanges();

    scrollingElement.scrollTop = THRESHOLD + 1;
    scrollingElement.dispatchEvent(new Event('scroll'));

    const thresholdSpy = spyOn(testComponent, 'topThreshold');

    scrollingElement.scrollTop -= 1;
    scrollingElement.dispatchEvent(new Event('scroll'));
    tick(THROTTLE / 2); // 100ms passed
    scrollingElement.scrollTop -= 1;
    scrollingElement.dispatchEvent(new Event('scroll'));
    tick(THROTTLE / 2 - 1); // 199ms passed, resent scroll event should be throttled
    expect(thresholdSpy).toHaveBeenCalledTimes(1);
    tick(1); // 200ms passed, throttling has stopped

    scrollingElement.scrollTop -= 1;
    scrollingElement.dispatchEvent(new Event('scroll'));
    tick();
    expect(thresholdSpy).toHaveBeenCalledTimes(2);
    tick(THROTTLE); // waiting for the end of the throttle interval
  }));
});
