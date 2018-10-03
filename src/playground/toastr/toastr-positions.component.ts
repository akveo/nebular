import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'nb-toastr-positions',
  template: `
    <button nbButton (click)="showToast('top-right')">Top Right</button>
    <button nbButton (click)="showToast('bottom-right')">Bottom Right</button>
    <button nbButton (click)="showToast('top-left')">Top Left</button>
    <button nbButton (click)="showToast('bottom-left')">Bottom Left</button>
    <button nbButton (click)="showToast('top-end')">Top End</button>
    <button nbButton (click)="showToast('bottom-end')">Bottom End</button>
    <button nbButton (click)="showToast('top-start')">Top Start</button>
    <button nbButton (click)="showToast('bottom-start')">Bottom Start</button>
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

export class NbToastrPositionsComponent {
  private index: number = 0;

  constructor(private toastrService: NbToastrService) {
  }

  showToast(position) {
    this.toastrService.show(
      'This is super toast message',
      `This is toast number: ${++this.index}`,
      { position });
  }
}
