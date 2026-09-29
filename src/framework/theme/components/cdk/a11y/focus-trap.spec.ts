import { TestBed } from '@angular/core/testing';

import { NbThemeModule } from '../../../theme.module';
import { NbFocusTrapFactoryService } from './focus-trap';

describe('NbFocusTrapFactoryService', () => {
  let previouslyFocused: HTMLButtonElement;
  let trapElement: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot()],
    });

    previouslyFocused = document.createElement('button');
    trapElement = document.createElement('div');
    document.body.append(previouslyFocused, trapElement);
    previouslyFocused.focus();
  });

  afterEach(() => {
    previouslyFocused.remove();
    trapElement.remove();
  });

  it('should create a CDK 22 focus trap and restore the previously focused element', () => {
    const factory = TestBed.inject(NbFocusTrapFactoryService);
    const trap = factory.create(trapElement, true);
    const nextFocused = document.createElement('button');
    document.body.appendChild(nextFocused);
    nextFocused.focus();

    trap.restoreFocus();

    expect(document.activeElement).toBe(previouslyFocused);
    nextFocused.remove();
  });
});
