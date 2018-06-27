import { Component, ViewChild, ElementRef } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { NbScrollThresholdDirective } from './scroll-threshold.directive';
import { NbThemeModule } from '../../../theme.module';
import { NbInifiniteListModule } from './infinite-list.module';

const CONTENT_HEIGHT = 10000;
const THRESHOLD = 2000;

let fixture: ComponentFixture<ScrollTestComponent>;
let componentInstance: ScrollTestComponent;
let scrollingElement: ElementRef;
let scrollDirective: NbScrollThresholdDirective;

@Component({
  template: `
    <div
      #scrollingElement
      class="scroller"
      [class.element-scroll]="!listenWindowScroll"
      [nbScrollThreshold]="threshold"
      [listenWindowScroll]="listenWindowScroll"
      (thresholdReached)="thresholdReached()">
      <div class="inner"></div>
    </div>
  `,
  styles: [`
    .scroller {
      background: lightgray;
      padding: 10px;
    }
    .element-scroll {
      height: 500px;
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

  listenWindowScroll = false;
  threshold = THRESHOLD;

  thresholdReached() { }
}

describe('Directive: NbScrollDirective', () => {

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
        imports: [ NbThemeModule.forRoot({ name: 'default' }), NbInifiniteListModule ],
        declarations: [ ScrollTestComponent ],
      })
      .createComponent(ScrollTestComponent);

    componentInstance = fixture.componentInstance;
    scrollingElement = componentInstance.scrollingElement;
    scrollDirective = componentInstance.scrollDirective;

    fixture.detectChanges();
  });

  afterEach(fakeAsync(() => {
    fixture.destroy();
    tick();
    fixture.nativeElement.remove();
  }));

  it('should listen to window scroll', () => {
    const windowScrollHandlerSpy = spyOn(scrollDirective, 'windowScroll');
    window.dispatchEvent(new Event('scroll'));
    expect(windowScrollHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it('should listen to window resize', () => {
    const windowResizeHandlerSpy = spyOn(scrollDirective, 'windowResize');
    window.dispatchEvent(new Event('resize'));
    expect(windowResizeHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it('should listen to layout scroll', () => {
    const layoutScrollHandlerSpy = spyOn(scrollDirective, 'layoutScroll');
    document.dispatchEvent(new Event('nbscroll'));
    expect(layoutScrollHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it('should listen to element scroll', () => {
    const elementScrollHandlerSpy = spyOn(scrollDirective, 'elementScroll');
    scrollingElement.nativeElement.dispatchEvent(new Event('scroll'));
    expect(elementScrollHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it('should ignore window and layout scroll events when listen to element scroll', () => {
    const checkPositionSpy = spyOn(scrollDirective, 'checkPosition');

    window.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(0);

    document.dispatchEvent(new Event('nbscroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(0);

    scrollingElement.nativeElement.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(1);
  });

  it('should listen window or layout scroll when not listening to element scroll', () => {
    const checkPositionSpy = spyOn(scrollDirective, 'checkPosition');

    componentInstance.listenWindowScroll = true;
    fixture.detectChanges();

    window.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(1);

    document.dispatchEvent(new Event('nbscroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(2);

    scrollingElement.nativeElement.dispatchEvent(new Event('scroll'));
    expect(checkPositionSpy).toHaveBeenCalledTimes(2);
  });

  it('should listen window resize regardless of window or element scroll mode', () => {
    const resizeHandlerSpy = spyOn(scrollDirective, 'windowResize');

    window.dispatchEvent(new Event('resize'));
    expect(resizeHandlerSpy).toHaveBeenCalledTimes(1);

    scrollDirective.listenWindowScroll = true;
    fixture.detectChanges();

    window.dispatchEvent(new Event('resize'));
    expect(resizeHandlerSpy).toHaveBeenCalledTimes(2);
  });

  it('should trigger event only when treshold reached (element scroll)', () => {
    const scrollingNativeElement = scrollingElement.nativeElement;
    const tresholdReachedSpy = spyOn(componentInstance, 'thresholdReached');

    const reporterHeight = 1000;
    const positionUnderThreshold = CONTENT_HEIGHT - THRESHOLD - reporterHeight;
    scrollingNativeElement.scrollTop = positionUnderThreshold;
    scrollingNativeElement.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(0);

    const positionBelowThreshold = CONTENT_HEIGHT - (THRESHOLD / 2);
    scrollingNativeElement.scrollTop = positionBelowThreshold;
    scrollingNativeElement.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(1);
  });

  it('should trigger event only when treshold reached (window scroll)', () => {
    componentInstance.listenWindowScroll = true;
    fixture.detectChanges();

    const tresholdReachedSpy = spyOn(componentInstance, 'thresholdReached');

    const reporterHeight = 1000;
    const positionUnderThreshold = CONTENT_HEIGHT - THRESHOLD - reporterHeight;
    document.documentElement.scrollTop = positionUnderThreshold;
    window.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(0);

    const positionBelowThreshold = CONTENT_HEIGHT - (THRESHOLD / 2);
    document.documentElement.scrollTop = positionBelowThreshold;
    window.dispatchEvent(new Event('scroll'));
    expect(tresholdReachedSpy).toHaveBeenCalledTimes(1);
  });

  // TODO
  // it('should trigger event only when treshold reached (layout scroll)', () => {});
});
