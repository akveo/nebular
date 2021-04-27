import { Component } from '@angular/core';

@Component({
  selector: 'app-button-group-value-change',
  templateUrl: './button-group-value-change.component.html',
  styleUrls: ['./button-group-value-change.component.scss'],
})
export class ButtonGroupValueChangeComponent {
  logSingle = '';
  logMultiple = '';

  onValueChangeSingle($event: unknown[]) {
    this.logSingle = `Current value is ${JSON.stringify($event)}`;
  }

  onValueChangeMultiple($event: unknown[]) {
    this.logMultiple = `Current value is ${JSON.stringify($event)}`;
  }
}
