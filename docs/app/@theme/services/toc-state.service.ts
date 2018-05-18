import { Injectable } from '@angular/core';

export interface NgdTocElement {
  fragment: string;
  element: any;
  y: number;
  setInView(val: boolean);
}

@Injectable()
export class NgdTocStateService {
  state: NgdTocElement[] = [];

  add(el: NgdTocElement) {
    this.state.push(el);
  }

  remove(el: NgdTocElement) {
    this.state = this.state.filter(e => e !== el);
  }

  list(): NgdTocElement[] {
    return this.state;
  }

  clear() {
    this.state = []
  }
}
