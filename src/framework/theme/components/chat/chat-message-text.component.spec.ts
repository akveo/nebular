import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbChatModule, NbThemeModule } from '@nebular/theme';

@Component({
  selector: 'nb-chat-message-text-test',
  template: `
    <nb-chat-message-text [sender]="sender" [date]="date" [dateFormat]="dateFormat" [message]="message">
    </nb-chat-message-text>
  `,
})
export class NbChatMessageTextTestComponent {
  sender: string;
  dateFormat: string;
  message: string;
  date: Date;
}

describe('Chat-message-text component: NbChatMessageTextTestComponent', () => {
  let fixture: ComponentFixture<NbChatMessageTextTestComponent>;
  let component: NbChatMessageTextTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), NbChatModule],
      declarations: [NbChatMessageTextTestComponent],
    });

    fixture = TestBed.createComponent(NbChatMessageTextTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set all inputs', () => {
    component.sender = 'AB';
    component.message = 'new text message';
    component.date = new Date();
    component.dateFormat = 'shortTime';
    fixture.detectChanges();

    const msgValue = fixture.nativeElement.querySelector('.text').textContent;
    expect(msgValue).toContain('new text message');

    const senderInitials = fixture.nativeElement.querySelector('.sender').textContent;
    expect(senderInitials).toContain('AB');

    const time = fixture.nativeElement.querySelector('time');
    expect(time).toBeTruthy();
  });

  it('should not show sender if it is not provided', () => {
    component.message = 'some test message';
    fixture.detectChanges();
    const sender = fixture.nativeElement.querySelector('.sender');
    expect(sender).toBeFalsy();
  });

  it('should not show message if it is not provided', () => {
    component.sender = 'JD';
    fixture.detectChanges();
    const sender = fixture.nativeElement.querySelector('.message');
    expect(sender).toBeFalsy();
  });
});
