import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbStepperComponent } from './stepper.component';
import { NB_STEPPER } from './stepper-tokens';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';

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
  protected stepper: NbStepperComponent;

  // TODO static must be false as of Angular 9.0.0, issues/1514
  /**
   * Step content
   *
   * @type {TemplateRef}
   */
  @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any>;

  /**
   * Top level abstract control of the step
   */
  @Input() stepControl?: { valid: boolean | null; reset: () => void };

  /**
   * Step label
   *
   * @type {string|TemplateRef<any>}
   */
  @Input() label: string | TemplateRef<any>;

  /**
   * Whether step will be displayed in wizard
   *
   * @type {boolean}
   */
  @Input()
  get hidden(): boolean {
    return this._hidden;
  }
  set hidden(value: boolean) {
    this._hidden = convertToBoolProperty(value);
  }
  protected _hidden = false;
  static ngAcceptInputType_hidden: NbBooleanInput;

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
    return this._completed || this.isCompleted;
  }
  set completed(value: boolean) {
    this._completed = convertToBoolProperty(value);
  }
  protected _completed: boolean = false;
  static ngAcceptInputType_completed: NbBooleanInput;

  protected get isCompleted() {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }

  interacted = false;

  constructor(@Inject(NB_STEPPER) stepper) {
    this.stepper = stepper;
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
