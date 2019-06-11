import { Component } from '@angular/core';

@Component({
  selector: 'nb-toggle-disabled',
  template: `
    <nb-card>
      <nb-card-body>
        <div>
          <nb-toggle disabled></nb-toggle>
        </div>
        <div>
          <nb-toggle [checked]="true" disabled></nb-toggle>
        </div>
      </nb-card-body>
    </nb-card>
  `,
})
export class ToggleDisabledComponent {
}
