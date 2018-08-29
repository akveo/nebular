import { Component } from '@angular/core';
import { NbModalRef, NbModalService } from '@nebular/theme';

@Component({
  selector: 'nb-name-prompt',
  template: `
    <nb-card>
      <nb-card-header>Enter your name</nb-card-header>
      <nb-card-body>
        <input #name class="form-control" placeholder="Name">
      </nb-card-body>
      <nb-card-footer>
        <button nbButton hero status="danget" (click)="cancel()">Cancel</button>
        <button nbButton hero status="success" (click)="submit(name.value)">Submit</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class NbModalNamePromptComponent {
  constructor(protected modalRef: NbModalRef<NbModalNamePromptComponent>) {
  }

  cancel() {
    this.modalRef.close();
  }

  submit(name) {
    this.modalRef.close(name);
  }
}

@Component({
  selector: 'nb-modal-result',
  template: `
    <button nbButton hero status="primary" (click)="open()">Enter Name</button>
    <br>
    <h3>Names:</h3>
    <ul>
      <li *ngFor="let name of names">{{ name }}</li>
    </ul>
  `,
  styles: [` /deep/ nb-layout-column {
    height: 80vw;
  } `],
})
export class NbModalResultComponent {
  names: string[] = [];

  constructor(private modalService: NbModalService) {
  }

  open() {
    this.modalService.open(NbModalNamePromptComponent)
      .onClose.subscribe(name => name && this.names.push(name));
  }
}
