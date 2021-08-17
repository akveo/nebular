import { Inject, Injectable, NgZone } from '@angular/core';
import { BlockScrollStrategy, ScrollDispatcher, ScrollStrategyOptions } from '@angular/cdk/overlay';

import { NbLayoutScrollService } from '../../../services/scroll.service';
import { NB_DOCUMENT } from '../../../theme.options';
import { NbViewportRulerAdapter } from './viewport-ruler-adapter';


/**
 * Overrides default block scroll strategy because default strategy blocks scrolling on the body only.
 * But Nebular has its own scrollable container - nb-layout. So, we need to block scrolling in it to.
 * */
@Injectable()
export class NbBlockScrollStrategyAdapter extends BlockScrollStrategy {
  constructor(@Inject(NB_DOCUMENT) document: any,
              viewportRuler: NbViewportRulerAdapter,
              protected scrollService: NbLayoutScrollService) {
    super(viewportRuler, document);
  }

  enable() {
    try {
      super.enable();
      this.scrollService.scrollable(false);
    } catch (error) { }
  }

  disable() {
    try {
      super.disable();
      this.scrollService.scrollable(true);
    } catch (error) { }
  }
}

@Injectable()
export class NbScrollStrategyOptions extends ScrollStrategyOptions {
  constructor(protected scrollService: NbLayoutScrollService,
              protected scrollDispatcher: ScrollDispatcher,
              protected viewportRuler: NbViewportRulerAdapter,
              protected ngZone: NgZone,
              @Inject(NB_DOCUMENT) protected document) {
    super(scrollDispatcher, viewportRuler, ngZone, document);
  }

  block = () => new NbBlockScrollStrategyAdapter(this.document, this.viewportRuler, this.scrollService);
}

export type NbScrollStrategies = keyof Pick<NbScrollStrategyOptions, 'noop' | 'close' | 'block' | 'reposition'>;
