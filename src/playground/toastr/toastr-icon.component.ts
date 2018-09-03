import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'nb-toastr-icon',
  template: `
    <button nbButton (click)="showToast(true)">With icon</button>
    <button nbButton (click)="showToast(false)">Without icon</button>
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

export class NbToastrIconComponent {
  private index: number = 0;

  constructor(private toastrService: NbToastrService) {
  }

  showToast(hasIcon) {
    this.toastrService.show(
      'Message',
      `Toast: ${++this.index}`,
      { hasIcon });
  }
}
