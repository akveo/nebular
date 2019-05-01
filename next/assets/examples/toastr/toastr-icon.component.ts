import { Component } from '@angular/core';
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
      /deep/ nb-layout-column {
        height: 80vw;
      }

      button {
        margin: 1rem;
      }
    `,
  ],
})

export class ToastrIconComponent {
  private index: number = 0;

  constructor(private toastrService: NbToastrService) {
  }

  showDefaultIcon() {
    this.toastrService.show('Message', `Toast: ${++this.index}`);
  }

  showToast(icon) {
    this.toastrService.show('Message', `Toast: ${++this.index}`, { icon, iconPack: 'eva' });
  }
}
