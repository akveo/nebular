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
import { NbChatCustomMessageService } from './chat-custom-message.service';
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
    <ng-container *ngIf="notReply">
      <ng-container *ngIf="!avatarTemplateRef; else avatarTemplate">
        <nb-chat-avatar [initials]="getInitials()" [avatarStyle]="avatarStyle"></nb-chat-avatar>
      </ng-container>
      <ng-template #avatarTemplate>
        <ng-container
          *ngTemplateOutlet="avatarTemplateRef; context: { sender: sender, avatar: avatarUrl }"
        ></ng-container>
      </ng-template>
    </ng-container>

    <div class="message">
      <ng-container [ngSwitch]="type" *ngIf="_isBuiltInMessageType(); else customTemplate">
        <nb-chat-message-file
          *ngSwitchCase="'file'"
          [sender]="sender"
          [date]="date"
          [dateFormat]="dateFormat"
          [message]="message"
          [files]="files"
        >
        </nb-chat-message-file>

        <nb-chat-message-quote
          *ngSwitchCase="'quote'"
          [sender]="sender"
          [date]="date"
          [dateFormat]="dateFormat"
          [message]="message"
          [quote]="quote"
        >
        </nb-chat-message-quote>

        <nb-chat-message-map
          *ngSwitchCase="'map'"
          [sender]="sender"
          [date]="date"
          [message]="message"
          [latitude]="latitude"
          [longitude]="longitude"
        >
        </nb-chat-message-map>

        <nb-chat-message-text
          *ngSwitchDefault
          [sender]="sender"
          [date]="date"
          [dateFormat]="dateFormat"
          [message]="message"
        >
        </nb-chat-message-text>
      </ng-container>
    </div>

    <ng-template #customTemplate>
      <nb-chat-message-text
        [sender]="sender"
        [date]="date"
        [dateFormat]="dateFormat"
        [message]="message"
        [postUserTemplateRef]="postUserTemplateRef"
        [preUserTemplateRef]="preUserTemplateRef"
        [templateContext]="_getTemplateContext()"
      >
      </nb-chat-message-text>
      <div
        [class.nb-custom-message]="_areDefaultStylesEnabled()"
        [class.nb-custom-message-no-space]="_addNoSpaceClass"
        [class.nb-custom-message-reply]="_addReplyClass"
        [class.nb-custom-message-not-reply]="_addNotReplyClass"
        [class.nb-custom-message-full-width]="!_areDefaultStylesEnabled()"
      >
        <ng-container [ngTemplateOutlet]="_getTemplate()" [ngTemplateOutletContext]="_getTemplateContext()">
        </ng-container>
      </div>
    </ng-template>
  `,
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [style({ transform: 'translateX(-100%)' }), animate(80)]),
      transition('* => void', [animate(80, style({ transform: 'translateX(100%)' }))]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NbChatMessageComponent {
  protected readonly builtInMessageTypes: string[] = ['text', 'file', 'map', 'quote'];

  avatarUrl: string | undefined;
  avatarStyle: SafeStyle;

  get _addReplyClass(): boolean {
    return this._areDefaultStylesEnabled() && this.reply;
  }

  get _addNotReplyClass(): boolean {
    return this._areDefaultStylesEnabled() && this.notReply;
  }

  get _addNoSpaceClass(): boolean {
    return this._areDefaultStylesEnabled() && !this.message;
  }

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
   * @type {string | undefined}
   */
  @Input() sender: string | undefined;

  /**
   * Message send date
   * @type {Date | undefined}
   */
  @Input() date: Date | undefined;

  /**
   * Message send date format, default 'shortTime'
   * @type {string | undefined}
   */
  @Input() dateFormat: string | undefined;

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
  set avatar(value: string | undefined) {
    this.avatarUrl = value;
    this.avatarStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  /**
   * Is message send avatar a ngSrc url
   * @type {string}
   */

  @Input()
  public avatarTemplateRef: TemplateRef<any> | undefined;

  @Input()
  public postUserTemplateRef: TemplateRef<any> | undefined;

  @Input()
  public preUserTemplateRef: TemplateRef<any> | undefined;

  /**
   * Message type, available options `text|file|map|quote`
   * @type {string}
   */
  @Input() type: string;

  /**
   * Data which will be set as custom message template context
   * @type {any}
   */
  @Input() customMessageData: any;

  constructor(protected domSanitizer: DomSanitizer, protected customMessageService: NbChatCustomMessageService) {}

  getInitials(): string {
    if (this.sender) {
      const names = this.sender.split(' ');
      return names
        .map((n) => n.charAt(0))
        .splice(0, 2)
        .join('')
        .toUpperCase();
    }
    return '';
  }

  _isBuiltInMessageType(): boolean {
    // Unset type defaults to "text" type
    return this.type == null || this.builtInMessageTypes.includes(this.type);
  }

  _getTemplate(): TemplateRef<any> {
    const customMessage = this.getCustomMessage(this.type);
    return customMessage.templateRef;
  }

  _getTemplateContext(): { $implicit: any; isReply: boolean } {
    return { $implicit: this.customMessageData, isReply: this.reply };
  }

  _areDefaultStylesEnabled(): boolean {
    const customMessageDirective = this.getCustomMessage(this.type);
    return !customMessageDirective.noStyles;
  }

  protected getCustomMessage(type: string): NbChatCustomMessageDirective {
    const customMessageDirective = this.customMessageService.getInstance(type);
    if (!customMessageDirective) {
      throw new Error(
        `nb-chat: Can't find template for custom type '${type}'. ` +
          `Make sure you provide it in the chat component with *nbCustomMessage='${type}'.`,
      );
    }
    return customMessageDirective;
  }
}
