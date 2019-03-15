import { Component } from '@angular/core';

@Component({
  selector: 'nb-toggle-status',
  template: `
    <nb-card>
      <nb-card-body>
        <div>
          <nb-toggle status="primary"></nb-toggle>
        </div>
        <div>
          <nb-toggle status="success"></nb-toggle>
        </div>
        <div>
          <nb-toggle status="warning"></nb-toggle>
        </div>
        <div>
          <nb-toggle status="danger"></nb-toggle>
        </div>
        <div>
          <nb-toggle status="info"></nb-toggle>
        </div>
      </nb-card-body>
    </nb-card>
  `,
})
export class ToggleStatusComponent {
}
