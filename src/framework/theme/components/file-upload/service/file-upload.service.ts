import { Injectable } from '@angular/core';
import { NbFileModel } from '../model';

@Injectable()
export class NbFileUploadService {

  readFile(file: File): NbFileModel {
    const fileItem: NbFileModel = {
      name: file.name,
      id: file.name + Math.floor(Math.random() * 10000),
      isImage: this.isImage(file.name),
    };

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onprogress = (event) => {
      fileItem.totalSize = event.total / 100;
      fileItem.loaded = event.loaded / 100;
      fileItem.progressPercent = Math.round((event.loaded / event.total) * 100);
    };
    reader.onload = () => {
      fileItem.loaded = fileItem.totalSize;
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
