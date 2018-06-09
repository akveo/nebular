/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbChatShowcaseService } from './chat-showcase.service';

@Component({
  selector: 'nb-chat-showcase',
  templateUrl: './chat-showcase.component.html',
  providers: [ NbChatShowcaseService ],
  styles: [`
    nb-card-body {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    nb-chat {
      width: 500px;
    }
  `],
})
export class NbChatShowcaseComponent {

  constructor(protected chatShowcaseService: NbChatShowcaseService) { }

  messages: any[] = [
    {
      text: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
      reply: false,
      date: new Date(),
      user: {
        name: 'Dmitry Nehaychik',
        avatar: 'http://lorempixel.com/400/200/animals/',
      },
    },
    {
      text: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
      reply: true,
      date: new Date(),
      user: {
        name: 'Dmitry Nehaychik',
        avatar: 'http://lorempixel.com/400/200/animals/',
      },
    },
    {
      text: 'Hello, how are you?',
      reply: false,
      date: new Date(),
      user: {
        name: 'Dmitry Nehaychik',
        avatar: '',
      },
    },
    {
      text: 'Hey looks at that pic I just found!',
      reply: false,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: 'http://lorempixel.com/600/400/animals/',
          type: 'image/jpeg',
          icon: false,
        },
      ],
      user: {
        name: 'Dmitry Nehaychik',
        avatar: '',
      },
    },
    {
      text: 'What do you mean by that?',
      reply: false,
      date: new Date(),
      type: 'quote',
      quote: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
      user: {
        name: 'Dmitry Nehaychik',
        avatar: '',
      },
    },
    {
      text: 'Attached is an archive I mentioned',
      reply: true,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: 'http://lorempixel.com/600/400/animals/',
          icon: 'nb-compose',
        },
      ],
      user: {
        name: 'Dmitry Nehaychik',
        avatar: '',
      },
    },
    {
      text: 'Meet me there',
      reply: false,
      date: new Date(),
      type: 'map',
      latitude: 40.714728,
      longitude: -73.998672,
      user: {
        name: 'Dmitry Nehaychik',
        avatar: '',
      },
    },
    // {
    //   text: 'Hello, how are you?',
    //   reply: false,
    //   date: new Date(),
    //   user: {
    //     name: 'Dmitry Nehaychik',
    //     avatar: '',
    //   },
    // },
    // {
    //   text: 'Hello, how are you?',
    //   reply: false,
    //   date: new Date(),
    //   user: {
    //     name: 'Dmitry Nehaychik',
    //     avatar: '',
    //   },
    // },
    // {
    //   text: 'Hello, how are you?',
    //   reply: false,
    //   date: new Date(),
    //   user: {
    //     name: 'Dmitry Nehaychik',
    //     avatar: '',
    //   },
    // },
    // {
    //   text: 'Hello, how are you?',
    //   reply: false,
    //   date: new Date(),
    //   user: {
    //     name: 'Dmitry Nehaychik',
    //     avatar: '',
    //   },
    // },
    // {
    //   text: 'Hello, how are you?',
    //   reply: false,
    //   date: new Date(),
    //   user: {
    //     name: 'Dmitry Nehaychik',
    //     avatar: '',
    //   },
    // },
    // {
    //   text: 'Hello, how are you?',
    //   reply: false,
    //   date: new Date(),
    //   user: {
    //     name: 'Dmitry Nehaychik',
    //     avatar: '',
    //   },
    // },
    // {
    //   text: 'Hello, how are you?',
    //   reply: false,
    //   date: new Date(),
    //   user: {
    //     name: 'Dmitry Nehaychik',
    //     avatar: '',
    //   },
    // },
  ];

  sendMessage(event: any) {
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
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'http://lorempixel.com/400/200/animals/',
      },
    });
    const botReply = this.chatShowcaseService.reply(event.message);
    if (botReply) {
      setTimeout(() => { this.messages.push(botReply) }, 500);
    }
  }
}
