/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NbComponentShape } from '../component-shape';
import { NbComponentSize } from '../component-size';
import { NbComponentStatus } from '../component-status';
import { AsyncValidatorFn, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';
import { coerceArray, coerceNumberProperty } from '@angular/cdk/coercion';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NbTagInputInputComponent } from './tag-input-input.component';
import { delay, filter, startWith, takeUntil } from 'rxjs/operators';
import { convertToBoolProperty, NbBooleanInput, NbNumberInput } from '../helpers';

/**
 * Styled tag-input component
 *
 * @stacked-example(Showcase, tag-input/tag-input-showcase.component)
 *
 * ### Installation
 *
 * Import `NbTagInputComponent` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTagInputModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * TagInput's containers and tags are available in multiple colors using `status` and `tagStatus` properties:
 * @stacked-example(TagInput Colors, tag-input/tag-input-colors.component)
 *
 * There are five input sizes using `fieldSize` property:
 * @stacked-example(TagInput Sizes, tag-input/tag-input-sizes.component)
 *
 * TagInput's containers and tags are available in different shapes using `shape` and `tagShape` properties,
 * which could be combined with the other properties:
 * @stacked-example(TagInput Shapes, tag-input/tag-input-shapes.component)
 *
 * TagInput's 'maxTags' property is to setup the maximum number of the tags the control can accept:
 * @stacked-example(TagInput maxTags, tag-input/tag-input-max-tags.compnent)
 *
 * TagInput's 'validators' and 'asyncValidators' are to setup tag's validators
 * @stacked-example(TagInput validators, tag-input/tag-input-validators.component)
 *
 * There are 'allowDuplicate', 'removable' and 'editable' properties:
 * @stacked-example(TagInput, tag-input/tag-input-test.component)
 *
 * TagInput emits event for tagAdded, tagRemoved and tagUpdated:
 * @stacked-example(TagInput output events, tag-input/tag-input-events.component)
 *
 * Or you can bind control with form controls or ngModel:
 * @stacked-example(TagInput form binding, tag-input/tag-input-form.component)
 *
 * TagInput can use auto complete
 * @stacked-example(TagInput auto complete, tag-input/tag-input-autocomplete.component)
 *
 * @styles tag
 * tag-input-tiny-text-font-size:
 * tag-input-tiny-text-font-weight:
 * tag-input-tiny-text-line-height:
 * tag-input-tiny-padding:
 * tag-input-input-tiny-height:
 * tag-input-small-text-font-size:
 * tag-input-small-text-font-weight:
 * tag-input-small-text-line-height:
 * tag-input-small-padding:
 * tag-input-input-small-height:
 * tag-input-medium-text-font-size:
 * tag-input-medium-text-font-weight:
 * tag-input-medium-text-line-height:
 * tag-input-medium-padding:
 * tag-input-input-medium-height:
 * tag-input-large-text-font-size:
 * tag-input-large-text-font-weight:
 * tag-input-large-text-line-height:
 * tag-input-large-padding:
 * tag-input-input-large-height:
 * tag-input-giant-text-font-size:
 * tag-input-giant-text-font-weight:
 * tag-input-giant-text-line-height:
 * tag-input-giant-padding:
 * tag-input-input-giant-height:
 * tag-input-tag-basic-background-color:
 * tag-input-tag-basic-border-color:
 * tag-input-tag-basic-text-color:
 * tag-input-tag-basic-hover-background-color:
 * tag-input-tag-basic-hover-border-color:
 * tag-input-tag-basic-editing-text-color:
 * tag-input-tag-basic-editing-background-color:
 * tag-input-tag-basic-disabled-background-color:
 * tag-input-tag-basic-disabled-border-color:
 * tag-input-tag-basic-disabled-text-color:
 * tag-input-tag-primary-background-color:
 * tag-input-tag-primary-border-color:
 * tag-input-tag-primary-text-color:
 * tag-input-tag-primary-hover-background-color:
 * tag-input-tag-primary-hover-border-color:
 * tag-input-tag-primary-editing-text-color:
 * tag-input-tag-primary-editing-background-color:
 * tag-input-tag-primary-disabled-background-color:
 * tag-input-tag-primary-disabled-border-color:
 * tag-input-tag-primary-disabled-text-color:
 * tag-input-tag-success-background-color:
 * tag-input-tag-success-border-color:
 * tag-input-tag-success-text-color:
 * tag-input-tag-success-hover-background-color:
 * tag-input-tag-success-hover-border-color:
 * tag-input-tag-success-editing-text-color:
 * tag-input-tag-success-editing-background-color:
 * tag-input-tag-success-disabled-background-color:
 * tag-input-tag-success-disabled-border-color:
 * tag-input-tag-success-disabled-text-color:
 * tag-input-tag-info-background-color:
 * tag-input-tag-info-border-color:
 * tag-input-tag-info-text-color:
 * tag-input-tag-info-hover-background-color:
 * tag-input-tag-info-hover-border-color:
 * tag-input-tag-info-editing-text-color:
 * tag-input-tag-info-editing-background-color:
 * tag-input-tag-info-disabled-background-color:
 * tag-input-tag-info-disabled-border-color:
 * tag-input-tag-info-disabled-text-color:
 * tag-input-tag-warning-background-color:
 * tag-input-tag-warning-border-color:
 * tag-input-tag-warning-text-color:
 * tag-input-tag-warning-hover-background-color:
 * tag-input-tag-warning-hover-border-color:
 * tag-input-tag-warning-editing-text-color:
 * tag-input-tag-warning-editing-background-color:
 * tag-input-tag-warning-disabled-background-color:
 * tag-input-tag-warning-disabled-border-color:
 * tag-input-tag-warning-disabled-text-color:
 * tag-input-tag-danger-background-color:
 * tag-input-tag-danger-border-color:
 * tag-input-tag-danger-text-color:
 * tag-input-tag-danger-hover-background-color:
 * tag-input-tag-danger-hover-border-color:
 * tag-input-tag-danger-editing-text-color:
 * tag-input-tag-danger-editing-background-color:
 * tag-input-tag-danger-disabled-background-color:
 * tag-input-tag-danger-disabled-border-color:
 * tag-input-tag-danger-disabled-text-color:
 * tag-input-tag-control-background-color:
 * tag-input-tag-control-border-color:
 * tag-input-tag-control-text-color:
 * tag-input-tag-control-hover-background-color:
 * tag-input-tag-control-hover-border-color:
 * tag-input-tag-control-editing-text-color:
 * tag-input-tag-control-editing-background-color:
 * tag-input-tag-control-disabled-background-color:
 * tag-input-tag-control-disabled-border-color:
 * tag-input-tag-control-disabled-text-color:
 */
@Component({
  selector: 'nb-tag-input',
  template: `
      <nb-tag-input-input
        #tagInputInput
        nbInput
        [fieldSize]="fieldSize"
        [shape]="shape"
        [fullWidth]="fullWidth"
        [status]="status"
        [tagShape]="tagShape"
        [tagStatus]="tagStatus"
        [tagSize]="fieldSize"
        [placeholder]="placeholder"
        [maxTagsText]="maxTagsText"
        [maxTags]="maxTags"
        [tagValues]="tags"
        [allowDuplicate]="allowDuplicate"
        [validators]="validators"
        [asyncValidators]="asyncValidators"
        [removable]="removable"
        [editable]="editable"
        [disabled]="disabled"
        [autoCompleteOptions]="autoCompleteOptions"
        [autoComplete]="autoComplete"
        (tagAdded)="onTagAdded($event)"
        (tagRemoved)="onTagRemoved($event)"
        (tagUpdated)="onTagUpdated($event)"
        (textChanged)="onTextChanged($event)">
      </nb-tag-input-input>
      <div *ngIf="tagInputInput.hasErrors()"><p class="text-danger" *ngFor="let error of errors">{{ error }}</p></div>
    `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbTagInputComponent),
    multi: true,
  }],
})
export class NbTagInputComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {

  /**
   * Value of TagInput
   */
  @Input()
  get tags(): string[] {
    return this._tags;
  }
  set tags(value: string[]) {
    this._tags = coerceArray(value);
  }
  private _tags: string[] = [];

  /**
   * Controls input disabled state
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (this.disabled !== convertToBoolProperty(value)) {
      this.disabled$.next(!this.disabled);
    }
  }
  private _disabled = false;
  static ngAcceptInputType_disabled: NbBooleanInput;

  /**
   * Controls whether it allows duplicates
   */
  @Input()
  get allowDuplicate(): boolean {
    return this._allowDuplicate;
  }
  set allowDuplicate(value: boolean) {
    this._allowDuplicate = convertToBoolProperty(value);
  }
  private _allowDuplicate = false;
  static ngAcceptInputType_allowDuplicate: NbBooleanInput;

  /**
   * Controls the number of maximum tags
   */
  @Input()
  get maxTags(): number {
    return this._maxTags;
  }
  set maxTags(value: number) {
    this._maxTags = coerceNumberProperty(value);
  }
  private _maxTags: number;
  static ngAcceptInputType_maxTags: NbNumberInput;

  /**
   * Placeholder text when tags number reaches the maxTags limit
   */
  @Input() maxTagsText = '';

  /**
   * Validators for tags
   */
  @Input() validators: ValidatorFn[] = [];

  /**
   * AsyncValidators for tags
   */
  @Input() asyncValidators: AsyncValidatorFn[] = [];

  /**
   * Error messages for validators
   */
  @Input() errorMessages: { [key: string]: string } = {};

  @ViewChild('tagInputInput') tagInputInput: NbTagInputInputComponent;

  onChange = () => { };
  onTouched = () => { };

  errors: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(public elementRef: ElementRef, protected renderer: Renderer2, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (!this.allowDuplicate) {
      this.tags = this.tags.filter((value, index) => this.tags.indexOf(value) === index);
    }

    if (this.maxTags && this.tags.length > this.maxTags) {
      this.tags.length = this.maxTags;
    }
  }

  ngAfterViewInit() {
    const statusChanges$ = this.tagInputInput.form.statusChanges;

    statusChanges$.pipe(
      filter((status: string) => status !== 'PENDING'),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.errors = this.tagInputInput.getErrorMessages(this.errorMessages);
    });

    this.disabled$
      .pipe(
        startWith(false),
        delay(0),
        takeUntil(this.destroy$),
      )
      .subscribe(disabled => {
        this._disabled = disabled;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(val): void {
    this._tags = val;
    this.changeDetector.markForCheck();
  }
  registerOnChange(fn): void {
    this.onChange = fn;
  }
  registerOnTouched(fn): void {
    this.onTouched = fn;
  }
  /**
   * Field size modifications. Possible values: `small`, `medium` (default), `large`.
   */
  @Input()
  fieldSize: NbComponentSize = 'medium';

  /**
   * Field status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
   */
  @Input()
  status: NbComponentStatus = 'basic';

  /**
   * Field shapes modifications. Possible values: `rectangle` (default), `round`, `semi-round`.
   */
  @Input()
  shape: NbComponentShape = 'rectangle';

  /**
   * Placeholder text for the input of adding a new tag
   */
  @Input() placeholder = 'Add a new tag';

  /**
   * If set element will fill container. `false` by default.
   */
  @Input()
  @HostBinding('class.input-full-width')
  get fullWidth(): boolean {
    return this._fullWidth;
  }
  set fullWidth(value: boolean) {
    this._fullWidth = convertToBoolProperty(value);
  }
  private _fullWidth = false;
  static ngAcceptInputType_fullWidth: NbBooleanInput;

  /**
   * Tag shapes modifications. Possible values: `rectangle`, `round` (default), `semi-round`.
   */
  @Input()
  tagShape: NbComponentShape = 'round';

  /**
   * Tag status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
   */
  @Input()
  tagStatus: NbComponentStatus = 'basic';

  /*
   * @docs-private
   **/
  disabled$ = new BehaviorSubject<boolean>(false);

  /**
   * Controls tags can be removed or not.
   */
  @Input()
  get removable(): boolean {
    return this._removable;
  }
  set removable(value: boolean) {
    this._removable = convertToBoolProperty(value);
  }
  private _removable = true;
  static ngAcceptInputType_removable: NbBooleanInput;

  /**
   * Controls tags can be edited or not.
   */
  @Input()
  get editable(): boolean {
    return this._editable;
  }
  set editable(value: boolean) {
    this._editable = convertToBoolProperty(value);
  }
  private _editable = true;
  static ngAcceptInputType_editable: NbBooleanInput;

  /**
   * The options for the auto complete
   */
  @Input() autoCompleteOptions: Observable<string[]>;

  /**
   * Controls it has auto complete or not
   */
  @Input()
  get autoComplete(): boolean {
    return this._autoComplete;
  }
  set autoComplete(value: boolean) {
    this._autoComplete = convertToBoolProperty(value);
  }
  private _autoComplete = false;
  static ngAcceptInputType_autoComplete: NbBooleanInput;

  /**
   * Output when a tag is added
   * @type EventEmitter<string>
   */
  @Output() tagAdded = new EventEmitter<string>();

  onTagAdded(tag: string): void {
    this.tagAdded.emit(tag);
  }

  /**
   * Output when a tag is removed
   * @type EventEmitter<{ index: number, tag: string }>
   */
  @Output() tagRemoved = new EventEmitter<{ index: number, tag: string }>();

  onTagRemoved(tag: { index: number, tag: string }): void {
    this.tagRemoved.emit(tag);
  }

  /**
   * Output when a tag is updated
   * @type EventEmitter<{ index: number, tag: string }>
   */
  @Output() tagUpdated = new EventEmitter<{ index: number, tag: string }>();

  onTagUpdated(tag: { index: number, tag: string }): void {
    this.tagUpdated.emit(tag);
  }

  /**
   * Output when tag text changed
   */
  @Output() textChanged = new EventEmitter<string>();

  onTextChanged(text: string): void {
    this.textChanged.emit(text);
  }
}
