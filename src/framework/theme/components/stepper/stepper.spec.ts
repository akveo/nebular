import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbStepperComponent, NbStepperModule, NbThemeModule } from '@nebular/theme';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), NbStepperModule],
      declarations: [NbStepChangeTestComponent],
    });

    fixture = TestBed.createComponent(NbStepChangeTestComponent);
    stepper = fixture.debugElement.query(By.directive(NbStepperComponent)).componentInstance;
    fixture.detectChanges();
    stepChangeSpy = jasmine.createSpy('step change spy');
  });

  it('should emit step change on next method', () => {
    stepper.stepChange.subscribe(stepChangeSpy);
    stepper.next();
    fixture.detectChanges();

    expect(stepChangeSpy).toHaveBeenCalled();
  });

  it('should emit step change by clicking on step', () => {
    stepper.stepChange.subscribe(stepChangeSpy);
    const step = fixture.debugElement.query(By.css('.step'));
    step.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(stepChangeSpy).toHaveBeenCalled();
  });

  it('Step change should not emit if navigation is disabled', () => {
    stepper.stepChange.subscribe(stepChangeSpy);
    stepper.disableStepNavigation = true;
    const step = fixture.debugElement.query(By.css('.step'));
    step.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(stepChangeSpy).not.toHaveBeenCalled();
  });

  it('Step change should not emit in last step', () => {
    stepper.selectedIndex = 2;
    stepper.stepChange.subscribe(stepChangeSpy);
    stepper.next();

    expect(stepChangeSpy).not.toHaveBeenCalled();
  });

  it('Step change should not emit in first step', () => {
    stepper.selectedIndex = 0;
    stepper.stepChange.subscribe(stepChangeSpy);
    stepper.previous();

    expect(stepChangeSpy).not.toHaveBeenCalled();
  });

  it('Step change should emit via selected input', () => {
    stepper.stepChange.subscribe(stepChangeSpy);
    const step = fixture.debugElement.query(By.css('.step')).componentInstance;
    stepper.selected = step;

    fixture.detectChanges();
    expect(stepChangeSpy).not.toHaveBeenCalled();
  });

  it('Step change should emit via selectedIndex input', () => {
    stepper.stepChange.subscribe(stepChangeSpy);
    stepper.selectedIndex = 2;
    fixture.detectChanges();
    expect(stepChangeSpy).toHaveBeenCalled();
  });
});

describe('Component: NbStepper', () => {
  let stepper: NbStepperComponent;
  let fixture: ComponentFixture<NbStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), NbStepperModule],
    });

    fixture = TestBed.createComponent(NbStepperComponent);
    stepper = fixture.componentInstance;
  });

  it('should set class horizontal', () => {
    stepper.orientation = 'horizontal';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.classList.contains('horizontal')).toBeTruthy();

    stepper.orientation = 'vertical';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.classList.contains('vertical')).toBeTruthy();
  });
});
