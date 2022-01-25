import { Component } from '@angular/core';
import { NbDialogService } from '@beast/theme';
import { ShowcaseDialogComponent } from './components/showcase-dialog.component';

@Component({
  selector: 'nb-dialog-showcase',
  template: '<button nbButton (click)="open()">Open Dialog</button>',
  styleUrls: ['./dialog-common.scss'],
})
export class DialogShowcaseComponent {
  constructor(private dialogService: NbDialogService) {}

  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
}
