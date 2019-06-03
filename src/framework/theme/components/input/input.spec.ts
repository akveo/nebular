/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NbInputDirective } from './input.directive';
import { NbInputModule } from './input.module';

@Component({
  template: `
    <input #inputEl nbInput [fieldSize]="size" [status]="status" [shape]="shape" [fullWidth]="fullWidth">
    <textarea #textareaEl nbInput [fieldSize]="size" [status]="status" [shape]="shape" [fullWidth]="fullWidth">
    </textarea>
  `,
})
class InputTestComponent {
  @Input() size = NbInputDirective.SIZE_MEDIUM;
  @Input() status;
  @Input() shape = NbInputDirective.SHAPE_RECTANGLE;
  @Input() fullWidth = false;
}

describe('Directive: NbInput', () => {

  let inputTestComponent: InputTestComponent;
  let fixture: ComponentFixture<InputTestComponent>;
  let inputElement: Element;
  let textareaElement: Element;

  beforeEach(() => {

    fixture = TestBed.configureTestingModule({
        imports: [ NbInputModule ],
        declarations: [ InputTestComponent ],
      })
      .createComponent(InputTestComponent);

    inputTestComponent = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('textarea')).nativeElement;
    textareaElement = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should set status', () => {
    inputTestComponent.status = NbInputDirective.STATUS_DANGER;
    fixture.detectChanges();

    expect(inputElement.classList).toContain('input-danger');
    expect(textareaElement.classList).toContain('input-danger');
  });

  it('should set size', () => {
    inputTestComponent.size = NbInputDirective.SIZE_LARGE;
    fixture.detectChanges();

    expect(inputElement.classList).toContain('input-lg');
    expect(textareaElement.classList).toContain('input-lg');
  });

  it('should set shape class', () => {
    inputTestComponent.shape = NbInputDirective.SHAPE_SEMI_ROUND;
    fixture.detectChanges();

    expect(inputElement.classList).toContain('input-semi-round');
    expect(textareaElement.classList).toContain('input-semi-round');
  });

  it('should set full width', () => {
    inputTestComponent.fullWidth = true;
    fixture.detectChanges();

    expect(inputElement.classList).toContain('input-full-width');
    expect(textareaElement.classList).toContain('input-full-width');
  });
});
