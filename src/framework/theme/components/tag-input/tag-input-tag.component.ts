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
  HostListener,
  Input,
  NgZone,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NbComponentShape } from '../component-shape';
import { NbComponentSize } from '../component-size';
import { NbComponentStatus } from '../component-status';

@Component({
  selector: 'nb-tag-input-tag',
  template: `
          <div #tagContainer
              class="tag-container"
              (dblclick)="toggleEditMode()">
              <div #tagText
                  [attr.contenteditable]="editing"
                  class="tag-text"
                  spellcheck="false"
                  (click)="editing ? $event.stopPropagation() : undefined"
                  (blur)="onBlurred()">{{ tagValue }}</div>
              <nb-icon *ngIf="removable" icon="close-outline" (click)="removeTag(index)"></nb-icon>
          </div>
      `,
})
export class NbTagInputTagComponent implements AfterViewInit {
  /**
   * Tag value
   */
  @Input() tagValue;

  /**
   * Tag index of itself
   */
  @Input() index;

  /**
   * Tag size modifications. Possible values: `tiny`, `small`, `medium` (default), `large`, `giant`.
   */
  @Input() tagSize: NbComponentSize = 'medium';

  /**
   * Tag shapes modifications. Possible values: `rectangle` (default), `round`, `semi-round`.
   */
  @Input() tagShape: NbComponentShape = 'rectangle';

  /**
   * Controls itself can be removed or not.
   */
  @Input() removable;

  /**
   * Controls itself can be edited or not.
   */
  @Input() editable;

  /**
   * Tag status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
   */
  @Input()
  get tagStatus(): NbComponentStatus {
    return this._tagStatus;
  }
  set tagStatus(value: NbComponentStatus) {
    if ((value as string) === '') {
      this._tagStatus = 'basic';
    } else {
      this._tagStatus = value;
    }
  }
  protected _tagStatus: NbComponentStatus = 'basic';

  /**
   * Controls disabled state
   */
  @Input()
  @HostBinding('class.tag-input-tag-disabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (this.disabled !== value) {
      this.cdRef.markForCheck();
      this._disabled = !this.disabled;
    }
  }
  private _disabled = false;

  /**
   * Tag text html element ref
   */
  @ViewChild('tagText') tagTextElementRef;

  /**
   * Indicates the tag is under editing mode or not
   */
  editing = false;

  /**
   * Output when it is removed
   * @type EventEmitter<number>
   */
  @Output() remove: EventEmitter<number> = new EventEmitter();

  /**
   * Output when it is updated
   * @type EventEmitter<{ index: number, tag: string }>
   */
  @Output() update: EventEmitter<{ index: number, tag: string }> = new EventEmitter();

  /**
   * Output when it starts to be edited
   * @type EventEmitter<string>
   */
  @Output() updating: EventEmitter<string> = new EventEmitter();

  /**
   * Output when it is activated into editing mode
   * @type EventEmitter<number>
   */
  @Output() activateEditing: EventEmitter<number> = new EventEmitter();

  /**
   * Output when it ends editing
   * @type EventEmitter<number>
   */
  @Output() endEditing: EventEmitter<number> = new EventEmitter();

  isValid = true;

  /**
   * Tag value before it is edited
   */
  private originalValue: string;

  constructor(
    public elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    protected renderer: Renderer2,
    protected zone: NgZone,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngAfterViewInit() {
    // TODO: #2254
    this.zone.runOutsideAngular(() => setTimeout(() => {
      this.renderer.addClass(this.elementRef.nativeElement, 'nb-transition');
    }));

    this.originalValue = this.tagValue;
  }

  @HostBinding('class.size-tiny')
  get tiny() {
    return this.tagSize === 'tiny';
  }

  @HostBinding('class.size-small')
  get small() {
    return this.tagSize === 'small';
  }

  @HostBinding('class.size-medium')
  get medium() {
    return this.tagSize === 'medium';
  }

  @HostBinding('class.size-large')
  get large() {
    return this.tagSize === 'large';
  }

  @HostBinding('class.size-giant')
  get giant() {
    return this.tagSize === 'giant';
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.tagStatus === 'primary';
  }

  @HostBinding('class.status-info')
  get info() {
    return this.tagStatus === 'info';
  }

  @HostBinding('class.status-success')
  get success() {
    return this.tagStatus === 'success';
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.tagStatus === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.tagStatus === 'danger';
  }

  @HostBinding('class.status-basic')
  get basic() {
    return this.tagStatus === 'basic';
  }

  @HostBinding('class.status-control')
  get control() {
    return this.tagStatus === 'control';
  }

  @HostBinding('class.shape-rectangle')
  get rectangle() {
    return this.tagShape === 'rectangle';
  }

  @HostBinding('class.shape-semi-round')
  get semiRound() {
    return this.tagShape === 'semi-round';
  }

  @HostBinding('class.shape-round')
  get round() {
    return this.tagShape === 'round';
  }

  removeTag(index) {
    if (!this.disabled) {
      return this.remove.emit(index);
    }
  }

  updateTag(index, newTag) {
    return this.update.emit({ index, tag: newTag });
  }

  toggleEditMode(): void {
    return this.editing || this.disabled || !this.editable ? undefined : this.activateEditMode();
  }

  private activateEditMode(): void {
    this.activateEditing.emit(this.index);
    this.renderer.addClass(this.elementRef.nativeElement, 'tag-editing');

    this.editing = true;
    const range = document.createRange();
    range.selectNodeContents(this.tagTextElementRef.nativeElement);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    setTimeout(() => {
      this.tagTextElementRef.nativeElement.focus();
    });
  }

  @HostListener('keydown', ['$event'])
  keydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this._updateTag();
    }
  }

  @HostListener('keyup', ['$event'])
  keyup(event: KeyboardEvent): void {
    this.updating.emit(this.getContentEditableText());
  }

  private _updateTag(): void {
    if (this.editing) {
      this.editing = false;
      this.renderer.removeClass(this.elementRef.nativeElement, 'tag-editing');

      if (this.isValid) {
        const newTag = this.getContentEditableText();

        if (newTag === '') {
          this.removeTag(this.index);
        } else {
          this.originalValue = this.tagValue;
          this.tagValue = newTag;
          this.updateTag(this.index, newTag);
        }
      } else {
        this.tagValue = this.originalValue;
        this.tagTextElementRef.nativeElement.innerText = this.tagValue;
      }

      this.endEditing.emit(this.index);
    }
  }

  onBlurred(): void {
    this._updateTag();
  }

  private getContentEditableText(): string {
    const input = this.tagTextElementRef.nativeElement;
    return input ? input.innerText.trim() : '';
  }

  adding(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'adding');

    setTimeout(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'adding');
      this.renderer.addClass(this.elementRef.nativeElement, 'display');
    }, 300);
  }

  removing(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'removing');

    setTimeout(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'display');
      this.renderer.removeClass(this.elementRef.nativeElement, 'removing');
    }, 200);
  }
}
