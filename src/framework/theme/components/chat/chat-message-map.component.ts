/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbChatOptions } from './chat.options';

/**
 * Chat message component.
 */
@Component({
  selector: 'nb-chat-message-map',
  template: `
    <nb-chat-message-file
      [files]="[file]"
      [message]="message"
      [sender]="sender"
      [date]="date"
      [dateFormat]="dateFormat"
    ></nb-chat-message-file>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NbChatMessageMapComponent {
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
   * Map latitude
   * @type {number}
   */
  @Input() latitude: number;

  /**
   * Map longitude
   * @type {number}
   */
  @Input() longitude: number;

  get file() {
    return {
      // eslint-disable-next-line max-len
      url: `https://maps.googleapis.com/maps/api/staticmap?center=${this.latitude},${this.longitude}&zoom=12&size=400x400&key=${this.mapKey}`,
      type: 'image/png',
      icon: 'location',
    };
  }

  mapKey: string;

  constructor(options: NbChatOptions) {
    this.mapKey = options.messageGoogleMapKey;
  }
}
