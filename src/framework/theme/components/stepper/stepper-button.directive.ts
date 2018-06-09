import { NbStepperComponent } from './stepper.component';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'button[nbStepperNext]',
  host: {
    '(click)': '_stepper.next()',
    '[type]': 'type',
  },
})
export class NbStepperNextDirective {
  @Input() type: string = 'submit';
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
  @Input() type: string = 'button';
  constructor(public _stepper: NbStepperComponent) {
  }
}
