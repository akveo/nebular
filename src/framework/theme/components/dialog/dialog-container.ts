import { Component, ComponentRef, ElementRef, EmbeddedViewRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {
  NbComponentPortal,
  NbFocusTrap,
  NbFocusTrapFactoryService,
  NbPortalOutletDirective,
  NbTemplatePortal,
} from '../cdk';
import { NbDialogConfig } from './dialog-config';


@Component({
  selector: 'nb-dialog-container',
  template: '<ng-template nbPortalOutlet></ng-template>',
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
    this.focusTrap.restoreFocus();
  }

  attachComponentPortal<T>(portal: NbComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: NbTemplatePortal<C>): EmbeddedViewRef<C> {
    return this.portalOutlet.attachTemplatePortal(portal);
  }
}
