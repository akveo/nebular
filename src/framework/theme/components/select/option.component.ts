/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { NbSelectComponent } from './select.component';


@Component({
  selector: 'nb-option',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './option.component.html',
})
export class NbOptionComponent<T> implements OnDestroy {
  /**
   * Option value that will be fired on selection.
   * */
  @Input() value: T;

  @Input('disabled')
  set setDisabled(disabled: boolean) {
    this.disabled = convertToBoolProperty(disabled);
  }

  /**
   * Fires value on click.
   * */
  @Output() selectionChange: EventEmitter<NbOptionComponent<T>> = new EventEmitter();

  selected: boolean = false;
  disabled: boolean = false;
  private alive: boolean = true;

  constructor(@Inject(forwardRef(() => NbSelectComponent)) protected parent,
              protected elementRef: ElementRef,
              protected cd: ChangeDetectorRef) {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Determines should we render checkbox.
   * */
  get withCheckbox(): boolean {
    return this.multiple && !!this.value;
  }

  get content() {
    return this.elementRef.nativeElement.textContent;
  }

  get multiple() {
    return this.parent.multiple;
  }

  @HostBinding('class.selected')
  get selectedClass(): boolean {
    return this.selected;
  }

  @HostBinding('class.disabled')
  get disabledClass(): boolean {
    return this.disabled;
  }

  @HostListener('click')
  onClick() {
    this.selectionChange.emit(this);
  }

  select() {
    this.setSelection(true);
  }

  deselect() {
    this.setSelection(false);
  }

  private setSelection(isSelected: boolean): void {
    /**
     * In case of changing options in runtime the reference to the selected option will be kept in select component.
     * This may lead to exceptions with detecting changes in destroyed component.
     *
     * Also Angular can call writeValue on destroyed view (select implements ControlValueAccessor).
     * angular/angular#27803
     * */
    if (this.alive) {
      this.selected = isSelected;
      this.cd.markForCheck();
    }
  }
}

