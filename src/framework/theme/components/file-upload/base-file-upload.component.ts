import {Component, forwardRef, Input} from '@angular/core';
import { NbFileModel } from './model';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  template: ``,
})
export class NbBaseFileUploadComponent implements ControlValueAccessor {

  _files: NbFileModel[] = [];
  set files(files: NbFileModel[]) {
    this._files = files;
    this.onChange(files);
    this.onTouched();
  }
  get files(): NbFileModel[] {
    return this._files;
  }

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

  onChange = (_: NbFileModel[]) => {};
  onTouched = () => {};

  static ngAcceptInputType_disabled: NbBooleanInput;

  handleFileUpload(item: NbFileModel) {
    if (!this.multiple) {
      this.files = [item];
    } else {
      this.files = [...this.files, item];
    }
  }

  removeItem(id: string) {
    this.files = this.files.filter(file => file.id !== id);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: NbFileModel[]): void {
    if (obj == null) {
      this._files = [];
    } else {
      this._files = obj;
    }
  }

  get value(): NbFileModel[] {
    return this.files;
  }
}
