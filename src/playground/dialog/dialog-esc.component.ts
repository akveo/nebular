import { Component } from '@angular/core';

import { NbDialogComponent } from './dialog.component';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'nb-dialog-esc',
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

export class NbDialogEscComponent {
  constructor(private dialogService: NbDialogService) {
  }

  openWithEscClose() {
    this.open(true);
  }

  openWithoutEscClose() {
    this.open(false);
  }

  protected open(closeOnEsc: boolean) {
    this.dialogService.open(NbDialogComponent, { closeOnEsc });
  }
}
