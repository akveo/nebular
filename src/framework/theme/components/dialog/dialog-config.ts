import { ViewContainerRef } from '@angular/core';


/**
 * Describes all available options that may be passed to the NbDialogService.
 * */
export class NbDialogConfig<D = any> {
  /**
   * If true than overlay will render backdrop under a dialog.
   * */
  hasBackdrop: boolean = true;

  /**
   * Class that'll be assigned to the backdrop element.
   * */
  backdropClass: string = 'overlay-backdrop';

  /**
   * If true then mouse clicks by backdrop will close a dialog.
   * */
  closeOnBackdropClick: boolean = true;

  /**
   * If true then escape press will close a dialog.
   * */
  closeOnEsc: boolean = true;

  /**
   * Disables scroll on content under dialog if true and does nothing otherwise.
   * */
  hasScroll: boolean = false;

  /**
   * Focuses dialog automatically after open if true.
   * */
  autoFocus: boolean = true;

  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the dialog. This does not affect where the dialog
   * content will be rendered.
   */
  viewContainerRef: ViewContainerRef;

  context: D;

  constructor(config: Partial<NbDialogConfig>) {
    Object.assign(this, config);
  }
}
