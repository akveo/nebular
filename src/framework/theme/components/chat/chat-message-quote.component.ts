/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Chat message component.
 */
@Component({
  selector: 'nb-chat-message-quote',
  template: `
    <p class="sender" *ngIf="sender || date">
      {{ sender }} <time>{{ date | date: dateFormat }}</time>
    </p>
    <p class="quote">
      {{ quote }}
    </p>
    <nb-chat-message-text [message]="message">
      {{ message }}
    </nb-chat-message-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NbChatMessageQuoteComponent {
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
   * Quoted message
   * @type {Date}
   */
  @Input() quote: string;
}
