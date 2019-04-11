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
  selector: 'nb-chat-message-text',
  templateUrl: './chat-message-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageTextComponent {

  /**
   * Message sender
   * @type {string}
   */
  @Input() sender: string;

  /**
   * Message sender
   * @type {string}
   */
  @Input() message: string;

  /**
   * Message send date
   * @type {Date}
   */
  @Input() date: Date;

}
