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
  @Input() tagValue;

  @Input() index;

  @Input()
  tagSize: NbComponentSize = 'medium';

  @Input()
  tagShape: NbComponentShape = 'rectangle';

  @Input() removable;

  @Input() editable;

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
  private _disabled: boolean = false;

  @ViewChild('tagText') tagTextElementRef;

  editing: boolean = false;

  @Output() remove: EventEmitter<number> = new EventEmitter();

  @Output() update: EventEmitter<{ index: number, tag: string }> = new EventEmitter();

  @Output() updating: EventEmitter<string> = new EventEmitter();

  @Output() activateEditing: EventEmitter<number> = new EventEmitter();

  @Output() endEditing: EventEmitter<number> = new EventEmitter();

  public isValid = true;

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

  public removeTag(index) {
    if (!this.disabled) {
      return this.remove.emit(index);
    }
  }

  public updateTag(index, newTag) {
    return this.update.emit({ index, tag: newTag });
  }

  public toggleEditMode(): void {
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
  public keydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this._updateTag();
    }
  }

  @HostListener('keyup', ['$event'])
  public keyup(event: KeyboardEvent): void {
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

  public onBlurred(): void {
    this._updateTag();
  }

  private getContentEditableText(): string {
    const input = this.tagTextElementRef.nativeElement;
    return input ? input.innerText.trim() : '';
  }

  public adding(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'adding');

    setTimeout(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'adding');
      this.renderer.addClass(this.elementRef.nativeElement, 'display');
    }, 300);
  }

  public removing(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'removing');

    setTimeout(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'display');
      this.renderer.removeClass(this.elementRef.nativeElement, 'removing');
    }, 200);
  }
}
