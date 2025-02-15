import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NbThemeModule, NbChatModule, NbChatComponent } from '@nebular/theme';

@Component({
    template: `
    <nb-chat [title]="title">
      <ng-template nbChatTitle [context]="{ text: contextTemplateText }" let-data>
        {{ staticTemplateText }} {{ data.text }}
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
    standalone: false
})
export class NbChatTitleTemplateTestComponent {
  messages = [
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

  title = 'chat title';
  staticTemplateText = 'staticTemplateText';
  contextTemplateText = 'contextTemplateText';
}

describe('NbChatTitleDirective', () => {
  let fixture: ComponentFixture<NbChatTitleTemplateTestComponent>;
  let testComponent: NbChatTitleTemplateTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NbThemeModule.forRoot(), NbChatModule],
      declarations: [NbChatTitleTemplateTestComponent],
    });

    fixture = TestBed.createComponent(NbChatTitleTemplateTestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title template if provided', () => {
    const chatHeaderElement: HTMLElement = fixture.debugElement
      .query(By.directive(NbChatComponent))
      .query(By.css('.header')).nativeElement;
    const expectedText = ` ${testComponent.staticTemplateText} ${testComponent.contextTemplateText} `;

    expect(chatHeaderElement.textContent).toEqual(expectedText);
  });

  it('should not render text title if template title is provided', () => {
    const chatHeaderElement: HTMLElement = fixture.debugElement
      .query(By.directive(NbChatComponent))
      .query(By.css('.header')).nativeElement;

    expect(chatHeaderElement.textContent).not.toContain(testComponent.title);
  });
});
