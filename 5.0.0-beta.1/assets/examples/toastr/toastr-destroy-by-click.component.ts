import { Component, HostBinding } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'nb-toastr-destroy-by-click',
  template: `
    <button nbButton (click)="showToast(true)">Destroy by click</button>
    <button nbButton (click)="showToast(false)">Destroy by timeout only</button>
  `,
  styles: [
      `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class ToastrDestroyByClickComponent {
  private index: number = 0;

  @HostBinding('class')
  className = 'example-items-rows';

  constructor(private toastrService: NbToastrService) {
  }

  showToast(destroyByClick) {
    this.toastrService.show(
      'This is super toast message',
      `This is toast number: ${++this.index}`,
      { destroyByClick });
  }
}
