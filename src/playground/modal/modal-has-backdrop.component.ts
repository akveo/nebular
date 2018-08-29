import { Component } from '@angular/core';

import { NbModalComponent } from './modal.component';
import { NbModalService } from '@nebular/theme';


@Component({
  selector: 'nb-modal-has-backdrop',
  template: `
    <div class="btn-group btn-divided-group btn-outline-divided-group">
      <button nbButton hero (click)="openWithBackdrop()">Open with backdrop</button>
      <button nbButton hero (click)="openWithoutBackdrop()">Open without backdrop</button>
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

export class NbModalHasBackdropComponent {
  constructor(private modalService: NbModalService) {
  }

  openWithBackdrop() {
    this.open(true);
  }

  openWithoutBackdrop() {
    this.open(false);
  }

  protected open(hasBackdrop: boolean) {
    this.modalService.show(NbModalComponent, { hasBackdrop });
  }
}
