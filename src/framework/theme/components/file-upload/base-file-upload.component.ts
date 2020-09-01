import { Component, Input } from '@angular/core';
import { NbFileModel } from './model';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';

@Component({
  template: ``,
})
export class NbBaseFileUploadComponent {
  files: NbFileModel[] = [];

  @Input() inputName = 'file';
  @Input() accept: string;
  @Input() get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = convertToBoolProperty(value);
  }
  protected _multiple: boolean = true;
  static ngAcceptInputType_multiple: NbBooleanInput;

  @Input() get allowPreview(): boolean {
    return this._allowPreview;
  }
  set allowPreview(value: boolean) {
    this._allowPreview = convertToBoolProperty(value);
  }
  protected _allowPreview: boolean;
  static ngAcceptInputType_allowPreview: NbBooleanInput;

  @Input() get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = convertToBoolProperty(value);
  }
  protected _disabled: boolean = false;
  static ngAcceptInputType_disabled: NbBooleanInput;

  handleFileUpload(item: NbFileModel) {
    if (!this.multiple) {
      this.files = [item];
    } else {
      this.files.push(item);
    }
  }

  removeItem(id: string) {
    this.files = this.files.filter(file => file.id !== id);
  }
}
