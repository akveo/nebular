import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbChatMessageComponent, NbChatModule, NbThemeModule } from '@nebular/theme';

@Component({
    selector: 'nb-chat-message-test',
    template: `
    <nb-chat [title]="chatTitle" size="large">
    <nb-chat-message *ngFor="let msg of messages"
        [type]="msg.type"
        [message]="msg.text"
        [reply]="msg.reply"
        [sender]="msg.user.name"
        [date]="msg.date"
        [avatar]="msg.user.avatar"
        [customMessageData]="msg.optionalData">

        <div *nbCustomMessage="'link'; let customMessageData">
            <a [href]="customMessageData.href">{{ customMessageData.label }}</a>
        </div>

    </nb-chat-message>
    <nb-chat-form (send)="sendMessage($event)" [dropFiles]="false">
    </nb-chat-form>
</nb-chat>
    `,
})

export class NbChatMessageTestComponent {
    messages = [];

    loadMessages(): void {
        this.messages = [{
            reply: false,
            type: 'link',
            optionalData: {
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
            text: 'Hello, how are you?',
            reply: true,
            type: 'text',
            date: new Date(),
            user: {
                name: 'Bilbo Baggins',
                avatar: '',
            },
        }];
    }
}

describe('Chat-message component: NbChatMessageTestComponent', () => {
    let fixture: ComponentFixture<NbChatMessageTestComponent>;
    let component: NbChatMessageTestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, NbThemeModule.forRoot(), NbChatModule],
            declarations: [NbChatMessageTestComponent],
        });

        fixture = TestBed.createComponent(NbChatMessageTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    })

    it('should create custom messages with content', () => {
        component.loadMessages();
        fixture.detectChanges();

        const customMessageElement = fixture.nativeElement.querySelector('a');
        expect(customMessageElement).toBeTruthy();

        const linkHref = customMessageElement.getAttribute('href');
        expect(linkHref).toBe('https://akveo.github.io/ngx-admin/');

        const linkLabel = customMessageElement.textContent;
        expect(linkLabel).toBe('Visit Akveo Nebular');
    })


});

describe('Component: NbChatMessageComponent', () => {
    let chat: NbChatMessageComponent;
    let fixture: ComponentFixture<NbChatMessageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ BrowserAnimationsModule, NbThemeModule.forRoot(), NbChatModule ],
        });

        fixture = TestBed.createComponent(NbChatMessageComponent);
        chat = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(chat).toBeTruthy();
    })

    it('ChatMessageComponent testing getInitials method', () => {
        chat.sender = '';
        fixture.detectChanges();
        expect(chat.getInitials()).toEqual('');

        chat.sender = 'John Connor';
        fixture.detectChanges();
        expect(chat.getInitials()).toEqual('JC');
    })

    it('ChatMessageComponent testing isDefaultMessageType method', () => {
        expect(chat.isDefaultMessageType(null)).toBe(false);
        expect(chat.isDefaultMessageType(undefined)).toBe(true);
        expect(chat.isDefaultMessageType('text')).toBe(true);
        expect(chat.isDefaultMessageType('file')).toBe(true);
        expect(chat.isDefaultMessageType('map')).toBe(true);
        expect(chat.isDefaultMessageType('quote')).toBe(true);
        expect(chat.isDefaultMessageType('link')).toBe(false);
        expect(chat.isDefaultMessageType('button')).toBe(false);
    })

    it('ChatMessageComponent testing getActualTemplate method', () => {
        expect(() => chat.getActualTemplate(undefined)).toThrowError('Custom template type must be provided');
        expect(() => chat.getActualTemplate('link'))
            .toThrowError(`Can't find template for custom message type = link.`);
    })

});

