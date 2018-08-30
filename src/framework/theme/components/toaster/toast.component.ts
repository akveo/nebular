import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

import { NbToast } from './model';


@Component({
  selector: 'nb-toast',
  styleUrls: ['./toast.component.scss'],
  template: `
    <div class="icon" *ngIf="status !== 'default'"></div>
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

  @Output() destroy: EventEmitter<void> = new EventEmitter();

  @HostBinding('class')
  get status(): string {
    return this.toast.config.status;
  }

  @HostListener('click')
  onClick() {
    this.destroy.emit();
  }
}
