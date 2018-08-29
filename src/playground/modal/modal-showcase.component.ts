import { Component } from '@angular/core';
import { NbModalService } from '@nebular/theme';
import { NbModalComponent } from './modal.component';


@Component({
  selector: 'nb-modal-showcase',
  template: '<button class="btn btn-primary" (click)="open()">Open Modal</button>',
  styles: [` /deep/ nb-layout-column {
    height: 80vw;
  } `],
})
export class NbModalShowcaseComponent {
  constructor(private modalService: NbModalService) {
  }

  open() {
    this.modalService.open(NbModalComponent);
  }
}
