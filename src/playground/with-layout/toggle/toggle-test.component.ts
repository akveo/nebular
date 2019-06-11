import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-toggle-test',
  template: `
    <nb-card>
      <nb-card-body>
        <div>
          <nb-toggle id="first"></nb-toggle>
        </div>
        <div>
          <nb-toggle id="second" [checked]="true"></nb-toggle>
        </div>
        <div>
          <nb-toggle id="disabled" [disabled]="true"></nb-toggle>
        </div>
        <div>
          <nb-toggle [checked]="true" [disabled]="true"></nb-toggle>
        </div>
        <div>
          <nb-toggle id="primary" status="primary"></nb-toggle>
        </div>
        <div>
          <nb-toggle id="success" status="success"></nb-toggle>
        </div>
        <div>
          <nb-toggle id="warning" status="warning"></nb-toggle>
        </div>
        <div>
          <nb-toggle id="danger" status="danger"></nb-toggle>
        </div>
        <div>
          <nb-toggle id="info" status="info"></nb-toggle>
        </div>
      </nb-card-body>
    </nb-card>
  `,
})
export class ToggleTestComponent {
}
