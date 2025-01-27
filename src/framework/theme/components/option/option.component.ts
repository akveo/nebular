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
  Optional,
  Output,
  AfterViewInit,
  NgZone,
  Renderer2,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

// Component class scoped counter for aria attributes.
let lastOptionId: number = 0;

import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbFocusableOption } from '../cdk/a11y/focus-key-manager';
import { NbHighlightableOption } from '../cdk/a11y/descendant-key-manager';
import { NB_SELECT_INJECTION_TOKEN } from '../select/select-injection-tokens';
import { NbSelectComponent } from '../select/select.component';

/**
 * NbOptionComponent
 *
 * @styles
 *
 * option-background-color:
 * option-text-color:
 * option-text-font-family:
 * option-hover-background-color:
 * option-hover-text-color:
 * option-active-background-color:
 * option-active-text-color:
 * option-focus-background-color:
 * option-focus-text-color:
 * option-selected-background-color:
 * option-selected-text-color:
 * option-selected-hover-background-color:
 * option-selected-hover-text-color:
 * option-selected-active-background-color:
 * option-selected-active-text-color:
 * option-selected-focus-background-color:
 * option-selected-focus-text-color:
 * option-disabled-background-color:
 * option-disabled-text-color:
 * option-tiny-text-font-size:
 * option-tiny-text-font-weight:
 * option-tiny-text-line-height:
 * option-tiny-padding:
 * option-small-text-font-size:
 * option-small-text-font-weight:
 * option-small-text-line-height:
 * option-small-padding:
 * option-medium-text-font-size:
 * option-medium-text-font-weight:
 * option-medium-text-line-height:
 * option-medium-padding:
 * option-large-text-font-size:
 * option-large-text-font-weight:
 * option-large-text-line-height:
 * option-large-padding:
 * option-giant-text-font-size:
 * option-giant-text-font-weight:
 * option-giant-text-line-height:
 * option-giant-padding:
 **/
@Component({
  selector: 'nb-option',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nb-checkbox *ngIf="withCheckbox" [checked]="selected" [disabled]="disabled" aria-hidden="true"> </nb-checkbox>
    <ng-content></ng-content>
  `,
  standalone: false,
})
export class NbOptionComponent<T = any> implements OnDestroy, AfterViewInit, NbFocusableOption, NbHighlightableOption {
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
  static ngAcceptInputType_disabled: NbBooleanInput;

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
  protected parent: NbSelectComponent;
  protected alive: boolean = true;

  /**
   * Component scoped id for aria attributes.
   * */
  @HostBinding('attr.id')
  id: string = `nb-option-${lastOptionId++}`;

  constructor(
    @Optional() @Inject(NB_SELECT_INJECTION_TOKEN) parent,
    protected elementRef: ElementRef,
    protected cd: ChangeDetectorRef,
    protected zone: NgZone,
    protected renderer: Renderer2,
  ) {
    this.parent = parent;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngAfterViewInit() {
    // TODO: #2254
    this.zone.runOutsideAngular(() =>
      setTimeout(() => {
        this.renderer.addClass(this.elementRef.nativeElement, 'nb-transition');
      }),
    );
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

  get hidden() {
    return this.elementRef.nativeElement.hidden;
  }

  // TODO: replace with isShowCheckbox property to control this behaviour outside, issues/1965
  @HostBinding('class.multiple')
  get multiple() {
    // We check parent existing because parent can be NbSelectComponent or
    // NbAutocomplete and `miltiple` property exists only in NbSelectComponent
    return this.parent ? (this.parent as NbSelectComponent).multiple : false;
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

  @HostBinding('class.active')
  get activeClass() {
    return this._active;
  }
  protected _active: boolean = false;

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
    // Check if the component still alive as the option group defer method call so the component may become destroyed.
    if (this.disabledByGroup !== disabled && this.alive) {
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

  setActiveStyles(): void {
    this._active = true;
    this.cd.markForCheck();
  }

  setInactiveStyles(): void {
    this._active = false;
    this.cd.markForCheck();
  }
}
