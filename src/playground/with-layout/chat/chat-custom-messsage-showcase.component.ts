import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nb-chat-custom-messsage-showcase',
    templateUrl: './chat-custom-message-showcase.component.html',
    styles: [`
        nb-chat {
        width: 500px;
        }
    `],
})

export class ChatCustomMesssageShowcaseComponent implements OnInit {

    messages: any[] = [];

    constructor() { }

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
                text: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
                reply: true,
                date: new Date(),
                user: {
                    name: 'Aragorn Elessar II',
                    avatar: 'https://i.gifer.com/no.gif',
                },
            },
            {
                text: 'Hello, how are you?',
                reply: false,
                type: 'text',
                date: new Date(),
                user: {
                    name: 'Bilbo Baggins',
                    avatar: '',
                },
            },
            {
                text: `Now let's try to use table`,
                reply: true,
                date: new Date(),
                type: 'table',
                user: {
                    name: 'Fredegar Bolger',
                    avatar: 'https://i.gifer.com/no.gif',
                },
            },
            {
                text: 'What do you mean by that?',
                reply: false,
                date: new Date(),
                type: 'quote',
                quote: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
                user: {
                    name: 'Tom Bombadil',
                    avatar: '',
                },
            },
            {
                text: 'Hey looks at that pic I just found!',
                reply: false,
                date: new Date(),
                type: 'img',
                user: {
                    name: 'Peregrin Took',
                    avatar: '',
                },
            },
            {
                text: 'Hey looks at that pic I just found!',
                reply: true,
                date: new Date(),
                type: 'link',
                customMessageData: 'https://akveo.github.io/nebular/',
                user: {
                    name: 'Peregrin Took',
                    avatar: '',
                },
            },
        ]
    }
}
