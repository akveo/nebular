import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'nb-toastr-statuses',
  template: `
    <button nbButton status="success" (click)="showToast('success')">Success</button>
    <button nbButton status="info" (click)="showToast('info')">Info</button>
    <button nbButton status="warning" (click)="showToast('warning')">Warning</button>
    <button nbButton status="primary" (click)="showToast('primary')">Primary</button>
    <button nbButton status="danger" (click)="showToast('danger')">Danger</button>
    <button nbButton status="default" (click)="showToast('default')">Default</button>
  `,
  styles: [
      `
      /deep/ nb-layout-column {
        height: 80vw;
      }

      button {
        margin: 1rem;
      }
    `,
  ],
})

export class NbToastrStatusesComponent {
  private index: number = 0;

  constructor(private toastrService: NbToastrService) {
  }

  showToast(status) {
    this.toastrService.show(status, `Toast: ${++this.index}`, { status });
  }
}
