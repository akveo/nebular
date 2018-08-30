import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

import { NbToast, NbToastStatus } from './model';


@Component({
  selector: 'nb-toast',
  styleUrls: ['./toast.component.scss'],
  template: `
    <div class="icon" *ngIf="toast.config.status !== 'default'"></div>
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

  @HostBinding('class.success')
  get success(): boolean {
    return this.toast.config.status === NbToastStatus.SUCCESS;
  }

  @HostBinding('class.info')
  get info(): boolean {
    return this.toast.config.status === NbToastStatus.INFO;
  }

  @HostBinding('class.warning')
  get warning(): boolean {
    return this.toast.config.status === NbToastStatus.WARNING;
  }

  @HostBinding('class.primary')
  get primary(): boolean {
    return this.toast.config.status === NbToastStatus.PRIMARY;
  }

  @HostBinding('class.danger')
  get danger(): boolean {
    return this.toast.config.status === NbToastStatus.DANGER;
  }

  @HostBinding('class.default')
  get default(): boolean {
    return this.toast.config.status === NbToastStatus.DEFAULT;
  }

  @HostBinding('class.destroy-by-click')
  get destroyByClick(): boolean {
    return this.toast.config.destroyByClick;
  }

  @HostBinding('class.has-icon')
  get hasIcon(): boolean {
    return this.toast.config.hasIcon;
  }

  @HostListener('click')
  onClick() {
    this.destroy.emit();
  }
}
