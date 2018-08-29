import { ViewContainerRef } from '@angular/core';


/**
 * Describes all available options that may be passed to the NbModalService.
 * */
export class NbModalConfig {
  /**
   * If true than overlay will render backdrop under a modal.
   * */
  hasBackdrop: boolean = true;

  /**
   * Class that'll be assigned to the backdrop element.
   * */
  backdropClass: string = 'overlay-backdrop';

  /**
   * If true then mouse clicks by backdrop will close a modal.
   * */
  closeOnBackdropClick: boolean = true;

  /**
   * If true then escape press will close a modal.
   * */
  closeOnEsc: boolean = true;

  /**
   * Disables scroll on content under modal if true and does nothing otherwise.
   * */
  hasScroll: boolean = false;

  /**
   * Focuses modal automatically after open if true.
   * */
  autoFocus: boolean = true;

  viewContainerRef: ViewContainerRef;

  constructor(config: Partial<NbModalConfig>) {
    Object.assign(this, config);
  }
}
