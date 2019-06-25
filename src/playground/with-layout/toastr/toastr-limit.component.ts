import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { Component } from '@angular/core';

@Component({
  selector: 'nb-toastr-limit',
  template: `
    <button nbButton (click)="showToast()">Show only 3 toasts</button>
  `,
  styles: [
    `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class ToastrLimitComponent {

  constructor(private toastrService: NbToastrService) {
  }

  i: number = 1;

  showToast() {
    this.toastrService.show(
      `Toast number ${this.i}`,
      `Toast with the limit`,
      { limit: 3, position: NbGlobalLogicalPosition.TOP_END });
    this.i++;
  }
}
