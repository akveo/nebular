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

  @Input()
  tagShape: NbComponentShape = 'rectangle';

  @Input()
  tagStatus: NbComponentStatus = 'basic';

  @Input()
  tagSize: NbComponentSize = 'medium';


  @Input() tagValues: string[] = [];

  @Input() placeholder;

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
  private _disabled: boolean = false;

  @Input() allowDuplicate;

  @Input() removable;

  @Input() editable;

  @Input() maxTags: number;

  @Input() maxTagsText: string;

  @Input() validators: ValidatorFn[] = [];

  @Input() asyncValidators: AsyncValidatorFn[] = [];

  @ViewChild('tagInput') tagInputElementRef: ElementRef;

  @ViewChild('auto') auto: NbAutocompleteComponent<string>;

  @Input()
  get autoCompleteOptions(): Observable<string[]> {
    return this._autoCompleteOptions;
  }
  set autoCompleteOptions(value: Observable<string[]>) {
    this._autoCompleteOptions = value;
  }
  private _autoCompleteOptions: Observable<string[]>;

  @Input() autoComplete: boolean;

  @ViewChildren(NbTagInputTagComponent) public tags: QueryList<NbTagInputTagComponent>;

  @Output() tagAdded = new EventEmitter<string>();

  @Output() tagRemoved = new EventEmitter<{ index: number, tag: string }>();

  @Output() tagUpdated = new EventEmitter<{ index: number, tag: string }>();

  @Output() textChanged = new EventEmitter<string>();

  private tagUpdate: FormControl = new FormControl();

  private tag: FormControl = new FormControl();

  private updatingIndex: number;

  public form: FormGroup;

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

    statusChanges$.pipe(
      filter((status: string) => status !== 'PENDING'),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      if (this.updatingIndex !== undefined) {
        const updatingTag = this.tags.find((_, i) => i === this.updatingIndex);
        updatingTag.isValid = !!this.tagUpdate.valid;
      }
    });

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

  public onKeyDown($event) {
    if ($event.key === 'Enter') {
      this.addTag();
    }
  }

  public onBlur(e) {
    if (!e.relatedTarget || e.relatedTarget.tagName !== 'NB-OPTION') {
      this.addTag();
    }
  }

  public removeTag(index) {
    const removingTag: NbTagInputTagComponent = this.tags.toArray()[index];
    removingTag.removing();
    this.tagRemoved.emit({ index, tag: this.tagValues[index] });
    setTimeout(() => {
      this.tagValues.splice(index, 1);
      this.setPlaceholder();
      this.cdRef.detectChanges();
    }, 200);
  }

  public updatingTag(tag: string) {
    this.tagUpdate.setValue(tag);
  }

  public activateEditing(index) {
    this.updatingIndex = index;
  }

  public endEditing(index) {
    this.tagUpdate.setValue('');
  }

  public updateTag(t: { index: number, tag: string }) {
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

  public hasErrors(): boolean {
    const { value, valid } = this.form;
    return (value.tag || value.tagUpdate) && !valid;
  }

  public getErrorMessages(messages: { [key: string]: string }): string[] {
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
