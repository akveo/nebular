import { Inject, Injectable, NgZone } from '@angular/core';
import { FocusTrap, FocusTrapFactory, InteractivityChecker } from '@angular/cdk/a11y';

import { NB_DOCUMENT } from '../../../theme.options';


/**
 * Overrides angular cdk focus trap to keep restore functionality inside trap.
 * */
export class NbFocusTrap extends FocusTrap {
  protected previouslyFocusedElement: HTMLElement;

  constructor(
    protected element: HTMLElement,
    protected checker: InteractivityChecker,
    protected ngZone: NgZone,
    protected document: Document,
    deferAnchors) {
    super(element, checker, ngZone, document, deferAnchors);
    this.savePreviouslyFocusedElement();
  }

  restoreFocus() {
    this.previouslyFocusedElement.focus();
    this.destroy();
  }

  blurPreviouslyFocusedElement() {
    this.previouslyFocusedElement.blur();
  }

  protected savePreviouslyFocusedElement() {
    this.previouslyFocusedElement = this.document.activeElement as HTMLElement;
  }
}

@Injectable()
export class NbFocusTrapFactoryService extends FocusTrapFactory {
  constructor(
    protected checker: InteractivityChecker,
    protected ngZone: NgZone,
    @Inject(NB_DOCUMENT) private document) {
    super(checker, ngZone, document);
  }

  create(element: HTMLElement, deferCaptureElements?: boolean): NbFocusTrap {
    return new NbFocusTrap(element, this.checker, this.ngZone, this.document, deferCaptureElements);
  }
}
