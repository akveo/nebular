import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { HasBackdropDialogComponent } from './components/has-backdrop-dialog.component';

@Component({
  selector: 'nb-dialog-has-backdrop',
  template: `
    <div class="btn-group btn-divided-group btn-outline-divided-group">
      <button nbButton hero (click)="openWithBackdrop()">Open with backdrop</button>
      <button nbButton hero (click)="openWithoutBackdrop()">Open without backdrop</button>
    </div>
  `,
  styles: [`
    ::ng-deep nb-layout-column {
      height: 80vw;
    }

    button {
      margin: 1rem;
    }
  `],
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
