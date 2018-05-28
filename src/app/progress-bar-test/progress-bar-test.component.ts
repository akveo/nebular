import {Component} from '@angular/core';

@Component({
  selector: 'nb-app-progress-bar-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <nb-progress-bar></nb-progress-bar>
            <nb-progress-bar [value]="50"></nb-progress-bar>
            <nb-progress-bar type='primary' [value]="50"></nb-progress-bar>
            <nb-progress-bar type='info' [value]="50"></nb-progress-bar>
            <nb-progress-bar type='success' [value]="50"></nb-progress-bar>
            <nb-progress-bar type='warning' [value]="50"></nb-progress-bar>
            <nb-progress-bar type='danger' [value]="50"></nb-progress-bar>
            <nb-progress-bar type='primary' [value]="50" [displayValue]="true"></nb-progress-bar>
            <nb-progress-bar type='info' [value]="0" [displayValue]="true"></nb-progress-bar>
            <nb-progress-bar type='danger' [value]="10" [displayValue]="true"></nb-progress-bar>
            <nb-progress-bar type='warning' [value]="90" [displayValue]="true"></nb-progress-bar>
            <nb-progress-bar type='info' [value]="100" [displayValue]="true"></nb-progress-bar>
            <nb-progress-bar type='primary' [value]="50">5 of 10</nb-progress-bar>
            <nb-progress-bar type='success' [value]="100">READY!</nb-progress-bar>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
  styles: [`
    nb-progress-bar {
      margin-top: 1rem;
    }
  `],
})
export class NbProgressBarTestComponent {
}
