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
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { convertToBoolProperty } from '../helpers';
import { NbFocusableOption } from '../cdk/a11y/focus-key-manager';
import { NbSelectComponent } from './select.component';
import { NB_SELECT_INJECTION_TOKEN } from './select-injection-tokens';

@Component({
  selector: 'nb-option',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nb-checkbox *ngIf="withCheckbox"
                 [checked]="selected"
                 [disabled]="disabled"
                 aria-hidden="true">
    </nb-checkbox>
    <ng-content></ng-content>
  `,
})
export class NbOptionComponent<T> implements OnDestroy, NbFocusableOption {

  protected disabledByGroup = false;

  /**
   * Option value that will be fired on selection.
   * */
  @Input() value: T;

  @Input()
  get disabled(): boolean {
    return this._disabled || this.disabledByGroup;
  }
  set disabled(value: boolean) {
    this._disabled = convertToBoolProperty(value);
  }
  protected _disabled: boolean = false;

  /**
   * Fires value when option selection change.
   * */
  @Output() selectionChange: EventEmitter<NbOptionComponent<T>> = new EventEmitter();

  /**
   * Fires when option clicked
   */
  protected click$: Subject<NbOptionComponent<T>> = new Subject<NbOptionComponent<T>>();
  get click(): Observable<NbOptionComponent<T>> {
    return this.click$.asObservable();
  }

  selected: boolean = false;
  protected parent: NbSelectComponent<T>;
  protected alive: boolean = true;

  constructor(@Inject(NB_SELECT_INJECTION_TOKEN) parent,
              protected elementRef: ElementRef,
              protected cd: ChangeDetectorRef) {
    this.parent = parent;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Determines should we render checkbox.
   * */
  get withCheckbox(): boolean {
    return this.multiple && this.value != null;
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

  @HostBinding('attr.disabled')
  get disabledAttribute(): '' | null {
    return this.disabled ? '' : null;
  }

  @HostBinding('tabIndex')
  get tabindex() {
    return '-1';
  }

  @HostListener('click', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  onClick(event) {
    this.click$.next(this);

    // Prevent scroll on space click, etc.
    event.preventDefault();
  }

  select() {
    this.setSelection(true);
  }

  deselect() {
    this.setSelection(false);
  }

  /**
   * Sets disabled by group state and marks component for check.
   */
  setDisabledByGroupState(disabled: boolean): void {
    if (this.disabledByGroup !== disabled) {
      this.disabledByGroup = disabled;
      this.cd.markForCheck();
    }
  }

  protected setSelection(selected: boolean): void {
    /**
     * In case of changing options in runtime the reference to the selected option will be kept in select component.
     * This may lead to exceptions with detecting changes in destroyed component.
     *
     * Also Angular can call writeValue on destroyed view (select implements ControlValueAccessor).
     * angular/angular#27803
     * */
    if (this.alive && this.selected !== selected) {
      this.selected = selected;
      this.selectionChange.emit(this);
      this.cd.markForCheck();
    }
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  getLabel(): string {
    return this.content;
  }
}
