import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nb-stepper-validation',
  styleUrls: ['stepper-playground.component.scss'],
  templateUrl: './stepper-validation.component.html',
})

export class NbStepperValidationComponent {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });

    this.thirdFormGroup = this.fb.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  onFirstSubmit() {
    this.firstFormGroup.markAsDirty();
  }

  onSecondSubmit() {
    this.secondFormGroup.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdFormGroup.markAsDirty();
  }

}
