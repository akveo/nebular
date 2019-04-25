import { NbStepperComponent } from './stepper.component';
import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'button[nbStepperNext]',
})
export class NbStepperNextDirective {

  @Input() @HostBinding('attr.type') type: string = 'submit';

  constructor(protected stepper: NbStepperComponent) {
  }

  @HostListener('click')
  onClick() {
    this.stepper.next();
  }
}

@Directive({
  selector: 'button[nbStepperPrevious]',
})
export class NbStepperPreviousDirective {

  @Input() @HostBinding('attr.type') type: string = 'button';

  constructor(protected stepper: NbStepperComponent) {
  }

  @HostListener('click')
  onClick() {
    this.stepper.previous();
  }
}
