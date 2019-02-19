import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { convertToBoolProperty } from '../helpers';
import { NbStepperComponent } from './stepper.component';
import { NB_STEPPER_INJECTION_TOKEN } from './injection-tokens';

/**
 * Component intended to be used within  the `<nb-stepper>` component.
 * Container for a step
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
   * @type {string|TemplateRef<any>}
   */
  @Input() label: string|TemplateRef<any>;

  /**
   * Whether step will be displayed in wizard
   *
   * @type {boolean}
   */
  @Input() hidden: false;

  /**
   * Check that label is a TemplateRef.
   *
   * @return boolean
   * */
  get isLabelTemplate(): boolean {
    return this.label instanceof TemplateRef;
  }

  /**
   * Whether step is marked as completed.
   *
   * @type {boolean}
   */
  @Input()
  get completed(): boolean {
    return this.completedValue || this.isCompleted;
  }

  set completed(value: boolean) {
    this.completedValue = convertToBoolProperty(value);
  }

  private completedValue: boolean = false;

  private get isCompleted() {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }

  interacted = false;
  private stepper: NbStepperComponent;

  constructor(@Inject(NB_STEPPER_INJECTION_TOKEN) stepper) {
    this.stepper = stepper as NbStepperComponent;
  }

  /**
   * Mark step as selected
   * */
  select(): void {
    this.stepper.selected = this;
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
