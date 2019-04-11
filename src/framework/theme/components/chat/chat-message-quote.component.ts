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
  selector: 'nb-chat-message-quote',
  templateUrl: './chat-message-quote.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
   * Quoted message
   * @type {Date}
   */
  @Input() quote: string;

}
