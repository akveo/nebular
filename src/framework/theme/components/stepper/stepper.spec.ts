import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbStepComponent, NbStepperComponent, NbStepperModule, NbThemeModule } from '@nebular/theme';

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
  standalone: false,
})
export class NbStepChangeTestComponent {
  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;
  @ViewChildren(NbStepComponent) steps: QueryList<NbStepComponent>;
}

describe('Stepper: Step Change', () => {
  let testComponent: NbStepChangeTestComponent;
  let stepper: NbStepperComponent;
  let fixture: ComponentFixture<NbStepChangeTestComponent>;
  let stepChangeSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), NbStepperModule],
      declarations: [NbStepChangeTestComponent],
    });

    fixture = TestBed.createComponent(NbStepChangeTestComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    stepper = testComponent.stepper;
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

  it('should not emit step change if navigation is disabled', () => {
    stepper.stepChange.subscribe(stepChangeSpy);
    stepper.disableStepNavigation = true;
    const step = fixture.debugElement.query(By.css('.step'));
    step.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(stepChangeSpy).not.toHaveBeenCalled();
  });

  it('should not emit step change when calling next on the last step', () => {
    stepper.selectedIndex = 2;
    stepper.stepChange.subscribe(stepChangeSpy);
    stepper.next();

    expect(stepChangeSpy).not.toHaveBeenCalled();
  });

  it('should not emit step change when calling prev on the first step', () => {
    stepper.selectedIndex = 0;
    stepper.stepChange.subscribe(stepChangeSpy);
    stepper.previous();

    expect(stepChangeSpy).not.toHaveBeenCalled();
  });

  it('should emit step change when changing step via selected input', () => {
    stepper.stepChange.subscribe(stepChangeSpy);
    const thirdStep = testComponent.steps.get(2);
    stepper.selected = thirdStep;
    fixture.detectChanges();

    expect(stepChangeSpy).toHaveBeenCalled();
    const [changeEvent] = stepChangeSpy.calls.first().args;
    expect(changeEvent.index).toEqual(2);
    expect(changeEvent.step).toEqual(thirdStep);
    expect(changeEvent.previouslySelectedIndex).toEqual(1);
    expect(changeEvent.previouslySelectedStep).toEqual(testComponent.steps.get(1));
  });

  it('should emit step change when changing step via selectedIndex input', () => {
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
