import { Component, HostBinding } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'npg-toastr-destroy-by-close-button',
  template: `
    <button nbButton (click)="showToast(true)">Destroy by close button</button>
    <button nbButton (click)="showToast(false)">Destroy by click only</button>
  `,
  styles: [
    `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class ToastrDestroyByCloseButtonComponent {
  private index: number = 0;

  @HostBinding('class')
  className = 'example-items-rows';

  constructor(private toastrService: NbToastrService) {}

  showToast(destroyByCloseButton) {
    this.toastrService.show('This is super toast message', `This is toast number: ${++this.index}`, undefined, {
      destroyByClick: true,
      destroyByCloseButton,
    });
  }
}
