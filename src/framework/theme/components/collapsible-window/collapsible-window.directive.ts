import { Directive, Input, OnDestroy } from '@angular/core';
import { NbPortal, NbPortalContent, NbPortalOutlet } from '../portal/portal-outlet';
import { NbCollapsibleWindowService } from './collapsible-window.service';
import { NbCollapsibleWindowComponent } from './collapsible-window.component';
import { NbPortalComponent } from '../portal/portal.component';
import { NbThemeService } from '../../services/theme.service';

/**
* Collapsible windows.
*
* @stacked-example(Plain usage, collapsible/collapsible-showcase.component)
 *
 * Collipsable windows can be collapsed
 *
 * Minimized
 *
 * And maximized
* */
@Directive({ selector: '[nbCollapsibleWindow]' })
export class NbCollapsibleWindowDirective implements OnDestroy {

  @Input('nbCollapsibleWindow')
  content: NbPortalContent;

  @Input('nbCollapsibleWindowContext')
  context: Object;

  @Input('nbCollapsibleWindowTitle')
  title: string;

  constructor(private portalOutlet: NbPortalOutlet,
              private themeService: NbThemeService,
              private collapsibleWindowService: NbCollapsibleWindowService) { }

  show() {
    const portal = this.buildPortal();
    this.create(portal);
  }



  ngOnDestroy() {
    this.themeService.removeLayoutClass('blurred');
  }

  private create(portal: NbPortal) {
    this.portalOutlet.create(portal)
      .subscribe(ref => {
        this.collapsibleWindowService.add(ref);
      });
  }

  private buildPortal(): NbPortal {
    return {
      content: NbCollapsibleWindowComponent,
      context: {
        content: this.content,
        context: this.context,
        title: this.title,
        onCollapseToggle: (portal, state)  => this.onCollapseToggle(portal, state),
        onExpandToggle: (portal, state) => this.onExpandToggle(portal, state),
        onClose: (portalRef) => this.destroy(portalRef),
      },
    };
  }

  private destroy(portal) {
    this.collapsibleWindowService.remove(portal);
  }

  private onCollapseToggle(portal: NbPortalComponent, state: boolean) {
    this.collapsibleWindowService.toggleCollapse(portal, state);
  }

  private onExpandToggle(portal: NbPortalComponent, state: boolean) {
    this.collapsibleWindowService.toggleExpand(portal, state);
  }

}
