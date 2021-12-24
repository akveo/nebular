import { Component } from '@angular/core';
import { NbComponentStatus } from '../../../framework/theme/components/component-status';

@Component({
  template: `
    <nb-card>
      <nb-card-body class="example-items-rows">
        <nb-radio-group *ngFor="let status of statuses"
                        [name]="status"
                        [status]="status"
                        [class.control-status-example]="status === 'control'">
          <nb-radio *ngFor="let option of options"
                    [checked]="option.checked"
                    [disabled]="option.disabled"
                    [value]="option.value">
            {{ option.label }}
          </nb-radio>
        </nb-radio-group>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./radio-statuses-group.component.scss'],
})
export class RadioStatusesComponent {
  options = [
    { value: 'This is value 1', label: 'Option 1', checked: true },
    { value: 'This is value 2', label: 'Option 2' },
    { value: 'This is value 3', label: 'Option 3' },
    { value: 'This is value 4', label: 'Option 4', disabled: true },
  ];

  statuses: NbComponentStatus[] = ['basic', 'primary', 'success', 'warning', 'danger', 'info', 'control'];
}
