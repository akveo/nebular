import { Component, HostBinding } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'nb-toastr-icon',
  template: `
    <button nbButton (click)="showDefaultIcon()">With icon</button>
    <button nbButton (click)="showToast('')">Without icon</button>
    <button nbButton (click)="showToast('headphones-outline')">Custom icon</button>
  `,
  styles: [
      `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class ToastrIconComponent {
  private index: number = 0;

  @HostBinding('class')
  className = 'example-items-rows';

  constructor(private toastrService: NbToastrService) {
  }

  showDefaultIcon() {
    this.toastrService.show('Message', `Toast: ${++this.index}`);
  }

  showToast(icon) {
    this.toastrService.show('Message', `Toast: ${++this.index}`, { icon, iconPack: 'eva' });
  }
}
