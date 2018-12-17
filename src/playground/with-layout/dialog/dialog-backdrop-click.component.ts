import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BackdropClickDialogComponent } from './components/backdrop-click-dialog.component';

@Component({
  selector: 'nb-dialog-backdrop-click',
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
export class DialogBackdropClickComponent {
  constructor(private dialogService: NbDialogService) {
  }

  openWithBackdropClick() {
    this.open(true);
  }

  openWithoutBackdropClick() {
    this.open(false);
  }

  protected open(closeOnBackdropClick: boolean) {
    this.dialogService.open(BackdropClickDialogComponent, { closeOnBackdropClick });
  }
}
