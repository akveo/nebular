import { Injectable, Inject } from '@angular/core';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { NB_DOCUMENT } from '../../../theme.options';
import { NbViewportRulerAdapter } from './viewport-ruler-adapter';

@Injectable()
export class NbBlockScrollStrategyAdapter extends BlockScrollStrategy {
  constructor(ruler: NbViewportRulerAdapter, @Inject(NB_DOCUMENT) document) {
    super(ruler, document);
  }
}
