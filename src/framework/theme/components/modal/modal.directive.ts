import { ComponentRef, Directive, Input } from '@angular/core';
import { NbThemeService } from '../../services/theme.service';
import { NbPortal, NbPortalContent, NbPortalOutlet } from '../portal/portal-outlet';
import { NbModalComponent } from './modal.component';

/**
* Blur modal directive.
*
* @stacked-example(Plain modal usage, modal/modal-showcase.component)
 *
 * Modal have beautiful blur
* */
@Directive({ selector: '[nbModal]' })
export class NbModalDirective {
  @Input('nbModal')
  content: NbPortalContent;

  @Input('nbModalContext')
  context: Object;

  @Input('nbModalBackdropClose')
  backdropClose: boolean;

  private ref: ComponentRef<any>;

  constructor(private portalOutlet: NbPortalOutlet,
              private themeService: NbThemeService) {
  }

  show() {
    const portal = this.buildPortal();
    this.themeService.appendLayoutClass('blurred');
    this.create(portal);
    document.body.style.overflow = 'hidden';
  }

  destroy() {
    this.themeService.removeLayoutClass('blurred');
    this.ref.destroy();
    document.body.style.overflow = 'auto';
  }

  private create(portal: NbPortal) {
    this.portalOutlet.create(portal)
      .subscribe((ref: ComponentRef<any>) => {
        this.ref = ref;
        this.place();
      });
  }

  private buildPortal(): NbPortal {
    return {
      content: NbModalComponent,
      context: {
        content: this.content,
        context: this.context,
        onClick: event => this.onClick(event),
      },
    };
  }

  private onClick(event) {
    if (this.isBackdropClick(event) && this.backdropClose) {
      this.destroy();
    }
  }

  private isBackdropClick(event) {
    return event.target === this.ref.location.nativeElement.firstElementChild;
  }

  private place() {
    Object.assign(this.ref.instance, { top: 0, right: 0, left: 0, bottom: 0 });
  }
}
