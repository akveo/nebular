import {
  Component,
  forwardRef,
  Inject,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NbStepperComponent } from './stepper.component';
import { convertToBoolProperty } from '../helpers';

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
    return this.completedValue || this.interacted;
  }

  set completed(value: boolean) {
    this.completedValue = convertToBoolProperty(value);
  }

  private completedValue: boolean = false;

  interacted = false;

  get isValid(): boolean {
    return this.stepControl && this.stepControl.valid || false;
  }

  constructor(@Inject(forwardRef(() => NbStepperComponent)) private stepper: NbStepperComponent) {
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

  /**
   * Mark step as interacted
   */
  visit() {
    this.interacted = true;
  }
}
