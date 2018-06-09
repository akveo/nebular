import { NbStepperComponent } from "./stepper.component";
import { Directive } from "@angular/core";

@Directive({
  selector: 'button[nbStepperNext]',
  host: {
    '(click)': '_stepper.next()',
    '[type]': 'type',
  },
  inputs: ['type'],
})
export class NbStepperNext {
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
  inputs: ['type'],
})
export class NbStepperPrevious {
  constructor(public _stepper: NbStepperComponent) {
  }
}
