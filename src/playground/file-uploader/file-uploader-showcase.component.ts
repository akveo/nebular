import { Component } from '@angular/core';

import { NbFileUploaderOptions } from '@nebular/theme';

@Component({
  selector: 'nb-file-uploader-showcase',
  templateUrl: './file-uploader-showcase.component.html',
})
export class NbFileUploaderShowcaseComponent {
  options: NbFileUploaderOptions = {
    url: 'http://localhost:3000',
    multiple: false,
    directory: false,
    showUploadQueue: true,
    allowedFileTypes: [],
  };
}
