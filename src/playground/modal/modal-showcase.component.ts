import { Component, ViewChild } from '@angular/core';
import { NbModalDirective } from '@nebular/theme/components/modal/modal.directive';

@Component({
  selector: 'nb-modal-showcase',
  template: `
    <ng-template #modal [nbModal]="modal">
      <nb-card [style.width.px]="600">
        <nb-card-body>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/w9siwHUuUBg?autoplay=1"
                  frameborder="0"
                  allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </nb-card-body>
      </nb-card>
    </ng-template>
    <ng-template #closable [nbModal]="modal" [nbModalBackdropClose]="true">
      <nb-card [style.width.px]="600">
        <nb-card-body>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/w9siwHUuUBg?autoplay=1"
                  frameborder="0"
                  allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </nb-card-body>
      </nb-card>
    </ng-template>
    <button class="btn btn-primary" (click)="open()">Open</button>
    <button class="btn btn-primary" (click)="openClosable()">Closable by backdrop click</button>
  `,
})

export class NbModalShowcaseComponent {
  @ViewChild('modal', { read: NbModalDirective }) modal: NbModalDirective;
  @ViewChild('closable', { read: NbModalDirective }) closable: NbModalDirective;

  constructor() {
  }

  open() {
    this.modal.show();
  }

  openClosable() {
    this.closable.show();
  }
}
