import { Component, HostBinding, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { NbToast } from './toaster.service';

@Component({
  selector: 'nb-toast',
  styleUrls: ['./toaster.component.scss'],
  template: `
    <div class="icon" *ngIf="status !== 'default'"></div>
    <div class="content-container">
      <span class="title">{{ toast.title }}</span>
      <div class="content">
        <div class="primitive-popover">{{ toast.message }}</div>
      </div>
    </div>
  `,
  animations: [
    trigger('toaster', [
      state('void', style({
        'transform': '{{ transformation }}',
        'height': 0,
        'margin': 0,
      }), { params: { transformation: 'translateX(100vw)' } }),
      transition(':enter', animate(300)),
      transition(':leave', animate(300)),
    ]),
  ],
})
export class NbToastComponent {
  @Input()
  toast: NbToast;

  @HostBinding('class')
  get status(): string {
    return this.toast.config.status;
  }

  @HostBinding('@toaster')
  get toaster(): any {
    return { value: 'in', params: { transformation: 'translateY(-100vh)' } };
  }
}
