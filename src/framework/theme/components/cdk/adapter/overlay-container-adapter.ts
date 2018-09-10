import { Injectable } from '@angular/core';

import { NbOverlayContainer } from '../overlay/mapping';


@Injectable()
export class NbOverlayContainerAdapter extends NbOverlayContainer {
  protected _createContainer(): void {
    const container = this._document.createElement('div');

    container.classList.add('cdk-overlay-container');
    this._document.querySelector('nb-layout').appendChild(container);
    this._containerElement = container;
  }
}
