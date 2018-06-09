import { Component } from '@angular/core';
import { NbToasterService } from '@nebular/theme';

@Component({
  selector: 'nb-toaster-showcase',
  template: `
    <button class="btn btn-primary" (click)="showToast('top-right')">Top Right</button>
    <button class="btn btn-primary" (click)="showToast('bottom-right')">Bottom Right</button>
    <button class="btn btn-primary" (click)="showToast('top-left')">Top Left</button>
    <button class="btn btn-primary" (click)="showToast('bottom-left')">Bottom Left</button>
  `,
})

export class NbToasterShowcaseComponent {

  private index: number = 1;

  constructor(private toasterService: NbToasterService) {
  }

  showToast(placement) {
    this.toasterService.show({ content: `My super toast ${this.index++}`, position: placement, duration: 100000 });
  }
}
