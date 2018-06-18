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

  /**
   * Step label directive content
   *
   * @type {NbStepLabelDirective}
   */
  @ContentChild(NbStepLabelDirective) stepLabel: NbStepLabelDirective;

  /**
   * Step content
   *
   * @type {TemplateRef}
   */
  @ViewChild(TemplateRef) content: TemplateRef<any>;

  /**
   * Top level abstract control of the step
   *
   * @type {AbstractControl}
   */
  @Input() stepControl: AbstractControl;

  /**
   * Step label
   *
   * @type {string}
   */
  @Input() label: string;

  /**
   * Whether step will be displayed in wizard
   *
   * @type {false}
   */
  @Input() hidden: false;

  /**
   * Whether step is marked as completed.
   *
   * @type {boolean}
   */
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


  /**
   * Mark step as selected
   * */
  select(): void {
    this._stepper.selected = this;
  }

  /**
   * Reset step and stepControl state
   * */
  reset(): void {
    this.interacted = false;
    if (this.stepControl) {
      this.stepControl.reset();
    }
  }

}
