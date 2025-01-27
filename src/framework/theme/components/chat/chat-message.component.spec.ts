import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbChatMessageComponent, NbChatModule, NbThemeModule, NbChatCustomMessageService } from '@nebular/theme';

@Component({
  selector: 'nb-chat-message-test',
  template: `
    <nb-chat size="large">
      <nb-chat-message
        *ngFor="let msg of messages"
        [type]="msg.type"
        [message]="msg.text"
        [reply]="msg.reply"
        [sender]="msg.user.name"
        [date]="msg.date"
        [avatar]="msg.user.avatar"
        [customMessageData]="msg.optionalData"
      >
        <div *nbCustomMessage="'link'; let data">
          <a [href]="data.href">{{ data.label }}</a>
        </div>
      </nb-chat-message>
      <nb-chat-form [dropFiles]="false"> </nb-chat-form>
    </nb-chat>
  `,
  standalone: false,
})
export class NbChatMessageTestComponent {
  messages = [];

  loadMessages(): void {
    this.messages = [
      {
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
      },
    ];
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
  });

  it('should create custom messages with content', () => {
    component.loadMessages();
    fixture.detectChanges();

    const customMessageElement = fixture.nativeElement.querySelector('a');
    expect(customMessageElement).toBeTruthy();

    const linkHref = customMessageElement.getAttribute('href');
    expect(linkHref).toBe('https://akveo.github.io/ngx-admin/');

    const linkLabel = customMessageElement.textContent;
    expect(linkLabel).toBe('Visit Akveo Nebular');
  });
});

describe('Component: NbChatMessageComponent', () => {
  let chat: NbChatMessageComponent;
  let fixture: ComponentFixture<NbChatMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, NbThemeModule.forRoot(), NbChatModule],
      providers: [NbChatCustomMessageService],
    });

    fixture = TestBed.createComponent(NbChatMessageComponent);
    chat = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(chat).toBeTruthy();
  });

  it('ChatMessageComponent testing getInitials method', () => {
    chat.sender = '';
    fixture.detectChanges();
    expect(chat.getInitials()).toEqual('');

    chat.sender = 'John Connor';
    fixture.detectChanges();
    expect(chat.getInitials()).toEqual('JC');
  });

  it('ChatMessageComponent testing _isDefaultMessageType method', () => {
    chat.type = null;
    expect(chat._isBuiltInMessageType()).toBe(true);
    chat.type = undefined;
    expect(chat._isBuiltInMessageType()).toBe(true);
    chat.type = 'text';
    expect(chat._isBuiltInMessageType()).toBe(true);
    chat.type = 'file';
    expect(chat._isBuiltInMessageType()).toBe(true);
    chat.type = 'map';
    expect(chat._isBuiltInMessageType()).toBe(true);
    chat.type = 'quote';
    expect(chat._isBuiltInMessageType()).toBe(true);
    chat.type = 'link';
    expect(chat._isBuiltInMessageType()).toBe(false);
    chat.type = 'button';
    expect(chat._isBuiltInMessageType()).toBe(false);
  });
});
