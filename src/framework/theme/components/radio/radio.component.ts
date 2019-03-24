/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { convertToBoolProperty } from '../helpers';
import { NbRadioStatus } from './radio-status.component';

/**
 * The `NbRadioComponent` provides the same functionality as native `<input type="radio">`
 * with Nebular styles and animations.
 *
 * @stacked-example(Showcase, radio/radio-showcase.component)
 *
 * ### Installation
 *
 * Import `NbRadioModule` to your feature module.
 *
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbRadioModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * Radio buttons should be wrapped in `nb-radio-group` to provide form bindings.
 *
 * ```html
 * <nb-radio-group [(ngModel)]="selectedOption">
 *   <nb-radio>Option 1</nb-radio>
 *   <nb-radio>Option 2</nb-radio>
 *   <nb-radio>Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * You can disable some radios in the group using a `disabled` attribute.
 *
 * @stacked-example(Disabled, radio/radio-disabled.component)
 *
 *
 * @styles
 *
 * radio-bg
 * radio-fg
 * radio-size
 * radio-border-size
 * radio-border-color
 * radio-checkmark
 * radio-checked-bg
 * radio-checked-size
 * radio-checked-border-size
 * radio-checked-border-color
 * radio-checked-checkmark
 * radio-disabled-bg
 * radio-disabled-size
 * radio-disabled-border-size
 * radio-disabled-border-color
 * radio-disabled-checkmark
 * */
@Component({
  selector: 'nb-radio',
  template: `
    <label>
      <input
        type="radio"
        class="native-input visually-hidden"
        [name]="name"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onChange($event)"
        (click)="onClick($event)">
      <span class="radio-circle"
            [class.status-primary]="isPrimary"
            [class.status-success]="isSuccess"
            [class.status-warning]="isWarning"
            [class.status-danger]="isDanger"
            [class.status-info]="isInfo"
            [class.status-white]="isWhite">
      </span>
      <span class="text">
        <ng-content></ng-content>
      </span>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./radio.component.scss'],
})
export class NbRadioComponent {

  @Input() name: string;

  @Input() checked: boolean;

  @Input() value: any;

  @Input('disabled')
  set setDisabled(disabled: boolean) {
    this.disabled = convertToBoolProperty(disabled);
  }

  @Input() status: NbRadioStatus;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @Output() blur: EventEmitter<void> = new EventEmitter();

  disabled: boolean;

  constructor(protected cd: ChangeDetectorRef) {}

  get isPrimary(): boolean {
    return this.status === NbRadioStatus.PRIMARY;
  }

  get isSuccess(): boolean {
    return this.status === NbRadioStatus.SUCCESS;
  }

  get isWarning(): boolean {
    return this.status === NbRadioStatus.WARNING;
  }

  get isDanger(): boolean {
    return this.status === NbRadioStatus.DANGER;
  }

  get isInfo(): boolean {
    return this.status === NbRadioStatus.INFO;
  }

  get isWhite(): boolean {
    return this.status === NbRadioStatus.WHITE;
  }

  markForCheck() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  onChange(event: Event) {
    event.stopPropagation();
    this.checked = true;
    this.valueChange.emit(this.value);
  }

  onClick(event: Event) {
    event.stopPropagation();
  }
}
