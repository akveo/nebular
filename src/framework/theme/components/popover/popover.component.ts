/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ComponentFactoryResolver,
  Input,
  TemplateRef,
  Type,
  ViewChild,
} from '@angular/core';
import { NbComponentPortal, NbTemplatePortal } from '../cdk/overlay/mapping';
import {
  NbOverlayContainerComponent,
  NbPositionedContainer,
  NbRenderableContainer,
} from '../cdk/overlay/overlay-container';


/**
 * Overlay container.
 * Renders provided content inside.
 *
 * @styles
 *
 * popover-text-color:
 * popover-text-font-family:
 * popover-text-font-size:
 * popover-text-font-weight:
 * popover-text-line-height:
 * popover-background-color:
 * popover-border-width:
 * popover-border-color:
 * popover-border-radius:
 * popover-shadow:
 * popover-arrow-size:
 * popover-padding:
 * */
@Component({
  selector: 'nb-popover',
  styleUrls: ['./popover.component.scss'],
  template: `
    <span class="arrow"></span>
    <nb-overlay-container></nb-overlay-container>
  `,
})
export class NbPopoverComponent extends NbPositionedContainer implements NbRenderableContainer {
  @ViewChild(NbOverlayContainerComponent, { static: false }) overlayContainer: NbOverlayContainerComponent;

  @Input() content: any;
  @Input() context: Object;
  @Input() cfr: ComponentFactoryResolver;

  renderContent() {
    this.detachContent();
    this.attachContent();
  }

  protected detachContent() {
    this.overlayContainer.detach();
  }

  protected attachContent() {
    if (this.content instanceof TemplateRef) {
      this.attachTemplate();
    } else if (this.content instanceof Type) {
      this.attachComponent();
    } else {
      this.attachString();
    }
  }

  protected attachTemplate() {
    this.overlayContainer
      .attachTemplatePortal(new NbTemplatePortal(this.content, null, <any>{ $implicit: this.context }));
  }

  protected attachComponent() {
    const portal = new NbComponentPortal(this.content, null, null, this.cfr);
    const ref = this.overlayContainer.attachComponentPortal(portal, this.context);
    ref.changeDetectorRef.detectChanges();
  }

  protected attachString() {
    this.overlayContainer.attachStringContent(this.content);
  }
}
