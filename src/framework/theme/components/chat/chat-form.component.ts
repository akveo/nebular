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
 * Show a message form with a send message button.
 *
 * ```ts
 * <nb-chat-form showButton="true" buttonIcon="nb-send">
 * </nb-chat-form>
 * ```
 *
 * When `[dropFiles]="true"` handles files drag&drop with a file preview.
 *
 * Drag & drop available for files and images:
 * @stacked-example(Drag & Drop Chat, chat/chat-drop.component)
 *
 * New message could be tracked outside by using `(send)` output.
 *
 * ```ts
 * <nb-chat-form (send)="onNewMessage($event)">
 * </nb-chat-form>
 *
 * // ...
 *
 * onNewMessage({ message: string, files: any[] }) {
 *   this.service.sendToServer(message, files);
 * }
 * ```
 *
 * @styles
 *
 * chat-form-bg:
 * chat-form-fg:
 * chat-form-border:
 * chat-form-active-border:
 *
 */
@Component({
  selector: 'nb-chat-form',
  templateUrl: './chat-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatFormComponent {

  droppedFiles: any[] = [];
  imgDropTypes = ['image/png', 'image/jpeg', 'image/gif'];

  /**
   * Predefined message text
   * @type {string}
   */
  @Input() message: string = '';

  /**
   * Send button title
   * @type {string}
   */
  @Input() buttonTitle: string = '';

  /**
   * Send button icon, shown if `buttonTitle` is empty
   * @type {string}
   */
  @Input() buttonIcon: string = 'paper-plane-outline';

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

  /**
   *
   * @type {EventEmitter<{ message: string, files: File[] }>}
   */
  @Output() send = new EventEmitter<{ message: string, files: File[] }>();

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
              res.src = e.target.result;
              res.urlStyle = this.domSanitizer.bypassSecurityTrustStyle(`url(${res.src})`);
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

  @HostListener('dragover')
  onDragOver() {
    if (this.dropFiles) {
      this.fileOver = true;
    }
  }

  @HostListener('dragleave')
  onDragLeave() {
    if (this.dropFiles) {
      this.fileOver = false;
    }
  }

  sendMessage() {
    if (this.droppedFiles.length || String(this.message).trim().length) {
      this.send.emit({ message: this.message, files: this.droppedFiles });
      this.message = '';
      this.droppedFiles = [];
    }
  }
}
