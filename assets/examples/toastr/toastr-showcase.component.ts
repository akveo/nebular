import { Component, HostBinding } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'nb-toastr-showcase',
  template: `
    <button nbButton (click)="showToast('top-right', 'success')">Top Right</button>
    <button nbButton (click)="showToast('bottom-left', 'info')">Bottom left</button>
  `,
  styles: [
      `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class ToastrShowcaseComponent {
  private index: number = 0;

  @HostBinding('class')
  classes = 'example-items-rows';

  constructor(private toastrService: NbToastrService) {
  }

  showToast(position, status) {
    this.index += 1;
    this.toastrService.show(
      status || 'Success',
      `Toast ${this.index}`,
      { position, status });
  }
}
