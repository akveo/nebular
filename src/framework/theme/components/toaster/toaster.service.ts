import { ComponentRef, Injectable } from '@angular/core';
import { NbPortalOutlet } from '../portal/portal-outlet';
import { NbToastComponent } from './toaster.component';
import { tap } from 'rxjs/operators';
import { NbPositioningHelper } from './positioning.helper';
import { NbToast, NbToastPortal, NbToastPosition, NbToastRegistryBag, NbToastStatus } from './model';


const DEFAULT_DURATION = 3000;

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

  destroy(ref: ComponentRef<any>) {
    ref.destroy();
    const deleted = this.getBagIndex(ref);
    this.registry.splice(deleted, 1);
    this.recalculateRest(deleted);
  }

  private create(portal: NbToastPortal) {
    this.portalOutlet.create(portal)
      .pipe(
        tap((ref: ComponentRef<any>) => this.save(ref, portal)),
        tap((ref: ComponentRef<any>) => this.place(ref)),
        tap((ref: ComponentRef<any>) => this.setupDestroyTimer(ref, portal)),
      ).subscribe(() => {
    });
  }

  private buildPortal({ content, context, duration, position, status, margin }: NbToast): NbToastPortal {
    return {
      content: NbToastComponent,
      context: { content, context },
      position: position || NbToastPosition.TOP_RIGHT,
      duration: duration || DEFAULT_DURATION,
      status: status || NbToastStatus.INFO,
      margin: margin || 16,
    };
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
