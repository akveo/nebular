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
  TemplateRef,
} from '@angular/core';
import { NbComponentOrCustomStatus } from '../component-status';

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
 */
@Component({
  selector: 'nb-chat-form',
  template: `
    <div class="dropped-files" *ngIf="droppedFiles?.length">
      <ng-container *ngIf="fileListTemplate; else defaultFileListTemplate">
        <ng-container *ngTemplateOutlet="fileListTemplate; context: { $implicit: droppedFiles }"></ng-container>
      </ng-container>
      <ng-template #defaultFileListTemplate>
        <ng-container *ngFor="let file of droppedFiles; trackBy: trackById">
          <div *ngIf="file.src">
            <img [src]="file.src" />
            <span class="remove" (click)="removeFile(file.id)">
              <nb-icon icon="close" pack="eva"></nb-icon>
            </span>
          </div>

          <div *ngIf="!file.src">
            <nb-icon icon="file-text-outline" pack="nebular-essentials"></nb-icon>
            <span class="remove" (click)="removeFile(file.id)">
              <nb-icon icon="close" pack="eva"></nb-icon>
            </span>
          </div>
        </ng-container>
      </ng-template>
    </div>
    <div class="message-row">
      <ng-container *ngIf="showFileUploadButton">
        <button
          nbButton
          [status]="getButtonStatus()"
          [class.with-icon]="!buttonFileUploadTitle"
          (click)="openFilePicker(fileInput)"
          class="file-upload-button"
        >
          <nb-icon *ngIf="!buttonFileUploadTitle; else title" [icon]="buttonFileUploadIcon" pack="eva"></nb-icon>
          <ng-template #title>{{ buttonFileUploadTitle }}</ng-template>
        </button>
        <input
          type="file"
          [accept]="getAcceptedFileTypes()"
          [multiple]="true"
          (change)="onFileSelected($event)"
          #fileInput
        />
      </ng-container>
      <input
        nbInput
        fullWidth
        [status]="getInputStatus()"
        (focus)="inputFocus = true"
        (blur)="inputFocus = false"
        (mouseenter)="inputHover = true"
        (mouseleave)="inputHover = false"
        [(ngModel)]="message"
        (ngModelChange)="onModelChange($event)"
        [class.with-file-upload-button]="showFileUploadButton"
        [class.with-send-button]="showSendButton"
        type="text"
        placeholder="{{ fileOver ? dropFilePlaceholder : messagePlaceholder }}"
        (keyup.enter)="sendMessage()"
      />
      <button
        nbButton
        [status]="getButtonStatus()"
        *ngIf="showSendButton"
        [class.with-icon]="!buttonSendTitle"
        (click)="sendMessage()"
        class="send-button"
      >
        <nb-icon *ngIf="!buttonSendTitle; else title" [icon]="buttonSendIcon" pack="nebular-essentials"></nb-icon>
        <ng-template #title>{{ buttonSendTitle }}</ng-template>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatFormComponent {
  status: NbComponentOrCustomStatus = 'basic';
  inputFocus: boolean = false;
  inputHover: boolean = false;

  droppedFiles: { id: string; file: File; src: string | undefined }[] = [];
  /**
   * Accepted file types for file upload
   * @type {string[]} - array of MIME types
   */
  @Input() fileListTemplate: TemplateRef<any> | undefined = undefined;
  /**
   * Accepted file types for file upload
   * @type {string[]} - array of MIME types
   */
  @Input() acceptedFileTypes: string[] = ['image/png', 'image/jpeg', 'image/gif'];
  /**
   * Predefined message text
   * @type {string}
   */
  @Input() message: string = '';
  /**
   * Message placeholder text
   * @type {string}
   */
  @Input() messagePlaceholder: string = 'Type a message';
  /**
   * Send button title
   * @type {string}
   */
  @Input() buttonSendTitle: string = '';
  /**
   * File Upload button title
   * @type {string}
   */
  @Input() buttonFileUploadTitle: string = '';
  /**
   * Send button icon, shown if `buttonSendTitle` is empty
   * @type {string}
   */
  @Input() buttonSendIcon: string = 'paper-plane-outline';
  /**
   * File upload button icon, shown if `buttonFileUploadTitle` is empty
   * @type {string}
   */
  @Input() buttonFileUploadIcon: string = 'plus';
  /**
   * Show send button
   * @type {boolean}
   */
  @Input() showSendButton: boolean = true;

  /**
   * Show file upload button
   * @type {boolean}
   */
  @Input() showFileUploadButton: boolean = false;

  /**
   * Allow drop files to send
   * @type {boolean}
   */
  @Input() dropFiles: boolean = false;

  /**
   * File drop placeholder text
   * @type {string}
   */
  @Input() dropFilePlaceholder: string = 'Drop file to send';

  /**
   * Emits when send button pressed
   * @type {EventEmitter<{ message: string, files: File[] }>}
   */
  @Output() send = new EventEmitter<{
    message: string;
    files: { id: string; file: File; src: string | undefined }[];
  }>();

  /**
   * Emits when files have been changed
   * @type {EventEmitter<File[]>}
   */
  @Output() onFilesChange = new EventEmitter<{ id: string; file: File; src: string | undefined }[]>();

  /**
   * Emits when message input value has been changed
   * @type {EventEmitter<string>}
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInputChange = new EventEmitter<string>();

  @HostBinding('class.file-over') fileOver = false;

  constructor(protected cd: ChangeDetectorRef) {}

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    if (this.dropFiles) {
      event.preventDefault();
      event.stopPropagation();

      this.fileOver = false;
      if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files instanceof FileList) {
        this.mapToDroppedFilesAndEmit(Array.from(event.dataTransfer.files));
      }
    }
  }

  removeFile(id: string) {
    const index = this.droppedFiles.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.droppedFiles.splice(index, 1);
      this.onFilesChange.emit(this.droppedFiles);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.dropFiles) {
      this.fileOver = true;
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
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

  setStatus(status: NbComponentOrCustomStatus): void {
    if (this.status !== status) {
      this.status = status;
      this.cd.detectChanges();
    }
  }

  getInputStatus(): NbComponentOrCustomStatus {
    if (this.fileOver) {
      return this.getHighlightStatus();
    }

    if (this.inputFocus || this.inputHover) {
      return this.status;
    }

    return 'basic';
  }

  getButtonStatus(): NbComponentOrCustomStatus {
    return this.getHighlightStatus();
  }

  getAcceptedFileTypes(): string {
    return this.acceptedFileTypes.join(',');
  }

  protected getHighlightStatus(): NbComponentOrCustomStatus {
    if (this.status === 'basic' || this.status === 'control') {
      return 'primary';
    }

    return this.status;
  }

  onModelChange(value: string): void {
    this.onInputChange.emit(value);
  }

  trackById(index: number, item: { id: string; file: File; src: string | undefined }) {
    return item.id;
  }

  protected clearFileInput(fileInput: HTMLInputElement) {
    if (!fileInput) return;
    try {
      fileInput.value = '';
      if (fileInput.value) {
        fileInput.type = 'number';
        fileInput.type = 'file';
      }
    } catch (e) {
      console.warn(e);
    }
  }

  protected openFilePicker(fileInput: HTMLInputElement) {
    if (!fileInput) return;
    this.clearFileInput(fileInput);
    fileInput.click();
  }

  protected onFileSelected(event: any) {
    const fileList: FileList = event.target?.['files']?.length > 0 ? event.target['files'] : undefined;

    if (fileList && fileList instanceof FileList) {
      this.mapToDroppedFilesAndEmit(Array.from(fileList));
    }
  }

  protected mapToDroppedFilesAndEmit(files: File[]): void {
    for (const file of files) {
      const res = { id: crypto.randomUUID(), file: file, src: undefined, urlStyle: undefined };

      if (this.acceptedFileTypes.includes(file.type)) {
        const fr = new FileReader();
        fr.onload = (e: any) => {
          res.src = e.target.result;
          this.cd.markForCheck();
        };

        fr.readAsDataURL(file);
      }
      this.droppedFiles.push(res);
    }

    // emit changes
    this.onFilesChange.emit(this.droppedFiles);
  }
}
