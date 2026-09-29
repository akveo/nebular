import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbChatModule, NbThemeModule } from '@nebular/theme';

@Component({
  selector: 'nb-chat-message-text-test',
  template: `
    <nb-chat-message-text [sender]="sender" [date]="date" [dateFormat]="dateFormat" [message]="message">
    </nb-chat-message-text>
  `,
  standalone: false,
})
export class NbChatMessageTextTestComponent {
  @Input()
  sender: string;
  @Input()
  dateFormat: string;
  @Input()
  message: string;
  @Input()
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
    fixture.componentRef.setInput('sender', 'AB');
    fixture.componentRef.setInput('message', 'new text message');
    fixture.componentRef.setInput('date', new Date());
    fixture.componentRef.setInput('dateFormat', 'shortTime');
    fixture.detectChanges();

    const msgValue = fixture.nativeElement.querySelector('.text').textContent;
    expect(msgValue).toContain('new text message');

    const senderInitials = fixture.nativeElement.querySelector('.sender').textContent;
    expect(senderInitials).toContain('AB');

    const time = fixture.nativeElement.querySelector('time');
    expect(time).toBeTruthy();
  });

  it('should not show sender if it is not provided', () => {
    fixture.componentRef.setInput('message', 'some test message');
    fixture.detectChanges();
    const sender = fixture.nativeElement.querySelector('.sender');
    expect(sender).toBeFalsy();
  });

  it('should not show message if it is not provided', () => {
    fixture.componentRef.setInput('sender', 'JD');
    fixture.detectChanges();
    const sender = fixture.nativeElement.querySelector('.message');
    expect(sender).toBeFalsy();
  });
});
