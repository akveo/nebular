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

    it('should return no status by default', () => {
      expect(chatFormComponent.getInputStatus()).toEqual('');
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

    it('should return component status if file over', () => {
      chatFormComponent.status = 'info';
      chatFormComponent.fileOver = true;

      expect(chatFormComponent.getInputStatus()).toEqual('info');
    });

    it('should return primary status if file over and no status set', () => {
      chatFormComponent.fileOver = true;

      expect(chatFormComponent.getInputStatus()).toEqual('primary');
    });
  });
});
