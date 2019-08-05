import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { NbStepperComponent } from './stepper.component';
import { NbStepComponent } from './step.component';
import { NbIconModule } from '../icon/icon.module';
import {
  Component,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'nb-step-changed-test',
  template: `
    <nb-stepper [selectedIndex]="1">
      <nb-step [label]="labelOne">
        <ng-template #labelOne>First step</ng-template>
      </nb-step>

      <nb-step [label]="labelTwo">
        <ng-template #labelTwo>Seconds step</ng-template>
      </nb-step>

      <nb-step [label]="labelThree">
        <ng-template #labelThree>First step</ng-template>
      </nb-step>
    </nb-stepper>
  `,
})

export class NbStepChangeTestComponent {}

describe('Stepper: Step Change', () => {
  let stepper: NbStepperComponent;
  let fixture: ComponentFixture<NbStepChangeTestComponent>;
  let stepperEl: DebugElement;

  beforeEach((() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NbStepChangeTestComponent, NbStepComponent, NbStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NbStepChangeTestComponent);
    stepper = fixture.debugElement.children[0].componentInstance;
    stepperEl = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  it('Should emit next selectId on next method', () => {
    spyOn(stepper.stepChanged, 'emit');
    stepper.next();
    fixture.detectChanges();

    expect(stepper.stepChanged.emit).toHaveBeenCalled();
  });

  it('Should emit previous selectId on previous method', () => {
    spyOn(stepper.stepChanged, 'emit');
    stepper.next();
    stepper.previous();
    fixture.detectChanges();

    expect(stepper.stepChanged.emit).toHaveBeenCalledWith(1);
  });

  it('Should emit step change by clicking on step', () => {
    spyOn(stepper.stepChanged, 'emit');
    const step = fixture.debugElement.query(By.css('.step'));
    step.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(stepper.stepChanged.emit).toHaveBeenCalledWith(0);
  });

  it('Step change should not emit if navigation is disabled', () => {
    spyOn(stepper.stepChanged, 'emit');
    stepper.disableStepNavigation = true;
    const step = fixture.debugElement.query(By.css('.step'));
    step.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(stepper.stepChanged.emit).not.toHaveBeenCalled();
  });

  it('Step change should not emit in last step', () => {
    spyOn(stepper.stepChanged, 'emit');
    stepper.selectedIndex = 2;
    stepper.next();

    expect(stepper.stepChanged.emit).not.toHaveBeenCalled();
  });

  it('Step change should not emit in first step', () => {
    spyOn(stepper.stepChanged, 'emit');
    stepper.selectedIndex = 0;
    stepper.previous();

    expect(stepper.stepChanged.emit).not.toHaveBeenCalled();
  });
});

// TODO: this definitely requires more testing!
describe('Component: NbStepper', () => {

  let stepper: NbStepperComponent;
  let fixture: ComponentFixture<NbStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbIconModule],
      declarations: [NbStepComponent, NbStepperComponent],
    });

    fixture = TestBed.createComponent(NbStepperComponent);
    stepper = fixture.componentInstance;
  });

  it('Should set class horizontal', () => {
    stepper.orientation = 'horizontal';
    fixture.detectChanges();
    expect(
      fixture
        .debugElement.nativeElement.classList.contains('horizontal'))
      .toBeTruthy();

    stepper.orientation = 'vertical';
    fixture.detectChanges();
    expect(
      fixture
        .debugElement.nativeElement.classList.contains('vertical'))
      .toBeTruthy()
  });
});
