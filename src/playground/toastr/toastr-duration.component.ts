import { Component } from '@angular/core';
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
      /deep/ nb-layout-column {
        height: 80vw;
      }

      button {
        margin: 1rem;
      }
    `,
  ],
})

export class NbToastrDurationComponent {
  private index: number = 0;

  constructor(private toastrService: NbToastrService) {
  }

  showToast(duration) {
    this.toastrService.show(
      'This is super toast message',
      `This is toast number: ${++this.index}`,
      { duration });
  }
}
