/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ComponentRef, ElementRef, EmbeddedViewRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { NbComponentPortal, NbPortalOutletDirective, NbTemplatePortal } from '../cdk/overlay/mapping';
import { NbFocusTrap, NbFocusTrapFactoryService } from '../cdk/a11y/focus-trap';
import { NbDialogConfig } from './dialog-config';


/**
 * Container component for each dialog.
 * All the dialogs will be attached to it.
 * // TODO add animations
 * */
@Component({
  selector: 'nb-dialog-container',
  template: '<ng-template nbPortalOutlet></ng-template>',
})
export class NbDialogContainerComponent implements OnInit, OnDestroy {

  // TODO static must be false as of Angular 9.0.0, issues/1514
  @ViewChild(NbPortalOutletDirective, { static: true }) portalOutlet: NbPortalOutletDirective;

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
