import { Component } from '@angular/core';

@Component({
  selector: 'nb-chat-colors',
  templateUrl: './chat-colors.component.html',
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }
    nb-chat {
      width: 500px;
      margin: 0.5rem 0 2rem 2rem;
    }
  `],
})

export class NbChatColorsComponent {
  chats: any[] = [
    {
      status: 'success',
      title: 'Nebular Conversational UI Success',
      messages: [
        {
          text: 'Success!',
          date: new Date(),
          reply: false,
          user: {
            name: 'Bot',
            avatar: 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg',
          },
        },
      ],
    },
    {
      status: 'danger',
      title: 'Nebular Conversational UI Danger',
      messages: [
        {
          text: 'Danger!',
          date: new Date(),
          reply: false,
          user: {
            name: 'Bot',
            avatar: 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg',
          },
        },
      ],
    },
    {
      status: 'primary',
      title: 'Nebular Conversational UI Primary',
      messages: [
        {
          text: 'Primary!',
          date: new Date(),
          reply: false,
          user: {
            name: 'Bot',
            avatar: 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg',
          },
        },
      ],
    },
    {
      status: 'info',
      title: 'Nebular Conversational UI Info',
      messages: [
        {
          text: 'Info!',
          date: new Date(),
          reply: false,
          user: {
            name: 'Bot',
            avatar: 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg',
          },
        },
      ],
    },
    {
      status: 'warning',
      title: 'Nebular Conversational UI Warning',
      messages: [
        {
          text: 'Warning!',
          date: new Date(),
          reply: false,
          user: {
            name: 'Bot',
            avatar: 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg',
          },
        },
      ],
    },
    {
      status: 'active',
      title: 'Nebular Conversational UI Active',
      messages: [
        {
          text: 'Active!',
          date: new Date(),
          reply: false,
          user: {
            name: 'Bot',
            avatar: 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg',
          },
        },
      ],
    },
    {
      status: 'disabled',
      title: 'Nebular Conversational UI Disabled',
      messages: [
        {
          text: 'Disabled!',
          date: new Date(),
          reply: false,
          user: {
            name: 'Bot',
            avatar: 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg',
          },
        },
      ],
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
