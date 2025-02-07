import { Component, HostBinding } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  template: `
    <button nbButton (click)="showToast(positions.TOP_RIGHT, 'success')">Top Right</button>
    <button nbButton (click)="showToast(positions.BOTTOM_LEFT, 'info')">Bottom left</button>
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

  positions = NbGlobalPhysicalPosition;

  constructor(private toastrService: NbToastrService) {}

  showToast(position, status) {
    this.index += 1;
    this.toastrService.show(status || 'Success', `Toast ${this.index}`, undefined, { position, status });
  }
}
