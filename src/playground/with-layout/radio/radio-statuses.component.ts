import { Component } from '@angular/core';

interface Option {
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
}
type Options = Option[];

@Component({
  template: `
    <nb-radio-group *ngFor="let status of statuses" [name]="status" [status]="status">
      <nb-radio *ngFor="let option of options"
                [checked]="option.checked"
                [disabled]="option.disabled"
                [value]="option.value">
        {{ option.label }}
      </nb-radio>
    </nb-radio-group>
  `,
  styleUrls: ['./radio-statuses-group.component.scss'],
})
export class RadioStatusesComponent {
  options: Options = [
    { value: 'This is value 1', label: 'Option 1', checked: true },
    { value: 'This is value 2', label: 'Option 2' },
    { value: 'This is value 3', label: 'Option 3' },
    { value: 'This is value 4', label: 'Option 4', disabled: true },
  ];

  statuses = ['primary', 'success', 'warning', 'danger', 'info'];
}
