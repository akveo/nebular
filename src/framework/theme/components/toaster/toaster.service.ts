import { ComponentRef, Injectable } from '@angular/core';
import { NbPortalOutlet } from '../portal/portal-outlet';
import { NbToastComponent } from './toaster.component';
import { NbPositioningHelper } from './positioning.helper';
import { NbToast, NbToastPortal, NbToastPosition, NbToastRegistryBag, NbToastStatus } from './model';


const DEFAULT_DURATION = 3000;

/**
 * Toaster, the best with cosmic
 *
 * @stacked-example(Super toaster, toaster/toaster-showcase.component)
 * */
@Injectable()
export class NbToasterService {

  private registry: NbToastRegistryBag[] = [];

  constructor(private portalOutlet: NbPortalOutlet,
              private positioningHelper: NbPositioningHelper) {
  }

  show(toast: NbToast) {
    const portal = this.buildPortal(toast);
    this.create(portal);
  }

  private create(portal: NbToastPortal) {
    this.portalOutlet.create(portal)
      .subscribe((ref: ComponentRef<any>) => {
        this.save(ref, portal);
        this.place(ref);
        this.setupDestroyTimer(ref, portal);
      });
  }

  private buildPortal({ content, context, duration, position, status, margin, title }: NbToast): NbToastPortal {
    return {
      content: NbToastComponent,
      position: position || NbToastPosition.TOP_RIGHT,
      duration: duration || DEFAULT_DURATION,
      margin: margin || 16,
      context: {
        status: status || NbToastStatus.DEFAULT,
        title,
        content,
        context,
        onClick: instance => this.onClick(instance),
      },
    };
  }

  private destroy(ref: ComponentRef<any>) {
    ref.destroy();
    const deleted = this.getBagIndex(ref);
    this.registry.splice(deleted, 1);
    this.recalculateRest(deleted);
  }

  private onClick(instance) {
    const ref = this.registry.find(bag => bag.ref.instance === instance).ref;
    this.destroy(ref);
  }

  private place(ref: ComponentRef<any>) {
    const position = this.positioningHelper.calcPosition(ref, this.registry);
    Object.assign(ref.instance, position);
  }

  private setupDestroyTimer(ref: ComponentRef<any>, { duration }: NbToastPortal) {
    setTimeout(() => this.destroy(ref), duration);
  }

  private save(ref: ComponentRef<any>, portal: NbToastPortal) {
    this.registry.push({ ref, portal });
  }

  private recalculateRest(from: number) {
    this.registry.slice(from).forEach(({ ref }) => this.place(ref));
  }

  private getBagIndex(ref: ComponentRef<any>): number {
    return this.registry.findIndex(item => item.ref === ref);
  }
}
