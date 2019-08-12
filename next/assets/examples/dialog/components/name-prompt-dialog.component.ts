import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'nb-name-prompt',
  template: `
    <nb-card>
      <nb-card-header>Enter your name</nb-card-header>
      <nb-card-body>
        <input #name nbInput placeholder="Name">
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="cancel()">Cancel</button>
        <button nbButton status="success" (click)="submit(name.value)">Submit</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class DialogNamePromptComponent {
  constructor(protected dialogRef: NbDialogRef<DialogNamePromptComponent>) {
  }

  cancel() {
    this.dialogRef.close();
  }

  submit(name) {
    this.dialogRef.close(name);
  }
}
