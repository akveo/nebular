import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { NbStepperComponent, NbStepComponent, NbIconModule } from '@nebular/theme';
import { NbStepperModule } from './stepper.module';
import { Component } from '@angular/core';
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
  let stepChangeSpy;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [NbStepperModule, NbIconModule],
      declarations: [NbStepChangeTestComponent],
    });

    fixture = TestBed.createComponent(NbStepChangeTestComponent);
    stepper = fixture.debugElement.query(By.directive(NbStepperComponent)).componentInstance;
    fixture.detectChanges();
    stepChangeSpy = jasmine.createSpy('step change spy');
  }));

  it('Should emit step change on next method', () => {
    stepper.stepChanged.subscribe(stepChangeSpy);
    stepper.next();
    fixture.detectChanges();

    expect(stepChangeSpy).toHaveBeenCalled();
  });

  it('Should emit step change by clicking on step', () => {
    stepper.stepChanged.subscribe(stepChangeSpy);
    const step = fixture.debugElement.query(By.css('.step'));
    step.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(stepChangeSpy).toHaveBeenCalled();
  });

  it('Step change should not emit if navigation is disabled', () => {
    stepper.stepChanged.subscribe(stepChangeSpy);
    stepper.disableStepNavigation = true;
    const step = fixture.debugElement.query(By.css('.step'));
    step.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(stepChangeSpy).not.toHaveBeenCalled();
  });

  it('Step change should not emit in last step', () => {
    stepper.selectedIndex = 2;
    stepper.stepChanged.subscribe(stepChangeSpy);
    stepper.next();

    expect(stepChangeSpy).not.toHaveBeenCalled();
  });

  it('Step change should not emit in first step', () => {
    stepper.selectedIndex = 0;
    stepper.stepChanged.subscribe(stepChangeSpy);
    stepper.previous();

    expect(stepChangeSpy).not.toHaveBeenCalled();
  });

  it('Step change should emit via selected input', () => {
    stepper.stepChanged.subscribe(stepChangeSpy);
    const step = fixture.debugElement.query(By.css('.step')).componentInstance;
    stepper.selected = step;

    fixture.detectChanges();
    expect(stepChangeSpy).not.toHaveBeenCalled();
  });

  it('Step change should emit via selectedIndex input', () => {
    stepper.stepChanged.subscribe(stepChangeSpy);
    stepper.selectedIndex = 2;
    fixture.detectChanges();
    expect(stepChangeSpy).toHaveBeenCalled();
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
    expect(fixture.debugElement.nativeElement.classList.contains('horizontal')).toBeTruthy();

    stepper.orientation = 'vertical';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.classList.contains('vertical')).toBeTruthy();
  });
});
