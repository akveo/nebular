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
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

import { NbStatusService } from '../../services/status.service';
import { NbIconConfig } from '../icon/icon.component';
import { NbToast } from './model';

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
 * toastr-destroyable-basic-hover-background-color:
 * toastr-destroyable-basic-hover-border-color:
 * toastr-primary-background-color:
 * toastr-primary-border-color:
 * toastr-primary-text-color:
 * toastr-icon-primary-background-color:
 * toastr-icon-primary-color:
 * toastr-destroyable-primary-hover-background-color:
 * toastr-destroyable-primary-hover-border-color:
 * toastr-success-background-color:
 * toastr-success-border-color:
 * toastr-success-text-color:
 * toastr-icon-success-background-color:
 * toastr-icon-success-color:
 * toastr-destroyable-success-hover-background-color:
 * toastr-destroyable-success-hover-border-color:
 * toastr-info-background-color:
 * toastr-info-border-color:
 * toastr-info-text-color:
 * toastr-icon-info-background-color:
 * toastr-icon-info-color:
 * toastr-destroyable-info-hover-background-color:
 * toastr-destroyable-info-hover-border-color:
 * toastr-warning-background-color:
 * toastr-warning-border-color:
 * toastr-warning-text-color:
 * toastr-icon-warning-background-color:
 * toastr-icon-warning-color:
 * toastr-destroyable-warning-hover-background-color:
 * toastr-destroyable-warning-hover-border-color:
 * toastr-danger-background-color:
 * toastr-danger-border-color:
 * toastr-danger-text-color:
 * toastr-icon-danger-background-color:
 * toastr-icon-danger-color:
 * toastr-destroyable-danger-hover-background-color:
 * toastr-destroyable-danger-hover-border-color:
 * toastr-control-background-color:
 * toastr-control-border-color:
 * toastr-control-text-color:
 * toastr-icon-control-background-color:
 * toastr-icon-control-color:
 * toastr-destroyable-control-hover-background-color:
 * toastr-destroyable-control-hover-border-color:
 * */
@Component({
  selector: 'nb-toast',
  styleUrls: ['./toast.component.scss'],
  templateUrl: './toast.component.html',
})
export class NbToastComponent implements OnInit, OnDestroy {
  @Input()
  toast: NbToast;

  @Output() destroy: EventEmitter<void> = new EventEmitter();
  @Output() toastClick: EventEmitter<void> = new EventEmitter();
  @Output() toastCloseButton: EventEmitter<void> = new EventEmitter();
  @Output() toastActionCallback: EventEmitter<void> = new EventEmitter();

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

  @HostBinding('class.destroy-by-close-button')
  get destroyByCloseButton(): boolean {
    return this.toast.config.destroyByCloseButton;
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

  @HostBinding('class')
  get additionalClasses(): string[] {
    if (this.statusService.isCustomStatus(this.toast.config.status)) {
      return [this.statusService.getStatusClass(this.toast.config.status)];
    }
    return [];
  }

  @HostListener('click')
  onClick() {
    this.toastClick.emit();
  }

  constructor(
    protected renderer: Renderer2,
    protected elementRef: ElementRef,
    protected statusService: NbStatusService,
  ) {}

  ngOnInit() {
    if (this.toast.config.toastClass) {
      this.renderer.addClass(this.elementRef.nativeElement, this.toast.config.toastClass);
    }
  }

  ngOnDestroy() {
    this.destroy.emit();
  }

  onClose() {
    this.toastCloseButton.emit();
  }

  onActionCallback() {
    this.toastActionCallback.emit();
  }
}
