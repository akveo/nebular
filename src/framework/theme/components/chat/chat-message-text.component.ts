/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

/**
 * Chat message component.
 */
@Component({
  selector: 'nb-chat-message-text',
  template: `
    <p class="sender" *ngIf="sender || date">
      <ng-container *ngIf="preUserTemplateRef">
        <ng-container *ngTemplateOutlet="preUserTemplateRef; context: templateContext"></ng-container>
      </ng-container>
      <span class="text-truncate">{{ sender }}</span>
      <time *ngIf="date">{{ date | date: dateFormat }}</time>
      <ng-container *ngIf="postUserTemplateRef">
        <ng-container *ngTemplateOutlet="postUserTemplateRef; context: templateContext"></ng-container>
      </ng-container>
    </p>
    <p class="text" *ngIf="message">{{ message }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageTextComponent {
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

  @Input()
  public templateContext: { $implicit: any; isReply: boolean } | undefined;

  @Input()
  public postUserTemplateRef: TemplateRef<any> | undefined;

  @Input()
  public preUserTemplateRef: TemplateRef<any> | undefined;
}
