import { Component } from '@angular/core';

@Component({
  template: `
    <nb-radio-group *ngFor="let status of statuses"
                    [name]="status"
                    [status]="status"
                    [class.gray]="status === 'white'">
      <nb-radio
        *ngFor="let option of options; let isFirst = first"
        [checked]="isFirst"
        [value]="option.value">
        {{ option.label }}
      </nb-radio>
    </nb-radio-group>
  `,
  styleUrls: ['./radio-statuses-group.component.scss'],
})
export class RadioStatusesComponent {
  options = [
    { value: 'This is value 1', label: 'Option 1' },
    { value: 'This is value 2', label: 'Option 2', disabled: true },
    { value: 'This is value 3', label: 'Option 3' },
    { value: 'This is value 4', label: 'Option 4', disabled: true },
    { value: 'This is value 5', label: 'Option 5' },
  ];

  statuses = ['primary', 'success', 'warning', 'danger', 'info', 'white'];
}
