/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

import { NbToast } from './model';
import { NbIconConfig } from '../icon/icon.component';

/**
 * The `NbToastComponent` is responsible for rendering each toast with appropriate styles.
 *
 * @styles
 *
 * toastr-border-style:
 * toastr-border-width:
 * toastr-border-radius:
 * toastr-padding:
 * toastr-shadow:
 * toastr-text-font-family:
 * toastr-text-font-size:
 * toastr-text-font-weight:
 * toastr-text-line-height:
 * toastr-title-text-font-family:
 * toastr-title-text-font-size:
 * toastr-title-text-font-weight:
 * toastr-title-text-line-height:
 * toastr-basic-background-color:
 * toastr-basic-border-color:
 * toastr-basic-text-color:
 * toastr-icon-basic-background-color:
 * toastr-icon-basic-color:
 * toastr-destroyable-hover-basic-background-color:
 * toastr-destroyable-hover-basic-border-color:
 * toastr-primary-background-color:
 * toastr-primary-border-color:
 * toastr-primary-text-color:
 * toastr-icon-primary-background-color:
 * toastr-icon-primary-color:
 * toastr-destroyable-hover-primary-background-color:
 * toastr-destroyable-hover-primary-border-color:
 * toastr-success-background-color:
 * toastr-success-border-color:
 * toastr-success-text-color:
 * toastr-icon-success-background-color:
 * toastr-icon-success-color:
 * toastr-destroyable-hover-success-background-color:
 * toastr-destroyable-hover-success-border-color:
 * toastr-info-background-color:
 * toastr-info-border-color:
 * toastr-info-text-color:
 * toastr-icon-info-background-color:
 * toastr-icon-info-color:
 * toastr-destroyable-hover-info-background-color:
 * toastr-destroyable-hover-info-border-color:
 * toastr-warning-background-color:
 * toastr-warning-border-color:
 * toastr-warning-text-color:
 * toastr-icon-warning-background-color:
 * toastr-icon-warning-color:
 * toastr-destroyable-hover-warning-background-color:
 * toastr-destroyable-hover-warning-border-color:
 * toastr-danger-background-color:
 * toastr-danger-border-color:
 * toastr-danger-text-color:
 * toastr-icon-danger-background-color:
 * toastr-icon-danger-color:
 * toastr-destroyable-hover-danger-background-color:
 * toastr-destroyable-hover-danger-border-color:
 * toastr-control-background-color:
 * toastr-control-border-color:
 * toastr-control-text-color:
 * toastr-icon-control-background-color:
 * toastr-icon-control-color:
 * toastr-destroyable-hover-control-background-color:
 * toastr-destroyable-hover-control-border-color:
 * */
@Component({
  selector: 'nb-toast',
  styleUrls: ['./toast.component.scss'],
  templateUrl: './toast.component.html',
})
export class NbToastComponent implements OnInit {
  @Input()
  toast: NbToast;

  @Output() destroy: EventEmitter<void> = new EventEmitter();

  @HostBinding('class.status-success')
  get success(): boolean {
    return this.toast.config.status === 'success';
  }

  @HostBinding('class.status-info')
  get info(): boolean {
    return this.toast.config.status === 'info';
  }

  @HostBinding('class.status-warning')
  get warning(): boolean {
    return this.toast.config.status === 'warning';
  }

  @HostBinding('class.status-primary')
  get primary(): boolean {
    return this.toast.config.status === 'primary';
  }

  @HostBinding('class.status-danger')
  get danger(): boolean {
    return this.toast.config.status === 'danger';
  }

  @HostBinding('class.status-basic')
  get basic(): boolean {
    return this.toast.config.status === 'basic';
  }

  @HostBinding('class.status-control')
  get control(): boolean {
    return this.toast.config.status === 'control';
  }

  @HostBinding('class.destroy-by-click')
  get destroyByClick(): boolean {
    return this.toast.config.destroyByClick;
  }

  @HostBinding('class.has-icon')
  get hasIcon(): boolean {
    const { icon } = this.toast.config;
    if (typeof icon === 'string') {
      return true;
    }

    return !!(icon && (icon as NbIconConfig).icon);
  }

  @HostBinding('class.custom-icon')
  get customIcon(): boolean {
    return !!this.icon;
  }

  get icon(): string | NbIconConfig {
    return this.toast.config.icon;
  }

  /* @deprecated Use pack property of icon config */
  get iconPack(): string {
    return this.toast.config.iconPack;
  }

  /*
    @breaking-change 5 remove
    @deprecated
  */
  get iconConfig(): NbIconConfig {
    const toastConfig = this.toast.config;
    const isIconName = typeof this.icon === 'string';

    if (!isIconName) {
      return toastConfig.icon as NbIconConfig;
    }

    const iconConfig: NbIconConfig = { icon: toastConfig.icon as string };
    if (toastConfig.iconPack) {
      iconConfig.pack = toastConfig.iconPack;
    }

    return iconConfig;
  }

  @HostListener('click')
  onClick() {
    this.destroy.emit();
  }

  constructor(protected renderer: Renderer2, protected elementRef: ElementRef) {}

  ngOnInit() {
    if (this.toast.config.toastClass) {
      this.renderer.addClass(this.elementRef.nativeElement, this.toast.config.toastClass);
    }
  }
}
