import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbThemeModule } from '../../theme.module';
import { NbChatModule } from './chat.module';

@Component({
  selector: 'nb-chat-title-template-test',
  template: `
    <nb-chat size="large" [title]="title">
      <ng-template nbChatTitle [context]="{ text: 'some text to pass into template' }" let-data>
        <div #templateTitle class="template-title">
          Chat title content from template. Here is the text provided via context: "{{ data.text }}"
        </div>
      </ng-template>

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
})
export class NbChatTitleTemplateTestComponent {
  @ViewChild('templateTitle') templateTitle: ElementRef;

  title: string;

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

describe('Directive nbChatTitle: NbChatTitleDirective', () => {
  let fixture: ComponentFixture<NbChatTitleTemplateTestComponent>;
  let component: NbChatTitleTemplateTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, NbThemeModule.forRoot(), NbChatModule],
      declarations: [NbChatTitleTemplateTestComponent],
    });

    fixture = TestBed.createComponent(NbChatTitleTemplateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title template if provided', () => {
    const chatTitleTemplateElement = fixture.nativeElement.querySelector('.template-title');
    expect(chatTitleTemplateElement).toBeTruthy();
    expect(chatTitleTemplateElement).toEqual(component.templateTitle.nativeElement);
  });

  it('should not render text title if template title is provided', () => {
    const titleText = 'Some title';
    component.title = titleText;
    const chatHeaderElement: HTMLElement = fixture.nativeElement.querySelector('.header');
    const chatTitleTemplateElement = fixture.nativeElement.querySelector('.template-title');

    expect(chatHeaderElement.innerText).not.toEqual(titleText);
    expect(chatTitleTemplateElement).toBeTruthy();
  });
});
