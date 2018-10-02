/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component, ComponentFactoryResolver, Input, TemplateRef, Type, ViewChild } from '@angular/core';
import { NbComponentPortal, NbOverlayContainerComponent, NbPositionedContainer, NbTemplatePortal } from '../cdk';


/**
 * Overlay container.
 * Renders provided content inside.
 *
 * @styles
 *
 * popover-fg
 * popover-bg
 * popover-border
 * popover-shadow
 * */
@Component({
  selector: 'nb-popover',
  styleUrls: ['./popover.component.scss'],
  template: `
    <span class="arrow"></span>
    <nb-overlay-container></nb-overlay-container>
  `,
})
export class NbPopoverComponent extends NbPositionedContainer implements AfterViewInit {
  @ViewChild(NbOverlayContainerComponent) overlayContainer: NbOverlayContainerComponent;

  @Input() content: any;
  @Input() context: Object;
  @Input() cfr: ComponentFactoryResolver;

  ngAfterViewInit() {
    if (this.content instanceof TemplateRef) {
      this.attachTemplate();
    } else if (this.content instanceof Type) {
      this.attachComponent();
    } else {
      this.attachString();
    }
  }

  protected attachTemplate() {
    this.overlayContainer.attachTemplatePortal(new NbTemplatePortal(this.content, null, this.context));
  }

  protected attachComponent() {
    const portal = new NbComponentPortal(this.content, null, null, this.cfr);
    const ref = this.overlayContainer.attachComponentPortal(portal);
    Object.assign(ref.instance, this.context);
    ref.changeDetectorRef.detectChanges();
  }

  protected attachString() {
    this.overlayContainer.attachStringContent(this.content);
  }
}
