/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbChatMessageFile } from './chat-message-file.component';
import { NbCustomMessageService } from './custom-message.service';
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
 * Custom message.
 *
 * You can provide a template for you own message types via the ngCustomMessage directive.
 * First, you need to provide a message template. To do this write a template of your message in the nb-chat element,
 * before nb-chat-message. Mark it's root element with ngCustomMessage directive and define it's type as a value
 * of `*ngCustomMessage="my-custom-type"`. Custom messages has simple predefined styles with `.nb-custom-message` class.
 * If you want to use custom styling you have to use DisableDefaultStyles input:
 * `*nbCustomMessage="'button'; disableDefaultStyles: true" class="your-custom-class"`
 *
 * ```html
 *  <div *nbCustomMessage="'link'; let data">
 *    <a [href]="data.href">{{ data.label }}</a>
 *  </div>
 *
 *  <div *nbCustomMessage="'img'; disableDefaultStyles: true" class="image-container">
 *   <picture>
 *     <img src="https://i.gifer.com/no.gif" alt="picture">
 *     </picture>
 *   </div>
 * ```
 * // Important note
 * Than, you need to set type property of the message which should be rendered via you custom template
 * to the value you passed to the nbCustomMessage directive.
 *
 * Example of message object
 * ```ts
 *    {
 *      reply: false,
 *      type: 'link',
 *       customMessageData: {
 *         href: 'https://akveo.github.io/ngx-admin/',
 *         label: 'Visit Akveo Nebular',
 *       },
 *       date: new Date(),
 *       user: {
 *         name: 'Frodo Baggins',
 *         avatar: 'https://i.gifer.com/no.gif',
 *       },
 *     },
 * ```
 * @stacked-example(Custom message, chat/chat-custom-message.component)
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
      <ng-container [ngSwitch]="type" *ngIf="_isDefaultMessageType(type); else customTemplate">
        <nb-chat-message-file *ngSwitchCase="'file'"
                              [sender]="sender"
                              [date]="date"
                              [dateFormat]="dateFormat"
                              [message]="message"
                              [files]="files">
        </nb-chat-message-file>

        <nb-chat-message-quote *ngSwitchCase="'quote'"
                               [sender]="sender"
                               [date]="date"
                               [dateFormat]="dateFormat"
                               [message]="message"
                               [quote]="quote">
        </nb-chat-message-quote>

        <nb-chat-message-map *ngSwitchCase="'map'"
                             [sender]="sender"
                             [date]="date"
                             [message]="message"
                             [latitude]="latitude"
                             [longitude]="longitude">
        </nb-chat-message-map>

        <nb-chat-message-text *ngSwitchDefault
                              [sender]="sender"
                              [date]="date"
                              [dateFormat]="dateFormat"
                              [message]="message">
        </nb-chat-message-text>
      </ng-container>
    </div>

    <ng-template #customTemplate>
        <nb-chat-message-text [sender]="sender"
                              [date]="date"
                              [dateFormat]="dateFormat"
                              [message]="message">
        </nb-chat-message-text>
      <div [class.nb-custom-message]="!isCustomStylingScheme(type)">
        <ng-container [ngTemplateOutlet]="_getTemplateByType(type)" [ngTemplateOutletContext]="_getTemplateContext()"></ng-container>
      </div>
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

  protected readonly defaultMessageTypes: string[] = ['text', 'file', 'map', 'quote'];
  protected customMessageInstance: NbChatCustomMessageDirective;

  avatarStyle: SafeStyle;

  @HostBinding('@flyInOut')
  get flyInOut() {
    return true;
  }

  @HostBinding('class.not-reply')
  get notReply() {
    return !this.reply;
  }

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

  /**
   * Data will be set as custom message template context
   * @type {any}
   */
  @Input() customMessageData: any;

  constructor(protected domSanitizer: DomSanitizer, protected customMessageService: NbCustomMessageService) { }

  getInitials(): string {
    if (this.sender) {
      const names = this.sender.split(' ');
      return names.map(n => n.charAt(0)).splice(0, 2).join('').toUpperCase();
    }
    return '';
  }

  _isDefaultMessageType(type: string): boolean {
    // Unset type defaults to "text" type
    return type == null || this.defaultMessageTypes.includes(type);
  }

  _getTemplateByType(type: string): TemplateRef<any> {
    const template = this.customMessageInstance.templateRef;
    if (!template) {
      throw new Error(`nb-chat: Can't find template for custom type '${type}'.
            Make sure you provide it in the chat component with *nbCustomMessage='${type}'.`);
    }
    return template;
  }

  _getTemplateContext(): { $implicit: any } {
    return { $implicit: this.customMessageData };
  }

  isCustomStylingScheme(type): boolean {
    this.extractCustomMessageInstance(type);
    return this.customMessageInstance.nbCustomMessageDisableDefaultStyles;
  }

  protected extractCustomMessageInstance(type: string): void {
    this.customMessageInstance = this.customMessageService.getInstance(type);
  }

}
