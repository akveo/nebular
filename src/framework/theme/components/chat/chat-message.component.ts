/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbChatMessageFile } from './chat-message-file.component';
import { NbChatCustomMessageDirective } from './chat-custom-message.directive';

/**
 * Chat message component.
 *
 * Multiple message types are available through a `type` property, such as
 * - text - simple text message
 * - file - could be a file preview or a file icon
 * if multiple files are provided grouped files are shown
 * - quote - quotes a message with specific quote styles
 * - map - shows a google map picture by provided [latitude] and [longitude] properties
 *
 * @stacked-example(Available Types, chat/chat-message-types-showcase.component)
 *
 * Message with attached files:
 * ```html
 * <nb-chat-message
 *   type="file"
 *   [files]="[ { url: '...' } ]"
 *   message="Hello world!">
 * </nb-chat-message>
 * ```
 *
 * Map message:
 * ```html
 * <nb-chat-message
 *   type="map"
 *   [latitude]="53.914"
 *   [longitude]="27.59"
 *   message="Here I am">
 * </nb-chat-message>
 * ```
 *
 * @styles
 *
 * chat-message-background:
 * chat-message-text-color:
 * chat-message-reply-background-color:
 * chat-message-reply-text-color:
 * chat-message-avatar-background-color:
 * chat-message-sender-text-color:
 * chat-message-quote-background-color:
 * chat-message-quote-text-color:
 * chat-message-file-text-color:
 * chat-message-file-background-color:
 */
@Component({
  selector: 'nb-chat-message',
  template: `
    <nb-chat-avatar *ngIf="!reply" [initials]="getInitials()" [avatarStyle]="avatarStyle"></nb-chat-avatar>
    <div class="message">
      <ng-container [ngSwitch]="type" *ngIf="isDefaultMessageType(type); else customTemplate">
        <nb-chat-message-file *ngSwitchCase="'file'"
                              [sender]="sender" [date]="date" [dateFormat]="dateFormat"
                              [message]="message" [files]="files">
        </nb-chat-message-file>

        <nb-chat-message-quote *ngSwitchCase="'quote'"
                              [sender]="sender" [date]="date" [dateFormat]="dateFormat"
                              [message]="message" [quote]="quote">
        </nb-chat-message-quote>

        <nb-chat-message-map *ngSwitchCase="'map'"
                              [sender]="sender" [date]="date"
                              [message]="message" [latitude]="latitude" [longitude]="longitude">
        </nb-chat-message-map>

        <nb-chat-message-text *ngSwitchCase="'text'"
                [sender]="sender" [date]="date" [dateFormat]="dateFormat"
                [message]="message">
        </nb-chat-message-text>

        <nb-chat-message-text *ngSwitchDefault
                                [sender]="sender" [date]="date" [dateFormat]="dateFormat"
                                [message]="message">
        </nb-chat-message-text>
      </ng-container>
    </div>

    <ng-template #customTemplate>
        <nb-chat-message-text
          [sender]="sender" [date]="date" [dateFormat]="dateFormat" [message]="message">
        </nb-chat-message-text>
      <ng-container [ngTemplateOutlet]="getActualTemplate(type)" [ngTemplateOutletContext]="{$implicit: customMessageData}"></ng-container>
    </ng-template>
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

  @ContentChildren(NbChatCustomMessageDirective) customMessages: QueryList<NbChatCustomMessageDirective>;

  @HostBinding('@flyInOut')
  get flyInOut() {
    return true;
  }

  @HostBinding('class.not-reply')
  get notReply() {
    return !this.reply;
  }

  avatarStyle: SafeStyle;

  /**
   * Determines if a message is a reply
   */
  @Input()
  @HostBinding('class.reply')
  get reply(): boolean {
    return this._reply;
  }
  set reply(value: boolean) {
    this._reply = convertToBoolProperty(value);
  }
  protected _reply: boolean = false;
  static ngAcceptInputType_reply: NbBooleanInput;

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
  @Input() dateFormat: string;

  /**
   * Array of files `{ url: 'file url', icon: 'file icon class' }`
   */
  @Input() files: NbChatMessageFile[];

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
   * Message type, available options `text|file|map|quote`
   * @type {string}
   */
  @Input() type: string;

  @Input() customMessageData: any;

  private readonly defaultMessageTypes: string[] = ['text', 'file', 'map', 'quote', undefined];

  constructor(protected domSanitizer: DomSanitizer) { }

  getInitials(): string {
    if (this.sender) {
      const names = this.sender.split(' ');
      return names.map(n => n.charAt(0)).splice(0, 2).join('').toUpperCase();
    }
    return '';
  }

  isDefaultMessageType(msgType: string): boolean {
    return this.defaultMessageTypes.some(el => el === msgType);
  }

  getActualTemplate(type: any): any {
    if (!type) {
      throw new Error('Custom template type must be provided');
    }

    const customMessage = this.customMessages.find(msg => msg.customMessageType === type);
    if (customMessage === undefined || !customMessage.templateRef) {
      throw new Error(`Can't find template for custom message type = ${type}.`);
    }
    return customMessage.templateRef
  }

}
