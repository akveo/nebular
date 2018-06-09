import { NbStepperComponent } from './stepper.component';
import { Directive } from '@angular/core';

@Directive({
  selector: 'button[nbStepperNext]',
  host: {
    '(click)': '_stepper.next()',
    '[type]': 'type',
  },
})
export class NbStepperNextDirective {
  constructor(public _stepper: NbStepperComponent) {
  }
}

/** Button that moves to the previous step in a stepper workflow. */
@Directive({
  selector: 'button[nbStepperPrevious]',
  host: {
    '(click)': '_stepper.previous()',
    '[type]': 'type',
  },
})
export class NbStepperPreviousDirective {
  constructor(public _stepper: NbStepperComponent) {
  }
}
