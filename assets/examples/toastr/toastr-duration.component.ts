import { Component, HostBinding } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'nb-toastr-duration',
  template: `
    <button nbButton (click)="showToast(3000)">Default 3000ms</button>
    <button nbButton (click)="showToast(1000)">1000ms</button>
    <button nbButton (click)="showToast(0)">Infinite</button>
  `,
  styles: [
      `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class ToastrDurationComponent {
  private index: number = 0;

  @HostBinding('class')
  className = 'example-items-rows';

  constructor(private toastrService: NbToastrService) {
  }

  showToast(duration) {
    this.toastrService.show(
      'This is super toast message',
      `This is toast number: ${++this.index}`,
      { duration });
  }
}
