import { ComponentRef } from '@angular/core';
import { fromEvent as observableFromEvent, Observable, Subject } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';

import { NbFocusTrap, NbFocusTrapFactoryService, NbOverlayRef } from '../cdk';
import { NbModalConfig } from './modal-config';


/**
 * The `NbModalRef` helps to manipulate modal after it was created.
 * The modal can be dismissed by using `close` method of the modalRef.
 * You can access rendered component as `content` property of the modalRef.
 * `onBackdropClick` streams click events on the backdrop of the modal.
 * */
export class NbModalRef<T> {

  /**
   * Stream of backdrop click events.
   * */
  readonly onBackdropClick: Observable<MouseEvent>;
  protected alive: boolean = true;
  protected focusTrap: NbFocusTrap;
  protected componentRef: ComponentRef<T>;
  protected onClose$: Subject<any> = new Subject();
  readonly onClose: Observable<any> = this.onClose$.asObservable();

  constructor(protected overlayRef: NbOverlayRef,
              protected config: NbModalConfig,
              protected document: Document,
              protected focusTrapFactory: NbFocusTrapFactoryService) {
    this.onBackdropClick = this.overlayRef.backdropClick();
  }

  set content(componentRef: ComponentRef<T>) {
    this.componentRef = componentRef;
    this.init();
  }

  get componentInstance(): T {
    return this.componentRef.instance;
  }

  /**
   * Hides modal.
   * */
  close(res?: any) {
    this.alive = false;
    this.focusTrap.restoreFocus();
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.onClose$.next(res);
  }

  protected init() {
    this.focusTrap = this.focusTrapFactory.create(this.componentRef.location.nativeElement);

    if (this.config.closeOnBackdropClick) {
      this.subscribeOnBackdropClick();
    }

    if (this.config.closeOnEsc) {
      this.subscribeOnEscapePress();
    }

    if (this.config.autoFocus) {
      this.focusTrap.blurPreviouslyFocusedElement();
      this.focusTrap.focusInitialElement();
    }
  }

  protected subscribeOnBackdropClick() {
    this.overlayRef.backdropClick()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.close());
  }

  protected subscribeOnEscapePress() {
    observableFromEvent(this.document, 'keyup')
      .pipe(
        takeWhile(() => this.alive),
        filter((event: KeyboardEvent) => event.keyCode === 27),
      )
      .subscribe(() => this.close());
  }
}
