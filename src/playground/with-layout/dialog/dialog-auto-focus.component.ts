import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AutoFocusDialogComponent } from './components/auto-focus-dialog.component';

@Component({
  selector: 'nb-dialog-auto-focus',
  template: `
    <div class="btn-group btn-divided-group btn-outline-divided-group">
      <button nbButton hero (click)="openWithAutoFocus()">Open with auto focus</button>
      <button nbButton hero (click)="openWithoutAutoFocus()">Open without auto focus</button>
    </div>
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
