import { Injectable } from '@angular/core';

@Injectable()
export class NbChatShowcaseService {

  protected botAvatar: string = 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg';
  protected imageLink: string = 'https://picsum.photos/320/240/?random';
  protected gifsLinks: string[] = ['https://media.tenor.com/images/ac287fd06319e47b1533737662d5bfe8/tenor.gif',
    'https://i.gifer.com/no.gif', 'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
    'http://www.reactiongifs.com/r/wnd1.gif'];
  protected fileLink: string = 'http://google.com';
  protected replyArray: any[] = [
    {
      regExp: /([S,s]ay)|(SAY)/g,
      answerArray: ['Hello!', 'Yes?', 'Yes, milord?', 'More work?'],
      type: 'text',
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
      type: 'pic',
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'file',
        file: {
          url: this.imageLink,
          type: 'image/jpeg',
        },
        user: {
          name: 'Bot',
          avatar: this.botAvatar,
        },
      },
    },
    {
      regExp: /([G,g]if)|(GIF)/g,
      type: 'gif',
      answerArray: ['No problem', 'Well done', 'You got it man'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'file',
        file: {
          url: '',
          type: 'image/gif',
        },
        user: {
          name: 'Bot',
          avatar: this.botAvatar,
        },
      },
    },
    {
      regExp: /([F,f]ile)|(FILE)/g,
      type: 'file',
      answerArray: ['Take it!', 'Job Done.', 'As you wish'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'file',
        file: {
          url: this.fileLink,
        },
        icon: 'nb-compose',
        user: {
          name: 'Bot',
          avatar: this.botAvatar,
        },
      },
    },
    {
      regExp: /([M,m]ap)|(MAP)/g,
      type: 'map',
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
      type: 'quote',
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
    const botReply =  this.replyArray.find((reply: any) => message.search(reply.regExp) !== -1);
    if (botReply) {
      if (botReply.reply.type === 'quote') {
        botReply.quote = message;
      }

      if (botReply.type === 'gif') {
        botReply.reply.file.url = this.gifsLinks[Math.floor(Math.random() * this.gifsLinks.length)];
      }

      botReply.reply.text = botReply.answerArray[Math.floor(Math.random() * botReply.answerArray.length)];
      return { ...botReply.reply };
    }
  }
}
