import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

interface RadioOption { value: string, label: string };

@Component({
  selector: 'nb-radio-form',
  templateUrl: './radio-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFormComponent implements OnInit {

  options: RadioOption[];
  formGroup: FormGroup;
  selected: string;

  get radioForm(): AbstractControl {
    return this.formGroup.get('radioGroup');
  }

  constructor(protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      radioGroup: [''],
    });

    this.options = [
      { value: '1', label: 'option 1' },
      { value: '2', label: 'option 2' },
      { value: '3', label: 'option 3' },
      { value: '4', label: 'option 4' },
    ];
  }
}
