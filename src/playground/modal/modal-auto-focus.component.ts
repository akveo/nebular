import { Component } from '@angular/core';

import { NbModalComponent } from './modal.component';
import { NbModalService } from '@nebular/theme';


@Component({
  selector: 'nb-modal-auto-focus',
  template: `
    <div class="btn-group btn-divided-group btn-outline-divided-group">
      <button nbButton hero (click)="openWithAutoFocus()">Open with auto focus</button>
      <button nbButton hero (click)="openWithoutAutoFocus()">Open without auto focus</button>
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

export class NbModalAutoFocusComponent {
  constructor(private modalService: NbModalService) {
  }

  openWithAutoFocus() {
    this.open(true);
  }

  openWithoutAutoFocus() {
    this.open(false);
  }

  protected open(autoFocus: boolean) {
    this.modalService.show(NbModalComponent, { autoFocus });
  }
}
