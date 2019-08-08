import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { EscDialogComponent } from './components/esc-dialog.component';

@Component({
  selector: 'nb-dialog-esc',
  template: `
    <button nbButton (click)="openWithEscClose()">Open with escape close</button>
    <button nbButton (click)="openWithoutEscClose()">Open without escape close</button>
  `,
  styleUrls: ['./dialog-common.scss'],
})
export class DialogEscComponent {
  constructor(private dialogService: NbDialogService) {
  }

  openWithEscClose() {
    this.open(true);
  }

  openWithoutEscClose() {
    this.open(false);
  }

  protected open(closeOnEsc: boolean) {
    this.dialogService.open(EscDialogComponent, { closeOnEsc });
  }
}
