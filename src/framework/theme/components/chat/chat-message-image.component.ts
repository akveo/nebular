/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Chat message component.
 *
 * @styles
 *
 */
@Component({
  selector: 'nb-chat-message-image',
  template: `
    <nb-chat-message-text [sender]="sender" [date]="date" [message]="message">
      {{ message }}
    </nb-chat-message-text>
    <img [src]="file">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageImageComponent {

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
   * Message file path
   * @type {Date}
   */
  @Input() file: string;

}
