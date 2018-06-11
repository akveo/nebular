import { Component } from '@angular/core';
import { NbToasterService } from '@nebular/theme';

@Component({
  selector: 'nb-toaster-showcase',
  template: `
    <button class="btn btn-primary" (click)="showToast('top-right', 'success')">Top Right</button>
    <button class="btn btn-primary" (click)="showToast('bottom-right', 'success')">Bottom Right</button>
    <button class="btn btn-primary" (click)="showToast('top-left', 'success')">Top Left</button>
    <button class="btn btn-primary" (click)="showToast('bottom-left', 'success')">Botttm Left</button>
    <button class="btn btn-primary" (click)="showToast('top-right', 'success')">Success</button>
    <button class="btn btn-primary" (click)="showToast('top-right', 'info')">Info</button>
    <button class="btn btn-primary" (click)="showToast('top-right', 'warning')">Warning</button>
    <button class="btn btn-primary" (click)="showToast('top-right', 'primary')">Primary</button>
    <button class="btn btn-primary" (click)="showToast('top-right', 'danger')">Danger</button>
  `,
  styles: [
    `
      /deep/ nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})

export class NbToasterShowcaseComponent {

  private index: number = 1;

  constructor(private toasterService: NbToasterService) {
  }

  showToast(placement, status) {
    this.toasterService.show({
      title: status || 'Success',
      content: `My super toast ${this.index++}`,
      position: placement,
      status,
    });
  }
}
