import { Component } from '@angular/core';

import { NbDialogComponent } from './dialog.component';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'nb-dialog-scroll',
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

export class NbDialogScrollComponent {
  constructor(private dialogService: NbDialogService) {
  }

  openWithScroll() {
    this.open(true);
  }

  openWithoutScroll() {
    this.open(false);
  }

  protected open(hasScroll: boolean) {
    this.dialogService.open(NbDialogComponent, { hasScroll });
  }
}
