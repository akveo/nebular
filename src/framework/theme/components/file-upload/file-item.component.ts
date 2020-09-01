import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { NbFileModel } from './model';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';

@Component({
  selector: 'nb-file-item',
  template: `
    <ng-container *ngIf="showImage()">
      <img *ngIf="allowPreview && file.isImage" [src]="file.url">
    </ng-container>
    <ng-container *ngIf="!showImage() && file.uploaded">
      <nb-icon icon="file-text-outline"></nb-icon>
      <span>{{ file.name }}</span>
    </ng-container>
    <ng-container *ngIf="!file.uploaded">
      <span>Uploading...</span>
      <nb-progress-bar [value]="file.progressPercent" status="primary"></nb-progress-bar>
    </ng-container>
    <div *ngIf="hover" style="z-index: 3" class="actions">
      <button nbButton shape="round">
        <nb-icon icon="edit-outline" (click)="onEdit.emit()"></nb-icon>
      </button>
      <button
        nbButton
        shape="round"
        (click)="removeItem.emit(file.id)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
    </div>
  `,
  styleUrls: [`./file-item.component.scss`],
})
export class NbFileItemComponent {
  @Input() file: NbFileModel;

  @Input() get allowPreview(): boolean {
    return this._allowPreview;
  }

  @HostBinding('class.hover')
  get hover() {
    return this._hover;
  }

  set hover(value) {
    this._hover = value;
  }

  _hover = false;

  set allowPreview(value: boolean) {
    this._allowPreview = convertToBoolProperty(value);
  }

  protected _allowPreview: boolean = true;
  static ngAcceptInputType_allowPreview: NbBooleanInput;

  @Output() removeItem = new EventEmitter<string>();

  @HostListener('mouseover', ['$event'])
  public mouseEnter(event) {
    this.hover = true;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('mouseleave', ['$event'])
  public mouseLeave(event) {
    this.hover = false;
    event.preventDefault();
    event.stopPropagation();
  }

  showImage(): boolean {
    return this.file.isImage && this.allowPreview;
  }
}
