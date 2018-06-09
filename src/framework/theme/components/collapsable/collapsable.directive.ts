import { Directive, Input, OnDestroy } from '@angular/core';
import { NbPortal, NbPortalContent, NbPortalOutlet } from '../portal/portal-outlet';
import { NbThemeService } from '../../services/theme.service';
import { NbCollapsableService } from './collapsable.service';
import { NbCollapsableComponent } from './collapsable.component';
import { NbPortalComponent } from '../portal/portal.component';
import { Inject } from '@angular/core';
import { NB_WINDOW } from '../../theme.options';

const DEFAULT_OFFSET = 10;
const DEFAULT_GAP = 10;

@Directive({ selector: '[nbCollapsable]' })
export class NbCollapsableDirective implements OnDestroy {

  @Input('nbCollapsable')
  content: NbPortalContent;

  @Input('nbCollapsableContext')
  context: Object;

  @Input('nbCollapsableTitle')
  title: string;

  constructor(private portalOutlet: NbPortalOutlet,
              private themeService: NbThemeService,
              private collapsableService: NbCollapsableService,
              @Inject(NB_WINDOW) private window) { }

  show() {
    const portal = this.buildPortal();
    this.create(portal);
  }

  destroy(outletInstance: NbPortalComponent) {
    const { index, ref } = this.collapsableService.remove(outletInstance);
    ref.destroy();
    this.recalculateRest(index);
  }

  ngOnDestroy() {
    this.themeService.removeLayoutClass('blurred');
  }

  private create(portal: NbPortal) {
    this.portalOutlet.create(portal)
      .subscribe(ref => {
        this.place(ref, this.collapsableService.get());
        this.collapsableService.add(ref);
      });
  }

  private buildPortal(): NbPortal {
    return {
      content: NbCollapsableComponent,
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

  private onCollapseToggle(portal: NbPortalComponent, state: boolean) {
    state ? this.collapse(portal) : this.unCollapse(portal);
  }


  private onExpandToggle(portal: NbPortalComponent, state: boolean) {
    state ? this.expand(portal) : this.unExpand(portal);
  }

  private expand(portal: NbPortalComponent) {
    portal.right = 0;
    portal.left = 0;
    portal.top = 0;
    portal.bottom = 0;
    this.themeService.appendLayoutClass('blurred');
    const registry = this.collapsableService.get();
    const index = registry.findIndex(item => item.instance === portal);
    const registryRest = registry.slice(0, index).concat(registry.slice(index + 1));
    this.recalculateRest(0, registryRest);
  }

  private unExpand(portal: NbPortalComponent) {
    portal.left = null;
    portal.top = null;
    this.themeService.removeLayoutClass('blurred');
    const registry = this.collapsableService.get();
    const index = registry.findIndex(item => item.instance === portal);
    registry[index].changeDetectorRef.detectChanges();
    this.recalculateRest(index);
  }

  private collapse(portal) {
    const registry = this.collapsableService.get();
    const index = registry.findIndex(item => item.instance === portal);
    registry[index].changeDetectorRef.detectChanges();
    this.recalculateRest(index + 1);
  }

  private unCollapse(portal) {
    const registry = this.collapsableService.get();
    const index = registry.findIndex(item => item.instance === portal);
    registry[index].changeDetectorRef.detectChanges();
    this.recalculateRest(index );
  }

  private recalculateRest(index, registryRest?) {
    const registry = registryRest || this.collapsableService.get();
    registry.slice(index).forEach((item, i) => {
      this.place(item, registry.slice(0, index + i))
    });
  }

  private place(ref, refs) {
    const rightOffset = refs.reduce((acc, item) => acc + this.getWidth(item), DEFAULT_OFFSET);

    const elWidth = this.getWidth(ref);
    if (this.window.innerWidth > rightOffset + elWidth) {
      ref.instance.right = rightOffset;
      ref.instance.bottom = DEFAULT_OFFSET;
    } else {
      ref.instance.right = this.window.innerWidth;
    }
  }

  private getWidth(ref) {
    return ref.location.nativeElement.getBoundingClientRect().width + DEFAULT_GAP;
  }
}
