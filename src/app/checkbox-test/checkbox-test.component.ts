import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-checkbox-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-header>Checkbox</nb-card-header>
          <nb-card-body>
            <div>
              <nb-checkbox id="first"></nb-checkbox>
            </div>
            <div>
              <nb-checkbox id="second" [checked]="true">Checked</nb-checkbox>
            </div>
            <div>
              <nb-checkbox id="required" [required]="true">Checked, required</nb-checkbox>
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
            <div>
              <nb-checkbox id="danger" status="danger1234">Incorrect status, warn expected</nb-checkbox>
            </div>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbCheckboxTestComponent {
}
