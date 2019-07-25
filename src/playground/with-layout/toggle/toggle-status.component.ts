import { Component } from '@angular/core';

@Component({
  selector: 'nb-toggle-status',
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <nb-toggle status="primary"></nb-toggle>
        <nb-toggle status="success"></nb-toggle>
        <nb-toggle status="warning"></nb-toggle>
        <nb-toggle status="danger"></nb-toggle>
        <nb-toggle status="info"></nb-toggle>
      </nb-card-body>
    </nb-card>
  `,
})
export class ToggleStatusComponent {
}
