import { Component } from '@angular/core';

@Component({
  selector: 'nb-toggle-disabled',
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <nb-toggle disabled></nb-toggle>
        <nb-toggle [checked]="true" disabled></nb-toggle>
      </nb-card-body>
    </nb-card>
  `,
})
export class ToggleDisabledComponent {
}
