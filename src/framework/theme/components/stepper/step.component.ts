import {
  Component,
  forwardRef,
  Inject,
  Input,
  TemplateRef,
  ViewChild,
  Directive,
  ContentChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NbStepperComponent } from './stepper.component';

@Directive({
  selector: '[nbStepLabel]',
})
export class NbStepLabelDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

/**
 * Component intended to be used within  the `<nb-stepper>` component.
 * Container for steps
 */
@Component({
  selector: 'nb-step',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class NbStepComponent {

  @ContentChild(NbStepLabelDirective) stepLabel: NbStepLabelDirective;

  @ViewChild(TemplateRef) content: TemplateRef<any>;

  @Input() stepControl: AbstractControl;

  @Input() label: string;

  @Input()
  get completed(): boolean {
    return this._completed == null ? this.isControlValid : this._completed;
  }

  set completed(value: boolean) {
    this._completed = value;
  }

  private _completed: boolean | null = null;

  private get isControlValid() {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }

  interacted = false;

  constructor(@Inject(forwardRef(() => NbStepperComponent)) private _stepper: NbStepperComponent) {
  }

  select(): void {
    this._stepper.selected = this;
  }

  reset(): void {
  }

}
