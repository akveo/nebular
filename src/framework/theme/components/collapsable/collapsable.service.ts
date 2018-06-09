import { ComponentRef, Injectable } from '@angular/core';
import { NbPortalComponent } from '../portal/portal.component';

@Injectable()
export class NbCollapsableService {

  components: ComponentRef<NbPortalComponent>[] = [];

  constructor() {  }

  add(ref: ComponentRef<NbPortalComponent>) {
    this.components.push(ref);
  }

  get() {
    return this.components;
  }

  remove(instance: NbPortalComponent): { ref: ComponentRef<NbPortalComponent>, index } {
    const index = this.components.findIndex(componentRef => componentRef.instance === instance);
    return {
      index: index,
      ref: this.components.splice(index, 1)[0],
    };
  }

}
