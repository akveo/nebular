import { Component } from '@angular/core';

import { NbModalComponent } from './modal.component';
import { NbModalService } from '@nebular/theme';


@Component({
  selector: 'nb-modal-backdrop-click',
  template: `
    <div class="btn-group btn-divided-group btn-outline-divided-group">
      <button nbButton hero (click)="openWithBackdropClick()">Open with backdrop click close</button>
      <button nbButton hero (click)="openWithoutBackdropClick()">Open without backdrop click close</button>
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

export class NbModalBackdropClickComponent {
  constructor(private modalService: NbModalService) {
  }

  openWithBackdropClick() {
    this.open(true);
  }

  openWithoutBackdropClick() {
    this.open(false);
  }

  protected open(closeOnBackdropClick: boolean) {
    this.modalService.show(NbModalComponent, { closeOnBackdropClick });
  }
}
