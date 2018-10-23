/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { NbFileUploaderService } from './file-uploader.service';
import { NbFileUploaderOptions, NbFileItem } from './file-uploader.model';

@Component({
  selector: 'nb-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [NbFileUploaderService],
})
export class NbFileUploaderComponent {
  @ViewChild('inputEl')
  inputEl: ElementRef;

  @Input()
  options: NbFileUploaderOptions = { multiple: false, directory: false, showUploadQueue: true };

  @Output()
  selectFile = new EventEmitter<File[]>();

  get accept(): string {
    return this.options.allowedFileTypes.join(',');
  }

  constructor(public uploader: NbFileUploaderService) {}

  browse() {
    this.inputEl.nativeElement.click();
  }

  onChange() {
    const files = this.inputEl.nativeElement.files;
    const preparedFiles = this.getPreparedFiles(files);
    this.uploader.uploadAll(preparedFiles, this.options);
  }

  private getPreparedFiles(files): NbFileItem[] {
    return Array.from(files).map((file: File) => new NbFileItem(file));
  }
}
