/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ViewChild, ElementRef, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbInputDirective } from './input.directive';
import { NbInputModule } from '@nebular/theme';

@Component({
  template: `
    <input #inputEl nbInput [size]="size" [status]="status" [shape]="shape">
    <textarea #textareaEl nbInput [size]="size" [status]="status" [shape]="shape"></textarea>
  `,
})
class InputTestComponent {
  @ViewChild('inputEl', { read: ElementRef })
  inputElementRef: ElementRef;

  @ViewChild('textareaEl', { read: ElementRef })
  textareaElementRef: ElementRef;

  get inputElement() {
    return this.inputElementRef.nativeElement;
  }

  get textareaElement() {
    return this.textareaElementRef.nativeElement;
  }

  @Input() size = NbInputDirective.SIZE_MEDIUM;
  @Input() status;
  @Input() shape = NbInputDirective.SHAPE_RECTANGLE;
}

describe('Directive: NbInput', () => {

  let inputTestComponent: InputTestComponent;
  let fixture: ComponentFixture<InputTestComponent>;
  let inputElement: Element;
  let textareaElement: Element;

  beforeEach(() => {;

    fixture = TestBed.configureTestingModule({
        imports: [ NbInputModule ],
        declarations: [ InputTestComponent ],
      })
      .createComponent(InputTestComponent);

    inputTestComponent = fixture.componentInstance;
    inputElement = inputTestComponent.inputElement;
    textareaElement = inputTestComponent.textareaElement;
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
});
