import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbFileModel } from './model';
import { NbFileUploadService } from './service/file-upload.service';

@Component({
  selector: 'nb-drop-area',
  template: `
    <nb-icon size="medium" icon="image-outline"></nb-icon>
    <span>Drop files here or click to upload</span>
    <input type="file"
           [disabled]="disabled"
           [name]="inputName"
           [accept]="accept"
           [multiple]="multiple"
           (drop)="drop()"
           (change)="handleFileInput($event)">
  `,
  styleUrls: [`./drop-area.component.scss`],
})
export class NbDropAreaComponent implements ControlValueAccessor {
  @Input() inputName = 'file';
  @Input() accept: string;
  @Input() fullWidth: boolean;
  @HostBinding('class.disabled')
  @Input() disabled: boolean = false;
  @Input() get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = convertToBoolProperty(value);
  }
  protected _multiple: boolean = true;
  static ngAcceptInputType_multiple: NbBooleanInput;

  constructor(protected nbFileUploadService: NbFileUploadService) {
  }

  @Output() fileUpload = new EventEmitter<NbFileModel>();

  @HostBinding('class.dragover')
  hover: boolean = false;

  @HostListener('dragover', ['$event'])
  public onDragover(event) {
    this.hover = true;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event'])
  public onDragleave(event) {
    this.hover = false;
    event.preventDefault();
    event.stopPropagation();
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  handleFileInput(event) {
    const files = (event.target as HTMLInputElement).files;
    this.readFiles(files);
    event.target.value = '';
  }

  readFiles(files: FileList) {
    Array.from(files).forEach((file: File) => {
      const fileItem: NbFileModel = this.nbFileUploadService.readFile(file);
      this.writeValue(fileItem);
    });
  }

  public drop() {
    this.hover = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(fileModel: NbFileModel): void {
    this.fileUpload.emit(fileModel);
  }
}
