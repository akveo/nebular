import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from './components/name-prompt-dialog.component';

@Component({
  selector: 'nb-dialog-result',
  template: `
    <button nbButton status="primary" (click)="open()">Enter Name</button>
    <br>
    <h3 class="h5">Names:</h3>
    <ul>
      <li *ngFor="let name of names">{{ name }}</li>
    </ul>
  `,
  styleUrls: ['./dialog-common.scss'],
})
export class DialogResultComponent {
  names: string[] = [];

  constructor(private dialogService: NbDialogService) {
  }

  open() {
    this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(name => name && this.names.push(name));
  }
}
