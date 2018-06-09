import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nb-stepper-validation',
  styleUrls: ['stepper-validation.component.scss'],
  templateUrl: './stepper-validation.component.html',
})

export class NbStepperValidationComponent {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
