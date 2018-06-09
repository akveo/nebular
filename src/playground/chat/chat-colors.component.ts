import { Component } from '@angular/core';

@Component({
  selector: 'nb-chat-colors',
  templateUrl: './chat-colors.component.html',
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
          reply: true,
          user: {
            name: 'Bot',
            avatar: 'http://lorempixel.com/400/200/animals/'
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
          reply: true,
          user: {
            name: 'Bot',
            avatar: 'http://lorempixel.com/400/200/animals/'
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
          reply: true,
          user: {
            name: 'Bot',
            avatar: 'http://lorempixel.com/400/200/animals/'
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
          reply: true,
          user: {
            name: 'Bot',
            avatar: 'http://lorempixel.com/400/200/animals/'
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
          reply: true,
          user: {
            name: 'Bot',
            avatar: 'http://lorempixel.com/400/200/animals/'
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
          reply: true,
          user: {
            name: 'Bot',
            avatar: 'http://lorempixel.com/400/200/animals/'
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
          reply: true,
          user: {
            name: 'Bot',
            avatar: 'http://lorempixel.com/400/200/animals/'
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
        avatar: 'http://lorempixel.com/400/200/animals/',
      },
    });

  }
}
