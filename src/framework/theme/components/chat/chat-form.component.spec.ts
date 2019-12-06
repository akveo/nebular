import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbChatFormComponent, NbChatModule } from '@nebular/theme';

describe('NbChatFormComponent', () => {
  let fixture: ComponentFixture<NbChatFormComponent>;
  let chatFormComponent: NbChatFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NbChatModule.forRoot() ],
    });

    fixture = TestBed.createComponent(NbChatFormComponent);
    chatFormComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('getInputStatus', () => {

    it('should return basic status by default', () => {
      expect(chatFormComponent.getInputStatus()).toEqual('basic');
    });

    it('should return component status if input focused', () => {
      chatFormComponent.status = 'info';
      chatFormComponent.inputFocus = true;

      expect(chatFormComponent.getInputStatus()).toEqual('info');
    });

    it('should return component status if input hovered', () => {
      chatFormComponent.status = 'info';
      chatFormComponent.inputHover = true;

      expect(chatFormComponent.getInputStatus()).toEqual('info');
    });

    it('should return primary if file over and status is basic or control', () => {
      chatFormComponent.fileOver = true;

      expect(chatFormComponent.getInputStatus()).toEqual('primary');
    });

    it('should return status if file over and status is not basic nor control', () => {
      chatFormComponent.status = 'info';
      chatFormComponent.fileOver = true;

      expect(chatFormComponent.getInputStatus()).toEqual('info');
    });
  });

  describe('getButtonStatus', () => {

    it('should return primary if status is basic or control', () => {
      chatFormComponent.status = 'basic';
      expect(chatFormComponent.getButtonStatus()).toEqual('primary');

      chatFormComponent.status = 'control';
      expect(chatFormComponent.getButtonStatus()).toEqual('primary');
    });

    it('should return status if status is not basic nor control', () => {
      chatFormComponent.status = 'info';

      expect(chatFormComponent.getButtonStatus()).toEqual('info');
    });
  });
});
