import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NbDialogComponent } from './dialog.component';


@Component({
  selector: 'nb-dialog-showcase',
  template: '<button class="btn btn-primary" (click)="open()">Open Dialog</button>',
  styles: [` /deep/ nb-layout-column {
    height: 80vw;
  } `],
})
export class NbDialogShowcaseComponent {
  constructor(private dialogService: NbDialogService) {
  }

  open() {
    this.dialogService.open(NbDialogComponent);
  }
}
