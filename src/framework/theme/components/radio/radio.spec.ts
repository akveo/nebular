/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbRadioModule } from './radio.module';
import { NbRadioComponent } from './radio.component';
import { NB_DOCUMENT } from '../../theme.options';

import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'nb-radio-test',
  template: `
    <nb-radio-group [value]="value" (valueChange)="valueChange.emit($event)">
      <nb-radio value="1">1</nb-radio>
      <nb-radio value="2">2</nb-radio>
      <nb-radio value="3" disabled>3</nb-radio>
    </nb-radio-group>
  `,
})
export class NbRadioTestComponent {
  @Input() value;
  @Output() valueChange = new EventEmitter();
}

describe('radio', () => {
  let fixture: ComponentFixture<NbRadioTestComponent>;
  let comp: NbRadioTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbRadioModule],
      declarations: [NbRadioTestComponent],
      providers: [ { provide: NB_DOCUMENT, useValue: document } ],
    });

    fixture = TestBed.createComponent(NbRadioTestComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render radios', () => {
    const radios: DebugElement[] = fixture.debugElement.queryAll(By.directive(NbRadioComponent));
    expect(radios.length).toBe(3);
  });

  it('should fire value when selected', done => {
    const secondRadio: DebugElement = fixture.debugElement.queryAll(By.directive(NbRadioComponent))[1];
    comp.valueChange.subscribe(done);
    const input = secondRadio.query(By.css('input'));
    input.nativeElement.click();
  });
});
