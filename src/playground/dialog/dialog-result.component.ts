import { Component } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'nb-name-prompt',
  template: `
    <nb-card>
      <nb-card-header>Enter your name</nb-card-header>
      <nb-card-body>
        <input #name nbInput placeholder="Name">
      </nb-card-body>
      <nb-card-footer>
        <button nbButton hero status="danget" (click)="cancel()">Cancel</button>
        <button nbButton hero status="success" (click)="submit(name.value)">Submit</button>
      </nb-card-footer>
    </nb-card>
  `,
  styles: [`
    button {
      margin: 1rem;
    }
  `],
})
export class NbDialogNamePromptComponent {
  constructor(protected dialogRef: NbDialogRef<NbDialogNamePromptComponent>) {
  }

  cancel() {
    this.dialogRef.close();
  }

  submit(name) {
    this.dialogRef.close(name);
  }
}

@Component({
  selector: 'nb-dialog-result',
  template: `
    <button nbButton hero status="primary" (click)="open()">Enter Name</button>
    <br>
    <h3>Names:</h3>
    <ul>
      <li *ngFor="let name of names">{{ name }}</li>
    </ul>
  `,
  styles: [`
    /deep/ nb-layout-column {
      height: 80vw;
    }
  `],
})
export class NbDialogResultComponent {
  names: string[] = [];

  constructor(private dialogService: NbDialogService) {
  }

  open() {
    this.dialogService.open(NbDialogNamePromptComponent)
      .onClose.subscribe(name => name && this.names.push(name));
  }
}
