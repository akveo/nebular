/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ComponentRef, ElementRef, EmbeddedViewRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {
  NbComponentPortal,
  NbFocusTrap,
  NbFocusTrapFactoryService,
  NbPortalOutletDirective,
  NbTemplatePortal,
} from '../cdk';
import { NbDialogConfig } from './dialog-config';


/**
 * Container component for each dialog.
 * All the dialogs will be attached to it.
 * // TODO add animations
 * */
@Component({
  selector: 'nb-dialog-container',
  templateUrl: './dialog-container.html',
})
export class NbDialogContainerComponent implements OnInit, OnDestroy {
  @ViewChild(NbPortalOutletDirective) portalOutlet: NbPortalOutletDirective;

  protected focusTrap: NbFocusTrap;

  constructor(protected config: NbDialogConfig,
              protected elementRef: ElementRef,
              protected focusTrapFactory: NbFocusTrapFactoryService) {
  }

  ngOnInit() {
    if (this.config.autoFocus) {
      this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
      this.focusTrap.blurPreviouslyFocusedElement();
      this.focusTrap.focusInitialElement();
    }
  }

  ngOnDestroy() {
    if (this.config.autoFocus && this.focusTrap) {
      this.focusTrap.restoreFocus();
    }
  }

  attachComponentPortal<T>(portal: NbComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: NbTemplatePortal<C>): EmbeddedViewRef<C> {
    return this.portalOutlet.attachTemplatePortal(portal);
  }
}
