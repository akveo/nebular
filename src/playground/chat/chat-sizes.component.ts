import { Component } from '@angular/core';

@Component({
  selector: 'nb-chat-sizes',
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }
    nb-chat {
      width: 500px;
      margin: 0.5rem 0 2rem 2rem;
    }`],
  templateUrl: './chat-size.component.html',
})

export class NbChatSizesComponent {
  chats: any[] = [
    {
      title: 'Nebular Conversational UI Small',
      messages: [
        {
          text: 'Small!',
          date: new Date(),
          reply: true,
          user: {
            name: 'Bot',
            avatar: 'https://i.gifer.com/no.gif',
          },
        },
      ],
      size: 'small',
    },
    {
      title: 'Nebular Conversational UI Medium',
      messages: [
        {
          text: 'Medium!',
          date: new Date(),
          reply: true,
          user: {
            name: 'Bot',
            avatar: 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg',
          },
        },
      ],
      size: 'large',
    },
  ];

  sendMessage(messages, event) {
    messages.push({
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
