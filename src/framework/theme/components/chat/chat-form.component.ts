/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Chat form component.
 *
 * @styles
 *
 */
@Component({
  selector: 'nb-chat-form',
  template: `
    <input [(ngModel)]="message"
            type="text"
            placeholder="Type a message"
            (keyup.enter)="sendMessage()">
    <button (click)="sendMessage()">{{ buttonTitle }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatFormComponent {

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

  @Output() send = new EventEmitter();

  sendMessage() {
    this.send.emit({ message: this.message });
    this.message = '';
  }
}
