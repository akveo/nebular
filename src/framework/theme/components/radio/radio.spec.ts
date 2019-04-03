/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

import { NbRadioModule } from './radio.module';
import { NbRadioComponent } from './radio.component';
import { NbRadioGroupComponent } from './radio-group.component';
import { NB_DOCUMENT } from '../../theme.options';

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

@Component({
  template: `
    <nb-radio-group>
      <ng-template [ngIf]="showRadios">
        <nb-radio *ngFor="let radio of radioValues" [value]="radio">{{radio}}</nb-radio>
      </ng-template>
    </nb-radio-group>
  `,
})
export class NbRadioWithDynamicValuesTestComponent {
  radioValues: number[] = [];
  showRadios: boolean = false;

  @ViewChild(NbRadioGroupComponent) radioGroupComponent: NbRadioGroupComponent;
  @ViewChildren(NbRadioComponent) radioComponents: QueryList<NbRadioComponent>;
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

  it(`should set default status if value isn't passed`, () => {
    const radioFixture = TestBed.createComponent(NbRadioComponent);
    radioFixture.detectChanges();

    radioFixture.componentInstance.status = null;
    expect(radioFixture.componentInstance.status).toEqual('primary');
  });
});

describe('NbRadioGroupComponent', () => {
  let fixture: ComponentFixture<NbRadioWithDynamicValuesTestComponent>;
  let radioTestComponent: NbRadioWithDynamicValuesTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NbRadioModule ],
      declarations: [ NbRadioWithDynamicValuesTestComponent ],
      providers: [ { provide: NB_DOCUMENT, useValue: document } ],
    });

    fixture = TestBed.createComponent(NbRadioWithDynamicValuesTestComponent);
    radioTestComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update radio value when radios added after radio group initialization', () => {
    radioTestComponent.radioValues = [1, 2, 3];
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.value = 1;
    fixture.detectChanges();

    expect(radioTestComponent.radioComponents.first.checked).toEqual(true);
    const otherRadios = radioTestComponent.radioComponents.toArray().slice(1);
    for (const radio of otherRadios) {
      expect(radio.checked).toBeFalsy();
    }
  });

  it('should update radio name when radios added after radio group initialization', () => {
    const groupName = 'my-radio-group-name';
    radioTestComponent.radioValues = [1, 2, 3];
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.name = groupName;
    fixture.detectChanges();

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.name).toEqual(groupName);
    }
  });

  it('should update radio disabled state when radios added after radio group initialization', () => {
    radioTestComponent.radioValues = [1, 2, 3];
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.disabled = true;
    fixture.detectChanges();

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.disabled).toEqual(true);
    }
  });

  it('should update radio status when radios added after radio group initialization', () => {
    radioTestComponent.radioValues = [1, 2, 3];
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.status = 'info';
    fixture.detectChanges();

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.status).toEqual('info');
    }
  });

  it('should update subscription to radio change when radios added after radio group initialization', fakeAsync(() => {
    const radioValue = 333;
    radioTestComponent.radioValues = [radioValue];
    radioTestComponent.showRadios = true;
    fixture.detectChanges();

    const valueChangeSpy = createSpy('valueChange');
    radioTestComponent.radioGroupComponent.valueChange.subscribe(valueChangeSpy);
    radioTestComponent.radioComponents.first.valueChange.emit(radioValue);

    tick();

    expect(valueChangeSpy).toHaveBeenCalledTimes(1);
    expect(valueChangeSpy).toHaveBeenCalledWith(radioValue);
  }));

  it('should update radio value when radios change', () => {
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.value = 1;
    fixture.detectChanges();

    radioTestComponent.radioValues = [1, 2, 3];
    fixture.detectChanges();

    expect(radioTestComponent.radioComponents.first.checked).toEqual(true);
    const otherRadios = radioTestComponent.radioComponents.toArray().slice(1);
    for (const radio of otherRadios) {
      expect(radio.checked).toBeFalsy();
    }
  });

  it('should update radio name when radios change', () => {
    const groupName = 'my-radio-group-name';
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.name = groupName;
    fixture.detectChanges();

    radioTestComponent.radioValues = [1, 2, 3];
    fixture.detectChanges();

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.name).toEqual(groupName);
    }
  });

  it('should update radio disabled state when radios change', () => {
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.disabled = true;
    fixture.detectChanges();

    radioTestComponent.radioValues = [1, 2, 3];
    fixture.detectChanges();

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.disabled).toEqual(true);
    }
  });

  it('should update radio status when radios change', () => {
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.status = 'info';
    fixture.detectChanges();

    radioTestComponent.radioValues = [1, 2, 3];
    fixture.detectChanges();

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.status).toEqual('info');
    }
  });

  it('should update subscription to radio change when radios change', fakeAsync(() => {
    radioTestComponent.showRadios = true;
    fixture.detectChanges();

    const valueChangeSpy = createSpy('valueChange');
    radioTestComponent.radioGroupComponent.valueChange.subscribe(valueChangeSpy);

    const radioValue = 333;
    radioTestComponent.radioValues = [radioValue];
    fixture.detectChanges();

    radioTestComponent.radioComponents.first.valueChange.emit(radioValue);
    tick();

    expect(valueChangeSpy).toHaveBeenCalledTimes(1);
    expect(valueChangeSpy).toHaveBeenCalledWith(radioValue);
  }));

  it(`should set default status if value isn't passed`, () => {
    const radioFixture = TestBed.createComponent(NbRadioGroupComponent);
    radioFixture.detectChanges();

    radioFixture.componentInstance.status = null;
    expect(radioFixture.componentInstance.status).toEqual('primary');
  });
});
