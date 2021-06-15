import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbChatModule, NbThemeModule } from '@nebular/theme';

@Component({
  selector: 'nb-chat-message-quote-test',
  template: `
    <nb-chat-message-quote [sender]="sender"
                           [date]="date"
                           [dateFormat]="dateFormat"
                           [message]="message"
                           [quote]="quote">
    </nb-chat-message-quote>
    `,
})
export class NbChatMessageQuoteTestComponent {
  sender: string;
  dateFormat: string;
  message: string;
  date: Date;
  quote: string;
}

describe('Chat-message-quote component: NbChatMessageQuoteTestComponent', () => {
  let fixture: ComponentFixture<NbChatMessageQuoteTestComponent>;
  let component: NbChatMessageQuoteTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), NbChatModule],
      declarations: [NbChatMessageQuoteTestComponent],
    });

    fixture = TestBed.createComponent(NbChatMessageQuoteTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('quote should be created', () => {
    component.message = 'some test message';
    component.date = new Date();
    component.dateFormat = 'shortTime';
    component.quote = 'quote';
    fixture.detectChanges();
    const quoteElement = fixture.nativeElement.querySelector('.quote');
    expect(quoteElement).toBeTruthy();
  });

  it('should be created inner chat message', () => {
    component.message = 'some test message';
    component.date = new Date();
    component.dateFormat = 'shortTime';
    component.quote = 'quote';
    fixture.detectChanges();
    const quoteElement = fixture.nativeElement.querySelector('nb-chat-message-text');
    expect(quoteElement).toBeTruthy();
  });

});
