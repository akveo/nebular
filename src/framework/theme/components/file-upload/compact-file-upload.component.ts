import {Component, ElementRef, ViewChild} from '@angular/core';
import { NbBaseFileUploadComponent } from './base-file-upload.component';
import {NbDropAreaComponent} from './drop-area.component';

@Component({
  selector: 'nb-compact-file-upload',
  template: `
    <nb-drop-area *ngIf="files.length === 0 || multiple"
                  [fullWidth]=false
                  [disabled]="disabled"
                  [accept]="accept"
                  [inputName]="inputName"
                  [multiple]="multiple"
                  (fileUpload)="handleFileUpload($event)">
    </nb-drop-area>
    <ng-container *ngFor="let file of files">
      <nb-file-item [allowPreview]="allowPreview"
                    [file]="file"
                    (removeItem)="removeItem($event)"
      >
      </nb-file-item>
    </ng-container>
  `,
  styleUrls: [`./compact-file-upload.component.scss`],
})
export class NbCompactFileUploadComponent extends NbBaseFileUploadComponent {

  constructor() {
    super();
    this.multiple = false;
  }

}
