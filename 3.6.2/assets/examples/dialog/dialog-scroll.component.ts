import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ScrollDialogComponent } from './components/scroll-dialog.component';

@Component({
  selector: 'nb-dialog-scroll',
  template: `
    <button nbButton (click)="openWithScroll()">With scroll</button>
    <button nbButton (click)="openWithoutScroll()">Without scroll</button>
  `,
  styleUrls: ['./dialog-common.scss'],
})
export class DialogScrollComponent {
  constructor(private dialogService: NbDialogService) {
  }

  openWithScroll() {
    this.open(true);
  }

  openWithoutScroll() {
    this.open(false);
  }

  protected open(hasScroll: boolean) {
    this.dialogService.open(ScrollDialogComponent, { hasScroll });
  }
}
