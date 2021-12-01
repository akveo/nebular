import { Injectable } from '@angular/core';
import { NbFileModel } from '../model';

@Injectable()
export class NbFileUploadService {

  readFile(file: File): NbFileModel {
    const reader = new FileReader();
    const fileItem: NbFileModel = {
      name: file.name,
      id: file.name + Math.floor(Math.random() * 10000),
      isImage: this.isImage(file.name),
      reader: reader,
      file: file,
    };

    reader.readAsDataURL(file);

    reader.onprogress = (event) => {
      fileItem.totalSize = Math.round(event.total / 100);
      fileItem.loaded = Math.round(event.loaded / 100);
      fileItem.progressPercent = Math.round((event.loaded / event.total) * 100);
    };
    reader.onload = () => {
      fileItem.loaded = fileItem.totalSize;
      fileItem.progressPercent = 100;
      fileItem.url = reader.result as string;
      fileItem.uploaded = true;
    };

    reader.onerror = (ev) => {
    };

    return fileItem;
  }

  isImage(fileName): boolean {
    return /\.(jpe?g|png|gif|bmp)$/i.test(fileName)
  }
}
