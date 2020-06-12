/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


/**
 * Chat message component.
 */
@Component({
  selector: 'nb-chat-message-html',
  template: `
    <p class="sender" *ngIf="sender || date">{{ sender }} <time>{{ date  | date: dateFormat }}</time></p>
    <p class="text" *ngIf="message" [innerHtml]="htmlMessage" ></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageHtmlComponent {

  constructor(private sanetize: DomSanitizer) { }

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

  /**
   * Message send date format, default 'shortTime'
   * @type {string}
   */
  @Input() dateFormat: string = 'shortTime';

  public get htmlMessage(): SafeHtml {
    return this.sanetize.bypassSecurityTrustHtml(this.message);
  }

}
