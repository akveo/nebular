import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nb-chat-custom-message',
  templateUrl: './chat-custom-message.component.html',
  styleUrls: ['./chat-custom-message.component.scss'],
})
export class ChatCustomMessageComponent implements OnInit {

  messages: any[] = [];

  ngOnInit(): void {
    this.loadMessages();
  }

  sendMessage(event: any): void {
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: 'text',
      user: {
        name: 'Gandalf the Grey',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
  }

  private loadMessages(): void {
    this.messages = [
      {
        reply: false,
        type: 'link',
        customMessageData: {
          href: 'https://akveo.github.io/ngx-admin/',
          label: 'Visit Akveo Nebular',
        },
        date: new Date(),
        user: {
          name: 'Frodo Baggins',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        reply: true,
        text: 'with reply',
        type: 'link',
        customMessageData: {
          href: 'https://akveo.github.io/ngx-admin/',
          label: 'Visit Akveo Nebular',
        },
        date: new Date(),
        user: {
          name: 'Meriadoc Brandybuck',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        text: 'Hey look at this awesome button',
        reply: false,
        date: new Date(),
        type: 'button',
        customMessageData: 'custom button label',
        user: {
          name: 'Gimli Gloin',
          avatar: '',
        },
      },
      {
        text: `Now let's try to use table`,
        reply: true,
        date: new Date(),
        type: 'table',
        customMessageData: {
          column1: 'Fitst Name',
          column2: 'Last Name',
          column3: 'Age',
        },
        user: {
          name: 'Fredegar Bolger',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        reply: true,
        date: new Date(),
        type: 'table',
        customMessageData: {
          column1: 'Fitst Name',
          column2: 'Last Name',
          column3: 'Age',
        },
        user: {
          name: 'Fredegar Bolger',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        text: `Now let's try to use table`,
        reply: false,
        date: new Date(),
        type: 'table',
        customMessageData: {
          column1: 'Fitst Name',
          column2: 'Last Name',
          column3: 'Age',
        },
        user: {
          name: 'Fredegar Bolger',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        reply: false,
        date: new Date(),
        type: 'table',
        customMessageData: {
          column1: 'Fitst Name',
          column2: 'Last Name',
          column3: 'Age',
        },
        user: {
          name: 'Fredegar Bolger',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        text: 'Hey looks at that pic I just found!',
        reply: true,
        date: new Date(),
        type: 'img',
        user: {
          name: 'Peregrin Took',
          avatar: '',
        },
      },
    ]
  }
}
