import { Component, HostBinding } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'nb-toastr-prevent-duplicates',
  template: `
    <button nbButton (click)="showToast(true)">Prevent duplicates</button>
    <button nbButton (click)="showToast(false)">Without prevent duplicates</button>
  `,
  styles: [
      `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class ToastrPreventDuplicatesComponent {

  @HostBinding('class')
  classes = 'example-items-rows';

  constructor(private toastrService: NbToastrService) {
  }

  showToast(preventDuplicates) {
    this.toastrService.show(
      'This is super toast message',
      `This is toast title`,
      { preventDuplicates });
  }
}
