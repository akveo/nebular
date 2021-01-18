import { Component, HostBinding } from '@angular/core';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'nb-toastr-statuses',
  template: `
    <nb-card>
      <nb-card-body class="example-items-rows">
        <button nbButton status="basic" (click)="showToast('basic')">Basic</button>
        <button nbButton status="primary" (click)="showToast('primary')">Primary</button>
        <button nbButton status="success" (click)="showToast('success')">Success</button>
        <button nbButton status="info" (click)="showToast('info')">Info</button>
        <button nbButton status="warning" (click)="showToast('warning')">Warning</button>
        <button nbButton status="danger" (click)="showToast('danger')">Danger</button>
        <button nbButton status="control" (click)="showToast('control')">Control</button>
      </nb-card-body>
    </nb-card>
  `,
  styles: [
      `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class ToastrStatusesComponent {
  private index: number = 0;

  @HostBinding('class')
  classes = 'example-items-rows';

  constructor(private toastrService: NbToastrService) {
  }

  showToast(status: NbComponentStatus) {
    this.toastrService.show(status, `Toast: ${++this.index}`, { status });
  }
}
