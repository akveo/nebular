/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NbOverlayRef } from '../cdk/overlay/mapping';


/**
 * The `NbDialogRef` helps to manipulate dialog after it was created.
 * The dialog can be dismissed by using `close` method of the dialogRef.
 * You can access rendered component as `content` property of the dialogRef.
 * `onBackdropClick` streams click events on the backdrop of the dialog.
 * */
export class NbDialogRef<T> {

  componentRef: ComponentRef<T>;

  /**
   * Stream of backdrop click events.
   * */
  readonly onBackdropClick: Observable<MouseEvent>;
  protected onClose$: Subject<any> = new Subject();
  readonly onClose: Observable<any> = this.onClose$.asObservable();

  constructor(protected overlayRef: NbOverlayRef) {
    this.onBackdropClick = this.overlayRef.backdropClick();
  }

  /**
   * Hides dialog.
   * */
  close(res?: any) {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.onClose$.next(res);
    this.onClose$.complete();
  }
}
