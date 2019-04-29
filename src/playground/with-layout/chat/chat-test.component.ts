/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbComponentSize } from '@nebular/theme';

@Component({
  selector: 'nb-chat-test',
  template: `
    <nb-chat
      *ngFor="let chat of chats"
      [size]="chat.size"
      [status]="chat.status">

      <nb-chat-message *ngFor="let msg of messages"
                       [type]="msg.type"
                       [message]="msg.text"
                       [reply]="msg.reply"
                       [sender]="msg.user.name"
                       [date]="msg.date"
                       [files]="msg.files"
                       [quote]="msg.quote"
                       [latitude]="msg.latitude"
                       [longitude]="msg.longitude"
                       [avatar]="msg.user.avatar">
      </nb-chat-message>
      <nb-chat-form (send)="sendMessage($event)">
      </nb-chat-form>
    </nb-chat>
  `,
})
export class ChatTestComponent {
  messages = [];
  sizes: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];
  statuses = [ 'primary', 'success', 'info', 'warning', 'danger' ];

  chats: any[];

  constructor() {
    this.chats = this.prepareChats();
  }

  private prepareChats(): any[] {
    const result = [];

    this.statuses.forEach(status => {
      this.sizes.forEach(size => {
        result.push({
          size,
          status,
        });
      });
    });

    return result;
  }

  sendMessage(event) {
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
      },
    });
  }
}
