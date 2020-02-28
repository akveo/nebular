import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <nb-radio-group disabled name="disabled" value="This is value 1">
          <nb-radio *ngFor="let option of options" [value]="option.value">
            {{ option.label }}
          </nb-radio>
        </nb-radio-group>
      </nb-card-body>
    </nb-card>
  `,
})
export class RadioDisabledGroupComponent {
  options = [
    { value: 'This is value 1', label: 'Option 1' },
    { value: 'This is value 2', label: 'Option 2' },
    { value: 'This is value 3', label: 'Option 3' },
    { value: 'This is value 4', label: 'Option 4' },
    { value: 'This is value 5', label: 'Option 5' },
  ];
}
