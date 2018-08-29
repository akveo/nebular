import { Component } from '@angular/core';

import { NbModalComponent } from './modal.component';
import { NbModalService } from '@nebular/theme';


@Component({
  selector: 'nb-modal-scroll',
  template: `
    <div class="btn-group btn-divided-group btn-outline-divided-group">
      <button nbButton hero (click)="openWithScroll()">Open with scroll</button>
      <button nbButton hero (click)="openWithoutScroll()">Open without scroll</button>
    </div>
  `,
  styles: [`
    /deep/ nb-layout-column {
      height: 80vw;
    }

    button {
      margin: 1rem;
    }
  `],
})

export class NbModalScrollComponent {
  constructor(private modalService: NbModalService) {
  }

  openWithScroll() {
    this.open(true);
  }

  openWithoutScroll() {
    this.open(false);
  }

  protected open(hasScroll: boolean) {
    this.modalService.show(NbModalComponent, { hasScroll });
  }
}
