import { Injectable } from '@angular/core';

@Injectable()
export class NbChatShowcaseService {

  protected botAvatar: string = 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg';
  protected imageLink: string = 'https://picsum.photos/320/240/?random';
  protected fileLink: string = 'http://google.com';
  protected replyArray: any[] = [
    {
      regExp: /([S,s]ay)|(SAY)/g,
      answerArray: ['Hello!', 'Yes?', 'Yes, milord?', 'More work?'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        user: {
          name: 'Bot',
          avatar: this.botAvatar,
        },
      },
    },
    {
      regExp: /([I,i]mage)|(IMAGE)|([P,p]ic)|(Picture)/g,
      answerArray: ['Hey looks at this!', 'Ready to work', 'Yes, master.'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'image',
        file: this.imageLink,
        user: {
          name: 'Bot',
          avatar: this.botAvatar,
        },
      },
    },
    {
      regExp: /([F,f]ile)|(FILE)/g,
      answerArray: ['Take it!', 'Job Done.', 'As you wish'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'file',
        file: this.fileLink,
        icon: 'nb-compose',
        user: {
          name: 'Bot',
          avatar: this.botAvatar,
        },
      },
    },
    {
      regExp: /([M,m]ap)|(MAP)/g,
      answerArray: ['Done.', 'My sight is yours.', 'I shall be your eyes.'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'map',
        latitude: 53.914321,
        longitude: 27.5998355,
        user: {
          name: 'Bot',
          avatar: this.botAvatar,
        },
      },
    },
    {
      regExp: /([Q,q]uote)|(QUOTE)/g,
      answerArray: ['Quoted!', 'Say no more.', 'I gladly obey.'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'quote',
        quote: '',
        user: {
          name: 'Bot',
          avatar: this.botAvatar,
        },
      },
    },
  ];

  public reply(message: string) {
    const botReply =  this.replyArray.find((reply) => {
      if (message.search(reply.regExp) !== -1) { return true; }
    });
    if (botReply.reply.type === 'quote') { botReply.quote = message; }
    botReply.reply.text = botReply.answerArray[Math.floor(Math.random() * botReply.answerArray.length)];
    return { ...botReply.reply };
  }
}
