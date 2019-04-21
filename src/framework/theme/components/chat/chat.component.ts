/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  ContentChildren,
  QueryList, AfterViewInit,
} from '@angular/core';

import { NbComponentSize } from '../component-size';
import { NbComponentStatus } from '../component-status';
import { convertToBoolProperty } from '../helpers';
import { NbChatMessageComponent } from './chat-message.component';

/**
 * Conversational UI collection - a set of components for chat-like UI construction.
 *
 * Main features:
 * - different message types support (text, image, file, file group, map, etc)
 * - drag & drop for images and files with preview
 * - different UI styles
 * - custom action buttons (coming soon)
 *
 * Here's a complete example build in a bot-like app. Type `help` to be able to receive different message types.
 * Enjoy the conversation and the beautiful UI.
 * @stacked-example(Showcase, chat/chat-showcase.component)
 *
 * Basic chat configuration and usage:
 * ```ts
 * <nb-chat title="Nebular Conversational UI">
 *       <nb-chat-message *ngFor="let msg of messages"
 *                        [type]="msg.type"
 *                        [message]="msg.text"
 *                        [reply]="msg.reply"
 *                        [sender]="msg.user.name"
 *                        [date]="msg.date"
 *                        [files]="msg.files"
 *                        [quote]="msg.quote"
 *                        [latitude]="msg.latitude"
 *                        [longitude]="msg.longitude"
 *                        [avatar]="msg.user.avatar">
 *   </nb-chat-message>
 *
 *   <nb-chat-form (send)="sendMessage($event)" [dropFiles]="true">
 *   </nb-chat-form>
 * </nb-chat>
 * ```
 * ### Installation
 *
 * Import `NbChatModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbChatModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * If you need to provide an API key for a `map` message type (which is required by Google Maps)
 * you may use `NbChatModule.forRoot({ ... })` call if this is a global app configuration
 * or `NbChatModule.forChild({ ... })` for a feature module configuration:
 *
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbChatModule.forRoot({ messageGoogleMapKey: 'MAP_KEY' }),
 *   ],
 * })
 * export class AppModule { }
 *
 * ### Usage
 *
 * There are three main components:
 * ```ts
 * <nb-chat>
 * </nb-chat> // chat container
 *
 * <nb-chat-form>
 * </nb-chat-form> // chat form with drag&drop files feature
 *
 * <nb-chat-message>
 * </nb-chat-message> // chat message, available multiple types
 * ```
 *
 * Two users conversation showcase:
 * @stacked-example(Conversation, chat/chat-conversation-showcase.component)
 *
 * Chat UI is also available in different colors by specifying a `[status]` input:
 *
 * @stacked-example(Colored Chat, chat/chat-colors.component)
 *
 * Also it is possible to configure sizes through `[size]` input:
 *
 * @stacked-example(Chat Sizes, chat/chat-sizes.component)
 *
 * @styles
 *
 * chat-font-size:
 * chat-fg:
 * chat-bg:
 * chat-border-radius:
 * chat-fg-text:
 * chat-height-xxsmall:
 * chat-height-xsmall:
 * chat-height-small:
 * chat-height-medium:
 * chat-height-large:
 * chat-height-xlarge:
 * chat-height-xxlarge:
 * chat-border:
 * chat-padding:
 * chat-shadow:
 * chat-separator:
 * chat-active-bg:
 * chat-disabled-bg:
 * chat-disabled-fg:
 * chat-primary-bg:
 * chat-info-bg:
 * chat-success-bg:
 * chat-warning-bg:
 * chat-danger-bg:
 */
@Component({
  selector: 'nb-chat',
  styleUrls: ['./chat.component.scss'],
  template: `
    <div class="header">{{ title }}</div>
    <div class="scrollable" #scrollable>
      <div class="messages">
        <ng-content select="nb-chat-message"></ng-content>
        <p class="no-messages" *ngIf="!messages?.length">No messages yet.</p>
      </div>
    </div>
    <div class="form">
      <ng-content select="nb-chat-form"></ng-content>
    </div>
  `,
})
export class NbChatComponent implements AfterViewInit {

  @Input() title: string;

  /**
   * Chat size, available sizes:
   * tiny, small, medium, large, giant
   */
  @Input() size: NbComponentSize;

  /**
   * Chat status color (adds specific styles):
   * active, disabled, primary, info, success, warning, danger
   */
  @Input() status: NbComponentStatus;

  /**
   * Scroll chat to the bottom of the list when a new message arrives
   */
  @Input()
  get scrollBottom(): boolean {
    return this._scrollBottom
  }
  set scrollBottom(value: boolean) {
    this._scrollBottom = convertToBoolProperty(value);
  }
  protected _scrollBottom: boolean = true;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = convertToBoolProperty(value);
  }
  protected _disabled: boolean = false;

  @ViewChild('scrollable') scrollable: ElementRef;
  @ContentChildren(NbChatMessageComponent) messages: QueryList<NbChatMessageComponent>;

  ngAfterViewInit() {
    this.messages.changes
      .subscribe((messages) => {
        this.messages = messages;
        this.updateView();
      });

    this.updateView();
  }

  updateView() {
    if (this.scrollBottom) {
      this.scrollListBottom();
    }
  }

  scrollListBottom() {
    this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
  }

  @HostBinding('class.size-tiny')
  get tiny(): boolean {
    return this.size === 'tiny';
  }

  @HostBinding('class.size-small')
  get small(): boolean {
    return this.size === 'small';
  }

  @HostBinding('class.size-medium')
  get medium(): boolean {
    return this.size === 'medium';
  }

  @HostBinding('class.size-large')
  get large(): boolean {
    return this.size === 'large';
  }

  @HostBinding('class.size-giant')
  get giant(): boolean {
    return this.size === 'giant';
  }

  @HostBinding('class.status-primary')
  get primary(): boolean {
    return this.status === 'primary';
  }

  @HostBinding('class.status-success')
  get success(): boolean {
    return this.status === 'success';
  }

  @HostBinding('class.status-info')
  get info(): boolean {
    return this.status === 'info';
  }

  @HostBinding('class.status-warning')
  get warning(): boolean {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger(): boolean {
    return this.status === 'danger';
  }
}
