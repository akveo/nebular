import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbStepperComponent } from './stepper.component';
import { NbStepComponent } from './step.component';
import { NbIconModule } from '../icon/icon.module';

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

  it('should set class horizontal', () => {
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
