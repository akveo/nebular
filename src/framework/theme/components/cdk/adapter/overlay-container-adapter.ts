import { Injectable } from '@angular/core';

import { NbOverlayContainer } from '../overlay/mapping';


/**
 * Provides nb-layout as overlay container.
 * Container has to be cleared when layout destroys.
 * Another way previous version of the container will be used
 * but it isn't inserted in DOM and exists in memory only.
 * This case important only if you switch between multiple layouts.
 * */
@Injectable()
export class NbOverlayContainerAdapter extends NbOverlayContainer {
  protected container: HTMLElement;

  setContainer(container: HTMLElement) {
    this.container = container;
  }

  clearContainer() {
    this.container = null;
    this._containerElement = null;
  }

  protected _createContainer(): void {
    const container = this._document.createElement('div');

    container.classList.add('cdk-overlay-container');
    this.container.appendChild(container);
    this._containerElement = container;
  }
}
