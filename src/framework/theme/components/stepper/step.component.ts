import { Component, forwardRef, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NbStepperComponent } from './stepper.component';

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

  @ViewChild(TemplateRef) content: TemplateRef<any>;

  @Input() stepControl: AbstractControl;

  @Input()
  get completed(): boolean {
    // TODO add control validation
    return this._completed;
  }
  set completed(value: boolean) {
    this._completed = value;
  }
  private _completed: boolean | null = null;

  @Input()
  get optional(): boolean { return this._optional; }
  set optional(value: boolean) {
    this._optional = value;
  }
  private _optional = false;

  constructor(@Inject(forwardRef(() => NbStepperComponent)) private _stepper: NbStepperComponent) { }

  select(): void {
    this._stepper.selected = this;
  }

  reset(): void {
  }

}
