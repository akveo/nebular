import { ComponentRef, Directive, Input, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbPortal, NbPortalContent, NbPortalOutlet } from '../portal/portal-outlet';
import { NbModalComponent } from '@nebular/theme/components/modal/modal.component';
import { NbThemeService } from '@nebular/theme';

@Directive({ selector: '[nbModal]' })
export class NbModalDirective implements OnDestroy {
  @Input('nbModal')
  content: NbPortalContent;

  @Input('nbModalContext')
  context: Object;

  private ref: ComponentRef<any>;
  private alive = true;

  constructor(private portalOutlet: NbPortalOutlet,
              private themeService: NbThemeService) {
  }

  ngOnDestroy() {
    this.alive = false;
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
      .pipe(takeWhile(() => this.alive))
      .subscribe(ref => this.ref = ref);
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
}
