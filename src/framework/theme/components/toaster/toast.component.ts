import { Component, HostBinding, Input } from '@angular/core';
import { NbToast } from '@nebular/theme';

@Component({
  selector: 'nb-toast',
  styleUrls: ['./toaster.component.scss'],
  template: `
    <div class="icon" *ngIf="toast.status !== 'default'"></div>
    <div class="content-container">
      <span class="title">{{ toast.title }}</span>
      <div class="content">
        <div class="primitive-popover">{{ toast.message }}</div>
      </div>
    </div>
  `,
})
export class NbToastComponent {
  @Input()
  toast: NbToast;

  @HostBinding('class')
  get status(): string {
    return this.toast.status;
  }
}
