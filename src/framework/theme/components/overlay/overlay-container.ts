import { Injectable } from '@angular/core';

import { NbOverlayContainer } from './overlay-cdk.module';


@Injectable()
export class NbOverlayLayoutContainer extends NbOverlayContainer {
  protected _createContainer(): void {
    const container = this._document.createElement('div');

    container.classList.add('cdk-overlay-container');
    this._document.querySelector('nb-layout').appendChild(container);
    this._containerElement = container;
  }
}
