import { Component } from '@angular/core';

import { NbModalComponent } from './modal.component';
import { NbModalService } from '@nebular/theme';


@Component({
  selector: 'nb-modal-esc',
  template: `
    <div class="btn-group btn-divided-group btn-outline-divided-group">
      <button nbButton hero (click)="openWithEscClose()">Open with escape close</button>
      <button nbButton hero (click)="openWithoutEscClose()">Open without escape close</button>
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

export class NbModalEscComponent {
  constructor(private modalService: NbModalService) {
  }

  openWithEscClose() {
    this.open(true);
  }

  openWithoutEscClose() {
    this.open(false);
  }

  protected open(closeOnEsc: boolean) {
    this.modalService.open(NbModalComponent, { closeOnEsc });
  }
}
