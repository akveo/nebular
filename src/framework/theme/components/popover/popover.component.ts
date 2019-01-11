/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ComponentFactoryResolver, Input, TemplateRef, Type, ViewChild } from '@angular/core';
import {
  NbComponentPortal,
  NbOverlayContainerComponent,
  NbPositionedContainer,
  NbRenderableContainer,
  NbTemplatePortal,
} from '../cdk';


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
export class NbPopoverComponent extends NbPositionedContainer implements NbRenderableContainer {
  @ViewChild(NbOverlayContainerComponent) overlayContainer: NbOverlayContainerComponent;

  @Input() content: any;
  @Input() context: Object;
  @Input() cfr: ComponentFactoryResolver;

  /**
   * A renderContent method renders content with provided context.
   * Naturally, this job has to be done by ngOnChanges lifecycle hook, but
   * ngOnChanges hook will be triggered only if we update content or context properties
   * through template property binding syntax. But in our case we're updating these properties programmatically.
   * */
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
