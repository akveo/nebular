import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { HasBackdropDialogComponent } from './components/has-backdrop-dialog.component';

@Component({
  selector: 'nb-dialog-has-backdrop',
  template: `
    <button nbButton (click)="openWithBackdrop()">With backdrop</button>
    <button nbButton (click)="openWithoutBackdrop()">Without backdrop</button>
  `,
  styleUrls: ['./dialog-common.scss'],
})
export class DialogHasBackdropComponent {
  constructor(private dialogService: NbDialogService) {
  }

  openWithBackdrop() {
    this.open(true);
  }

  openWithoutBackdrop() {
    this.open(false);
  }

  protected open(hasBackdrop: boolean) {
    this.dialogService.open(HasBackdropDialogComponent, { hasBackdrop });
  }
}
