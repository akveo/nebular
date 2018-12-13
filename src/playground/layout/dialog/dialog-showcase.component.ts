import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NbShowcaseDialogComponent } from './components/showcase-dialog.component';

@Component({
  selector: 'nb-dialog-showcase',
  template: '<button nbButton (click)="open()">Open Dialog</button>',
  styles: [` /deep/ nb-layout-column {
    height: 80vw;
  } `],
})
export class NbDialogShowcaseComponent {
  constructor(private dialogService: NbDialogService) {
  }

  open() {
    this.dialogService.open(NbShowcaseDialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
}
