import { Component, ViewChild } from '@angular/core';
import { NbModalDirective } from '@nebular/theme/components/modal/modal.directive';
import { NbUserShowcaseComponent } from '../user/user-showcase.component';

@Component({
  selector: 'nb-modal-showcase',
  template: `
    <ng-template #modal [nbModal]="modal" [nbModalContext]="{name: 'Mishka'}" let-name="name">
      <nb-card [style.width.px]="600">
        <nb-card-body>Hi, I'm {{ name }}</nb-card-body>
        <nb-card-footer>
          <button class="btn btn-primary" (click)="closeModal()">Close</button>
        </nb-card-footer>
      </nb-card>
    </ng-template>
    <button class="btn btn-primary" (click)="openModal()">Open</button>
  `,
})

export class NbModalShowcaseComponent {
  component = NbUserShowcaseComponent;
  @ViewChild(NbModalDirective) modal: NbModalDirective;

  constructor() {
  }

  openModal() {
    this.modal.show();
  }

  closeModal() {
    this.modal.destroy();
  }
}
