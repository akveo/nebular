/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-chat-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat-showcase.component.html',
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
      type: 'image',
      file: 'http://lorempixel.com/600/400/animals/',
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
      file: 'http://google.com',
      icon: 'nb-compose',
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
    this.messages.push({
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
