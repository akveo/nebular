import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-radio-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-header>First group</nb-card-header>
          <nb-card-body>
            <div>
              <nb-radio id="first" name="1"></nb-radio>
            </div>
            <div>
              <nb-radio id="second" [checked]="true" name="1">Checked</nb-radio>
            </div>
          </nb-card-body>
        </nb-card>
        <nb-card>
          <nb-card-header>Disabled group</nb-card-header>
          <nb-card-body>
            <div>
              <nb-radio name="dis" id="disabled" [disabled]="true">Disabled</nb-radio>
            </div>
            <div>
              <nb-radio name="dis" [checked]="true" [disabled]="true">Disabled, checked</nb-radio>
            </div>
          </nb-card-body>
        </nb-card>
        <nb-card>
          <nb-card-header>Status group</nb-card-header>
          <nb-card-body>
        <div>
          <nb-radio name="status" id="success" status="success">Success</nb-radio>
        </div>
        <div>
          <nb-radio name="status" id="warning" status="warning">Warning</nb-radio>
        </div>
        <div>
          <nb-radio name="status" id="danger" status="danger">Danger</nb-radio>
        </div>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbRadioTestComponent {
}
