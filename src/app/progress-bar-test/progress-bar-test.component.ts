import {Component} from '@angular/core';

@Component({
  selector: 'nb-app-progress-bar-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <nb-progress-bar></nb-progress-bar>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbProgressBarTestComponent {
}
