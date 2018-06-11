import { Component } from '@angular/core';

@Component({
  selector: 'nb-chat-conversation-showcase',
  styles: [`
    nb-card-body {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    nb-chat {
      width: 500px;
      margin: 0.5rem 0 2rem 2rem;
    }
  `],
  templateUrl: 'chat-conversation-showcase.component.html',
})

export class NbChatConversationShowcaseComponent {
  protected messages: any[] = [];

  sendMessage(event: any, userName: string, avatar: string, reply: boolean) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'nb-compose',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: reply,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: userName,
        avatar: avatar,
      },
    });
  }
}
