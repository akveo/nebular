import { ComponentRef, Directive, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NbPortal, NbPortalContent, NbPortalOutlet } from '../portal/portal-outlet';
import { NbModalComponent } from '@nebular/theme/components/modal/modal.component';
import { NbThemeService } from '@nebular/theme';

@Directive({ selector: '[nbModal]' })
export class NbModalDirective {
  @Input('nbModal')
  content: NbPortalContent;

  @Input('nbModalContext')
  context: Object;

  private ref: ComponentRef<any>;
  private alive = true;

  constructor(private portalOutlet: NbPortalOutlet,
              private themeService: NbThemeService) {
  }

  show() {
    const portal = this.buildPortal();
    this.themeService.appendLayoutClass('blurred');
    this.create(portal);
  }

  destroy() {
    this.themeService.removeLayoutClass('blurred');
    this.ref.destroy();
  }

  private create(portal: NbPortal) {
    this.portalOutlet.create(portal)
      .pipe(
        tap((ref: ComponentRef<any>) => this.ref = ref),
        tap(() => this.place()),
      ).subscribe();
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
    if (event.target === this.ref.location.nativeElement.firstElementChild) {
      this.destroy();
    }
  }

  private place() {
    Object.assign(this.ref.instance, { top: 0, right: 0, left: 0, bottom: 0 });
  }
}
