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
  HostBinding,
  Input,
  NgZone,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NbStatusService } from '../../services/status.service';
import { NbAutocompleteComponent } from '../autocomplete/autocomplete.component';
import { NbAutocompleteDirective } from '../autocomplete/autocomplete.directive';
import { NbFocusMonitor } from '../cdk/a11y/a11y.module';
import { NbActiveDescendantKeyManagerFactoryService } from '../cdk/a11y/descendant-key-manager';
import { NbPositionBuilderService } from '../cdk/overlay/overlay-position';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbComponentShape } from '../component-shape';
import { NbComponentSize } from '../component-size';
import { NbComponentStatus } from '../component-status';
import { NbInputDirective } from '../input/input.directive';
import { NbOptionComponent } from '../option/option.component';
import { NbTagInputTagComponent } from './tag-input-tag.component';

@Component({
  selector: 'nb-tag-input-input',
  template: `
      <nb-tag-input-tag *ngFor="let tagValue of tagValues; let i = index;"
        [tagValue]="tagValue"
        [index]="i"
        [tagShape]="tagShape"
        [tagStatus]="tagStatus"
        [tagSize]="tagSize"
        [removable]="removable"
        [editable]="editable"
        [disabled]="disabled"
        (remove)="removeTag($event)"
        (update)="updateTag($event)"
        (updating)="updatingTag($event)"
        (activateEditing)="activateEditing($event)"
        (endEditing)="endEditing($event)">
      </nb-tag-input-tag>
      <form [formGroup]="form">
        <input #tagInput
          formControlName="tag"
          (keydown)="onKeyDown($event)"
          (blur)="onBlur($event)"
          (input)="onInputTextChange()"
          [placeholder]="placeholder" />
        <nb-autocomplete #auto (selectedChange)="onSelectionChange($event)">
          <nb-option *ngFor="let option of autoCompleteOptions | async" [value]="option">
            {{ option }}
          </nb-option>
        </nb-autocomplete>
      </form>
    `,
})
export class NbTagInputInputComponent extends NbInputDirective implements OnInit, AfterViewInit {

  /**
   * Tag shapes modifications. Possible values: `rectangle` (default), `round`, `semi-round`.
   */
  @Input() tagShape: NbComponentShape = 'rectangle';

  /**
   * Tag status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
   */
  @Input() tagStatus: NbComponentStatus = 'basic';

  /**
   * Tag size modifications. Possible values: `tiny`, `small`, `medium` (default), `large`, `giant`.
   */
  @Input() tagSize: NbComponentSize = 'medium';

  /**
   * The values of all tags
   */
  @Input() tagValues: string[] = [];

  /**
   * Placeholder text for the input of adding a new tag
   */
  @Input() placeholder;

  /**
   * Controls disabled state
   */
  @Input()
  @HostBinding('class.tag-input-disabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (this.disabled !== value) {
      this.cdRef.markForCheck();
      this._disabled = !this.disabled;
      if (this._disabled) {
        this.tag.disable();
      } else {
        this.tag.enable();
      }
    }
  }
  private _disabled = false;

  /**
   * Controls whether it allows duplicates
   */
  @Input() allowDuplicate;

  /**
   * Controls tags can be removed or not.
   */
  @Input() removable;

  /**
   * Controls tags can be edited or not.
   */
  @Input() editable;

  /**
   * Controls the number of maximum tags
   */
  @Input() maxTags: number;

  /**
   * Placeholder text when tags number reaches the maxTags limit
   */
  @Input() maxTagsText: string;

  /**
   * Validators for tags
   */
  @Input() validators: ValidatorFn[] = [];

  /**
   * AsyncValidators for tags
   */
  @Input() asyncValidators: AsyncValidatorFn[] = [];

  /**
   * The element ref of the input for adding new tags
   */
  @ViewChild('tagInput') tagInputElementRef: ElementRef;

  /**
   * The ref of the auto complete component
   */
  @ViewChild('auto') auto: NbAutocompleteComponent<string>;

  /**
   * Auto complete options
   */
  @Input()
  get autoCompleteOptions(): Observable<string[]> {
    return this._autoCompleteOptions;
  }
  set autoCompleteOptions(value: Observable<string[]>) {
    this._autoCompleteOptions = value;
  }
  private _autoCompleteOptions: Observable<string[]>;

  /**
   * Controls it has auto complete or not
   */
  @Input() autoComplete: boolean;

  /**
   * The tags component list
   */
  @ViewChildren(NbTagInputTagComponent) tags: QueryList<NbTagInputTagComponent>;

  /**
   * Output when a tag is added
   * @type EventEmitter<string>
   */
  @Output() tagAdded = new EventEmitter<string>();

  /**
   * Output when a tag is removed
   * @type EventEmitter<{ index: number, tag: string }>
   */
  @Output() tagRemoved = new EventEmitter<{ index: number, tag: string }>();

  /**
   * Output when a tag is updated
   * @type EventEmitter<{ index: number, tag: string }>
   */
  @Output() tagUpdated = new EventEmitter<{ index: number, tag: string }>();

  /**
   * Output when tag text changed
   * @type EventEmitter<string>
   */
  @Output() textChanged = new EventEmitter<string>();

  /**
   * Hidden tag control for update validation
   */
  private tagUpdate: FormControl = new FormControl();

  /**
   * Tag control associated to the input for adding
   */
  private tag: FormControl = new FormControl();

  /**
   * Index of the current updating one
   */
  private updatingIndex: number;

  form: FormGroup;

  /**
   * Auto complete directive
   */
  private autoDirective: NbAutocompleteDirective<string>;

  constructor(
    protected elementRef: ElementRef,
    protected focusMonitor: NbFocusMonitor,
    protected renderer: Renderer2,
    protected zone: NgZone,
    protected statusService: NbStatusService,
    private cdRef: ChangeDetectorRef,
    protected hostRef: ElementRef,
    protected overlay: NbOverlayService,
    protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
    protected positionBuilder: NbPositionBuilderService,
    protected activeDescendantKeyManagerFactory: NbActiveDescendantKeyManagerFactoryService<NbOptionComponent<string>>,
  ) {
    super(elementRef, focusMonitor, renderer, zone, statusService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.tagUpdate.setValidators(this.validators);
    this.tagUpdate.setAsyncValidators(this.asyncValidators);
    this.tagUpdate.setValue('');

    this.tag.setValidators(this.validators);
    this.tag.setAsyncValidators(this.asyncValidators);
    this.tag.setValue('');

    this.form = new FormGroup({
      tag: this.tag,
      tagUpdate: this.tagUpdate,
    });
  }

  ngAfterViewInit() {
    // TODO: #2254
    this.zone.runOutsideAngular(() => setTimeout(() => {
      this.renderer.addClass(this.tagInputElementRef.nativeElement, 'nb-transition');
    }));

    this.setPlaceholder();

    this.tags.forEach(t => {
      this.renderer.addClass(t.elementRef.nativeElement, 'display');
    });

    const statusChanges$ = this.tagUpdate.statusChanges;

    // Validate when updating
    statusChanges$.pipe(
      filter((status: string) => status !== 'PENDING'),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      if (this.updatingIndex !== undefined) {
        const updatingTag = this.tags.find((_, i) => i === this.updatingIndex);
        updatingTag.isValid = !!this.tagUpdate.valid;
      }
    });

    // Add auto complete
    if (this.autoComplete) {
      this.autoDirective = new NbAutocompleteDirective<string>(this.tagInputElementRef,
        this.overlay,
        this.cdRef,
        this.triggerStrategyBuilder,
        this.positionBuilder,
        this.activeDescendantKeyManagerFactory,
        this.renderer);
      this.autoDirective.autocomplete = this.auto;
      this.autoDirective.ngAfterViewInit();
    }

    super.ngAfterViewInit();
  }

  onKeyDown($event) {
    if ($event.key === 'Enter') {
      this.addTag();
    }
  }

  onBlur(e) {
    // Not to add a tag if the target element is 'NB-OPTION' from auto complete
    if (!e.relatedTarget || e.relatedTarget.tagName !== 'NB-OPTION') {
      this.addTag();
    }
  }

  removeTag(index) {
    const removingTag: NbTagInputTagComponent = this.tags.toArray()[index];
    removingTag.removing();
    this.tagRemoved.emit({ index, tag: this.tagValues[index] });
    setTimeout(() => {
      this.tagValues.splice(index, 1);
      this.setPlaceholder();
      this.cdRef.detectChanges();
    }, 200);
  }

  updatingTag(tag: string) {
    this.tagUpdate.setValue(tag);
  }

  activateEditing(index) {
    this.updatingIndex = index;
  }

  endEditing(index) {
    this.tagUpdate.setValue('');
  }

  updateTag(t: { index: number, tag: string }) {
    this.tagUpdated.emit(t);
  }

  private addTag() {
    if (this.form.controls.tag.value !== ''
      && (this.maxTags === undefined || this.tagValues.length < this.maxTags)
      && !this.isDuplicate() && this.form.valid) {
      this.tagValues.push(this.form.controls.tag.value);
      this.tagAdded.emit(this.form.controls.tag.value);
      this.cdRef.detectChanges();

      const addedTag: NbTagInputTagComponent = this.tags.last;
      addedTag.adding();
      this.setPlaceholder();
    }

    this.form.controls.tag.setValue('');
    if (this.autoComplete) { this.autoDirective.hide(); }
  }

  private isDuplicate() {
    if (!this.allowDuplicate) {
      if (this.tagValues.find(v => v === this.form.controls.tag.value) !== undefined) {
        return true;
      }
    }

    return false;
  }

  private setPlaceholder() {
    if (this.tagValues.length >= this.maxTags) {
      this.renderer.setProperty(this.tagInputElementRef.nativeElement, 'disabled', true)
      this.renderer.setProperty(this.tagInputElementRef.nativeElement, 'placeholder', this.maxTagsText);
    } else {
      this.renderer.setProperty(this.tagInputElementRef.nativeElement, 'disabled', false);
      this.renderer.setProperty(this.tagInputElementRef.nativeElement, 'placeholder', this.placeholder);
    }
  }

  hasErrors(): boolean {
    const { value, valid } = this.form;
    return (value.tag || value.tagUpdate) && !valid;
  }

  getErrorMessages(messages: { [key: string]: string }): string[] {
    return Object.keys(messages)
      .filter(err => this.form.controls.tag.hasError(err) || this.form.controls.tagUpdate.hasError(err))
      .map(err => messages[err]);
  }

  onInputTextChange() {
    if (this.autoComplete) {
      if (this.tagInputElementRef.nativeElement.value !== '') {
        this.autoDirective.show();
      } else {
        this.autoDirective.hide();
      }
    }
    this.textChanged.emit(this.tagInputElementRef.nativeElement.value);
  }

  onSelectionChange($event) {
    this.form.controls.tag.setValue($event);
    this.addTag();
  }
}
