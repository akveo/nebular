import { Component } from '@angular/core';

@Component({
  selector: 'nb-chat-test',
  template: `
    <nb-chat
      *ngFor="let chat of chats"
      [size]="chat.size"
      [status]="chat.status">
      <nb-chat-message message="Hello World!"></nb-chat-message>
    </nb-chat>
  `,
})
export class NbChatTestComponent {

  sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'];
  statuses = ['primary', 'success', 'info', 'warning', 'danger', 'active', 'disabled'];

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
}
