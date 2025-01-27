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
  QueryList,
  AfterViewInit,
  ContentChild,
  SimpleChanges,
  AfterContentInit,
  OnChanges,
} from '@angular/core';

import { NbStatusService } from '../../services/status.service';
import { NbComponentSize } from '../component-size';
import { NbComponentOrCustomStatus } from '../component-status';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbChatFormComponent } from './chat-form.component';
import { NbChatMessageComponent } from './chat-message.component';
import { NbChatCustomMessageService } from './chat-custom-message.service';
import { NbChatTitleDirective } from './chat-title.directive';

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
 * ```
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
 * You could provide a title template via the `nbChatTitle` directive. It overrides `title` input.
 * @stacked-example(Custom template as a title, chat/chat-template-title.component)
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
 * # Custom message types
 *
 * Besides built-in message types, you could provide custom ones with their own template to render.
 * As an example, let's add the `link` message type.
 * <br>
 * First, you need to provide a template for the `link` message type:
 * ```html
 * <nb-chat>
 *   <a *nbCustomMessage="'link'" href="https://example.com">example.com</a>
 * </nb-chat>
 * ```
 * Then, add the `nb-chat-message` component with the `link` type:
 * ```html
 * <nb-chat>
 *   <a *nbCustomMessage="'link'" href="https://example.com">example.com</a>
 *   <nb-chat-message type="link"></nb-chat-message>
 * </nb-chat>
 * ```
 *
 * <div class="note note-warning">
 *   <div class="note-title">Important!</div>
 *   <div class="note-body">
 *     Custom chat messages must be defined before the `nb-chat-message`.
 *   </div>
 * </div>
 *
 * Custom message templates could have arbitrary data associated with them. Let's extract hardcoded link
 * href and text. To pass some data to the custom message template, use the `customMessageData` input
 * of the `nb-chat-message` component:
 * ```html
 * ...
 * <nb-chat-message type="link" [customMessageData]="{ href: 'https://example.com', text: 'example.com' }">
 * </nb-chat-message>
 * ...
 * ```
 * When `customMessageData` is set, this object would become a template context and you'll be able
 * to reference it via `let varName` syntax:
 * ```html
 * <a *nbCustomMessage="'link'; let data" [href]="data.href">{{ data.text }}</a>
 * ```
 *
 * That's it, full example will look like this:
 * ```html
 * <nb-chat title="Nebular Conversational UI">
 *   <a *nbCustomMessage="'link'; let data" [href]="data.href">{{ data.text }}</a>
 *   <nb-chat-message type="link" [customMessageData]="{ href: 'https://example.com', text: 'example.com' }">
 *   </nb-chat-message>
 * </nb-chat>
 * ```
 *
 * If you want to style your custom template from the ground up you could turn off generic message styling
 * (such as round borders, color, background, etc.) via the `noStyles` input:
 * ```html
 *   <div *nbCustomMessage="'my-custom-type'; noStyles: true">...</div>
 * ```
 * When you decide to use your own styles, the `isReply` property of the custom message template context
 * would come in handy. This property allows you to determine whether the message is a reply or not.
 * For example, to change link text color (as replies have a different background):
 * ```html
 * <a *nbCustomMessage="'link'; let data; let isReply=isReply"
 *    [href]="data.href"
 *    [class.link-control]="!isReply">
 *   {{ data.label }}
 * </a>
 * ```
 *
 * Below, you could find a more complex example with multiple custom message types:
 * @stacked-example(Custom message, chat/chat-custom-message.component)
 *
 * @styles
 *
 * chat-background-color:
 * chat-border:
 * chat-border-radius:
 * chat-shadow:
 * chat-padding:
 * chat-scrollbar-color:
 * chat-scrollbar-background-color:
 * chat-scrollbar-width:
 * chat-text-color:
 * chat-text-font-family:
 * chat-text-font-size:
 * chat-text-font-weight:
 * chat-text-line-height:
 * chat-header-text-font-family:
 * chat-header-text-font-size:
 * chat-header-text-font-weight:
 * chat-header-text-line-height:
 * chat-tiny-height:
 * chat-small-height:
 * chat-medium-height:
 * chat-large-height:
 * chat-giant-height:
 * chat-basic-background-color:
 * chat-basic-text-color:
 * chat-primary-background-color:
 * chat-primary-text-color:
 * chat-success-background-color:
 * chat-success-text-color:
 * chat-info-background-color:
 * chat-info-text-color:
 * chat-warning-background-color:
 * chat-warning-text-color:
 * chat-danger-background-color:
 * chat-danger-text-color:
 * chat-control-background-color:
 * chat-control-text-color:
 * chat-divider-color:
 * chat-divider-style:
 * chat-divider-width:
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
  selector: 'nb-chat',
  styleUrls: ['./chat.component.scss'],
  template: `
    <div class="header">
      <ng-container
        *ngIf="titleTemplate; else textTitleTemplate"
        [ngTemplateOutlet]="titleTemplate.templateRef"
        [ngTemplateOutletContext]="{ $implicit: titleTemplate.context }"
      >
      </ng-container>
      <ng-template #textTitleTemplate>
        {{ title }}
      </ng-template>
    </div>

    <div class="scrollable" #scrollable>
      <div class="messages">
        <ng-content select="nb-chat-message"></ng-content>
        <p class="no-messages" *ngIf="!messages?.length">{{ noMessagesPlaceholder }}</p>
      </div>
    </div>
    <div class="form">
      <ng-content select="nb-chat-form"></ng-content>
    </div>
  `,
  providers: [NbChatCustomMessageService],
  standalone: false,
})
export class NbChatComponent implements OnChanges, AfterContentInit, AfterViewInit {
  @Input() title: string;

  /**
   * Chat size, available sizes:
   * `tiny`, `small`, `medium`, `large`, `giant`
   */
  @Input() size: NbComponentSize;

  /**
   * Chat status color (adds specific styles):
   * `basic` (default), `primary`, `success`, `info`, `warning`, `danger`, `control`.
   */
  @Input() status: NbComponentOrCustomStatus = 'basic';

  @Input() noMessagesPlaceholder: string = 'No messages yet.';

  /**
   * Scroll chat to the bottom of the list when a new message arrives
   */
  @Input()
  get scrollBottom(): boolean {
    return this._scrollBottom;
  }
  set scrollBottom(value: boolean) {
    this._scrollBottom = convertToBoolProperty(value);
  }
  protected _scrollBottom: boolean = true;
  static ngAcceptInputType_scrollBottom: NbBooleanInput;

  @ViewChild('scrollable') scrollable: ElementRef;
  @ContentChildren(NbChatMessageComponent) messages: QueryList<NbChatMessageComponent>;
  @ContentChild(NbChatFormComponent) chatForm: NbChatFormComponent;
  @ContentChild(NbChatTitleDirective) titleTemplate: NbChatTitleDirective;

  constructor(protected statusService: NbStatusService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('status' in changes) {
      this.updateFormStatus();
    }
  }

  ngAfterContentInit() {
    this.updateFormStatus();
  }

  ngAfterViewInit() {
    this.messages.changes.subscribe((messages) => {
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

  protected updateFormStatus(): void {
    if (this.chatForm) {
      this.chatForm.setStatus(this.status);
    }
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

  @HostBinding('class.status-basic')
  get basic(): boolean {
    return this.status === 'basic';
  }

  @HostBinding('class.status-control')
  get control(): boolean {
    return this.status === 'control';
  }

  @HostBinding('class')
  get additionalClasses(): string[] {
    if (this.statusService.isCustomStatus(this.status)) {
      return [this.statusService.getStatusClass(this.status)];
    }
    return [];
  }
}
