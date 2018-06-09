/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';

/**
 * Chat message component.
 *
 * @styles
 *
 */
@Component({
  selector: 'nb-chat-message',
  template: `
    <div class="avatar" [style.background-image]="avatarStyle">
      <ng-container *ngIf="!avatarStyle">
        {{ getInitials() }}
      </ng-container>
    </div>
    <div class="message">
      <ng-container [ngSwitch]="type">
        <nb-chat-message-image *ngSwitchCase="'image'"
                               [sender]="sender" [date]="date" [message]="message" [file]="file">
        </nb-chat-message-image>

        <nb-chat-message-file *ngSwitchCase="'file'"
                              [sender]="sender" [date]="date" [message]="message" [file]="file" [icon]="icon">
        </nb-chat-message-file>

        <nb-chat-message-quote *ngSwitchCase="'quote'"
                              [sender]="sender" [date]="date" [message]="message" [quote]="quote">
        </nb-chat-message-quote>

        <nb-chat-message-map *ngSwitchCase="'map'"
                              [sender]="sender" [date]="date"
                              [message]="message" [latitude]="latitude" [longitude]="longitude">
        </nb-chat-message-map>

        <nb-chat-message-text *ngSwitchDefault
                              [sender]="sender" [date]="date" [message]="message">
        </nb-chat-message-text>
      </ng-container>
    </div>
  `,
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(80),
      ]),
      transition('* => void', [
        animate(80, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageComponent {


  @HostBinding('@flyInOut')
  get flyInOut() {
    return true;
  }

  @HostBinding('class.reply')
  replyValue: boolean = false;

  @HostBinding('class.not-reply')
  get notReply() {
    return !this.replyValue;
  }

  avatarStyle: SafeStyle;

  /**
   * Determines if a message is a reply
   */
  @Input()
  set reply(val: boolean) {
    this.replyValue = convertToBoolProperty(val);
  }

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
   * Message file (image if type is `image` and file url if type is `file`)
   * @type {string}
   */
  @Input() file: string;

  /**
   * File icon class (work only when type = `file`)
   * @type {string}
   */
  @Input() icon: string;

  /**
   * Quoted message text
   * @type {string}
   */
  @Input() quote: string;

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

  /**
   * Message send avatar
   * @type {string}
   */
  @Input()
  set avatar(value: string) {
    this.avatarStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  /**
   * Message type, available options `text|image|attachment|map`
   * @type {string}
   */
  @Input() type: string;

  constructor(private domSanitizer: DomSanitizer) { }

  getInitials(): string {
    if (this.sender) {
      const names = this.sender.split(' ');

      return names.map(n => n.charAt(0)).splice(0, 2).join('').toUpperCase();
    }

    return '';
  }
}
