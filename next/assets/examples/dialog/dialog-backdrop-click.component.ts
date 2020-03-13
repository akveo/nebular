import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BackdropClickDialogComponent } from './components/backdrop-click-dialog.component';

@Component({
  selector: 'nb-dialog-backdrop-click',
  template: `
    <button nbButton (click)="openWithBackdropClick()">With backdrop click close</button>
    <button nbButton (click)="openWithoutBackdropClick()">Without backdrop click close</button>
  `,
  styleUrls: ['./dialog-common.scss'],
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
