/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface NbChatMessageFileIconPreview {
  src?: string | undefined;
  icon?: string | undefined;
}

export interface NbChatMessageFileImagePreview {
  href?: string | undefined;
  type?: string | undefined;
}

export type NbChatMessageFile = NbChatMessageFileIconPreview & NbChatMessageFileImagePreview;

/**
 * Chat message component.
 */
@Component({
  selector: 'nb-chat-message-file',
  template: `
    <nb-chat-message-text [sender]="sender" [date]="date" [dateFormat]="dateFormat" [message]="message">
      {{ message }}
    </nb-chat-message-text>

    <ng-container *ngIf="files?.length > 0">
      <div [class.message-content-group]="files.length > 1">
        <a *ngFor="let f of files" [attr.href]="f.href ?? null" target="_blank">
          <nb-icon [icon]="f.icon" *ngIf="!f.src && f.icon"></nb-icon>
          <div *ngIf="f.src">
            <img [src]="f.src" />
          </div>
        </a>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageFileComponent {
  /**
   * Message sender
   * @type {string}
   */
  @Input() message: string;

  /**
   * Message sender
   * @type {string}
   */
  @Input() sender: string;

  /**
   * Message send date
   * @type {Date}
   */
  @Input() date: Date;

  /**
   * Message send date format, default 'shortTime'
   * @type {string}
   */
  @Input() dateFormat: string = 'shortTime';

  /**
   * Message file path
   * @type {Date}
   */
  @Input()
  files: NbChatMessageFile[] | undefined;

  constructor() {}
}
