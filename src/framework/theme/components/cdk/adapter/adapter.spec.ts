import { TestBed } from '@angular/core/testing';
import { ScrollDispatcher, ScrollStrategyOptions, ViewportRuler } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';

import { NbThemeModule } from '../../../theme.module';
import { NbLayoutRulerService } from '../../../services/ruler.service';
import { NbLayoutScrollService } from '../../../services/scroll.service';
import { NbBlockScrollStrategyAdapter, NbScrollStrategyOptions } from './block-scroll-strategy-adapter';
import { NbScrollDispatcherAdapter } from './scroll-dispatcher-adapter';
import { NbViewportRulerAdapter } from './viewport-ruler-adapter';

describe('Angular CDK 22 adapters', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot()],
    });
  });

  it('should expose Nebular adapters through the CDK injection tokens', () => {
    expect(TestBed.inject(ScrollDispatcher)).toBe(TestBed.inject(NbScrollDispatcherAdapter));
    expect(TestBed.inject(ScrollStrategyOptions)).toBe(TestBed.inject(NbScrollStrategyOptions));
  });

  it('should create a block strategy that toggles layout scrolling', () => {
    const scrollService = TestBed.inject(NbLayoutScrollService);
    const scrollableChanges: boolean[] = [];
    const subscription = scrollService.onScrollableChange().subscribe((scrollable) => {
      scrollableChanges.push(scrollable);
    });
    const strategy = TestBed.inject(ScrollStrategyOptions).block();

    expect(strategy instanceof NbBlockScrollStrategyAdapter).toBeTrue();
    strategy.enable();
    strategy.disable();

    expect(scrollableChanges).toEqual([false, true]);
    subscription.unsubscribe();
  });

  it('should provide the Nebular viewport ruler to tables and overlays', () => {
    const adapter = TestBed.inject(NbViewportRulerAdapter);

    expect(adapter instanceof ViewportRuler).toBeTrue();
  });

  it('should fall back to the browser viewport when no layout is active', () => {
    const adapter = TestBed.inject(NbViewportRulerAdapter);
    const browserViewportRuler = TestBed.inject(ViewportRuler);
    const rulerRequestDisposed = jasmine.createSpy('rulerRequestDisposed');
    const scrollRequestDisposed = jasmine.createSpy('scrollRequestDisposed');
    spyOn(TestBed.inject(NbLayoutRulerService), 'getDimensions').and.returnValue(
      new Observable(() => rulerRequestDisposed),
    );
    spyOn(TestBed.inject(NbLayoutScrollService), 'getPosition').and.returnValue(
      new Observable(() => scrollRequestDisposed),
    );

    expect(adapter.getViewportSize()).toEqual(browserViewportRuler.getViewportSize());
    expect(adapter.getViewportScrollPosition()).toEqual(browserViewportRuler.getViewportScrollPosition());
    expect(rulerRequestDisposed).toHaveBeenCalled();
    expect(scrollRequestDisposed).toHaveBeenCalled();
  });
});
