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
import { coerceArray, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NbTagInputInputComponent } from './tag-input-input.component';
import { delay, filter, startWith, takeUntil } from 'rxjs/operators';

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
 * @styles container
 *
 * input-border-style:
 * input-border-width:
 * input-outline-color:
 * input-outline-width:
 * input-placeholder-text-font-family:
 * input-text-font-family:
 * input-basic-text-color:
 * input-basic-placeholder-text-color:
 * input-basic-background-color:
 * input-basic-border-color:
 * input-basic-focus-background-color:
 * input-basic-focus-border-color:
 * input-basic-hover-background-color:
 * input-basic-hover-border-color:
 * input-basic-disabled-background-color:
 * input-basic-disabled-border-color:
 * input-basic-disabled-text-color:
 * input-basic-disabled-placeholder-text-color:
 * input-primary-text-color:
 * input-primary-placeholder-text-color:
 * input-primary-background-color:
 * input-primary-border-color:
 * input-primary-focus-background-color:
 * input-primary-focus-border-color:
 * input-primary-hover-background-color:
 * input-primary-hover-border-color:
 * input-primary-disabled-background-color:
 * input-primary-disabled-border-color:
 * input-primary-disabled-text-color:
 * input-primary-disabled-placeholder-text-color:
 * input-success-text-color:
 * input-success-placeholder-text-color:
 * input-success-background-color:
 * input-success-border-color:
 * input-success-focus-background-color:
 * input-success-focus-border-color:
 * input-success-hover-background-color:
 * input-success-hover-border-color:
 * input-success-disabled-background-color:
 * input-success-disabled-border-color:
 * input-success-disabled-text-color:
 * input-success-disabled-placeholder-text-color:
 * input-info-text-color:
 * input-info-placeholder-text-color:
 * input-info-background-color:
 * input-info-border-color:
 * input-info-focus-background-color:
 * input-info-focus-border-color:
 * input-info-hover-background-color:
 * input-info-hover-border-color:
 * input-info-disabled-background-color:
 * input-info-disabled-border-color:
 * input-info-disabled-text-color:
 * input-info-disabled-placeholder-text-color:
 * input-warning-text-color:
 * input-warning-placeholder-text-color:
 * input-warning-background-color:
 * input-warning-border-color:
 * input-warning-focus-background-color:
 * input-warning-focus-border-color:
 * input-warning-hover-background-color:
 * input-warning-hover-border-color:
 * input-warning-disabled-background-color:
 * input-warning-disabled-border-color:
 * input-warning-disabled-text-color:
 * input-warning-disabled-placeholder-text-color:
 * input-danger-text-color:
 * input-danger-placeholder-text-color:
 * input-danger-background-color:
 * input-danger-border-color:
 * input-danger-focus-background-color:
 * input-danger-focus-border-color:
 * input-danger-hover-background-color:
 * input-danger-hover-border-color:
 * input-danger-disabled-background-color:
 * input-danger-disabled-border-color:
 * input-danger-disabled-text-color:
 * input-danger-disabled-placeholder-text-color:
 * input-control-text-color:
 * input-control-placeholder-text-color:
 * input-control-background-color:
 * input-control-border-color:
 * input-control-focus-background-color:
 * input-control-focus-border-color:
 * input-control-hover-background-color:
 * input-control-hover-border-color:
 * input-control-disabled-background-color:
 * input-control-disabled-border-color:
 * input-control-disabled-text-color:
 * input-control-disabled-placeholder-text-color:
 * input-rectangle-border-radius:
 * input-semi-round-border-radius:
 * input-round-border-radius:
 * input-tiny-text-font-size:
 * input-tiny-text-font-weight:
 * input-tiny-text-line-height:
 * input-tiny-placeholder-text-font-size:
 * input-tiny-placeholder-text-font-weight:
 * input-tiny-placeholder-text-line-height:
 * input-tiny-padding:
 * input-tiny-max-width:
 * input-small-text-font-size:
 * input-small-text-font-weight:
 * input-small-text-line-height:
 * input-small-placeholder-text-font-size:
 * input-small-placeholder-text-font-weight:
 * input-small-placeholder-text-line-height:
 * input-small-padding:
 * input-small-max-width:
 * input-medium-text-font-size:
 * input-medium-text-font-weight:
 * input-medium-text-line-height:
 * input-medium-placeholder-text-font-size:
 * input-medium-placeholder-text-font-weight:
 * input-medium-placeholder-text-line-height:
 * input-medium-padding:
 * input-medium-max-width:
 * input-large-text-font-size:
 * input-large-text-font-weight:
 * input-large-text-line-height:
 * input-large-placeholder-text-font-size:
 * input-large-placeholder-text-font-weight:
 * input-large-placeholder-text-line-height:
 * input-large-padding:
 * input-large-max-width:
 * input-giant-text-font-size:
 * input-giant-text-font-weight:
 * input-giant-text-line-height:
 * input-giant-placeholder-text-font-size:
 * input-giant-placeholder-text-font-weight:
 * input-giant-placeholder-text-line-height:
 * input-giant-padding:
 * input-giant-max-width:
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
  get disabled(): any {
    return this._disabled;
  }
  set disabled(value: any) {
    if (this.disabled !== coerceBooleanProperty(value)) {
      this.disabled$.next(!this.disabled);
    }
  }
  private _disabled: boolean = false;

  /**
   * Controls whether it allows duplicates
   */
  @Input()
  get allowDuplicate(): any {
    return this._allowDuplicate;
  }
  set allowDuplicate(value: any) {
    this._allowDuplicate = coerceBooleanProperty(value);
  }
  private _allowDuplicate: boolean = false;

  /**
   * Controls the number of maximum tags
   */
  @Input()
  get maxTags(): any {
    return this._maxTags;
  }
  set maxTags(value: any) {
    this._maxTags = coerceNumberProperty(value);
  }
  private _maxTags: number;

  /**
   * Placeholder text when tags number reaches the maxTags limit
   */
  @Input() maxTagsText: string = '';

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

  @ViewChild('tagInputInput') public tagInputInput: NbTagInputInputComponent;

  onChange: any = () => { };
  onTouched: any = () => { };

  public errors: string[] = [];

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

  writeValue(val: any): void {
    this._tags = val;
    this.changeDetector.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
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
  @Input() placeholder: string = 'Add a new tag';

  /**
   * If set element will fill container. `false` by default.
   */
  @Input()
  @HostBinding('class.input-full-width')
  get fullWidth(): any {
    return this._fullWidth;
  }
  set fullWidth(value: any) {
    this._fullWidth = coerceBooleanProperty(value);
  }
  private _fullWidth = false;

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
  get removable(): any {
    return this._removable;
  }
  set removable(value: any) {
    this._removable = coerceBooleanProperty(value);
  }
  private _removable: boolean = true;

  /**
   * Controls tags can be edited or not.
   */
  @Input()
  get editable(): any {
    return this._editable;
  }
  set editable(value: any) {
    this._editable = coerceBooleanProperty(value);
  }
  private _editable: boolean = true;

  /**
   * The options for the auto complete
   */
  @Input() autoCompleteOptions: Observable<string[]>;

  /**
   * Controls it has auto complete or not
   */
  @Input()
  get autoComplete(): any {
    return this._autoComplete;
  }
  set autoComplete(value: any) {
    this._autoComplete = coerceBooleanProperty(value);
  }
  private _autoComplete: boolean = false;

  /**
   * Output when a tag is added
   * @type EventEmitter<string>
   */
  @Output() tagAdded = new EventEmitter<string>();

  public onTagAdded(tag: string): void {
    this.tagAdded.emit(tag);
  }

  /**
   * Output when a tag is removed
   * @type EventEmitter<{ index: number, tag: string }>
   */
  @Output() tagRemoved = new EventEmitter<{ index: number, tag: string }>();

  public onTagRemoved(tag: { index: number, tag: string }): void {
    this.tagRemoved.emit(tag);
  }

  /**
   * Output when a tag is updated
   * @type EventEmitter<{ index: number, tag: string }>
   */
  @Output() tagUpdated = new EventEmitter<{ index: number, tag: string }>();

  public onTagUpdated(tag: { index: number, tag: string }): void {
    this.tagUpdated.emit(tag);
  }

  /**
   * Output when tag text changed
   */
  @Output() textChanged = new EventEmitter<string>();

  public onTextChanged(text: string): void {
    this.textChanged.emit(text);
  }
}
