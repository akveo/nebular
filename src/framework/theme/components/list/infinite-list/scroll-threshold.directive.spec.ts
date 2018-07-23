import { Component, ViewChild, ElementRef } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { NbThemeModule } from '../../../theme.module';
import { NbLayoutModule } from '../../layout/layout.module';
import { NbLayoutComponent } from '../../layout/layout.component';
import { NbLayoutScrollService } from '../../../services/scroll.service';
import { NbScrollThresholdDirective } from './scroll-threshold.directive';
import { NbInifiniteListModule } from './infinite-list.module';

const CONTENT_PADDING = 20;
const CONTENT_HEIGHT = 10000 + CONTENT_PADDING;
const ELEMENT_HEIGHT = 500;
const THRESHOLD = 200;

let fixture: ComponentFixture<ScrollTestComponent>;
let testComponent: ScrollTestComponent;
let scrollingElementRef: ElementRef;
let scrollDirective: NbScrollThresholdDirective;

@Component({
  template: `
    <nb-layout #layout [withScroll]="withScroll">
      <nb-layout-column>
        <div
          #scrollingElement
          class="scroller"
          [class.element-scroll]="!listenWindowScroll"
          [nbScrollThreshold]="threshold"
          [listenWindowScroll]="listenWindowScroll"
          (bottomThresholdReached)="bottomThresholdReached()"
          (topThresholdReached)="topThresholdReached()">
          <div class="inner"></div>
        </div>
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
  @ViewChild(NbScrollThresholdDirective) scrollDirective: NbScrollThresholdDirective;
  @ViewChild('scrollingElement') scrollingElement: ElementRef;
  @ViewChild('layout') layoutComponent: NbLayoutComponent;

  listenWindowScroll = false;
  threshold = THRESHOLD;
  withScroll = false;

  bottomThresholdReached() {}
  topThresholdReached() {}
}

describe('Directive: NbScrollDirective', () => {

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
        imports: [
          RouterModule.forRoot([]),
          NbThemeModule.forRoot({ name: 'default' }),
          NbLayoutModule,
          NbInifiniteListModule,
        ],
        providers: [ NbLayoutScrollService, { provide: APP_BASE_HREF, useValue: '/' } ],
        declarations: [ ScrollTestComponent ],
      })
      .createComponent(ScrollTestComponent);

    testComponent = fixture.componentInstance;
    scrollingElementRef = testComponent.scrollingElement;
    scrollDirective = testComponent.scrollDirective;

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
    const elementScrollHandlerSpy = spyOn(scrollDirective, 'elementScroll');
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

  it('should trigger bottomThresholdReached only when treshold reached (element scroll)', () => {
    const scrollingNativeElement = scrollingElementRef.nativeElement;
    const tresholdReachedSpy = spyOn(testComponent, 'bottomThresholdReached');

    const positionUnderThreshold = CONTENT_HEIGHT - THRESHOLD - ELEMENT_HEIGHT - 1;
    scrollingNativeElement.scrollTop = positionUnderThreshold;
    scrollingNativeElement.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(0);

    const positionBelowThreshold = CONTENT_HEIGHT - (THRESHOLD / 2);
    scrollingNativeElement.scrollTop = positionBelowThreshold;
    scrollingNativeElement.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(1);
  });

  it('should trigger bottomThresholdReached only when treshold reached (window scroll)', () => {
    const { documentElement } = document;

    testComponent.listenWindowScroll = true;
    fixture.detectChanges();

    const tresholdReachedSpy = spyOn(testComponent, 'bottomThresholdReached');

    const reporterHeight = 1000;
    const positionUnderThreshold = CONTENT_HEIGHT - THRESHOLD - reporterHeight;
    documentElement.scrollTop = positionUnderThreshold;
    window.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(0);

    const positionBelowThreshold = CONTENT_HEIGHT - (THRESHOLD / 2);
    documentElement.scrollTop = positionBelowThreshold;
    window.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(1);
  });

  it('should trigger bottomThresholdReached only when treshold reached (layout scroll)', () => {
    const scroller: Element = testComponent.layoutComponent.scrollableContainerRef.nativeElement;

    testComponent.listenWindowScroll = true;
    testComponent.withScroll = true;
    fixture.detectChanges();

    const tresholdReachedSpy = spyOn(testComponent, 'bottomThresholdReached');

    const positionUnderThreshold = CONTENT_HEIGHT - THRESHOLD - scroller.clientHeight - 1;
    scroller.scrollTop = positionUnderThreshold;
    scroller.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(0);

    const positionBelowThreshold = CONTENT_HEIGHT - THRESHOLD / 2;
    scroller.scrollTop = positionBelowThreshold;
    scroller.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(1);
  });

  it('should trigger topThresholdReached when treshold reached (element)', () => {
    const scrollingElement = scrollingElementRef.nativeElement;
    const tresholdReachedSpy = spyOn(testComponent, 'topThresholdReached');

    scrollingElement.scrollTop = THRESHOLD + 1;
    scrollingElement.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(0);

    scrollingElement.scrollTop = THRESHOLD - 1;
    scrollingElement.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(1);
  });

  it('should trigger topThresholdReached when treshold reached (window)', () => {
    testComponent.listenWindowScroll = true;
    fixture.detectChanges();

    const { documentElement } = document;
    const tresholdReachedSpy = spyOn(testComponent, 'topThresholdReached');

    documentElement.scrollTop = THRESHOLD + 1;
    window.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(0);

    documentElement.scrollTop = THRESHOLD - 1;
    window.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(1);
  });

  it('should trigger topThresholdReached when treshold reached (layout scroll)', () => {
    testComponent.listenWindowScroll = true;
    testComponent.withScroll = true;
    fixture.detectChanges();

    const layoutElement = testComponent.layoutComponent.scrollableContainerRef.nativeElement;
    const tresholdReachedSpy = spyOn(testComponent, 'topThresholdReached');

    layoutElement.scrollTop = THRESHOLD + 1;
    layoutElement.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(0);

    layoutElement.scrollTop = THRESHOLD - 1;
    layoutElement.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(1);
  });
});
