/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import {
  Component,
  DebugElement,
  ElementRef,
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

  @ViewChild(NbRadioGroupComponent, { static: false }) radioGroupComponent: NbRadioGroupComponent;
  @ViewChildren(NbRadioComponent) radioComponents: QueryList<NbRadioComponent>;
}

@Component({
  template: `
    <nb-radio-group #firstGroup name="1">
      <nb-radio checked value="1"></nb-radio>
    </nb-radio-group>
    <nb-radio-group #secondGroup name="2">
      <nb-radio checked value="2"></nb-radio>
    </nb-radio-group>
  `,
})
export class NbTwoRadioGroupsComponent {
  @ViewChild('firstGroup', { read: NbRadioGroupComponent, static: false }) firstGroup: NbRadioGroupComponent;
  @ViewChild('secondGroup', { read: NbRadioGroupComponent, static: false }) secondGroup: NbRadioGroupComponent;
  @ViewChildren(NbRadioComponent, { read: ElementRef }) radios: QueryList<ElementRef>;
}

describe('radio', () => {
  let fixture: ComponentFixture<NbRadioTestComponent>;
  let comp: NbRadioTestComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NbRadioModule],
      declarations: [NbRadioTestComponent],
      providers: [ { provide: NB_DOCUMENT, useValue: document } ],
    });

    fixture = TestBed.createComponent(NbRadioTestComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
  }));

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

describe('NbRadioGroupComponent', () => {
  let fixture: ComponentFixture<NbRadioWithDynamicValuesTestComponent>;
  let radioTestComponent: NbRadioWithDynamicValuesTestComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [ NbRadioModule ],
      declarations: [ NbRadioWithDynamicValuesTestComponent, NbTwoRadioGroupsComponent ],
      providers: [ { provide: NB_DOCUMENT, useValue: document } ],
    });

    fixture = TestBed.createComponent(NbRadioWithDynamicValuesTestComponent);
    radioTestComponent = fixture.componentInstance;
    fixture.detectChanges();
    flush(); // promise with 'updateAndSubscribeToRadios'
    fixture.detectChanges(); // detect changes made during 'updateAndSubscribeToRadios'
  }));

  it('should update radio value when radios added after radio group initialization', fakeAsync(() => {
    radioTestComponent.radioValues = [1, 2, 3];
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.value = 1;
    fixture.detectChanges(); // adds radios
    flush(); // promise with 'updateAndSubscribeToRadios' in NbRadioGroup.radios.changes
    fixture.detectChanges(); // detect changes made during 'updateAndSubscribeToRadios'

    expect(radioTestComponent.radioComponents.first.checked).toEqual(true);
    const otherRadios = radioTestComponent.radioComponents.toArray().slice(1);
    for (const radio of otherRadios) {
      expect(radio.checked).toEqual(false);
    }
  }));

  it('should update radio name when radios added after radio group initialization', fakeAsync(() => {
    const groupName = 'my-radio-group-name';
    radioTestComponent.radioValues = [1, 2, 3];
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.name = groupName;
    fixture.detectChanges(); // adds radios
    flush(); // promise with 'updateAndSubscribeToRadios' in NbRadioGroup.radios.changes
    fixture.detectChanges(); // detect changes made during 'updateAndSubscribeToRadios'

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.name).toEqual(groupName);
    }
  }));

  it('should update radio disabled state when radios added after radio group initialization', fakeAsync(() => {
    radioTestComponent.radioValues = [1, 2, 3];
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.disabled = true;
    fixture.detectChanges(); // adds radios
    flush(); // promise with 'updateAndSubscribeToRadios' in NbRadioGroup.radios.changes
    fixture.detectChanges(); // detect changes made during 'updateAndSubscribeToRadios'

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.disabled).toEqual(true);
    }
  }));

  it('should update radio status when radios added after radio group initialization', fakeAsync(() => {
    radioTestComponent.radioValues = [1, 2, 3];
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.status = 'info';
    fixture.detectChanges(); // adds radios
    flush(); // promise with 'updateAndSubscribeToRadios' in NbRadioGroup.radios.changes
    fixture.detectChanges(); // detect changes made during 'updateAndSubscribeToRadios'

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.status).toEqual('info');
    }
  }));

  it('should update subscription to radio change when radios added after radio group initialization', fakeAsync(() => {
    const radioValue = 333;
    radioTestComponent.radioValues = [radioValue];
    radioTestComponent.showRadios = true;
    fixture.detectChanges(); // adds radios
    flush(); // promise with 'updateAndSubscribeToRadios' in NbRadioGroup.radios.changes
    fixture.detectChanges(); // detect changes made during 'updateAndSubscribeToRadios'

    const valueChangeSpy = createSpy('valueChange');
    radioTestComponent.radioGroupComponent.valueChange.subscribe(valueChangeSpy);
    radioTestComponent.radioComponents.first.valueChange.emit(radioValue);

    tick();

    expect(valueChangeSpy).toHaveBeenCalledTimes(1);
    expect(valueChangeSpy).toHaveBeenCalledWith(radioValue);
  }));

  it('should update radio value when radios change', fakeAsync(() => {
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.value = 1;
    fixture.detectChanges();

    radioTestComponent.radioValues = [1, 2, 3];
    fixture.detectChanges(); // adds radios
    flush(); // promise with 'updateAndSubscribeToRadios' in NbRadioGroup.radios.changes
    fixture.detectChanges(); // detect changes made during 'updateAndSubscribeToRadios'

    expect(radioTestComponent.radioComponents.first.checked).toEqual(true);
    const otherRadios = radioTestComponent.radioComponents.toArray().slice(1);
    for (const radio of otherRadios) {
      expect(radio.checked).toBeFalsy();
    }
  }));

  it('should update radio name when radios change', fakeAsync(() => {
    const groupName = 'my-radio-group-name';
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.name = groupName;
    fixture.detectChanges();

    radioTestComponent.radioValues = [1, 2, 3];
    fixture.detectChanges(); // adds radios
    flush(); // promise with 'updateAndSubscribeToRadios' in NbRadioGroup.radios.changes
    fixture.detectChanges(); // detect changes made during 'updateAndSubscribeToRadios'

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.name).toEqual(groupName);
    }
  }));

  it('should update radio disabled state when radios change', fakeAsync(() => {
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.disabled = true;
    fixture.detectChanges();

    radioTestComponent.radioValues = [1, 2, 3];
    fixture.detectChanges(); // adds radios
    flush(); // promise with 'updateAndSubscribeToRadios' in NbRadioGroup.radios.changes
    fixture.detectChanges(); // detect changes made during 'updateAndSubscribeToRadios'

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.disabled).toEqual(true);
    }
  }));

  it('should update radio status when radios change', fakeAsync(() => {
    radioTestComponent.showRadios = true;
    radioTestComponent.radioGroupComponent.status = 'info';
    fixture.detectChanges();

    radioTestComponent.radioValues = [1, 2, 3];
    fixture.detectChanges(); // adds radios
    flush(); // promise with 'updateAndSubscribeToRadios' in NbRadioGroup.radios.changes
    fixture.detectChanges(); // detect changes made during 'updateAndSubscribeToRadios'

    for (const radio of radioTestComponent.radioComponents.toArray()) {
      expect(radio.status).toEqual('info');
    }
  }));

  it('should update subscription to radio change when radios change', fakeAsync(() => {
    const valueChangeSpy = createSpy('valueChange');
    radioTestComponent.radioGroupComponent.valueChange.subscribe(valueChangeSpy);
    radioTestComponent.showRadios = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    const radioValue = 333;
    radioTestComponent.radioValues = [radioValue];
    fixture.detectChanges(); // adds radios
    flush(); // promise with 'updateAndSubscribeToRadios' in NbRadioGroup.radios.changes
    fixture.detectChanges(); // detect changes made during 'updateAndSubscribeToRadios'

    radioTestComponent.radioComponents.first.valueChange.emit(radioValue);
    tick();

    expect(valueChangeSpy).toHaveBeenCalledTimes(1);
    expect(valueChangeSpy).toHaveBeenCalledWith(radioValue);
  }));

  it(`should set options name right away so it won't overlap with options from another groups`, () => {
    const radioFixture = TestBed.createComponent(NbTwoRadioGroupsComponent);
    radioFixture.detectChanges();

    const { firstGroup, secondGroup, radios } = radioFixture.componentInstance;
    const radioFromFirstGroup = radios.first.nativeElement.querySelector('input');
    const radioFromSecondGroup = radios.last.nativeElement.querySelector('input');

    expect(firstGroup.radios.first.checked).toEqual(true);
    expect(radioFromFirstGroup.checked).toEqual(true);
    expect(secondGroup.radios.first.checked).toEqual(true);
    expect(radioFromSecondGroup.checked).toEqual(true);
  });
});
