/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

import { NbFileUploaderOptions, NbFileItem } from './file-uploader.model';

@Injectable()
export class NbFileUploaderService {
  private uploadQueue: NbFileItem[] = [];

  get uploadQueue$(): Observable<NbFileItem[]> {
    return observableOf(this.uploadQueue);
  }

  uploadAll(files: NbFileItem[], options: NbFileUploaderOptions) {
    if (!files) {
      return;
    }
    this.addToQueue(files);
    files.forEach((file: NbFileItem) => this.upload(file, options));
  }

  private addToQueue(files: NbFileItem[]) {
    this.uploadQueue.push(...files);
  }

  private upload(file: NbFileItem, options: NbFileUploaderOptions) {
    const sendable = new FormData();
    sendable.append('file', file.rawFile, file.name);

    file.onBeforeUpload();

    const xhr = new XMLHttpRequest();

    xhr.open('post', options.url, true);

    xhr.upload.onprogress = event => {
      const percentDone = Math.round(event.lengthComputable ? (100 * event.loaded) / event.total : 0);
      file.onProgress(percentDone);
    };

    xhr.onerror = event => {
      file.onError();
    };

    xhr.onload = event => {
      file.onSuccess();
    };

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        sendable.append(key, value);
      });
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });
    }

    xhr.send(sendable);
  }
}
