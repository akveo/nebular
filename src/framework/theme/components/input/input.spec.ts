/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ViewChild, ElementRef, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbInputDirective } from '@nebular/theme';
import { NbComponentStatus } from '../component-status';
import { NbComponentSize } from '../component-size';
import { NbComponentShape } from '../component-shape';
import { NbInputModule } from './input.module';

@Component({
  template: `
    <input #inputEl nbInput [fieldSize]="size" [status]="status" [shape]="shape" [fullWidth]="fullWidth">
    <textarea #textareaEl nbInput [fieldSize]="size" [status]="status" [shape]="shape" [fullWidth]="fullWidth">
    </textarea>
  `,
})
class InputTestComponent {
  @ViewChild('inputEl', { read: NbInputDirective }) inputDirective: NbInputDirective;

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

  @Input() size: NbComponentSize;
  @Input() status: NbComponentStatus;
  @Input() shape: NbComponentShape;
  @Input() fullWidth = false;
}

describe('Directive: NbInput', () => {

  let inputTestComponent: InputTestComponent;
  let fixture: ComponentFixture<InputTestComponent>;
  let inputElement: Element;
  let textareaElement: Element;
  let inputDirective: NbInputDirective;

  beforeEach(() => {

    fixture = TestBed.configureTestingModule({
        imports: [ NbInputModule ],
        declarations: [ InputTestComponent ],
      })
      .createComponent(InputTestComponent);

    inputTestComponent = fixture.componentInstance;
    inputDirective = inputTestComponent.inputDirective;
    inputElement = inputTestComponent.inputElement;
    textareaElement = inputTestComponent.textareaElement;
  });

  it('should set status', () => {
    inputTestComponent.status = 'danger';
    fixture.detectChanges();

    expect(inputElement.classList).toContain('status-danger');
    expect(textareaElement.classList).toContain('status-danger');
  });

  it('should set size', () => {
    inputTestComponent.size = 'large';
    fixture.detectChanges();

    expect(inputElement.classList).toContain('size-large');
    expect(textareaElement.classList).toContain('size-large');
  });

  it('should set shape class', () => {
    inputTestComponent.shape = 'semi-round';
    fixture.detectChanges();

    expect(inputElement.classList).toContain('shape-semi-round');
    expect(textareaElement.classList).toContain('shape-semi-round');
  });

  it('should set full width', () => {
    inputTestComponent.fullWidth = true;
    fixture.detectChanges();

    expect(inputElement.classList).toContain('input-full-width');
    expect(textareaElement.classList).toContain('input-full-width');
  });

});
