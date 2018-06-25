import { ComponentRef, Inject, Injectable } from '@angular/core';
import { NbPortalComponent } from '../portal/portal.component';
import { NbThemeService } from '../../services/theme.service';
import { NB_WINDOW } from '../../theme.options';

const DEFAULT_OFFSET = 10;
const DEFAULT_GAP = 10;

@Injectable()
export class NbCollapsibleWindowService {

  components: ComponentRef<NbPortalComponent>[] = [];

  constructor(private themeService: NbThemeService,
              @Inject(NB_WINDOW) private window) {  }

  private getWidth(ref) {
    return ref.location.nativeElement.getBoundingClientRect().width + DEFAULT_GAP;
  }

  add(ref: ComponentRef<NbPortalComponent>) {
    this.place(ref, this.components);
    this.components.push(ref);
  }

  get() {
    return this.components;
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

  private recalculateRest(index, components?) {
    components = components || this.components;
    components.slice(index).forEach((item, i) => {
      this.place(item, components.slice(0, index + i))
    });
  }

  toggleCollapse(portal, state) {
    const index = this.components.findIndex(item => item.instance === portal);
    this.components[index].changeDetectorRef.detectChanges();
    state ? this.recalculateRest(index + 1) : this.recalculateRest(index);
  }

  toggleExpand(portal, state) {
    state ? this.expand(portal) : this.unExpand(portal);
  }

  private expand(portal: NbPortalComponent) {
    portal.right = 0;
    portal.left = 0;
    portal.top = 0;
    portal.bottom = 0;
    this.themeService.appendLayoutClass('blurred');
    document.body.style.overflow = 'hidden';
    const index = this.components.findIndex(item => item.instance === portal);
    const registryRest = this.components.slice(0, index).concat(this.components.slice(index + 1));
    this.recalculateRest(index, registryRest);
  }

  private unExpand(portal: NbPortalComponent) {
    portal.left = null;
    portal.top = null;
    this.themeService.removeLayoutClass('blurred');
    document.body.style.overflow = 'auto';
    const index = this.components.findIndex(item => item.instance === portal);
    this.components[index].changeDetectorRef.detectChanges();
    this.recalculateRest(index);
  }

  remove(portal: NbPortalComponent) {
    const index = this.components.findIndex(item => item.instance === portal);
    this.components = this.components.slice(0, index).concat(this.components.slice(index + 1));
    this.recalculateRest(index);
  }
}
