import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AutoFocusDialogComponent } from './components/auto-focus-dialog.component';

@Component({
  selector: 'nb-dialog-auto-focus',
  template: `
    <button nbButton (click)="openWithAutoFocus()">With auto focus</button>
    <button nbButton (click)="openWithoutAutoFocus()">Without auto focus</button>
  `,
  styleUrls: ['./dialog-common.scss'],
})
export class DialogAutoFocusComponent {
  constructor(private dialogService: NbDialogService) {
  }

  openWithAutoFocus() {
    this.open(true);
  }

  openWithoutAutoFocus() {
    this.open(false);
  }

  protected open(autoFocus: boolean) {
    this.dialogService.open(AutoFocusDialogComponent, { autoFocus });
  }
}
