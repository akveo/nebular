import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbFileModel } from './model';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';

@Component({
  selector: 'nb-file-list-item',
  template: `
    <ng-container *ngIf="allowPreview">
      <ng-container *ngIf="file.isImage else icon">
        <img [src]="file.url" [alt]="file.name">
      </ng-container>
      <ng-template #icon>
        <nb-icon size="medium"
                 status="basic"
                 icon="file-text-outline"></nb-icon>
      </ng-template>
    </ng-container>
    <span class="file-name">{{ file.name }}</span>
    <span class="file-size">{{ ' ' + file.loaded + 'KB/' + file.totalSize + 'KB' }}</span>
    <button nbButton *ngIf="file.uploaded" class="remove-button" size="medium" appearance="ghost" (click)="removeItem.emit(file.id)">
      <nb-icon icon="trash-2-outline"></nb-icon>
    </button>
    <nb-progress-bar [value]="file.progressPercent" status="primary"></nb-progress-bar>
  `,
  styleUrls: [`./file-list-item.component.scss`],
})
export class NbFileListItemComponent {
  @Input() file: NbFileModel;

  @Input() get allowPreview(): boolean {
    return this._allowPreview;
  }
  set allowPreview(value: boolean) {
    this._allowPreview = convertToBoolProperty(value);
  }
  protected _allowPreview: boolean = true;
  static ngAcceptInputType_allowPreview: NbBooleanInput;

  @Output() removeItem = new EventEmitter<string>();
}
