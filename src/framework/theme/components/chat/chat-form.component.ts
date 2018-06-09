/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Chat form component.
 *
 * @styles
 *
 */
@Component({
  selector: 'nb-chat-form',
  template: `
    <div class="dropped-files" *ngIf="droppedFiles?.length">
      <ng-container *ngFor="let file of droppedFiles">
        <div *ngIf="file.bgStyle" [style.background-image]="file.bgStyle">
          <span class="remove" (click)="removeFile(file)">&times;</span>
        </div>
        <div *ngIf="!file.bgStyle" class="nb-compose">
          <span class="remove" (click)="removeFile(file)">&times;</span>
        </div>
      </ng-container>
    </div>
    <div class="message-row">
      <input [(ngModel)]="message"
             type="text"
             placeholder="{{ fileOver ? 'Drop file to send' : 'Type a message' }}"
             (keyup.enter)="sendMessage()">
      <button *ngIf="showButton" class="btn btn-success" (click)="sendMessage()">{{ buttonTitle }}</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatFormComponent {

  droppedFiles: any[] = [];
  imgDropTypes = ['image/png', 'image/jpeg', 'image/gif'];

  /**
   * Predefined message text
   * @type {string}
   */
  @Input() message: string;

  /**
   * Send button title
   * @type {string}
   */
  @Input() buttonTitle: string = 'Send';

  /**
   * Show send button
   * @type {boolean}
   */
  @Input() showButton: boolean = true;

  /**
   * Show send button
   * @type {boolean}
   */
  @Input() dropFiles: boolean = false;

  @Output() send = new EventEmitter();

  @HostBinding('class.file-over') fileOver = false;

  constructor(private cd: ChangeDetectorRef, private domSanitizer: DomSanitizer) {
  }

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    if (this.dropFiles) {
      event.preventDefault();
      event.stopPropagation();

      this.fileOver = false;
      if (event.dataTransfer && event.dataTransfer.files) {

        // tslint:disable-next-line
        for (let file of event.dataTransfer.files) {
          const res = file;

          if (this.imgDropTypes.includes(file.type)) {
            const fr = new FileReader();
            fr.onload = (e: any) => {
              res.bgStyle = this.domSanitizer.bypassSecurityTrustStyle(`url(${e.target.result})`);
              this.cd.detectChanges();
            };

            fr.readAsDataURL(file);
          }
          this.droppedFiles.push(res);
        }
      }
    }
  }

  removeFile(file) {
    const index = this.droppedFiles.indexOf(file);
    if (index >= 0) {
      this.droppedFiles.splice(index, 1);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver() {
    if (this.dropFiles) {
      this.fileOver = true;
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave() {
    if (this.dropFiles) {
      this.fileOver = false;
    }
  }

  sendMessage() {
    this.send.emit({message: this.message, files: this.droppedFiles});
    this.message = '';
    this.droppedFiles = [];
  }
}
