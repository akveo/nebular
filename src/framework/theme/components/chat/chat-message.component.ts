/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';
import { convertToBoolProperty } from '../helpers';


/**
 * Chat message component.
 *
 * @styles
 *
 */
@Component({
  selector: 'nb-chat-message',
  template: `
    <ng-content></ng-content>
  `,
})
export class NbChatMessageComponent {

  closableValue: boolean = false;

  /**
   * Determines if a message is a reply
   */
  @Input()
  set reply(val: boolean) {
    this.closableValue = convertToBoolProperty(val);
  }

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
   * Message send avatar
   * @type {string}
   */
  @Input() avatar: string;

  /**
   * Message type, available options `text|image|attachment|map`
   * @type {string}
   */
  @Input() type: string;
}
