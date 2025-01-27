import { Component, HostBinding } from '@angular/core';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';

@Component({
  template: `
    <button nbButton (click)="showToast(physicalPositions.TOP_RIGHT)">Top Right</button>
    <button nbButton (click)="showToast(physicalPositions.BOTTOM_RIGHT)">Bottom Right</button>
    <button nbButton (click)="showToast(physicalPositions.TOP_LEFT)">Top Left</button>
    <button nbButton (click)="showToast(physicalPositions.BOTTOM_LEFT)">Bottom Left</button>
    <button nbButton (click)="showToast(logicalPositions.TOP_END)">Top End</button>
    <button nbButton (click)="showToast(logicalPositions.BOTTOM_END)">Bottom End</button>
    <button nbButton (click)="showToast(logicalPositions.TOP_START)">Top Start</button>
    <button nbButton (click)="showToast(logicalPositions.BOTTOM_START)">Bottom Start</button>
  `,
  styles: [
    `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
  standalone: false,
})
export class ToastrPositionsComponent {
  private index: number = 0;

  @HostBinding('class')
  classes = 'example-items-rows';

  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;

  constructor(private toastrService: NbToastrService) {}

  showToast(position: NbGlobalPosition) {
    this.toastrService.show('This is super toast message', `This is toast number: ${++this.index}`, { position });
  }
}
