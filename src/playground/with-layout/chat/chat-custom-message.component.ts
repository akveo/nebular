import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './chat-custom-message.component.html',
  styleUrls: ['./chat-custom-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ChatCustomMessageComponent implements OnInit {
  readonly tableData = {
    columns: ['First Name', 'Last Name', 'Age'],
    rows: [
      { firstName: 'Robert', lastName: 'Baratheon', age: 46 },
      { firstName: 'Jaime', lastName: 'Lannister', age: 31 },
    ],
  };

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
        type: 'link',
        text: 'Now you able to use links!',
        customMessageData: {
          href: 'https://akveo.github.io/nebular/',
          text: 'Go to Nebular',
        },
        reply: false,
        date: new Date(),
        user: {
          name: 'Frodo Baggins',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        type: 'link',
        customMessageData: {
          href: 'https://akveo.github.io/ngx-admin/',
          text: 'Go to ngx-admin',
        },
        reply: true,
        date: new Date(),
        user: {
          name: 'Meriadoc Brandybuck',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        type: 'button',
        customMessageData: 'Click to scroll down',
        reply: false,
        date: new Date(),
        user: {
          name: 'Gimli Gloin',
          avatar: '',
        },
      },
      {
        type: 'table',
        text: `Now let's try to add a table`,
        customMessageData: this.tableData,
        reply: false,
        date: new Date(),
        user: {
          name: 'Fredegar Bolger',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        type: 'table',
        text: `And one more table but now in the reply`,
        customMessageData: this.tableData,
        reply: true,
        date: new Date(),
        user: {
          name: 'Fredegar Bolger',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
    ];
  }
}
