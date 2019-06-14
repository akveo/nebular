import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-checkbox-test',
  template: `
    <div>
      <nb-checkbox id="first"></nb-checkbox>
    </div>
    <div>
      <nb-checkbox id="second" [checked]="true">Checked</nb-checkbox>
    </div>
    <div>
      <nb-checkbox id="disabled" [disabled]="true">Disabled</nb-checkbox>
    </div>
    <div>
      <nb-checkbox [checked]="true" [disabled]="true">Disabled, checked</nb-checkbox>
    </div>
    <div>
      <nb-checkbox id="success" status="success">Success</nb-checkbox>
    </div>
    <div>
      <nb-checkbox id="warning" status="warning">Warning</nb-checkbox>
    </div>
    <div>
      <nb-checkbox id="danger" status="danger">Danger</nb-checkbox>
    </div>
  `,
})
export class CheckboxTestComponent {
}
